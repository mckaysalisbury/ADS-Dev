[![Build Status](https://travis-ci.org/PyramidSystemsInc/ADS-Dev.svg?branch=dev)](https://travis-ci.org/PyramidSystemsInc/ADS-Dev) 
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard) 
[![Dependency Status](https://www.versioneye.com/user/projects/558b7920306662001e000b09/badge.svg?style=flat)](https://www.versioneye.com/user/projects/558b7920306662001e000b09)
[![Code Climate](https://codeclimate.com/github/PyramidSystemsInc/ADS-Dev/badges/gpa.svg)](https://codeclimate.com/github/PyramidSystemsInc/ADS-Dev)
[![devDependency Status](https://david-dm.org/PyramidSystemsInc/ADS-Dev/dev-status.svg)](https://david-dm.org/PyramidSystemsInc/ADS-Dev#info=devDependencies)

# Prototype
You can view the prototype at http://pyramidopenfdadev.herokuapp.com

# ADS-Dev
Pyramid Systems' GSA Agile Delivery Services BPA Development Technical submission

# Development Approach

## Writeup (750 words)

## Technologies used:

* Languages
 * [JavaScript](https://en.wikipedia.org/wiki/JavaScript)
 * [HTML](https://en.wikipedia.org/wiki/HTML)
 * [TypeScript](http://www.typescriptlang.org/)
* Deployment / Automation
 * [Gulp](http://gulpjs.com/)
 * [Yargs](https://www.npmjs.com/package/yargs)
 * [Uglify](http://lisperator.net/uglifyjs/)
 * [BrowserSync](http://www.browsersync.io/)
* Frontend
 * [Bower](http://bower.io/)
 * [Bootstrap](http://getbootstrap.com)
 * [AngularJS](http://angularjs.org/)
* Backend
 * [Node.js](https://nodejs.org/)
 * [Express](http://expressjs.com/)
* Testing
 * [Mocha](http://mochajs.org/)
 * [Karma](http://karma-runner.github.io/)
 * [Hippie](https://github.com/vesln/hippie)
 * [Bard](https://github.com/wardbell/bardjs)
 * [PhantomJS](http://phantomjs.org/)
* Analysis
 * [Plato](https://github.com/es-analysis/plato)
 * [jscs](https://www.npmjs.com/package/jscs) - <sub>(Artistic License 2.0)</sub>
 
## Source Control

Code is stored using [git](http://www.git-scm.com/), and the repository is also remotely hosted at [GitHub](https://github.com/PyramidSystemsInc/ADS-Dev)
 
## Testing

Both frontend and backend tests are written, and are automatically checked each push to Github by [Travis CI](https://travis-ci.org/)

[![Build Status](https://travis-ci.org/PyramidSystemsInc/ADS-Dev.svg?branch=dev)](https://travis-ci.org/PyramidSystemsInc/ADS-Dev)

## Deployment

If tests pass, the code is deployed to [Heroku](http://pyramidopenfdadev.herokuapp.com)


## Configuration Management

None of the hardware used for hosting the system is our own, so we interpret Configuration Management as monitoring the changes made to the software. We can do so by managing watching the git repository for changes, and we ensure coding style guidelines are met using [jscs](https://www.npmjs.com/package/jscs)   

# Installation

## Bower
You can easily install  by using Bower, a package manager for front-end components. (See bower.io for more details)

![Bower](http://benschwarz.github.io/bower-badges/badge@2x.png)

`bower install `

# License
ADS-Dev is licensed under the MIT license.
