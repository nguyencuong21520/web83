import Comment from "../models/comment.model.js";

const getComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { page = 1, limit = 10, sort = "DESC" } = req.query;

    const sortOrder = sort === "ASC" ? 1 : -1;

    const comments = await Comment.find({ post: postId })
      .sort({
        createAt: sortOrder,
      })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalComments = await Comment.countDocuments({ post: postId });

    res.status(200).json({
      total: totalComments,
      totalPages: Math.ceil(totalComments / limit),
      currentPage: parseInt(page),
      data: comments,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const commentController = {
  getComment,
};

export default commentController;

// http://localhost:3006/api/v1/comment/g239wenkaschaopsd?limit=20&page=1
