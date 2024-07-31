const postSchema = require("../schemas/posts");
const TagsSchema = require("../schemas/tags");
const PostTagSchema = require("../schemas/postTag");
const createPosts = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    const file = req.file;

    const image = {
      fileName: file?.originalname,
      contentType: file?.mimetype,
      data: file?.buffer,
    };
    const newPost = new postSchema({ title, description, image });
    console.log("oookd" , JSON.parse(req.body.tags)[1] );
    const postTags = await Promise.all(
      JSON.parse(tags).map(async (tagName) => {
        const tag = await TagsSchema.findOne({ tag: tagName });
        if (!tag) {
          const newTag = new TagsSchema({ tag: tagName });
          await newTag.save();
          return new PostTagSchema({ post: newPost._id, tag: newTag._id });
        }
        return new PostTagSchema({ post: newPost._id, tag: tag._id });
      })
    );
    newPost.tags = postTags
    await newPost.save();
    console.log("okdo", postTags)
    await PostTagSchema.bulkSave(postTags);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};



const getAllPosts = async (req, res) => {
  try {
    console.log("ok", req.query);
    const {
      sort = "createdAt",
      order = "desc",
      limit = 10,
      page = 1,
      keyword,
      tag,
    } = req.query;

    const allowedQueryFields = [
      "sort",
      "order",
      "limit",
      "page",
      "keyword",
      "tag",
    ];
    const queryFields = Object.keys(req.query);
    const invalidFields = queryFields.filter(
      (field) => !allowedQueryFields.includes(field)
    );
    if (invalidFields.length > 0) {
      return res
        .status(400)
        .json({
          error: `Invalid query parameters: ${invalidFields.join(", ")}`,
        });
    }

    let posts;
    const query = {};
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }
    const sortObj = {};
    sortObj[sort] = order === "asc" ? 1 : -1;

    if (tag) {
      const tagDoc = await TagsSchema.findOne({ tag: tag });
      if (tagDoc) {
        const postIds = await PostTagSchema.find({ tag: tagDoc._id }).distinct(
          "post"
        );
        console.log("okfind", postIds)
        posts = await postSchema
          .find({ _id: { $in: postIds } })
          .sort(sortObj)
          .skip((page - 1) * limit)
          .limit(limit);
        query.tags = tagDoc._id;
      }
    } else {
      posts = await postSchema
        .find(query)
        .sort(sortObj)
        .skip((page - 1) * limit)
        .limit(limit);
    }
    res.json(posts);
  } catch (error) {
    console.log("Error", error);
  }
};

module.exports = { createPosts, getAllPosts };
