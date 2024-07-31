const postInputValidation = (data)=>{
    let errorMessage = ''
      if(!(data.title !== undefined && data.title.length > 0)){
        errorMessage = 'Title Cannot be Empty'
        return errorMessage;
      }
     if(!(data.description !== undefined && data.description.length > 0)){
         errorMessage = 'Description Cannot be Empty'  
        return errorMessage;
     }     
     return errorMessage
}

module.exports = { postInputValidation}