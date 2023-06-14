FROM node:18-alpine AS development

WORKDIR /app

COPY baloot-web/package.json .
COPY baloot-web/package-lock.json .
COPY baloot-web/public public/
COPY baloot-web/src src/

RUN npm install
#RUN npm run build
#RUN npm install -g serve


EXPOSE 3000

#CMD [ "serve", "-s", "build" ]
CMD [ "npm", "start" ]