const getPost = (req, res) => {
  res.status(200).json({ message: req.user });
};

const postController = {
  getPost,
};

export default postController;
