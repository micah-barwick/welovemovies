const lodash = require("lodash");

function parseCritic(data) {
  if (data) {
    let critic;

    if (Array.isArray(data)) {
      critic = data.map((review) => {
        return Object.entries(review).reduce((accumulator, [key, value]) => {
          return lodash.set(accumulator, key, value);
        }, {});
      });
    } else {
      critic = Object.entries(data).reduce((accumulator, [key, value]) => {
        return lodash.set(accumulator, key, value);
      }, {});
    }

    return critic;
  }

  return data;
}

module.exports = parseCritic;