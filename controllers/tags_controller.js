const Tag = require('../schemas/tags');

const createTag = async (req, res) => {
  try {
    const { tag } = req.body;

    const newTag = new Tag({ tag });
    const savedTag = await newTag.save();
    res.status(201).json({ message: 'Tag created successfully', tag: savedTag });
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  createTag
};
