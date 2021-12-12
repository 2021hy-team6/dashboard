# Recycle Mate Backend

## Installation

- [docker](https://docs.docker.com/engine/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

```sh
$ sudo docker --version
$ sudo docker-compose --version
```

### Launch

#### Initialize and Launch

```sh
$ sudo docker-compose build
$ sudo docker-compose up -d
```

#### Shutdown

```sh
$ sudo docker-compose down
```

#### Connection Info.

**PostgreSQL**

|                      |                |
|----------------------|----------------|
|**Address (External)**|127.0.0.1:6002  |
|**Address (Intranet)**|172.28.0.62:5432|
|**Database**          |db_recm8        |
|**User**              |usr_recm8       |
|**Password**          |mysecretpassword|

**Pgadmin**

|            |                 |
|------------|-----------------|
|**Address** |127.0.0.1:6001   |
|**Email**   |admin@example.com|
|**Password**| mysecretpassword|

### Manage PostgreSQL from Pgadmin

- `127.0.0.1:6001` 접속
- 로그인하기 (ID : `admin@example.com` / PW : `mysecretpassword`)
- 좌측패널 > Servers 우클릭 > Create > Server 클릭
- General탭 > Name : `con_recm8`
- Connection탭
  - Host name/address : `172.28.0.62`
  - Port : `5432`
  - Maintenance Database : `db_recm8`
  - Username : `usr_recm8`
  - Save Password? : 활성화하기
- 우측 아래 Save 클릭

- 좌측패널 > Servers > con_recm8 > Databases > db_recm8
- (이어서) > Schemas > recm8 > Tables 펼치고 확인하기

- Tables 우클릭 > Query Tool 클릭
- `insert into image (elapsed_sec) values (12.34);`
- `commit;`
- `select * from image;`
- 쿼리 입력하고 `F5`로 실행

### Trouble Shooting

#### Change Internal Addresses

In `docker-compose.yml`, change conflicting `networks > intranet > ipv4_address`
manually as you want.

#### Check Processes

```sh
$ sudo docker ps -a
# Check whether some containers are exited.
```

#### Check Logs

```sh
$ sudo docker logs db_psql_1
# Or
$ sudo docker logs db_pgadmin_1
```
#### Reset Containers

```sh
$ sudo rm -rf psql/pgdata
$ sudo docker volume rm db_psql-data
$ sudo docker volume rm db_pgadmin-data
# Then launch again
```
