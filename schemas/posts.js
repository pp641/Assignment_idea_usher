
const mongoose =  require('mongoose');
const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required: [true , 'Title is Required']
    },
    description : {
        type: String,
        required: [true , 'Description is Required']
    },
    image  : {
        fileName : String ,
        contentType : String,
        data : Buffer
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostTag'
      }]
      
});

module.exports  =  mongoose.model('Post' , postSchema);