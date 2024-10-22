npm init and what happens after it
why not http and we use express to create server
how to setup server using express
node_modules,package.json,package-lock.json
tilde and carot
request handler function
server, port
app.use
git initialization, adding files to git, committing the files, setting up remote repo, connection of local to remote repo, pushing the committed code from local to remote
order of routes matters. play with diff routes using app.use middleware

install postman, create workspace,collection and try making calls using http methods. try with use,get,post,delete and patch and test in all scenarios.

explore advances routing techniques like using ?,\* and regex in url path and also learn diff between req.params and req.query.

try using multiple RHFs in app.use and also use next() in dufferent places and check the responses in client-side. try putting next() before res.send and observe the output.

middlewares and RHF and how expreejs handles requests behind the scenes i.e; sequence of execution.

implement authentication using app.use.

app.use vs app.all

create dummy authorization middlewares

errror handling and also try app.use with err parameter and without and change the position of app.use and check - interesting.

//this mongoose.connect returns promise saying whether our app is connected to cluster successfully or not.
//this link mongodb+srv://tejapintu4:0ZRw7tpNjrwcP0fS@namastenode.nr7lh.mongodb.net/ is connection to cluster link and this following link mongodb+srv://tejapintu4:0ZRw7tpNjrwcP0fS@namastenode.nr7lh.mongodb.net/devTinder is connection to database devTinder inside cluster link

create cluster and database inside it and then connect our node application with the Atlas mongodb using the mongoose driver . mongoose driver is an npm library. make sure database is connected first before server is listening to requests at port 3000.

A **model** in frameworks like **Mongoose** (for MongoDB) is a tool that ensures CRUD operations on a collection follow the rules defined in its respective **schema**. The schema defines the structure, data types, validation, and constraints, and the model applies these rules when interacting with the database.

create a "/signup"  route and try to post any userdata into the database using post http method, learn how to create a new user model object and insert data into it and saving it into the database.

use of express.json => takes the body from the request which is in the json format and converts it into jsobject and puts this back in to the request body.

find out how find() and findOne() works with duplicate entries.

build /user and /feed routes