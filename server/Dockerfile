FROM node:12-alpine as builder

# /app 을 application root 로 사용합니다.
WORKDIR /app

# npm install 에 필요한 것들만 복사. packge.json, packeg-lock.json
ADD ./package.json ./yarn.lock ./

# 의존성 설치
RUN yarn install --production=false

# build 할 떄 필요한 것들도 복사
ADD ./tsconfig*.json ./

# source code 복사
ADD ./src ./src

# library code 복사
ADD ./libs ./libs

# source code build
RUN yarn build

# remove development dependencies
RUN npm prune --production

#
FROM node:12-alpine

#
ARG APP_ENV="dev"

# /app 을 application root 로 사용합니다.
WORKDIR /app

# npm install 에 필요한 것들만 복사. packge.json, packeg-lock.json
ADD ./package.json ./yarn.lock ./

# build stage 로 부터 build output 복사
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# port
EXPOSE 3000

# 실행
CMD APP_ENV=$APPE_NV yarn start:prod
