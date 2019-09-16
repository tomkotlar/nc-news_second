const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns empty array when empty array passed as input", () => {
    const input = [];
    const actualResult = formatDates(input);
    expect(actualResult).to.be.an("array");
    expect(actualResult).not.to.equal(input);
  });
  it("returns changed date format for array with one article passed as input", () => {
    const input = [
      {
        title: "Moustache",
        topic: "mitch",
        author: "butter_bridge",
        body: "Have you seen the size of that thing?",
        created_at: 154700514171
      }
    ];
    const actualResult = formatDates(input);
    const expectedResult = [
      {
        title: "Moustache",
        topic: "mitch",
        author: "butter_bridge",
        body: "Have you seen the size of that thing?",
        created_at: new Date(154700514171)
      }
    ];
    expect(actualResult).not.to.equal(input);
    expect(actualResult).to.deep.equal(expectedResult);
  });
  it("returns changed date format for array with one article passed as input", () => {
    const input = [
      {
        title: "Moustache",
        topic: "mitch",
        author: "butter_bridge",
        body: "Have you seen the size of that thing?",
        created_at: 154700514171
      },
      {
        title: "Seven inspirational thought leaders from Manchester UK",
        topic: "mitch",
        author: "rogersop",
        body: "Who are we kidding, there is only one, and it's Mitch!",
        created_at: 406988514171
      }
    ];
    const actualResult = formatDates(input);
    const expectedResult = [
      {
        title: "Moustache",
        topic: "mitch",
        author: "butter_bridge",
        body: "Have you seen the size of that thing?",
        created_at: new Date(154700514171)
      },
      {
        title: "Seven inspirational thought leaders from Manchester UK",
        topic: "mitch",
        author: "rogersop",
        body: "Who are we kidding, there is only one, and it's Mitch!",
        created_at: new Date(406988514171)
      }
    ];
    expect(actualResult).not.to.equal(input);
    expect(actualResult).to.deep.equal(expectedResult);
  });
  it("checking if array is mutated", () => {
    const input = [
      {
        title: "Moustache",
        topic: "mitch",
        author: "butter_bridge",
        body: "Have you seen the size of that thing?",
        created_at: 154700514171
      },
      {
        title: "Seven inspirational thought leaders from Manchester UK",
        topic: "mitch",
        author: "rogersop",
        body: "Who are we kidding, there is only one, and it's Mitch!",
        created_at: 406988514171
      }
    ];
    const actualResult = formatDates(input);
    const expectedResult = [
      {
        title: "Moustache",
        topic: "mitch",
        author: "butter_bridge",
        body: "Have you seen the size of that thing?",
        created_at: 154700514171
      },
      {
        title: "Seven inspirational thought leaders from Manchester UK",
        topic: "mitch",
        author: "rogersop",
        body: "Who are we kidding, there is only one, and it's Mitch!",
        created_at: 406988514171
      }
    ];
    expect(input).to.deep.equal(expectedResult)
    expect(input).to.not.equal(actualResult)
  });
});

describe("makeRefObj", () => {
  it("returns empty object when empty array is passed as input", () => {
    const input = [];
    const actualReulst = makeRefObj(input);
    const expectedResult = {};
    expect(actualReulst).to.deep.equal(expectedResult);
  });
  it("returns  title as key and article_id as value in object, when one article is passed as input", () => {
    const input = [
      {
        article_id: 31,
        title: "What to Cook This Week",
        body:
          "Good morning. Here’s the plan for the week, not including breakfast because I’m on a farina kick and that’s not to everyone’s taste.",
        votes: 0,
        topic: "cooking",
        author: "tickle122"
      }
    ];
    const actualReulst = makeRefObj(input);
    const expectedResult = { "What to Cook This Week": 31 };
    expect(actualReulst).to.deep.equal(expectedResult);
  });
  it("returns title as key and article_id as value in object, when multiple articles are passed as input", () => {
    const input = [
      {
        article_id: 31,
        title: "What to Cook This Week",
        body:
          "Good morning. Here’s the plan for the week, not including breakfast because I’m on a farina kick and that’s not to everyone’s taste.",
        votes: 0,
        topic: "cooking",
        author: "tickle122"
      },
      {
        article_id: 35,
        title: "Stone Soup",
        body:
          "The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. Pour themselves a bowl of cereal. This represented a reversal.",
        votes: 0,
        topic: "cooking",
        author: "cooljmessy"
      }
    ];
    const actualReulst = makeRefObj(input);
    const expectedResult = { "What to Cook This Week": 31, "Stone Soup": 35 };
    expect(actualReulst).to.deep.equal(expectedResult);
  });
  it('testing for mutation', () => {
    const input = [
      {
        article_id: 31,
        title: "What to Cook This Week",
        body:
          "Good morning. Here’s the plan for the week, not including breakfast because I’m on a farina kick and that’s not to everyone’s taste.",
        votes: 0,
        topic: "cooking",
        author: "tickle122"
      },
      {
        article_id: 35,
        title: "Stone Soup",
        body:
          "The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. Pour themselves a bowl of cereal. This represented a reversal.",
        votes: 0,
        topic: "cooking",
        author: "cooljmessy"
      }
    ]
    const actualResult = makeRefObj(input);
    const expectedResult = [
      {
        article_id: 31,
        title: "What to Cook This Week",
        body:
          "Good morning. Here’s the plan for the week, not including breakfast because I’m on a farina kick and that’s not to everyone’s taste.",
        votes: 0,
        topic: "cooking",
        author: "tickle122"
      },
      {
        article_id: 35,
        title: "Stone Soup",
        body:
          "The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. Pour themselves a bowl of cereal. This represented a reversal.",
        votes: 0,
        topic: "cooking",
        author: "cooljmessy"
      }
    ]
    expect(input).to.deep.equal(expectedResult)
    expect(input).to.not.equal(actualResult)
  });
});

