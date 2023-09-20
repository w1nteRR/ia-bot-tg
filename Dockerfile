FROM node:12-slim

WORKDIR /usr/src/index

COPY package*.json ./

#install dependencies

RUN yarn install

# Copy local code to the container image.
COPY . ./

# Build the application
RUN npm run

# Run the web service on container startup.
CMD [ "npm", "run", "start" ]