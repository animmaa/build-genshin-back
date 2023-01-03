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

cardRouter.get('/equipement', checkJwt, async (req, res) => {
  const [cards] = await card.findAllCardEquipement(req.query);
  res.json(cards);
}); 
cardRouter.get('/event', checkJwt, async (req, res) => {
  const [cards] = await card.findAllCardEvent(req.query);
  res.json(cards);
}); 
cardRouter.get('/personnage', checkJwt, async (req, res) => {
  const [cards] = await card.findAllCardPersonnage(req.query);
  res.json(cards);
}); 
cardRouter.get('/support', checkJwt, async (req, res) => {
  const [cards] = await card.findAllCardSupport(req.query);
  res.json(cards);
}); 

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

cardRouter.delete('/deletecardindeck/:deck_id/:card_id', async (req, res) => {
  const deckId = Number(req.params.deck_id)
  const cardId = Number(req.params.card_id)
  try {
    await card.deleteCardInTheDeck(cardId, deckId);
    //console.log(res)
    return res.status(201).json(`deck ${deckId}`);
    
  } catch (error) {
    return console.log(error)
  }
});

module.exports = cardRouter;
