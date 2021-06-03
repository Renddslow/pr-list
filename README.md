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

**A note:** This package was built with reporting in mind, and is not intended to be used in user-facing applications. The Bitbucket API is quite good with a very helpful interface, so I would recommend using that instead of this if you want to fetch information on the fly in you application.

## API

### prList(options)

Returns a `Promise` for an object with all the matching repos, PRs, and a method for getting the diff-stats for each PR.

- `repos`: An array of [Bitbucket repository objects](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D#reponses)
- `prs`: An array of [Bitbucket PR objects](https://developer.atlassian.com/bitbucket/api/2/reference/resource/repositories/%7Bworkspace%7D/%7Brepo_slug%7D/pullrequests)
- `getDiffStats`: A method that returns a `Promise` for an array of Bitbucket diff-stat objects. Takes an optional filter callback as a first argument, and an optional query string addendum as a second.
- `getApprovers`: A method that returns a `Promise` for an array of Bitbucket pullrequest participants. Takes an optional filter callback as an argument.

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
