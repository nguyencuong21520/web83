import PostModel from "../models/post.model.js";

const getPostById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: "Invalid post id" });
    }

    const post = await PostModel.findById(id).populate("user");

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postController = {
  getPostById,
};

export default postController;
