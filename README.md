This is a simple react app example with todo CRUDs.

## Run in local development mode

Node version 12+.

`yarn start` runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Auto-reload is enabled in dev mode by react-scripts.
You will also see any lint errors in the console.

`yarn test` launches the test runner in the interactive watch mode.
See https://facebook.github.io/create-react-app/docs/running-tests.

## build and deploy

`yarn build` builds the app for production to the `build` folder.
It bundles React in production mode and optimizes assets for best performance.
The build is minified and the filenames include the hashes.

See the section
about [deployment](https://facebook.github.io/create-react-app/docs/deployment)
for more information.

## project setup

This project was bootstrapped with https://github.com/facebook/create-react-app.
Basic design is based on:
https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning,
with components updated for better modularity.

To check and clean npm cache

```sh
# check current cache size, this may take a while
npm cache verify
npm cache clean --force
```

## tailwindcss

Update webpage with tailwind css utility.

```shell
yarn add tailwindcss --dev
# create tailwind config file
yarn tailwind init
```

Also add concurrently to support concurrent css and source code watch
at the same time in development mode.

See: `scripts` section in [`package.json`](./package.json) file.