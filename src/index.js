require('dotenv').config();

const pagedFetch = require('./pagedFetch');

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const WORKSPACE = process.env.WORKSPACE;

const BASE_URL = 'https://api.bitbucket.org/2.0/repositories';

const getPRs = async (options = {}) => {
  const username = options.username || USERNAME;
  const password = options.password || PASSWORD;
  const org = options.workspace || WORKSPACE;

  if (!username || !password)
    throw new Error('Username and password are required to access Bitbucket');

  const authorization = Buffer.from(`${username}:${password}`).toString('base64');

  const repoQuery = options.since && `updated_on > ${new Date(options.since).toISOString()}`;
  const repoSearchParams = repoQuery ? { q: repoQuery } : {};

  const repos = await pagedFetch(`${BASE_URL}/${org}`, authorization, {
    searchParams: repoSearchParams,
  });

  const prConjunction = options.since ? `AND` : '';
  const prQuery = options.state
    ? `${repoQuery} ${prConjunction} state = "${options.state}"`
    : repoQuery;
  const prsSearchParams = prQuery ? { q: prQuery.trim() } : {};

  const prs = (
    await Promise.all(
      repos.map((r) =>
        pagedFetch(r.links.pullrequests.href, authorization, {
          searchParams: prsSearchParams,
        }),
      ),
    )
  ).reduce((acc, val) => [...acc, ...val], []);

  const getDiffStats = async () =>
    (await Promise.all(prs.map((p) => pagedFetch(p.links.diffstat.href, authorization)))).reduce(
      (acc, val) => [...acc, ...val],
      [],
    );

  return {
    repos,
    prs,
    getDiffStats,
  };
};

module.exports = getPRs;
