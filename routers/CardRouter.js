const cardRouter = require('express').Router();

const checkJwt = require('../middleware/checkJwt');
const card = require('../models/card-model');

cardRouter.get('/', async (req, res) => {
  const [cards] = await card.findAllCard(req.query);
  try {
    res.json(cards);
  } catch (error) {
    res.json(error);
  }
}); // avec check authorization

cardRouter.get('/equipement', async (req, res) => {
  const [cards] = await card.findAllCardEquipement(req.query);
  try {
    res.json(cards);
  } catch (error) {
    res.json(error);
  }
});
cardRouter.get('/event', async (req, res) => {
  const [cards] = await card.findAllCardEvent(req.query);
  try {
    res.json(cards);
  } catch (error) {
    res.json(error);
  }
});
cardRouter.get('/personnage', async (req, res) => {
  const [cards] = await card.findAllCardPersonnage(req.query);
  try {
    res.json(cards);
  } catch (error) {
    res.json(error);
  }
});
cardRouter.get('/support', async (req, res) => {
  const [cards] = await card.findAllCardSupport(req.query);
  try {
    res.json(cards);
  } catch (error) {
    res.json(error);
  }
});

cardRouter.get('/:id', async (req, res) => {
  const [[oneCard]] = await card.findOneCardById(req.params.id);
  try {
    if (oneCard) {
      res.json(oneCard);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    res.json(error);
  }
});

cardRouter.post('/addcardindeck/:deckid/:cardid', async (req, res) => {
  const cardId = Number(req.params.cardid);
  const deckId = Number(req.params.deckid);
  try {
    await card.addCardInTheDeck(cardId, deckId);
    return res.status(201).json('la carte a ete ajouter au deck');
  } catch (error) {
    return res.json(error);
  }
});

cardRouter.delete('/deletecardindeck/:deck_id/:card_id', async (req, res) => {
  const deckId = Number(req.params.deck_id);
  const cardId = Number(req.params.card_id);
  try {
    await card.deleteCardInTheDeck(cardId, deckId);
    return res.status(201).json(`deck ${deckId}`);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = cardRouter;
