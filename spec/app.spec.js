process.env.NODE_ENV = "test";
const { expect } = require("chai");
const chai = require('chai')
const chaiSorted = require('sams-chai-sorted')
const app = require("../app");
const connection = require("../db/connection");
const request = require("supertest");

chai.use(chaiSorted)


describe("", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("GET /api/topics", () => {
    it("status 200: responds with array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          //console.log(body.topics)
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
  });
  describe("GET /api/users/:username", () => {
    it("status 200: responds with a user object/ with properties username, avatar_url and name", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(({ body }) => {
          //console.log(body)
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
  });
  describe("GET /api/articles/:article_id", () => {
    it("status 200: responds with an article object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          //console.log(body)
          expect(body).to.be.an("object");
          expect(body.article[0]).to.contain.keys(
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
          // console.log(body);
          expect(body).to.be.an("object");
          expect(body.article[0]).to.contain.keys(
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
  });
  describe("PATCH /api/articles/:article_id", () => {
    it("status 200: responds with the updated article", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(({ body }) => {
          //console.log(body.article)
          expect(body).to.be.an("object");
          expect(body.article.votes).to.equal(101);
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
  });
  describe("POST /api/articles/:article_id/comments", () => {
    it("status 201: respond with the posted comment", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({ username: "rogersop", body: "i love hip hop" })
        .expect(201)
        .then(({ body }) => {
          //console.log(body)
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
          //console.log(body)
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 400: responds with error message for failing schema validation", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({ usernifiiame: "rogersop", bonkdfdy: "i love hip hop" })
        .expect(400)
        .then(({ body }) => {
          //console.log(body)
          expect(body.msg).to.equal("bad request");
        });
    });
    xit("status 400: responds with error message for adding non-existent colums", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({
          username: "rogersop",
          favorite_animal: 999,
          body: "i love hip hop"
        })
        .expect(400)
        .then(({ body }) => {
          //console.log(body)
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 400: responds with error message for for post fields are empty", () => {
      return request(app)
        .post("/api/articles/8/comments")
        .send({})
        .expect(400)
        .then(({ body }) => {
          //console.log(body)
          expect(body.msg).to.equal("bad request");
        });
    });
    it("status 422: responds with error message for when posting correctly formatted id that does not exist", () => {
      return request(app)
        .post("/api/articles/6/comments")
        .send({ username: "rogersopddddddddd", body: "i love hip hop" })
        .expect(422)
        .then(({ body }) => {
          //console.log(body)
          expect(body.msg).to.equal("unprocessable entity");
        });
    });
  });
  describe('GET /api/articles/:article_id/comments', () => {
    it('status 200: responds with array of comments for article_id', () => {
      return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({body}) => {
        expect(body).to.be.an('object')
        expect(body.comments[0]).contain.keys('comment_id',
        'votes',
        'created_at',
        'author', 
        'body')
      })
    });
    it('status 200: responds with array of comments for article_id, defaults asc sort to created_at', () => {
      return request(app)
      .get('/api/articles/1/comments')
      .expect(200)
      .then(({body}) => {
        //console.log(body.comments)
        expect(body.comments).to.be.an('array')
        expect(body.comments).to.be.sortedBy('created_at')
      })
    });
    it('status 200: responds with array of comments for article_id, sort by votes ascending', () => {
      return request(app)
      .get('/api/articles/1/comments?sort_by=votes')
      .expect(200)
      .then(({body}) => {
        //console.log(body.comments)
        expect(body.comments).to.be.an('array')
        expect(body.comments).to.be.ascendingBy('votes')
      })
    });

  });
});
