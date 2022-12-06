const pool = require("../config/dbConfig");
const CommentModel = require("../models/commentModel")

class CommentController {
  static async getComments(req, res) {
    try {
      const { id } = req.params;
      const comments = await CommentModel.getAllComents(id);
      return res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      return res.status(500).json("server error");
    }
  }
  static async postComment(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const newComment = await CommentModel.postNewComment(req.user, id, content);
      return res.status(201).json(newComment);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }

  static async deleteComment(req, res) {
    try {
      const { commentId } = req.params;
      const deletedComment = await CommentModel.deleteComment(commentId);
      return res.status(200).json(deletedComment);
    } catch (error) {
      console.error(error);
      return res.status(500).json("Server error");
    }
  }
  static async getCommentMetric(req, res) {
    try {
      const metrics = await CommentModel.getCommentCount();
      return res.status(200).json(metrics);
    } catch (error) {
      console.error(error);
      return res.status(500).json("server error");
    }
  }
}

module.exports = CommentController;
