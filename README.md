[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![CircleCI](https://circleci.com/gh/kanoe-ui/kanoe-css.svg?style=svg)](https://circleci.com/gh/kanoe-ui/kanoe-css)

# kanoe-css

https://gist.github.com/primaryobjects/64a4e7e3351c646f51eee07949215ad4

## Description

Just another CSS framework

## Development

Watch all stylus and pug files, lint, build and run a development server:

```sh
$ yarn dev
```

### CSS / Styles

Styles are builded with [stylus](http://stylus-lang.com/).

```sh
$ yarn stylus:build
$ yarn stylus:watch
```

Stylus code style rules are enforced by linting, following the rules defined on [stylintrc](.stylintrc)

```sh
$ stylus:lint
$ stylus:lint:watch
```

### HTML / Docs

The documentation and examples are writtten using [pug](https://pugjs.org/)

```sh
$ yarn pug:build
$ yarn pug:watch
```

PUG code style rules are enforced by linting, following the rules defined on [puglintrc](.puglintrc)

```sh
$ pug:lint
$ pug:lint:watch
```

### Git

Commits messages follow the [conventional commit format](https://conventionalcommits.org) and are checked with [commitlint](https://commitlint.js.org/).

