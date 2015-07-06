# Pyramid Systems ADS RFQ: Pool Two Development

### Deliverables
1. [Pool Two Prototype Location](http://pyramidopenfdadev.herokuapp.com)
2. [Pool Two Repository on GitHub](https://github.com/PyramidSystemsInc/ADS-Dev)
3. Summary of Approach: README.md (this file)
4. Product Backlog: [Live on Trello](https://trello.com/b/S1uBdwEg/product-backlog), final snapshot in /process_docs/
5. RFQ Attachment E: /rfq/
6. Supporting Process Documentation: /process_docs/
7. Build Status: [![Build Status](https://travis-ci.org/PyramidSystemsInc/ADS-Dev.svg?branch=dev)](https://travis-ci.org/PyramidSystemsInc/ADS-Dev) 
8. JS Standard Style: [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard) 
9. Dependency Status: [![Dependency Status](https://www.versioneye.com/user/projects/558b7920306662001e000b09/badge.svg?style=flat)](https://www.versioneye.com/user/projects/558b7920306662001e000b09)
10. Code Climate: [![Code Climate](https://codeclimate.com/github/PyramidSystemsInc/ADS-Dev/badges/gpa.svg)](https://codeclimate.com/github/PyramidSystemsInc/ADS-Dev)
11. Dev Dependency Status: [![devDependency Status](https://david-dm.org/PyramidSystemsInc/ADS-Dev/dev-status.svg)](https://david-dm.org/PyramidSystemsInc/ADS-Dev#info=devDependencies)

[![Build Status](https://travis-ci.org/PyramidSystemsInc/ADS-Dev.svg?branch=dev)](https://travis-ci.org/PyramidSystemsInc/ADS-Dev) 
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard) 
[![Dependency Status](https://www.versioneye.com/user/projects/558b7920306662001e000b09/badge.svg?style=flat)](https://www.versioneye.com/user/projects/558b7920306662001e000b09)
[![Code Climate](https://codeclimate.com/github/PyramidSystemsInc/ADS-Dev/badges/gpa.svg)](https://codeclimate.com/github/PyramidSystemsInc/ADS-Dev)
[![devDependency Status](https://david-dm.org/PyramidSystemsInc/ADS-Dev/dev-status.svg)](https://david-dm.org/PyramidSystemsInc/ADS-Dev#info=devDependencies)

### Product Vision
For people who want to find over-the-counter medications free of certain ingredients for themselves or their family. SHIELD is a simple and responsive web app that allows people to quickly and easily see if a product has an ingredient they're allergic to, or find alternatives that are safe to use.

### Summary of Approach
When we began looking at the requirements, we saw that the most restrictive set of requirements were twofold: we needed to use the [openFDA API](https://open.fda.gov), and we needed to focus on open source technologies. Since the data from the API was in JSON, and would be easiest to handle on the backend with Javascript, we picked [Node.js](https://nodejs.org/) as a backend platform, and [AngularJS](http://angularjs.org/) as a frontend platform.

The dev team and the design team worked together throughout the project, particularly during the initial design phase. Both the development and the design teams looked at the FDA data, and we settled on the label database, because it was the most concrete and predictable. After an initial brainstorming session for possible users who would want to know drug labeling information, we decided to pick users with allergies (or other ingredients they would have to avoid) as a use case. We wrote out a set of possible user scenarios, then chose a leader (our Product Owner, as detailed in the labor categories in the RFQ attachments) who wrote out an initial product vision statement based on the most viable scenarios for rapid development. Using Trello, we set up a simple [Kanban board](https://trello.com/b/S1uBdwEg/product-backlog) to track deliverables, prioritize features and bugs, and clarify requirements.

From there, we started exploring the technology stacks to get data coming through the pipeline from the API calls on the backend to the browser on the frontend, while also getting continuous integration and deployment working. We built a [couple of prototypes](https://trello.com/c/991zniQw) displaying data from the FDA, and from those prototypes the design team saw that we were on a different page from them for the initial user experience. That led us to our primary construction path of [Searching for products by purpose without an ingredient](https://trello.com/c/TTeC1nPK), [seeing those products](https://trello.com/c/Nawf3CCY), and then choosing one and [seeing the labeling details for a chosen product](https://trello.com/c/jqaKRQKC). 

Once the initial product was stable and could be consistently deployed and run locally, the design team started usability tests, which led [to](https://trello.com/c/omaqHa8P) [more](https://trello.com/c/uOVLY6Py) [changes](https://trello.com/c/5KVPCaps). Primary development continued with the development of an [About page](https://trello.com/c/ZPrSEepo), and the existing product was cleaned up and styled according to the design team's recommendations. Since the users found the data coming in from the API tough to understand, we abandoned our [earlier decision](https://trello.com/c/RITVCjn8) to let the API's data stand as is, and applied some [filters](https://trello.com/c/RMqE1LoB) and [selective views](https://trello.com/c/ogUHfhpH) to the data. To support mobile devices, we also implemented continuous deployment (to Heroku) and monitoring.

This process of iteration was repeated with a second round of usability testing on mobile devices, which revealed another round of responsiveness issues and usability considerations. Theoretically, this process could be repeated further, but due to the impending RFQ deadline, we stopped primary development and cleaned up remaining issues. Some of the development team continued to support a separate Pool One design prototype to implement the features that were not possible within the allotted time frame; see our Pool One submission for details.

The product was designed and developed using free and open software, frameworks and tools. Prioritization and design materials were communicated via Trello, while brainstorming and wireframes used physical whiteboards. For a full list of technologies used to create the prototype and the open licenses they use, see the Technologies Used section of this readme file.

### Technologies Used

* Source Control
 * [git](http://www.git-scm.com/)
 * [GitHub](https://github.com/)
* Languages
 * [JavaScript](https://en.wikipedia.org/wiki/JavaScript) <sub>(HTML is an ISO open standard)</sub>
 * [HTML](https://en.wikipedia.org/wiki/HTML) <sub>(HTML is an ISO open standard)</sub>
 * [TypeScript](http://www.typescriptlang.org/) <sub>(Apache license)</sub>
* Deployment / Automation
 * [Gulp](http://gulpjs.com/) <sub>(MIT license)</sub>
 * [Yargs](https://www.npmjs.com/package/yargs) <sub>(MIT license)</sub>
 * [Uglify](http://lisperator.net/uglifyjs/) <sub>(BSD License)</sub>
 * [Browsersync](http://www.browsersync.io/) <sub>(Apache license)</sub>
 * [Code Climate](https://codeclimate.com/) <sub>(open source version)</sub>
 * [Docker](https://www.docker.com/) <sub>(Apache license)</sub>
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
 * [Travis CI](https://travis-ci.org/) <sub>(MIT license)</sub>
* Analysis
 * [Plato](https://github.com/es-analysis/plato) <sub>(MIT license)</sub>
 * [jscs](https://www.npmjs.com/package/jscs) <sub>(Artistic license)</sub>

### Configuration Management, Testing, and Deployment

All code is stored using git, and pushed to our [public GitHub repository](https://github.com/PyramidSystemsInc/ADS-Dev/). Both frontend and backend tests are automatically checked on each push to GitHub by [Travis CI](https://travis-ci.org/). If the tests pass, the code is deployed to [Heroku](http://pyramidopenfdadev.herokuapp.com) for public consumption.

None of the hardware used for hosting the system is our own, so we interpret Configuration Management as monitoring the changes made to the software. We can do so by watching the git repository for changes, and we ensure coding style guidelines are met using [jscs](https://www.npmjs.com/package/jscs) and [Code Climate](https://codeclimate.com/). 

For the current build, deployment and code status, see the "Deliverables" section of this readme file.

### Installation
To install and run this prototype locally via container, we use [Docker](https://www.docker.com/):

1. Install and run Docker, following the instructions on their [Getting Started page](http://docs.docker.com/windows/started/).
2. Open the boot2docker command window
3. Type docker pull psiit/psi1.0
4. Then type docker run -i -t -p 3000:3000 -d psiit/psi1.0
5. Optional type docker ps - to get the container id
6. Optional type docker logs --follow (+container id)
7. When complete type boot2docker ip to get the local ip address
8. Open web browser and use the ip (exp. 192.168.1.103:3000) with the port 3000 to open the app

To install and run this prototype locally, without using a container, we use [Bower](http://bower.io), a package manager for front-end components. After pulling this repository to your local environment:

![Bower](http://benschwarz.github.io/bower-badges/badge@2x.png)

`bower install`

### License
ADS-Dev is licensed under the MIT license. For details, see the LICENSE file in our GitHub repository.
