###Single-Page Application "Dictionary Quiz"

###Description
Application is designed to check user vocabulary. After user registration (`#/user`) the quiz begins (`#/questions`). During the quiz user can make only two mistakes - after third mistake the quiz is over.
If user fails with right word value input, second attempt is provided.
Mistakes are saved in database to get statistic for most popular mistakes.
User result will be saved to database on quiz end too.

###Demo
https://dictionary-quiz.herokuapp.com

###Development
+ Client built on the top of React.js. React-router used for routing between different 'pages'. (I used `coffeescript` for client modules for the reason the React `.jsx` should be compiled anyway - `grunt-coffee-react` responds for it.)

+ Server api: Express.js 4, Sequelize ORM 3v, Sqlite3, session storage: [session-file-store](https://github.com/valery-barysok/session-file-store).

+ After installing npm and bower dependencies (`npm install`, `bower install`), run `grunt compile` task command for client `.coffee` compilation. 

+ Default grunt task (as well as `npm start` command) starts express server, so just open in your favorite browser `http://localhost:8080/`. All api `.js` files under `nodedemon` watch till the development process.

+ Before deploy run `grunt build` to rewrite index.html `data-main` attribute value and to create requirejs destination file `client/build/main.js`.

###Browsers compatibility
Tested in Chrome (v42), Safari (v7.0), Firefox (v37).

###Issues
Report please about all found bugs in project [issues](https://github.com/designeng/dictionary-quiz/issues).