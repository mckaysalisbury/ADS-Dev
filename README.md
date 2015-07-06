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

When we began looking at the requirements, we saw that the most restrictive set of requirements were twofold:

1. That we needed to use the [openFDA API](https://open.fda.gov)s
2. That we needed to focus on open source technologies

We picked [Node.js](https://nodejs.org/) as a backend platform, and [AngularJS](http://angularjs.org/) as a frontend platform, in part because the data coming back from the FDA was in json, and would be easiest to handle in the backend with javascript.

The dev team and the design team worked together throughout the project, and this was particularly evident during the initial design phase. Both the development and the design teams looked at the FDA data, and we settled on the label database, because it was the most concrete. The other databases seemed too unreliable for proper analysis, and the label database was concrete and predictable (though a bit dirty). So we brainstormed ideas about what to build, and we decided to pick users with allergies (or other ingredients they would have to avoid) as a use case.

From there we started exploring the technology stacks to get data coming through the pipeline from the API calls on the backend to the browser on the frontend, while also getting continuous integration and deployment working. We built a [couple of prototypes](https://trello.com/c/991zniQw) displaying data from the FDA, and from those prototypes the design team saw that we were on a different page from them.  

That led us to our primary construction path of [Searching for products by purpose without an ingredient](https://trello.com/c/TTeC1nPK), [seeing those products](https://trello.com/c/Nawf3CCY), and then choosing one and [seeing the labeling details for a chosen product](https://trello.com/c/jqaKRQKC).

Then the design team started usability tests, which	led [to](https://trello.com/c/omaqHa8P) [more](https://trello.com/c/uOVLY6Py) [changes](https://trello.com/c/5KVPCaps).

Theoretically, this process could be repeated, but there was a deadline, so we stopped primary development, and cleaned up remaining issues.

## Technologies used:

* Languages
 * [JavaScript](https://en.wikipedia.org/wiki/JavaScript) <sub>(ECMAScript is an open standard)</sub>
 * [HTML](https://en.wikipedia.org/wiki/HTML) <sub>(HTML is an open standard)</sub>
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

None of the hardware used for hosting the system is our own, so we interpret Configuration Management as monitoring the changes made to the software. We can do so by managing watching the git repository for changes, and we ensure coding style guidelines are met using [jscs](https://www.npmjs.com/package/jscs) and [Code Climate](https://codeclimate.com/)

[![Code Climate](https://codeclimate.com/github/PyramidSystemsInc/ADS-Dev/badges/gpa.svg)](https://codeclimate.com/github/PyramidSystemsInc/ADS-Dev)

# Installation

## Bower
You can easily install  by using Bower, a package manager for front-end components. (See bower.io for more details)

![Bower](http://benschwarz.github.io/bower-badges/badge@2x.png)

`bower install `

# License
ADS-Dev is licensed under the MIT license.
