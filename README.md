# RML Smart Calendar

## Quick-Start Guide (I will write better docs as soon as I can)

#### Overview
This repo has two main branches, and they contain all the same files. There are now two different docker-compose files, and they each launch a different type of environment. To make things simple, there is a bash script called `start-app` in the root directory. It chooses the right files, sets environment variables, and launches the necessary docker containers in one command.

To run the script on a new machine (yours), you'll need to get a secret file called `.start-app-env`, then put it in the root directory of the repo. It is in the .gitignore file so it doesn't get uploaded to the public repo and our passwords and sensitive info are hidden. I put it in the Discord. When you pull changes to your local repo, it will stay right where it is.

Once you have the secret file, you can run this script by going to the root directory and running `./start-app` with the right flags set. The -p flag sets up a production environment by compiling the frontend into a static Build folder which gets copied to an nginx container, running the api in a separate container that uses the PM2 process manager to handle load-balancing and minimize downtime, and connects the api to the real database running on the EC2 instance. It is not meant for testing changes - only commits that we have already tested can be merged into prod. The script will only work with the -p flag if its run on the EC2 instance and the current branch is "prod".

The -d flag sets up a development environment, which will work on your local computer. (You might need to install WSL if you don't use Linux). The dev environment sets you up with a lil test database that runs locally on your machine in a Docker container. It also runs nginx, the frontend, and the api in their own containers running on development servers, which allows you to hot-update so you can see your changes in the browser instantly whenever you save changes to a frontend file.

The -s flag runs docker commands with sudo, which is necessary on the EC2 instance (and possibly your local machine... check).

**So to ship the app on the EC2 server, checkout the prod branch, pull the latest changes, then run `./start-app -ps`.**

#### Things to be careful about
1. There are now two versions of all the Dockerfiles and docker-compose files. Also the default.conf files for the nginx server. Please be really careful before making changes to these. They work right now, but it took me literal days to get everything working and if it breaks I probably already forgot how it works.
2. The .gitignore file is using a "whitelist" approach, so rather than naming files to ignore, it names the files that are covered under the version control. If you add a new file, make sure you add it to the .gitignore whitelist first. To add a whole directory and its contents, use `!path/to/dir/**`.

