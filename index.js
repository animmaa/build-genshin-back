const express = require('express');
const cors = require('cors');
const cardRouter = require('./routers/CardRouter');
const deckRouter = require('./routers/DeckRouter');
const userRouter = require('./routers/UserRouter');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 8001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/card', cardRouter);
app.use('/api/deck', deckRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
  console.log(`Server run on ${port}`);
});
