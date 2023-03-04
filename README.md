# rainmanland
A self-scheduling calendar and route-optimization web application for rainmanland.com

## Table of Contents
* [How everything ties together (an overview)](#how-everything-ties-together--an-overview-)
  * [The Front End (client)](#the-front-end--client-)
  * [The Web Server (nginx)](#the-web-server--nginx-)
  * [The Back End (server)](#the-back-end--server-)
  * [The MySQL Database](#the-mysql-database)
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
* [Interacting with the database using adminer](#interacting-with-the-database-using-adminer)
* [The nginx Web Server](#the-nginx-web-server)
* [The node.js Back End](#the-nodejs-back-end)
* [Testing the Application Locally](#testing-the-application-locally)
* [Troubleshooting Common Issues](#troubleshooting-common-issues)
  * [Unable to SSH into EC2 instance](#unable-to-ssh-into-the-ec2-instance)
  * [Unable to execute npm run build](#unable-to-execute-npm-run-build)

## How everything ties together (an overview)
This is a full-stack web application, meaning we have a front end (React.js), a back end (Node.js), a database (MySQL), and a web server (nginx) working in unison to deliver the site. Almost everything lives right here in the repo, which is visualized below:
```
rainmanland
│
├── docker-compose.yml
├── README.md
├── client
│   ├── Dockerfile
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── index.js
│       ├── calendar_behavior
│       └── components
├── nginx
│   ├── Dockerfile
│   └── default.conf
└── server
    ├── Dockerfile
    ├── index.js
    ├── node_modules
    ├── package-lock.json
    └── package.json
```

### The Front End (client)
The front end lives in the **client** directory shown above. It is programmed in React.js using the create-react-app bundler.
* The **Dockerfile** file tells Docker exactly how to build a Docker container for the front end to run inside of.
* The **node_modules** directory contains all the packages used by the front end code.
* The **package-lock.json** and **package.json** files define the way npm behaves when we use commands like `npm start` and `npm run build`.
* The **public** directory contains the files that are exposed to web traffic. The **index.html** file is the code that is actually sent to the user's browser.
* The **src** directory contains the scripts (mostly React.js) and CSS that are used to change and update the **index.html** file as the user progresses through the site.
  * **App.css** defines the style for all components rendered into **index.html**.
  * **App.js** is the "brains" of the front end, and mostly consists of React code that handles the way components appear and update on the site.
  * **index.js** is the file that passes React components from **App.js** to **index.html**
  * The **components** directory contains small sections of React code that render individual components, like a specific form, group of text and buttons, or even a whole page (if it's simple). **App.js** imports these components to keep the code clean and organized rather than defining all the components directly in the file. This makes it easier to change or swap out components without breaking the whole site.
  * The **calendar_behavior** directory contains frontend scripts to handle calendar behavior. It will probably get complicated, hence the separate subfolder.

### The Web Server (nginx)
The nginx web server is responsible for listening on ports 80 and 443, then serving content to users when they visit our site. It lives in the **nginx** directory shown above.
* The **Dockerfile** file tells Docker how to build a Docker container for the nginx web server to run inside of.
* The **default.conf** file tells nginx how to behave while running. The Dockerfile uses this file to build the container for nginx properly.

### The Back End (server)
The back end acts like a web API for the front end to access information from the database. It is written in Node.js. The back end lives in the **server** directory shown above.
* The **Dockerfile** file tells Docker how to build a Docker container for the back end to run inside of.
* **index.js** is the file containing the Node.js code that responds to requests from the front end and returns information from the database.
* The **node_modules** directory contains all the packages used by the back end code.
* The **package-lock.json** and **package.json** files define the way npm behaves when we use commands like `npm start` and `npm run build`.

### The MySQL Database
You may notice there is no directory for the MySQL database. This is because the database is initialized each time we use the **docker-compose.yml** file to start the application. Data is persisted/serialized in a Docker datavolume so we retain all the information contained in the database even after the container is stopped and started again.

This datavolume is the only part of the web application that doesn't live in the repo. It is stored in `/var/lib/mysql` on the local machine where the app is being run.

The application also provides a GUI for inspecting and working with the MySQL server. This GUI is called **adminer**, and it is also initialized freshly each time we use the **docker-compose.yml** file to start the application. It can be accessed through port 8000.

## Deploying changes to the live site
We will use pull deployments (very similar to cPanel) to safely update the live site. With a React app hosted using nginx, the process looks something like this:
1. A team member commits new changes on their local machine
2. They push or submit a pull request to the GitHub repo, depending on the branch you made changes to (*main* requires pull request).
3. Somebody will ssh into the EC2 instance and pull the changes from GitHub into the repo on the EC2 instance (`~/deploy/rainmanland`). *Note: you can deploy any branch as long as it has the Docker components set up correctly*
4. Inside the repo on the EC2 instance, use the command `sudo docker-compose up --build` to start the application
5. The changes should now be live.

**Note**: this doesn't need to be done very often. To check how changes will look, we can always use the exact same `sudo docker-compose up --build` command on our local machines to take a look in the browser.

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

## Interacting with the database using adminer
The adminer service that starts when we run the compose command listens on port 8000, but for the time being, we're leaving that port blocked. To access adminer, you need to set up port forwarding so `localhost:8000` connects you to the EC2 instance through an ssh tunnel. It's not as hard as it sounds.

1. install SecureCRT if you don't have it already. The install and license file can be found on the Rowan site.
2. start a session to ssh into the EC2 instance
3. right-click on the session and click "Properties"
4. select port-forwarding
5. enter "8000" for client and remote
6. save the settings and minimize the SecureCRT window (but don't close the connection)
7. in the browser, `localhost:8000` should now direct you to the adminer dashboard
8. enter the username and password; you don't have to specify a database
9. be careful!!

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

