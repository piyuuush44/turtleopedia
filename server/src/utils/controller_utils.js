const querystring = require('querystring');

/**
 * Returns a paginated response for any GET /resources API
 * @param {Object} dbResponse - list of db records to be returned
 * back to the client
 * @param {string} totalCount - total count of db results
 * @param {Object} query - request.query
 * @param {string} baseUrl - baseUrl for the next query
 *
 * @return {Object} paginated response that contains the results,
 * metadata about the result and the
 * next link.
 */
exports.getPaginatedResponse = (dbResponse, totalCount, query, baseUrl) => {
  const limit = +query.limit || 10;
  const offset = +query.offset || 0;
  const response = {
    results: dbResponse,
    offset: offset,
    limit: limit,
    size: dbResponse.length,
    _links: {},
  };

  // If there are more records, include the next link
  if (totalCount > offset + dbResponse.length) {
    const newQuery = Object.assign({}, query);
    newQuery.offset = offset + dbResponse.length;
    response._links.next = baseUrl + querystring.stringify(newQuery);
  }
  return response;
};
