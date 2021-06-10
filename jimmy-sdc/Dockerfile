FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

# EXPOSE 3001
# still not sure what this does, it didn't seem to have any impact with or without so far

CMD [ "npm", "start"]