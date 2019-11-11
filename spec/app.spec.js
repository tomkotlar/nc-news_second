process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require("chai");
const chaiSorted = require("sams-chai-sorted");
const app = require("../app");
const connection = require("../db/connection");
const request = require("supertest");

chai.use(chaiSorted);

describe("", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('GET /api', () => {
    it('status 200: respond with JSON describing all the available endpoints on API', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({body}) => {
          const input = {
            "GET /api": {
              "description": "serves up a json representation of all the available endpoints of the api"
            },
            "GET /api/topics": {
              "description": "serves an array of all topics",
              "queries": [],
              "exampleResponse": {
                "topics": [{ "slug": "football", "description": "Footie!" }]
              }
            },
            "GET /api/articles": {
              "description": "serves an array of all topics",
              "queries": ["author", "topic", "sort_by", "order"],
              "exampleResponse": {
                "articles": [
                  {
                    "title": "Seafood substitutions are increasing",
                    "topic": "cooking",
                    "author": "weegembump",
                    "body": "Text from the article..",
                    "created_at": "2018-05-30T15:59:13.341Z"
                  }
                ]
              }
            },
            "GET /api/users/username": {
                 "avatar_url": "https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg",
                 "description": "serves an object username",
                 "name": "Paul Grump",
                 "username": "grumpy19",
               },
               "GET /api/articles/1/comments": {
                   "article_id": 1,
                   "author": "grumpy19",
                   "body": "Error est qui id corrupti et quod enim accusantium minus. Deleniti quae ea magni officiis et qui suscipit non.",
                   "comment_id": 44,
                   "created_at": "2017-11-20T08:58:48.322Z",
                  "description": "serves an object of comments for article id",
                   "votes": 4
                  }, 
                  "GET /api/articles/1": {
                       "article_id": 1,
                       "author": "jessjelly",
                       "body": "This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.",
                       "comment_count": "8",
                       "created_at": "2016-08-18T12:07:52.389Z",
                       "description": "serves an object for article id",
                       "title": "Running a Node App",
                       "topic": "coding",
                       "votes": 0,
                     }

          }
          expect(body).to.deep.equal(input)
          expect(body).to.contain.keys("GET /api/topics")
        })
    });
    it("status 405: invalid methods", () => {
      const invalidMethods = ["patch", "put", "delete", 'post'];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
    
  });
  describe("GET /api/topics", () => {
    it("status 200: responds with array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body.topics).to.be.an("array");
          expect(body.topics[0]).to.contain.keys("slug", "description");
        });
    });
    it("status 404: responds with error message for not existing path", () => {
      return request(app)
        .get("/api/not_existing_path")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("route not found");
        });
    });
    it("status 405: invalid methods", () => {
      const invalidMethods = ["patch", "put", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/topics")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("GET /api/users/:username", () => {
    it("status 200: responds with a user object/ with properties username, avatar_url and name", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body.user).to.contain.keys("username", "avatar_url", "name");
        });
    });
    it("status 404: responds with error messsage for not existing username as integer", () => {
      return request(app)
        .get("/api/users/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("route not found");
        });
    });
    it("status 404: responds with error messsage for invalid id ", () => {
      return request(app)
        .get("/api/users/invalid_id")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("route not found");
        });
    });
    it("status 405: invalid methods", () => {
      const invalidMethods = ["post", "patch", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/users/rogersop")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("GET /api/articles/:article_id", () => {
    it("status 200: responds with an article object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body.article).to.contain.keys(
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes"
          );
        });
    });
    it("status 200: responds with an article object / join comments table ", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body.article).to.contain.keys(
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          );
        });
    });
    it("status 404: responds with error message for invalid id", () => {
      return request(app)
        .get("/api/articles/666666666")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("route not found");
        });
    });
    it("status 400: responds with error message for invalid id format", () => {
      return request(app)
        .get("/api/articles/invalid_id")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 405: invalid methods", () => {
      const invalidMethods = ["post", "put", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles/1")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("PATCH /api/articles/:article_id", () => {
    it("status 200: responds with the updated article", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body.article.votes).to.equal(101);
        });
    });
    it("status 200: responds with the article when updated data are not provided", () => {
      return request(app)
        .patch("/api/articles/2")
        .send({  })
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body.article.votes).to.deep.equal(body.article.votes);
        });
    });
    it("status 404: responds with error message for the invalid id", () => {
      return request(app)
        .patch("/api/articles/999999999")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("route not found");
        });
    });
    it("status 400: responds with error message for the invalid id format", () => {
      return request(app)
        .patch("/api/articles/invalid_id")
        .send({ inc_votes: 1 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 400: responds with error message for incorect value type format for updating data", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "ten" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 405: invalid methods", () => {
      const invalidMethods = ["post", "put", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles/1")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("POST /api/articles/:article_id/comments", () => {
    it("status 201: respond with the posted comment", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({ username: "rogersop", body: "i love hip hop" })
        .expect(201)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body.comment).to.contain.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
        });
    });
    it("status 400: responds with error message for missing required fields", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({ body: "i love hip hop" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 400: responds with error message for failing schema validation", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({ usernifiiame: "rogersop", bonkdfdy: "i love hip hop" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 400: responds with error message for post fields are empty", () => {
      return request(app)
        .post("/api/articles/8/comments")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 422: responds with error message for when posting correctly formatted id that does not exist", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({ username: "rogersopddddddddd", body: "i love hip hop" })
        .expect(422)
        .then(({ body }) => {
          expect(body.msg).to.equal("unprocessable entity");
        });
    });
    it("status 405: invalid methods", () => {
      const invalidMethods = ["patch", "put", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles/6/comments")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("GET /api/articles/:article_id/comments", () => {
    it("status 200: responds with array of comments for article_id", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an("object");
          expect(body.comments[0]).contain.keys(
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body"
          );
        });
    });
    it("status 200: responds with array of comments for article_id, defaults desc sort to created_at", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an("array");
          expect(body.comments).to.be.descendingBy("created_at");
        });
    });
    it("status 200: responds with array of comments for article_id, sort by votes descending", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an("array");
          expect(body.comments).to.be.descendingBy("votes");
        });
    });
    it("status 200: responds with array of comments for article_id, order by created_at defaults to descending", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an("array");
          expect(body.comments).to.be.descendingBy("created_at");
        });
    });
    it("status 200: responds with array of comments for article_id, order by created_at defaults to descending", () => {
      return request(app)
        .get("/api/articles/5/comments?order_by=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an("array");
          expect(body.comments).to.be.ascendingBy("created_at");
        });
    });
    it("status 200: responds with array of comments for article_id, order by created_at to ascending", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=created_at&order_by=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an("array");
          expect(body.comments).to.be.ascendingBy("created_at");
        });
    });
    it("status 200: responds with array of comments for article_id, votes to ascending", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes&order_by=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an("array");
          expect(body.comments).to.be.ascendingBy("votes");
        });
    });
    it("status 400: responds with article comments for querry does not match the colums", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=not-a-valid-column")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request"); //'42703'
        });
    });
    it("status 400: responds with error message for incorrect id format", () => {
      return request(app)
        .get("/api/articles/milion/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 404: responds with error message for incorrect path", () => {
      return request(app)
        .get("/api/articles/4555/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("route not found");
        });
    });

    it("status 200: responds with empty array when the article exist but has no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).to.be.an("array");
        });
    });
    it("status 405: invalid methods", () => {
      const invalidMethods = ["patch", "put", "delete"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles/6/comments")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("GET /api/articles", () => {
    it("status 200: responds with array of article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles[0]).to.contain.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes",
            "body"
          );
        });
    });
    it("status 200: responds with array of articles objects including comment_count", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles[0]).to.contain.keys(
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          );
        });
    });
    it("status 200: responds with array of articles sorted by any valid column defaults to date, desc", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles).to.be.descendingBy("created_at");
        });
    });
    it("status 200: responds with array of articles sort by any valid column/ query, desc", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles).to.be.descendingBy("votes");
        });
    });
    it("status 200: responds with array of articles order by defaults to descending", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles).to.be.descendingBy("votes");
        });
    });
    it("status 200: responds with array of articles order by as votes query descending", () => {
      return request(app)
        .get("/api/articles?order_by=desc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles).to.be.descendingBy("votes");
        });
    });
    it("status 200: responds with array of articles order by ascending query", () => {
      return request(app)
        .get("/api/articles?order_by=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles).to.be.ascendingBy("created_at");
        });
    });
    it("status 200: responds with array of articles sort by created_at and order by ascending query", () => {
      return request(app)
        .get("/api/articles?sort_by=created_at&order_by=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles).to.be.ascendingBy("created_at");
        });
    });
    it("status 200: responds with array of articles which filters the articles by the username value specified in the query", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles[0].author).to.equal("butter_bridge");
        });
    });
    it("status 200: responds with array of articles which filters the articles by the topic value specified in the query", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).to.be.an("array");
          expect(body.articles[0].topic).to.equal("mitch");
        });
    });
    it("status 404: responds with error message for incorrect path", () => {
      return request(app)
        .get("/api/articlereaas")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("route not found");
        });
    });
    it("status 404: responds with error message for author which does not exist", () => {
      return request(app)
        .get("/api/articles?author=not-an-author")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Author does not exist");
        });
    });
    it("status 400: responds with error message for sort_by colum, which does not exist", () => {
      return request(app)
        .get("/api/articles?sort_by=not-a-colum")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 405: invalid methods", () => {
      const invalidMethods = ["patch", "put", "delete", "post"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/articles")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("PATCH /api/comments/:comment_id", () => {
    it("status 200: responds with updated comment", () => {
      return request(app)
        .patch("/api/comments/2")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object')
          expect(body.comment).to.contain.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
        });
    });
    it("status 200: responds with updated comment", () => {
      return request(app)
        .patch("/api/comments/2")
        .send({ inc_votes: 0 })
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object')
          expect(body.comment).to.contain.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
        });
    });
    it("status 200: responds with updated comment", () => {
      return request(app)
        .patch("/api/comments/2")
        .send({ })
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object')
          expect(body.comment).to.contain.keys(
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          );
        });
    });

    it("status 404: responds with error message for the invalid id", () => {
      return request(app)
        .patch("/api/comments/888888")
        .send({ inc_votes: 1 })
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("route not found");
        });
    });
    it("status 400: responds with error message for the invalid id format", () => {
      return request(app)
        .patch("/api/comments/invalid_id")
        .send({ inc_votes: 1 })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 400: responds with error message for incorect value type format for updating data", () => {
      return request(app)
        .patch("/api/comments/invalid_id")
        .send({ inc_votes: "milion" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 400: responds with error message for incorect key for updating data", () => {
      return request(app)
        .patch("/api/comments/invalid_id")
        .send({ inc_votffdfdes: "milion" })
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 405: invalid methods", () => {
      const invalidMethods = ["put", "post"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/comments/2")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("DELETE /api/comments/:comment_id", () => {
    it("status 204: responds with no content", () => {
      return request(app)
        .delete("/api/comments/7")
        .expect(204);
    });
    it("status 404: responds with error message for non existing route for invalid id", () => {
      return request(app)
        .delete("/api/comments/898989")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("route not found");
        });
    });
    it("status 405: invalid methods", () => {
      const invalidMethods = ["put", "post"];
      const methodPromises = invalidMethods.map(method => {
        return request(app)
          [method]("/api/comments/2")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal("method not allowed");
          });
      });
      return Promise.all(methodPromises);
    });
  });
});
