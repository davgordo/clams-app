FROM node:19.7

# copy source
COPY . .

# install dependencies
RUN yarn

# build project
RUN yarn build

# expose web server
EXPOSE 5173

# run app
CMD ["yarn", "dev"]