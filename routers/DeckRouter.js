const deckRouter = require('express').Router();

const deck = require('../models/deck-model');

deckRouter.get('/', async (req, res) => {
  const [decks] = await deck.findAllDeck(req.query);
  res.json(decks);
});

deckRouter.get('/:id', async (req, res) => {
  const [deckByUser] = await deck.findAllDeckForOneUser(req.params.id);
  if (deckByUser) {
    res.json(deckByUser);
  } else {
    res.status(404).json();
  }
});

deckRouter.get('/cardlist/:id', async (req, res) => {
  const [listCardDeck] = await deck.findAllCardForOneDeck(req.params.id);
  if (listCardDeck) {
    res.json(listCardDeck);
  } else {
    res.status(404).json();
  }
});

deckRouter.post('/deckadd/:id', async (req, res) => {
  await deck.createDeck(req.body, req.params.id);
  return res.status(201).json();
});

deckRouter.put('/namedeckupdate/:id', async (req, res) => {
  await deck.updateNameDeck(req.body, req.params.id);
  return res.status(204).json(`le nom du deck a bien ete modifié`);
});

deckRouter.delete('/deckdelete', async (req, res) => {
  await deck.deleteDeck(req.body);
  return res.status(204).json(`le deck numero ${req.body} à bien été supprimé`);
});

module.exports = deckRouter;
