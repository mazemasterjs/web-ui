# web-ui

MazeMasterJS Web UI

## Change Log

### v0.4.0

-   added .env.production - this file will be used during build (npm run build) automatically. It MUST ONLY values safe for publishing to the public repo - no passwords, API keys, etc!
-   updated tslint.config with more vue-friendly rules
-   added tslint as a dev dependency
-   updated dependencies
    -   updated module import for IMazeStub in MazeService.js to match shared-library changes
-   version updated to 0.4.0 (we all need to start versioning this!)

# Vue Notes

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
