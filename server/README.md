## Description

NestJS 의 graphql code first 를 적용한 starter project 입니다.

## Configuration

### Env

로컬에서 개발할 때만 `.env*` 파일을 사용합니다.

운영에서는 환경변수로 값을 주입합니다.

| Name                           | Required | Default value | Description                                   |
| ------------------------------ | -------- | :-----------: | --------------------------------------------- |
| APP_ENV                        | TRUE     |       -       | 환경. local, dev. prod                        |
| APP_NAME                       | FALSE    |       -       | Application 이름                              |
| APP_PORT                       | FALSE    |     3000      | Server port                                   |
| DATABASE_HOST_MASTER           | FALSE    |   localhost   | Database host                                 |
| DATABASE_PORT_MASTER           | FALSE    |     3306      | 3306                                          |
| DATABASE_USER_MASTER           | FALSE    |     root      | Database user 계정                            |
| DATABASE_USER_PASSWORD_MASTER  | FALSE    |       -       | Database user 비밀번호                        |
| DATABASE_HOST_SLAVE            | FALSE    |   localhost   | Database host                                 |
| DATABASE_PORT_SLAVE            | FALSE    |     3306      | 3306                                          |
| DATABASE_USER_SLAVE            | FALSE    |     root      | Database user 계정                            |
| DATABASE_USER_PASSWORD_SLAVE   | FALSE    |       -       | Database user 비밀번호                        |
| DATABASE_NAME                  | FALSE    |    sample     | Database schema 이름                          |
| SHOULD_SYNCHRONIZE_DATABASE    | FALSE    |     false     | Typeorm 을 database 와 동기화                 |
| SHOULD_MIGRATE_DATABASE        | FALSE    |     false     | Typeorm migration 실행                        |
| GOOGLE_APPLICATION_CREDENTIALS | FALSE    |       -       | GCP Service account key, 인증기능 사용시 필수 |

#### Local

`.env` file 에 작성하세요. 아래는 sample 입니다. `docker compose` 사용 시 아래처럼 사용 가능합니다.

```
DATABASE_HOST_MASTER=mysql
DATABASE_PORT_MASTER=3306
DATABASE_USER_MASTER=root
DATABASE_USER_PASSWORD_MASTER=
DATABASE_NAME=sample
SHOULD_SYNCHRONIZE_DATABASE=true
```

#### Development

`.env.dev` file 에 작성하세요.

#### Production

`.env.prod` file 에 작성하세요.

## Install

```shell
npm install
```

## Run

### Local

```shell
npm run start
```

#### Wit Docker

```shell
docker compose up --build
```

Docker 사용시 container 가 제거되면 database 도 같이 제거됩니다. database 를 유지가 필요하면 `docker-compose.yml` 파일을 참조하세요.

### Development

```shell
npm run start:dev
```

### Production

```shell
npm run start:prod
```

### Update
* graphql의 return type을 잘 확인하자
* Post 내에 어떠한 속성이 있어도 Post entity에서 Field로 정의한 값만 playground에서 볼 수 있다
  => postObject = { ...postObject, "hello": "hello"}; => hello는 안보인다
  => Field에 정의한 값이 없어도 정상적으로 실행은 되지만, 프론트에서 그 값을 요청하면 에러가 발생한다

### TODO
* 오너 읽기 => menu 제외한 정보 제공 => 현재, resolver의 getAllPostByOwner가 메뉴까지 제공해주는 함수인데, resolver를 가져와서 쓰는데 좋은 방법인지, 아니면 service에서 다른 repository 불러와서 여기서 사용하는 게 맞는 건지??..
* order 이후 로직 구현