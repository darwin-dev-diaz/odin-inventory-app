const ytToEmbed = (url) => {
  return `https://www.youtube.com/embed/${url.match(/(?<=watch\?v=).*/)}`;
};

module.exports = ytToEmbed;
