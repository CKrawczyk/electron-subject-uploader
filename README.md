# Electron app for panoptes subject uploading

## To build and run
```
npm run build
npm start
```

## To develop
```
npm run dev
```
You will have to reload the app after webpack is done compiling.

See https://github.com/electron/electron/blob/master/docs/tutorial/devtools-extension.md for activating the react-dev-tools.

This app makes use of the new css grid layout (e.g. http://gridbyexample.com/).

This will allow for react-hot-loading in development (NOTE: hot-loading will only track changes to `render` methods).  `eslint` with the airbnb config is included to keep the coding style consistent throughout the app.  If there is a rule you don't agree with just update the `.eslintrc` file.
