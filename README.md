###Single-Page Application "Dictionary Quiz"

###Description
Application is designed to check user vocabulary. After user registration (`#/user`) the quiz begins (`#/questions`). During the quiz user can make only two mistakes - after third mistake the quiz is over.
If user fails with right word value input, second attempt is provided.

###Demo
https://dictionary-quiz.herokuapp.com

###Development
+ Client built on the top of React.js. React-router used for routing between different 'pages'.

+ Server api: Express.js 4, Sequelize ORM 3v, Sqlite3, session storage: [session-file-store](https://github.com/valery-barysok/session-file-store).

+ After installing npm and bower dependencies, run `grunt compile` task command for client `.coffee` compilation. 

+ Default grunt task starts express server on `8080` port. All api `.js` files under `nodedemon` watch till the development process.

+ Before deploy run `grunt build` to rewrite index.html `data-main` attribute value and to create requirejs destination file `client/build/main.js`.

###Browsers compatibility
Tested in Chrome (v42), Safari (v7.0), Firefox (v37).

###Issues
Report please about all found bugs in project [issues](https://github.com/designeng/dictionary-quiz/issues).