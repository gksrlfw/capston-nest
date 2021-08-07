# 운영환경
FROM node:14.15.3 as builder
WORKDIR /app/client
COPY ./package.json ./yarn.lock ./
RUN yarn install
COPY . .
CMD ["yarn", "build"]

FROM nginx
EXPOSE 8080
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/client/build /usr/share/nginx/html
