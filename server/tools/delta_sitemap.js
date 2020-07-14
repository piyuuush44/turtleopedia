#!/usr/bin/env node

const { argv } = require('yargs')
    .scriptName('delta-sitemap-generator')
    .usage('Usage: $0 -d [path]')
    .usage('Usage: $0 -r [route]')
    .describe('d', 'Destination directory')
    .describe('r', 'Relative URL route')
    .help();

const moment = require('moment');
const convert = require('xml-js');
const fs = require('fs').promises;
const logger = require('../src/config/logger');
const Post = require('../src/models/posts');

const options = { compact: true, ignoreComment: true, spaces: 2 };

const DATE = moment(new Date()).format('YYYY-MM-DD');

// Number of links in each file
const NUM_LINKS = 10000;
const XML_NAMESPACE = 'http://www.sitemaps.org/schemas/sitemap/0.9';

const destination = argv.d || '/tmp';
const route = argv.r;

/**
 * It creates links of all listings in format like
 * Domain/home/b/
 */
const getPostLinks = async() => {
        let posts = await Post.find({});
        return posts.map(post => post.slug_url);
    }
    /**
     * Converts the given js object input into xml and writes it to a file
     * @param  {string}  obj  js object data that needs to be converted into xml
     * @param  {string}  path file path
     */
const convertJsAndWriteFile = async(obj, path) => {
    // Add xml declaration
    const finalJsonObject = {
        _declaration: {
            _attributes: {
                version: '1.0',
                encoding: 'utf-8',
            },
        },
        ...obj,
    };

    const xml = convert.json2xml(finalJsonObject, options);

    logger.info(`Writing to file: ${path}`);
    // Write the xml to the destination
    await fs.writeFile(path, xml);
    logger.info('File stored', {
        path: path,
    });
};

/**
 * Write a sitemap file with the given links
 * @param  {string}  links links to be written
 * @param  {string}  path  file path for this file
 */
const writeSitemapFile = async(links, path) => {
    const existingSitemapList = {
        urlset: {
            _attributes: {
                xmlns: XML_NAMESPACE,
            },
            url: [],
        },
    };

    links.forEach((ele) => {
        existingSitemapList.urlset.url.push({
            loc: {
                _text: ele,
            },
            changefreq: {
                _text: 'daily',
            },
            priority: {
                _text: 0.8,
            },
            lastmod: {
                _text: DATE,
            },
        });
    });

    // Convert our json object to xml
    await convertJsAndWriteFile(existingSitemapList, path);
};

const getAllLinks = async() => {
    // Get listing links
    logger.info('Fetching posts links...');
    const postLinks = await getPostLinks();
    logger.info('Got post links', {
        num: postLinks.length,
    });

    logger.info('Done collecting all links');

    // Combine all links and return
    return [
        ...postLinks,
    ];
};

/**
 * This is the main function of the script. It gets all the necessary links and writes them
 * to the given destination.
 *
 * Our sitemap is split into multiple sitemaps because of the number of links that are generated.
 * The main file sitemap.xml is the sitemap index file that contains links of other sitemaps.
 *
 * @return {Promise} completion of the function
 */
const main = async() => {
    logger.info('Starting...');

    const links = await getAllLinks();

    const totalLinkCount = links.length;

    // Split links into separate files of 100k links
    const listOfLinks = [];
    while (links.length !== 0) {
        listOfLinks.push(
            links.splice(0, NUM_LINKS),
        );
    }

    logger.info('Creating sitemap files', {
        totalLinkCount: totalLinkCount,
        sitemapFileCount: listOfLinks.length,
    });

    const sitemapIndexList = {
        sitemapindex: {
            _attributes: {
                xmlns: XML_NAMESPACE,
            },
            sitemap: [],
        },
    };

    await Promise.all(listOfLinks.map(async(l, index) => {
        const fileName = `sitemap-${index}.xml`;
        const filePath = `${destination}/${fileName}`;

        let urlPath;
        if (route) {
            urlPath = `${process.env.BASE_URL}/${route}/${fileName}`;
        } else {
            urlPath = `${process.env.BASE_URL}/${fileName}`;
        }

        sitemapIndexList.sitemapindex.sitemap.push({
            loc: {
                _text: urlPath,
            },
        });
        await writeSitemapFile(l, filePath);
    }));

    const sitemapFilePath = `${destination}/sitemap.xml`;
    await convertJsAndWriteFile(sitemapIndexList, sitemapFilePath);
};

// Run the main function
main()
    .then(() => {
        logger.debug('Done with the ');
        // Due to the script not exiting on Gitlab runner, we need to explicitly exit from here.
        process.exit(0);
    })
    .catch((err) => {
        logger.error('err', err);
        process.exit(1);
    });