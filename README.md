# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:TarasiukDima/nodejs2022Q2-service.git
cd nodejs2022Q2-service
git pull --all
```
- branch rest
```
git checkout develop
```
- branch docker
```
git checkout docker
```

## Installing NPM modules

```
npm install
 or if you have install errors
npm install --legacy-peer-deps
```

## Rename

```
Rename file from .env.default to .env
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.


## Running application with docker

- Build and start app
```
docker-compose up --build
```

- Start app containers
```
docker-compose start
```

- Stop and remove app containers
```
docker-compose down
```

- Scan app
```
docker scan nodejs2022q2-service_musicify-app
docker scan nodejs2022q2-service_musicify-postgres
```


## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging


### Documentation api

http://localhost:4000/doc/
