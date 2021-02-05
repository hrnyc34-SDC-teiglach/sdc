FROM node:12.19.0

# Create app directory
WORKDIR /usr/src/app

# ARG ARG_DB_HOST=mysql \
#     ARG_DB_USER=root \
#     ARG_DB_PW=YOUR_PASSWORD \
#     ARG_DB_USE=FEC \
#     ARG_DB_PORT=8080

# ENV DB_HOST=${ARG_DB_HOST} \
#     DB_USER=${ARG_DB_USER} \
#     DB_PW=${ARG_DB_PW} \
#     DB_USE=${ARG_DB_USE} \
#     DB_PORT=${ARG_DB_PORT}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]