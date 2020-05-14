const ClientError = require('../../../errors').client;
const utils = require('../utils/utils');
exports.getHome = async (req, res, next) => {
  const data = {
    title: 'Video Downloader',
    url: 'http://neon',
  };
  return res.render('neon/index', data);
};

exports.getVideoDownload = async (req, res, next) => {
  try {
    const url = req.query.url;
    if (url.includes('youtube') || url.includes('youtu')) {
      return utils.getYoutubeUrl(url, res);
    } else if (url.includes('facebook')) {
      const response = await utils.getFacebookUrl(url);
      if (response) {
        return res.json({
          result: response,
        });
      }
    }
    return next(new ClientError({message: 'Request video is either removed or not available publically!'}));
  } catch (e) {
    return next(new ClientError({message: e}));
  }
};
