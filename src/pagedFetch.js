const got = require('got');
const catchify = require('catchify');

const getPage = async (url, authorization, options = {}) => {
  const [err, data] = await catchify(
    got(url, {
      ...options,
      headers: { authorization: `Basic ${authorization}` },
    }).json(),
  );

  if (err) {
    console.error(err);
    return [];
  }

  if (data.next) {
    return [...data.values, ...(await getPage(data.next, authorization))];
  }

  return data.values;
};

module.exports = getPage;
