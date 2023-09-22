FROM node:18.18.0

WORKDIR /usr/dist

COPY package*.json ./

#install dependencies

RUN yarn install

# Copy local code to the container image.
COPY . ./

# Build the application
RUN npm build

# Run the web service on container startup.
CMD [ "npm", "run", "start" ]