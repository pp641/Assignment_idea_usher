const postSchema = require("../schemas/posts");
const TagsSchema = require("../schemas/tags");
const PostTagSchema = require("../schemas/postTag");
const { PostImageAssociation } = require("../utils/postImageAssociation");
const { postInputValidation } = require("../validations/postValidations");

const createPosts = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    if(postInputValidation(req.body).length){
      res.status(401).json({error :  postInputValidation(req.body) })
    } 
    const file = req.file;
    console.log("req.file" , req.file)
    const image =
      req.file === undefined
        ? {}
        : {
            fileName: Date.now() + "-" + file?.originalname,
            contentType: file?.mimetype,
            data: file?.buffer,
          };
    console.log("okmko", image)
    const newPost = new postSchema({ title, description, image });
    const postTags = await PostImageAssociation(tags,newPost) // function for post_image association
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