describe("formatComments", () => {
  it("returns empty array when empty array is passed", () => {
    const input = [];
    const obj = {};
    const actualResult = formatComments(input, obj);
    expect(actualResult).to.be.an("array");
    expect(actualResult).to.not.equal(input);
  });
  it("returns changed created_by to author key array when array with one comment is passed", () => {
    const input = [
      {
        body: 'Corporis magnam placeat quia nulla illum nisi.',
        belongs_to: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
        created_by: 'weegembump',
        votes: 3,
        created_at: 1504946266488
      }
    ];
    const obj = { 'A BRIEF HISTORY OF FOOD—NO BIG DEAL': 29 };

    const actualResult = formatComments(input, obj);
    const expectedResult = [
      {
        body: 'Corporis magnam placeat quia nulla illum nisi.',
        article_id: 29, //update
        author: 'weegembump', //update
        votes: 3,
        created_at: new Date(1504946266488)
      }
    ];
    expect(actualResult).to.deep.equal(expectedResult);
  });
  it("returns changed created_by to author key array when array with multiple comment are passed", () => {
    const input = [
      {
        body: 'Corporis magnam placeat quia nulla illum nisi.',
        belongs_to: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
        created_by: 'weegembump',
        votes: 3,
        created_at: 1504946266488
      },
      {
        body: 'Reiciendis enim soluta a sed cumque dolor quia quod sint.',
        belongs_to: 'Who are the most followed clubs and players on Instagram?',
        created_by: 'happyamy2016',
        votes: 17,
        created_at: 1489789669732
      }
    ];
    const obj = {
      'A BRIEF HISTORY OF FOOD—NO BIG DEAL': 29 ,
      'Who are the most followed clubs and players on Instagram?': 19
    };

    const actualResult = formatComments(input, obj);
    const expectedResult = [
      {
        body: 'Corporis magnam placeat quia nulla illum nisi.',
        article_id: 29, 
        author: "weegembump", 
        votes: 3,
        created_at: new Date(1504946266488)
      },
      {
        body: 'Reiciendis enim soluta a sed cumque dolor quia quod sint.',
        article_id: 19,
        author: 'happyamy2016',
        votes: 17,
        created_at: new Date(1489789669732)
      }
    ];
    expect(actualResult).to.deep.equal(expectedResult);
  });
  it("checking for mutation", () => {
    const input = [
      {
        body: 'Corporis magnam placeat quia nulla illum nisi.',
        belongs_to: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
        created_by: 'weegembump',
        votes: 3,
        created_at: 1504946266488
      },
      {
        body: 'Reiciendis enim soluta a sed cumque dolor quia quod sint.',
        belongs_to: 'Who are the most followed clubs and players on Instagram?',
        created_by: 'happyamy2016',
        votes: 17,
        created_at: 1489789669732
      }
    ];
    const obj = {
      'A BRIEF HISTORY OF FOOD—NO BIG DEAL': 29 ,
      'Who are the most followed clubs and players on Instagram?': 19
    };

    const actualResult = formatComments(input, obj);
    const expectedResult = [
      {
        body: 'Corporis magnam placeat quia nulla illum nisi.',
        belongs_to: 'A BRIEF HISTORY OF FOOD—NO BIG DEAL',
        created_by: 'weegembump',
        votes: 3,
        created_at: 1504946266488
      },
      {
        body: 'Reiciendis enim soluta a sed cumque dolor quia quod sint.',
        belongs_to: 'Who are the most followed clubs and players on Instagram?',
        created_by: 'happyamy2016',
        votes: 17,
        created_at: 1489789669732
      }
    ];
    expect(input).to.deep.equal(expectedResult)
    expect(input).to.not.equal(actualResult)
  });
});

