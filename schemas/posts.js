
const mongoose =  require('mongoose');
const postSchema = new mongoose.Schema({
    title : {
        type : String
        
    },
    description : {
        type: String
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