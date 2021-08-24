# NT Postman View

Allow multipliers to view contacts that require NTs.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
- [Running the tests](#running-the-tests)
- [Branching Model](#branching-model)
- [Deployment](#deployment)
- [Built With](#built-with)
- [Versioning](#versioning)
- [Issue Tracking](#issue-tracking)
- [Documentation](#documentation)
    - [Project Documentation](#project-documentation)
    - [Recommended Reading](#recommended-reading)
- [Authors](#authors)

## Overview

Allow multipliers to view contacts that require NTs, select individual contacts to print labels for, and update the postage status when the NT has been sent. 

## Getting Started

### Prerequisites

As this is a standard Reactjs application, please follow the [Getting Started](https://reactjs.org/) guide from the Reactjs website. Aside from that, we also use the Firebase client SDK for
authentication. If running locally, consider using the [Firebase emulator](https://firebase.google.com/docs/emulator-suite/connect_auth) to connect auth and give you a near prod-like
environment to develop against.

Finally, Firebase needs a number of configuration variables set in the environment. This typically can be checked into source control but I've opted not to do so because of my paranoia.
So to get Firebase going, you can create a local .env file in your application root directory with the contents of you Firebase application config: Firebase Web Console -> Project Settings -> General.

### Installing

To run locally, issue `npm run start`. This should launch the application in a new window provided the prerequisites above have been satisfied.

## Running the tests

To run the tests, issue `npm run test`.

## Branching Model
We use [GitHubFlow](https://guides.github.com/introduction/flow/) for this project.

## Deployment

The CI/CD pipeline takes care of deployment once you create a [semver](https://semver.org/) compliant tag.

## Built With

* [ReactJS](https://reactjs.org/) - The web framework used
* [Firebase](https://firebase.google.com/) - Authentication
* [React-Bootstrap](https://react-bootstrap.github.io/) - UI Components

## Versioning

We use [Semantic Versioning](http://semver.org/).

## Issue Tracking

Issues are tracked in this project's issue tracker.

## Documentation

### Project Documentation

* [Github Project](https://github.com/orgs/mujde-aze/projects)

### Recommended Reading

* [Firebase callable functions](https://firebase.google.com/docs/functions/callable)
* [Connecting to the auth emulator](https://firebase.google.com/docs/emulator-suite/connect_auth)
* [Enabling App Check enforcement](https://firebase.google.com/docs/app-check/cloud-functions)
* [ReactJS Hooks](https://reactjs.org/docs/hooks-intro.html)

## Authors

* **Crafton Williams** - *Initial work*
