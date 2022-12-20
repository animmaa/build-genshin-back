const cardRouter = require('express').Router();

const checkJwt = require('../middleware/checkJwt');
const card = require('../models/card-model');

// cardRouter.get('/', async (req, res) => {
//   const [cards] = await card.findAllCard(req.query);
//   res.json(cards);
// });
cardRouter.get('/', checkJwt, async (req, res) => {
  const [cards] = await card.findAllCard(req.query);
  res.json(cards);
});    // avec check authorization

cardRouter.get('/:id', async (req, res) => {
  const [[oneCard]] = await card.findOneCardById(req.params.id);
  if (oneCard) {
    res.json(oneCard);
  } else {
    res.status(404).json();
  }
});

cardRouter.post('/addcardindeck/:deckid', async (req, res) => {
  const cardId = Number(req.params.deckid)
  await card.addCardInTheDeck(req.body, cardId);
  return res.status(201).json('la carte a ete ajouter au deck');
});

cardRouter.delete('/deletecardindeck', async (req, res) => {
  await card.deleteCardInTheDeck(req.body);
  return res.status(201).json('la carte a ete supprimé du deck');
});

module.exports = cardRouter;
