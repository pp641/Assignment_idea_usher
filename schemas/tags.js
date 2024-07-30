const mongoose = require('mongoose')
const tagSchema = new mongoose.Schema({
    tag: {
      type: String,
      required: true,
      unique: true
    }
  });
  
 module.exports = mongoose.model('Tag', tagSchema);
  