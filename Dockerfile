FROM node:18-alpine AS builder

WORKDIR /app

COPY baloot-web/package.json .
COPY baloot-web/package-lock.json .
COPY baloot-web/public public/
COPY baloot-web/src src/

RUN npm install  --production
RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]