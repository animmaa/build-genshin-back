const cardRouter = require('express').Router();

const cardController = require('../controller/card-controller');

cardRouter.get('/', cardController.getAllCards); // avec check authorization
cardRouter.get('/equipement', cardController.getAllCardsEquipment);
cardRouter.get('/event', cardController.getAllCardsEvent);
cardRouter.get('/personnage', cardController.getAllCardsPersonnage);
cardRouter.get('/support', cardController.getAllCardsSupport);
cardRouter.get('/:id', cardController.getFindOneCardById);
cardRouter.post('/addcardindeck/:deckid/:cardid', cardController.postCardInTheDeck);
cardRouter.delete('/deletecardindeck/:deck_id/:card_id', cardController.deleteCardInTheDeck);

module.exports = cardRouter;
