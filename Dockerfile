# FROM node:alpine as BUILD_IMAGE
# WORKDIR /app
# COPY package.json yarn.lock ./
# # install dependencies
# RUN yarn install --frozen-lockfile
# COPY . .
# build
# RUN yarn build
# remove dev dependencies
# RUN npm prune --production

FROM node:alpine

WORKDIR /app
COPY package.json ./package.json
COPY yarn.lock ./yarn.lock

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3000
CMD ["yarn", "run", "dev"]