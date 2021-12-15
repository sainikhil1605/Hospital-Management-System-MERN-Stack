const FeedBack = require('../models/Feedback');

const getFeedback = async (req, res) => {
  const feedbacks = await FeedBack.find({});
  res.status(200).json({ feedbacks });
};
const postFeedback = async (req, res) => {
  const feedback = await FeedBack.create(req.body);
  res.status(200).json({ feedback });
};
module.exports = {
  getFeedback,
  postFeedback,
};
