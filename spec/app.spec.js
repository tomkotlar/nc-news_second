process.env.NODE_ENV = "test";
const { expect } = require("chai");
const app = require("../app");
const connection = require("../db/connection");
const request = require("supertest");


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
    it("status 404: responds with error messsage for not existing username", () => {
      return request(app)
        .get("/api/users/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("route not found");
        });
    });
    xit("status 400: _>>>>>>>>>.responds with error messsage ", () => {
      return request(app)
        .get("/api/users/notid")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).to.equal("bad request");
        });
    });
  });
  describe('GET /api/articles/:article_id', () => {
    it('status 200: responds with an article object', () => {
      
    });
  });
});
