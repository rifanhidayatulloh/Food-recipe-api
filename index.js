const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const xss = require('xss-clean');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./src/router/users.route');
const recipeRoute = require('./src/router/recipe.route');
const commetRoute = require('./src/router/comment.route');
const authRoute = require('./src/router/auth.route');

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(xss());
app.use(cors());
app.use(bodyParser.json());
app.use(userRoute);
app.use(recipeRoute);
app.use(commetRoute);
app.use(authRoute);
app.use(express.static('public'));

app.listen(port, () => {
  console.log('Service running on PORT ' + port);
});
