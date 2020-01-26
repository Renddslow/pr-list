# pr-list

> An interface for querying a list of PR&#39;s from Bitbucket.

## Install

```
$ yarn add pr-list
```

## Usage

```js
const getPRList = require('pr-list');

(async () => {
  const { repos, prs } = await getPRList({
    workspace: 'renddslow',
  });
})();
```

## API

### prList(options)

Returns a `Promise` for an object with all the matching repos, PRs, and a method for getting the diff-stats for each PR.

- `repos`: An array of [Bitbucket repository objects](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D#reponses)
- `prs`: An array of [Bitbucket PR objects](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D/pullrequests)
- `getDiffStats`: A method that returns a `Promise` for an array of Bitbucket diff-stat objects.

#### options

For convenience, username, password, and workspace can all be injected as environmental variables as `USERNAME`, `PASSWORD`, and `WORKSPACE` respectively.

##### `username`

Type: `string`

Your Bitbucket username.

##### `password`

Type: `string`

Your Bitbucket app password.

##### `since`

Type: `ISO-8601 Datetime String`

When present, the repos and pullrequests queried will all occur on or after the `since` time.

##### `state`

Type: `"MERGED" | "SUPERSEDED" | "OPEN" | "DECLINED"`

When present, the pullrequests returned will be limited to the provided `state`.
