const capitalize = (str) => {
  str = str.split(" ");
  const output = [];
  str.forEach((word) => {
    output.push(word[0].toUpperCase() + word.slice(1));
  });
  return output.join(" ");
};

module.exports = capitalize;
