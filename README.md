# jade-digital-boilerplate

A skeleton and collection of packages for building websites.

* [List of packages used](#list-of-packages-used)
* [Using in your project](#using-in-your-project)
* [List of available tasks](#list-of-available-tasks)
* [Need help?](#need-help)

## List of packages used
[autoprefixer](https://github.com/postcss/autoprefixer), [browser-sync](https://github.com/Browsersync/browser-sync), [standard](https://github.com/feross/standard), [imagemin-cli](https://github.com/imagemin/imagemin-cli), [node-sass](https://github.com/sass/node-sass), [onchange](https://github.com/Qard/onchange), [npm-run-all](https://github.com/mysticatea/npm-run-all), [postcss-cli](https://github.com/code42day/postcss-cli), [svgo](https://github.com/svg/svgo), [svg-sprite-generator](https://github.com/frexy/svg-sprite-generator), [uglify-js](https://github.com/mishoo/UglifyJS2).


## Setup
* First, ensure that node.js & npm are both installed. If not, choose your OS and installation method from [this page](https://nodejs.org/en/download/package-manager/) and follow the instructions.
* Next, use your command line to enter your project directory.
  * If this a new project, start by cloning this repository `git clone git@github.com:jadedigital/jade-digital-boilerplate.git && rm -rf .git`. Update your `package.json` details file to suit your project.
  * If this is an existing project, copy the contents of `"devDependencies"` and `"scripts"` into your `package.json`.
* Run `npm install` to install all of the dependencies into your project.
* Copy or set up your files in the src folder.

You're ready to go! Run any task by typing `npm run task` (where "task" is the name of the task in the `"scripts"` object). The most useful task for rapid development is `watch:all`. It will start a new server, open up a browser and watch for any SCSS or JS changes in the `src` directory; once it compiles those changes, the browser will automatically inject the changed file(s)!

* Run `npm run build:all && npm run watch:all` if it's your first run. Run `npm run watch:all` for subsequent runs.
* Run `npm run build:all` to package your files for production.

## List of available tasks
### `clean`
  `rm -f dist/{css/*,js/*,images/*}`

  Delete existing dist files

### `autoprefixer`
  `postcss -u autoprefixer -r dist/css/*`

  Add vendor prefixes to your CSS automatically

### `scss`
  `node-sass --output-style compressed -o dist/css src/scss`

  Compile Scss to CSS

### `lint`
  `standard src/js`

  "Lint" your JavaScript to enforce a uniform style and find errors using the standard style

### `uglify`
  `mkdir -p dist/js && uglifyjs src/js/*.js -m -o dist/js/app.js && uglifyjs src/js/*.js -m -c -o dist/js/app.min.js`

  Uglify (minify) a production ready bundle of JavaScript

### `imagemin`
  `imagemin src/images/* -o dist/images`

  Compress all types of images

### `icons`
  `svgo -f src/images/icons && mkdir -p dist/images && svg-sprite-generate -d src/images/icons -o dist/images/icons.svg`

  Compress separate SVG files and combine them into one SVG "sprite"

### `serve`
  `browser-sync start --server --files 'dist/css/*.css, dist/js/*.js, **/*.html, !node_modules/**/*.html'`

  Start a new server and watch for CSS & JS file changes in the `dist` folder

### `build:css`
  `npm run scss && npm run autoprefixer`

  Alias to run the `scss` and `autoprefixer` tasks. Compiles Scss to CSS & add vendor prefixes

### `build:js`
  `npm run lint && npm run concat && npm run uglify`

  Alias to run the `lint`, `concat` and `uglify` tasks. Lints JS, combines `src` JS files & uglifies the output

### `build:images`
  `npm run imagemin && npm run icons`

  Alias to run the `imagemin` and `icons` tasks. Compresses images, generates an SVG sprite from a folder of separate SVGs

### `build:all`
  `npm run build:css && npm run build:js && npm run build:images`

  Alias to run all of the `build` commands

### `watch:css`
  `onchange 'src/**/*.scss' -- npm run build:css`

  Watches for any .scss file in `src` to change, then runs the `build:css` task

### `watch:js`
  `onchange 'src/**/*.js' -- npm run build:js`

  Watches for any .js file in `src` to change, then runs the `build:js` task

### `watch:images`
  `onchange 'src/images/**/*' -- npm run build:images`

  Watches for any images in `src` to change, then runs the `build:images` task

### `watch:all`
  `npm-run-all -p serve watch:css watch:js`

  Run the following tasks simultaneously: `serve`, `watch:css` & `watch:js`. When a .scss or .js file changes in `src`, the task will compile the changes to `dist`, and the server will be notified of the change. Any browser connected to the server will then inject the new file from `dist`
