FROM mhart/alpine-node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install  --ignore-scripts
#RUN npm install

COPY src/ /usr/src/app/src

RUN npm run-script build

EXPOSE 8090

CMD ["npm", "start"]
