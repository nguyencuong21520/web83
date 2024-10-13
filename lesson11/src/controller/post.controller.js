import Post from "../models/post.model.js";

const getPost = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await Post.find()
      .populate("author", "username email")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalPosts = await Post.countDocuments();

    res.status(200).json({
      total: totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: parseInt(page),
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const postController = {
  getPost,
};

export default postController;
