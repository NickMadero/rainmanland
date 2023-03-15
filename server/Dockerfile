FROM keymetrics/pm2:8-slim

# Bundle APP files
WORKDIR /app
COPY index.js .
COPY package.json .
COPY package-lock.json .
COPY pm2.json .
COPY build/ .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]

