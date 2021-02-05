# @benjaminnoufel/node-oauth2-client

Use a node oauth2 client on javascript or typescript.
Four methods are available GET / POST / PATCH / DELETE.

![Code Style CI](https://github.com/benjaminnoufel/node-oauth2-client/workflows/Code%20Style%20CI/badge.svg)
![Test CI](https://github.com/benjaminnoufel/node-oauth2-client/workflows/Test%20CI/badge.svg)
![Package](https://github.com/benjaminnoufel/node-oauth2-client/workflows/Package/badge.svg)
![Package npmjs](https://github.com/benjaminnoufel/node-oauth2-client/workflows/Package%20npmjs/badge.svg)

## Summary

- [Requirements](#requirements)
- [Installation](#installation)
    - [NPM](#npm)
    - [Yarn](#yarn)
- [Usage](#usage)
    - [Authentificate](#authentificate)
    - [Set another auth header](#set-another-auth-header)
    - [Set another header](#set-another-header)
    - [Set another data in request](#set-another-data-in-request)
    - [Get method](#get-method)
    - [Post method](#post-method)
    - [Patch method](#patch-method)
    - [Delete method](#delete-method)
- [Changelog](#changelog)
- [Contributing](#contributing)
- [License](#license)

## Requirements

- [NPM][npm] or [Yarn][yarn]

## Installation

### NPM

```console
$ npm install --save @benjaminnoufel/node-oauth2-client
```

### Yarn

```console
$ yarn add @benjaminnoufel/node-oauth2-client
```

## Usage

### Authentificate

```ts
    // ecmascript module
    import {OAuthApi} from "@benjaminnoufel/node-oauth2-client"
    // commonjs
    const {OAuthApi} = require("@benjaminnoufel/node-oauth2-client");

    await OAuthApi
        .setClientId("xxxxxx")
        .setClientSecret("xxxxxxxxx")
        .setBaseUrl("https://xxxxxxxxxx")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .auth();
```
or

```ts
    // ecmascript module
    import {OAuthApi} from "@benjaminnoufel/node-oauth2-client"
    // commonjs
    const {OAuthApi} = require("@benjaminnoufel/node-oauth2-client");

    await OAuthApi
        .setClientId("xxxxxx")
        .setClientSecret("xxxxxxxxx")
        .setCode("xxxxxxx")
        .setRedirectUri("http://xxxxxxxxx")
        .setBaseUrl("https://xxxxxxxxx")
        .setTokenUrl("/oauth/token")
        .setGrantType("authorization_code")
        .auth();
```

### Set another auth header

```ts
    // ecmascript module
    import {OAuthApi} from "@benjaminnoufel/node-oauth2-client"
    // commonjs
    const {OAuthApi} = require("@benjaminnoufel/node-oauth2-client");

    await OAuthApi
        .setClientId("xxxxxx")
        .setClientSecret("xxxxxxxxx")
        .setBaseUrl("https://xxxxxxxxxx")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .setAuthHeader("Content-Type", "Application/json")
        .setAuthHeader("Accept", "Application/json")
        .auth();
```

### Set another header

```ts
    // ecmascript module
    import {OAuthApi} from "@benjaminnoufel/node-oauth2-client"
    // commonjs
    const {OAuthApi} = require("@benjaminnoufel/node-oauth2-client");

    await OAuthApi
        .setClientId("xxxxxx")
        .setClientSecret("xxxxxxxxx")
        .setBaseUrl("https://xxxxxxxxxx")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .setHeader("Content-Type", "Application/json")
        .setHeader("Accept", "Application/json")
        .auth();
```

### Set another data in request

```ts
    // ecmascript module
    import {OAuthApi} from "@benjaminnoufel/node-oauth2-client"
    // commonjs
    const {OAuthApi} = require("@benjaminnoufel/node-oauth2-client");

    await OAuthApi
        .setClientId("xxxxxx")
        .setClientSecret("xxxxxxxxx")
        .setBaseUrl("https://xxxxxxxxxx")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .setHeader("Content-Type", "Application/json")
        .setHeader("Accept", "Application/json")
        .setData("prompt", "select_account")
        .auth();
```

### Get method

Return an axios Response

```ts
    // ecmascript module
    import {OAuthApi} from "@benjaminnoufel/node-oauth2-client"
    // commonjs
    const {OAuthApi} = require("@benjaminnoufel/node-oauth2-client");

    await OAuthApi
        .setClientId("xxxxxx")
        .setClientSecret("xxxxxxxxx")
        .setBaseUrl("https://xxxxxxxxxx")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .auth();
    
    const user = OAuthApi.get("/users/1")
    // with types
    const user<{login: string}> = OAuthApi.get("/users/1");
    console.log(user.data.login); // johndoe
```

### Post method

Return an axios Response

```ts
    // ecmascript module
    import {OAuthApi} from "@benjaminnoufel/node-oauth2-client"
    // commonjs
    const {OAuthApi} = require("@benjaminnoufel/node-oauth2-client");
    
    await OAuthApi
        .setClientId("xxxxxx")
        .setClientSecret("xxxxxxxxx")
        .setBaseUrl("https://xxxxxxxxxx")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .auth();
    const user = OAuthApi.post("/users/1", {})
    // with types
    const user<{login: string}> = OAuthApi.post("/users/1", {});
    console.log(user.data.login); // johndoe
```

### Patch method

Return an axios Response

```ts
    // ecmascript module
    import {OAuthApi} from "@benjaminnoufel/node-oauth2-client"
    // commonjs
    const {OAuthApi} = require("@benjaminnoufel/node-oauth2-client");

    await OAuthApi
        .setClientId("xxxxxx")
        .setClientSecret("xxxxxxxxx")
        .setBaseUrl("https://xxxxxxxxxx")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .auth();
    const user = OAuthApi.patch("/users/1", {})
    // with types
    const user<{login: string}> = OAuthApi.patch("/users/1", {});
    console.log(user.data.login); // johndoe
```

### Delete method

Return an axios Response

```ts
    // ecmascript module
    import {OAuthApi} from "@benjaminnoufel/node-oauth2-client"
    // commonjs
    const {OAuthApi} = require("@benjaminnoufel/node-oauth2-client");
    
    await OAuthApi
        .setClientId("xxxxxx")
        .setClientSecret("xxxxxxxxx")
        .setBaseUrl("https://xxxxxxxxxx")
        .setTokenUrl("/oauth/token")
        .setGrantType("client_credentials")
        .auth();
    const user = OAuthApi.delete("/users/1")
    // with types
    const user<{login: string}> = OAuthApi.delete("/users/1");
    console.log(user.data.login); // johndoe
```

## Changelog

see [`CHANGELOG.md`](./CHANGELOG.md)

## Contributing

see [`CONTRIBUTING.md`](./CONTRIBUTING.md)

## License

see [`LICENSE`](./LICENSE)

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/
