FROM node:19.7

WORKDIR /opt/app-root/src/

# copy source
COPY . .

# install dependencies
RUN yarn

# build project
RUN yarn build

# allow random uid
RUN chmod -R g+rx .

# expose web server
EXPOSE 5173

# become non-root user
USER 1001

# run app
CMD ["yarn", "dev"]