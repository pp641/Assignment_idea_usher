App Directory Structure:
    ---index.js => main file which will run the node app
    schema => This Contains the list of all the schemas in the app
           => 1. Post Schema which has post details and Post Image Object
           => 2. Tags Schema which has tag details.
           => 3. PostTag Schema which has associations of Post and Tags

    controllers => This Contains the list of all the controllers in the app.
                => 1. Post Controllers
                    1.1 CreatePost Controller -> Create posts along with Images and if tags are     passed , check for valid tags and link it to the posts.
                    1.2 GetAllPost Controller  -> Get All Posts in the batch of 10 with pagination along with the filters of  page , content, sorting
    routes => This directory contains the routes for the app.
                => 1. Endpoints
                    1.1    POST => /api/createPost
                    1.2    POST => /api/createTag 
                    1.3    GET  => /api/getAllPosts   
     utils => This directory contains the common utility functions in the app which will modularize the function and make the controller's code neat and clean.
                => PostImageAssociation.js ( It contains the post image association function  )
                        
    config => This directory contains the configuration files for database , multer etc.

    .env   => Enviornment variable to store the production db url or other secret keys









