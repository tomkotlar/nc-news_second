# :newspaper: Northcoders News API


The [API](https://northcoder-news2019.herokuapp.com/api) is hosted on Heroku with following endpoints:

```http
GET /api 

GET /api/topics   

GET /api/users/:username

GET /api/articles

GET /api/articles/:article_id
PATCH /api/articles/:article_id

POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id


```

---
To view the example of JSON data Please click on the rocket 

#####  [:rocket:](https://northcoder-news2019.herokuapp.com/api/) `/api` 

#####  [:rocket:](https://northcoder-news2019.herokuapp.com/api/topics) `/api/topics`

#####  [:rocket:](https://northcoder-news2019.herokuapp.com/api/users/jessjelly) `/api/users/:username`

#####  [:rocket:](https://northcoder-news2019.herokuapp.com/api/articles) `/api/articles` 

#####  [:rocket:](https://northcoder-news2019.herokuapp.com/api/articles/1) `/api/articles/:article_id` 

#####  [:rocket:](https://northcoder-news2019.herokuapp.com/api/articles/1/comments)  `/api/articles/:article_id/comments`



## :clipboard: Instructions 

On GitHub create your own **public** repository for your project. **Make sure NOT to initialise it with a README or .gitignore.**

```bash
git remote remove origin

# This will prevent you from pushing to the original repo.
```

```bash
git remote add origin <YOUR-GITHUB-URL>

# This will add your GitHub location to your local git repository.
# You can confirm this by checking the new git remote.
``` 

###  :open_file_folder: Setting up your own repository

```bash
git clone https://github.com/tomkotlar/nc-news_second

cd be-nc-news
```


###  :dvd: Install

```bash
npm install

```
You will install dependencies: 
[NodeJS](https://nodejs.org/en/) | [Cors](https://www.npmjs.com/package/cors) |  [PostgreSQL](https://www.npmjs.com/package/pg) | [Knex](https://www.npmjs.com/package/knex) | 
[Express](https://www.npmjs.com/package/express)

###  :books: Setup databese 

```bash
npm run setup-dbs

npm run seed

```

###  :computer: Local Server

```bash
npm run start

```


###  :chart_with_upwards_trend: Running the test 

```bash
npm test

```
---




