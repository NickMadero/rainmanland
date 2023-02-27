# rainmanland
A self-scheduling calendar and route-optimization web application for rainmanland.com

## Table of Contents

* [Deploying changes to the live site](#deploying-changes-to-the-live-site)
* [Getting Started with Create React App](#getting-started-with-create-react-app)
  * [Available Scripts](#available-scripts)
  * [Learn More](#learn-more)
  * [Code Splitting](#code-splitting)
  * [Analyzing the Bundle Size](#analyzing-the-bundle-size)
  * [Making a Progressive Web App](#making-a-progressive-web-app)
  * [Advanced Configuration](#advanced-configuration)
  * [Deployment](#deployment)
  * [npm run build fails to minify](#npm-run-build-fails-to-minify)
* [The MySQL Database](#the-mysql-database)
  * [Interacting with the Database](#interacting-with-the-database)
* [The nginx Web Server](#the-nginx-web-server)
* [The node.js Back End](#the-nodejs-back-end)
* [Testing the Application Locally](#testing-the-application-locally)
* [Troubleshooting Common Issues](#troubleshooting-common-issues)
  * [Unable to SSH into EC2 instance](#unable-to-ssh-into-the-ec2-instance)
  * [Unable to execute npm run build](#unable-to-execute-npm-run-build)

## Deploying changes to the live site
We will use pull deployments (very similar to cPanel) to safely update the live site. With a React app hosted using nginx, the process looks something like this:
1. A team member commits new changes on their local machine
2. They push or submit a pull request to the GitHub repo, depending on the branch you made changes to (*main* requires pull request).
3. Somebody will ssh into the EC2 instance and pull the changes from GitHub into the repo on the EC2 instance (`~/team-wallaby/rainmanland`)
4. Inside the repo on the EC2 instance, use the command `npm run build` to compile the app into a build folder
5. Copy the contents from `build` into `/var/www/rainmanland/html`
6. Test all the nginx config files with `nginx -t`
7. Restart the nginx server with `sudo systemctl restart nginx`
8. The changes should now be live.

**Note**: this doesn't need to be done very often. To check how changes look, we will usually just run `npm start` on our local machines to take a look in the browser.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## The MySQL Database
TODO: provide an overview of how the MySQL database works with our environment/app.

### Interacting with the database
TODO: provide detailed instructions for accessing the database and interacting with it without messing anything up.

## The nginx Web Server
TODO: provide an overview of what the nginx web server does and how it works

## The node.js Back End
TODO: provide an overview of node.js and how we use it within the app

## Testing the Application Locally
TODO: provide detailed instructions for setting up a local environment to test changes to the app in your browser on localhost

## Troubleshooting Common Issues

### Unable to SSH into the EC2 instance
If you're unable to access the instance via SSH, it could mean that the instance is under a heavy load and can't respond quickly enough.

Try visiting http://100.25.143.132/ in your browser. If the page takes long to load, this is most likely the problem.

The instance is getting bogged down whenever we run the `npm install` command, which is important, so we have reached out to Kim Poolos to ask about a more powerful instance.

### Unable to execute npm run build
This is often caused by misconfigured files. In theory, this shouldn't happen, but in practice, multiple updates being pushed to git can sometimes mean the config files don't get updated properly along with the source code.

Luckily, it's a fairly easy fix.
1. Delete the `package-lock.json` file
2. Execute `npm install` to get a fresh install on the machine
3. Try `npm run build` again, which should get you a properly-configured `package-lock.json` file