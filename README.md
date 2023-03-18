# node-js-jwt-auth

wah the best ni aku, lega juga kelarin project backend ini, karna biasanya diriku cuma pegang frontend doang haha.
project backend rest API ini menggunakan `MYSQL, EXPRESS, NODEJS`

how to run programs
1. run `npm install` on project directory
2. running server with `node server.js`
3. create database with name `sejarah-joang`

for your information
1. Server running on port `8081`
2. You don't need to setup the tables in the database because the tables inside are generated automatically
3. user default | username `galang` password `123456`

## LIST API 

### 1. User & JWT Authentication
role admin *user, moderator, admin*
1. POST	  `/api/auth/signup`	    signup new account
2. POST	  `/api/auth/signin`	    login an account
3. GET	  `/api/test/all`	        retrieve public content
4. GET	  `/api/test/user`	      access User’s content
5. GET	  `/api/test/mod`	        access Moderator’s content
6. GET	  `/api/test/admin`	      access Admin’s content


### 2. News
1. POST	    `/api/berita`	            Create data
2. PUT	    `/api/berita/:id`	        Update data
3. GET	    `/api/berita/`	          Get all data
4. GET	    `/api/berita/:id`	        Get data by id
5. GET	    `/api/berita/img/:id`	    Get image (base64)
6. DELETE	  `/api/berita/:id`	      Delete data


