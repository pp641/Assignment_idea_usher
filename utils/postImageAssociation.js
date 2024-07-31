const postSchema = require("../schemas/posts");
const TagsSchema = require("../schemas/tags");
const PostTagSchema = require("../schemas/postTag");

const PostImageAssociation = async (tags,newPost ) => {
return await Promise.all(
        JSON.parse(tags).map(async (tagName) => {
          const tag = await TagsSchema.findOne({ tag: tagName });
          if (!tag) {
            const newTag = new TagsSchema({ tag: tagName });
            await newTag.save();
            return new PostTagSchema({ post: newPost._id, tag: newTag._id });
          }
          return new PostTagSchema({ post: newPost._id, tag: tag._id });
        })
    )
}

module.exports = { PostImageAssociation }