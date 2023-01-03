const deckRouter = require('express').Router();

const deck = require('../models/deck-model');

deckRouter.get('/', async (req, res) => {
  const [decks] = await deck.findAllDeck(req.query);
  try {
    res.json(decks);
  } catch (error) {
    res.json(error);
  }
});

deckRouter.get('/number/:deck_id/:card_id', async (req, res) => {
  const deckId = Number(req.params.deck_id);
  const cardId = Number(req.params.card_id);

  const [[number]] = await deck.findNumberCardInTheDeck(cardId, deckId);
  try {
    res.json(number);
  } catch (error) {
    res.json(error);
  }
});

deckRouter.get('/:id', async (req, res) => {
  const [deckByUser] = await deck.findAllDeckForOneUser(req.params.id);
  try {
    if (deckByUser) {
      res.json(deckByUser);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    res.json(error);
  }
});

deckRouter.get('/cardlist/:id', async (req, res) => {
  const [listCardDeck] = await deck.findAllCardForOneDeck(req.params.id);
  try {
    if (listCardDeck) {
      res.json(listCardDeck);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    res.json(error);
  }
});

deckRouter.get('/totalpersonnage/:id', async (req, res) => {
  const [[nomberPersonnage]] = await deck.findPersonnageNumberCardInTheDeck(
    req.params.id,
  );
  try {
    if (nomberPersonnage) {
      res.json(nomberPersonnage);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    res.json(error);
  }
});

deckRouter.get('/totalcard/:id', async (req, res) => {
  const [[numberTotal]] = await deck.findTotalNumberCardInTheDeck(
    req.params.id,
  );
  try {
    if (numberTotal) {
      res.json(numberTotal);
    } else {
      res.status(404).json();
    }
  } catch (error) {
    res.json(error);
  }
});

deckRouter.post('/deckadd/:id', async (req, res) => {
  await deck.createDeck(req.body, req.params.id);
  try {
    return res.status(201).json();
  } catch (error) {
    return res.json(error);
  }
});

deckRouter.put('/namedeckupdate/:id', async (req, res) => {
  await deck.updateNameDeck(req.body, req.params.id);
  try {
    return res.status(204).json('le nom du deck a bien ete modifié');
  } catch (error) {
    return res.json(error);
  }
});

deckRouter.delete('/deckdelete', async (req, res) => {
  await deck.deleteDeck(req.body);
  try {
    return res
      .status(204)
      .json(`le deck numero ${req.body} à bien été supprimé`);
  } catch (error) {
    return res.json(error);
  }
});

module.exports = deckRouter;
