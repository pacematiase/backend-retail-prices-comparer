# TP DSW: Retail prices comparer

## Prerequisites:
1. Github client
2. Node
3. Node package manager
4. MySQL server

## Installation steps:
1. Clone the repository:
```
$ git clone https://github.com/pacematiase/backend-retail-prices-comparer.git
```
2. Open backend-retail-prices-comparer folder and install the package
```
$ cd backend-retail-prices-comparer
$ npm install
```
3. Create three .env files in backend-retail-prices-comparer folder:
    1. .env.local
    2. .env.test
    3. .env.production

All three files should have these options configured:

| variable | type | description | Example
|:-|:-|:--------------|:--------------|
| PORT | Integer | Port where express application will run on | |PORT=3000
| DATABASE_HOST | String | Ip or host where MySQL database is located | DATABASE_HOST=localhost
| DATABASE_USER | String | User with privileges to execute DML and DDL in MySQL database | DATABASE_USER=root
| DATABASE_PASSWORD | String | Password of DATABASE_USER | DATABASE_PASSWORD=root
| DATABASE_NAME | String | Name of the application database | DATABASE_NAME=retail-prices-comparer
| DATABASE_PORT | Integer | Port where DATABASE_HOST is listening | DATABASE_PORT=3306
| DATABASE_DEBUG | Boolean (case sensitive) | If it’s set to ‘true’, the console will show SQL sentences the ORM is executing | DATABASE_DEBUG=true
| ORM_SYNC_SCHEMA | Boolean (case sensitive) | If it’s set to ‘true’, the application will try to update the database schema on start. This value is ignored in production environment | ORM_SYNC_SCHEMA=false
| ORM_NEW_SCHEMA | Boolean (case sensitive) | If it’s set to ‘true’, the application will drop and create the database schema on start. This value is ignored in production environment | ORM_NEW_SCHEMA=true
| JWT_SECRET | String | Secret used to validate JSON Web token sent as Authentication Bearer in requests. to generate a secret key, you can run: <br> $ node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"  | JWT_SECRET=c13ebd747e9de5e37d55253ed540a66a5606291a9de069ef0ecb75905cfe9c8a10d7e4aa9ed5042e104681bb9e8055a1a889faa912b358605875bcabcc4bdcfe
 | JWT_EXPIRES_IN | Integer | Seconds a JSON Web Token will take to expire | JWT_EXPIRES_IN=3600
 | BCRYPT_SALT | Integer | Salt rounds to run when encrypting a password before saving it in the database. | BCRYPT_SALT=12

4. Transpile typescript source code:
```
$ npm run build
```
5. If you need to initialize the database in production, run this script to create the database and create an administrator user with username and password ‘admin’:

<b>WARNING: THIS COMMAND DROPS AND RE-CREATES THE DATABASE</b>
```
$ npm initdb
```

6. Run the project. There’s a command for each environment:

  - For local execution (using .env.local file):
```
$ npm run start:dev
```
  - For test execution (using .env.test file):
```
$ npm run start:test
```
  - For production execution (using .env.production file)
```
$ npm start
```
