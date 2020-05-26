const fb = require('fb-video-downloader');
const ytdl = require('ytdl-core');

exports.getYoutubeUrl = (url, res) => {
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(url)
      .pipe(res);
  return res;
};
exports.getFacebookUrl = async (url) => {
  const info = await fb.getInfo(url);
  if (info) {
    return info;
  } else {
    return false;
  }
};
