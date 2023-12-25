FROM node:19.7

# copy source
COPY . .

# install dependencies
RUN yarn

# build the project.
RUN yarn build

# run the app
CMD ["yarn", "dev"]