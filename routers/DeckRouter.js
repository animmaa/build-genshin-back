const deckController = require('../controller/deck-controller');

const deckRouter = require('express').Router();

deckRouter.get('/', deckController.getAllDeck);
deckRouter.get('/fulldeck', deckController.getDeckCompletelyFilled);
deckRouter.get(
  '/number/:deck_id/:card_id',
  deckController.getNumberCardInTheDeck
);
deckRouter.get('/:id', deckController.getAllDeckForOneUser);
deckRouter.get('/infosdeck/:id', deckController.getAllInfosForOneDeck);
deckRouter.get('/cardlist/:id', deckController.getAllCardForOneDeck);
deckRouter.get(
  '/totalpersonnage/:id',
  deckController.getPersonnageNumberCardInTheDeck
);
deckRouter.get(
  '/totalcard/:id',
  deckController.getTotalNumberCardActionInTheDeck
);
deckRouter.get(
  '/totalcardinthedeck/:id',
  deckController.getTotalCardInTheDeck
);
deckRouter.post('/deckadd/:id', deckController.postCreateDeck);
deckRouter.put('/updatedeck/:id', deckController.putUpdateImageAndNameDeck);
deckRouter.patch('/publish/:id', deckController.putPublishDeck);
deckRouter.delete('/deckdelete/:id', deckController.deleteOneDeck);

module.exports = deckRouter;
