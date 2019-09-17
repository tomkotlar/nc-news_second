exports.formatDates = list => {
  return list.map(element => {
    let newCopy = { ...element };
    newCopy.created_at = new Date(element.created_at);
    return newCopy;
  });
};

exports.makeRefObj = list => {
  return list.reduce((obj, value) => {
    const { title, article_id } = value;
    obj[title] = article_id;
    return obj;
  }, {});
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(element => {
    const { belongs_to, created_by, created_at, ...rest } = element;
    return {
      created_at: new Date(created_at),
      author: created_by,
      article_id: articleRef[belongs_to],
      ...rest
    };
  });
};
