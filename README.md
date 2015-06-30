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
(We possibly don't need a seperate writeup, as the writeup is this document?) 

## Data

The data for this application comes from the [openFDA](https://open.fda.gov). <sub>((license)[https://open.fda.gov/license/])</sub>

## Technologies used:

* Languages
 * [JavaScript](https://en.wikipedia.org/wiki/JavaScript) <sub>(HTML is an ISO open standard)</sub>
 * [HTML](https://en.wikipedia.org/wiki/HTML) <sub>(HTML is an ISO open standard)</sub>
 * [TypeScript](http://www.typescriptlang.org/) <sub>(Apache license)</sub>
* Deployment / Automation
 * [Gulp](http://gulpjs.com/) <sub>(MIT license)</sub>
 * [Yargs](https://www.npmjs.com/package/yargs) <sub>(MIT license)</sub>
 * [Uglify](http://lisperator.net/uglifyjs/) <sub>(BSD License)</sub>
 * [Browsersync](http://www.browsersync.io/) <sub>(Apache license)</sub>
* Frontend
 * [Bower](http://bower.io/) <sub>(MIT license)</sub>
 * [Bootstrap](http://getbootstrap.com) <sub>(MIT license)</sub>
 * [AngularJS](http://angularjs.org/) <sub>(MIT license)</sub>
* Backend
 * [Node.js](https://nodejs.org/) <sub>(MIT license)</sub>
 * [Express](http://expressjs.com/) <sub>(MIT license)</sub>
* Testing
 * [Mocha](http://mochajs.org/) <sub>(MIT license)</sub>
 * [Karma](http://karma-runner.github.io/) <sub>(MIT license)</sub>
 * [Hippie](https://github.com/vesln/hippie) <sub>(MIT license)</sub>
 * [Bard](https://github.com/wardbell/bardjs) <sub>(MIT license)</sub>
 * [PhantomJS](http://phantomjs.org/) <sub>(BSD License)</sub>
* Analysis
 * [Plato](https://github.com/es-analysis/plato) <sub>(MIT license)</sub>
 * [jscs](https://www.npmjs.com/package/jscs) <sub>(Artistic license)</sub>
 
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
