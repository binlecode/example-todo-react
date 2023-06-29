

ref: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning

## Run in local development mode

`yarn start` runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Auto-reload is enabled in dev mode by react-scripts.
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## build and deploy

`yarn build` builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## bootstrap

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Node version 12+.

```shell
npm install react-scripts --save-dev
```

check and clean npm cache
```sh
# check current cache size, this may take a while
npm cache verify
npm cache clean --force
```