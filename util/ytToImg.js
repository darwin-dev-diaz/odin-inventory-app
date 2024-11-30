const ytToImg = (url) => {
  return `http://i3.ytimg.com/vi/${url.match(
    /(?<=watch\?v=).*/
  )}/hqdefault.jpg`;
};

module.exports = ytToImg;
