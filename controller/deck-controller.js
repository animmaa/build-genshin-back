const deckModel = require('../models/deck-model');

const deckController = {
  getAllDeck: async (req, res) => {
    const [decks] = await deckModel.findAllDeck(req.query);
    try {
      res.json(decks);
    } catch (error) {
      res.json(error);
    }
  },

  getDeckCompletelyFilled: async (req, res) => {
    const [fulldeck] = await deckModel.findFullDeck(req.body);
    try {
      res.json(fulldeck);
    } catch (error) {
      res.json(error);
    }
  },

  getNumberCardInTheDeck: async (req, res) => {
    const deckId = Number(req.params.deck_id);
    const cardId = Number(req.params.card_id);

    const [[number]] = await deckModel.findNumberCardInTheDeck(cardId, deckId);
    try {
      res.json(number);
    } catch (error) {
      res.json(error);
    }
  },

  getAllDeckForOneUser: async (req, res) => {
    const [deckByUser] = await deckModel.findAllDeckForOneUser(req.params.id);
    try {
      if (deckByUser) {
        res.json(deckByUser);
      } else {
        res.status(404).json();
      }
    } catch (error) {
      res.json(error);
    }
  },

  getAllInfosForOneDeck: async (req, res) => {
    const [[infosdeck]] = await deckModel.findAllInfosForOneDeck(req.params.id);
    try {
      if (infosdeck) {
        res.json(infosdeck);
      } else {
        res.status(404).json();
      }
    } catch (error) {
      res.json(error);
    }
  },

  getAllCardForOneDeck: async (req, res) => {
    const [listCardDeck] = await deckModel.findAllCardForOneDeck(req.params.id);
    try {
      if (listCardDeck) {
        res.json(listCardDeck);
      } else {
        res.status(404).json();
      }
    } catch (error) {
      res.json(error);
    }
  },

  getPersonnageNumberCardInTheDeck: async (req, res) => {
    const [[nomberPersonnage]] =
      await deckModel.findPersonnageNumberCardInTheDeck(req.params.id);
    try {
      if (nomberPersonnage) {
        res.json(nomberPersonnage);
      } else {
        res.status(404).json();
      }
    } catch (error) {
      res.json(error);
    }
  },

  getTotalNumberCardActionInTheDeck: async (req, res) => {
    const [[numberTotal]] = await deckModel.findTotalNumberCardActionInTheDeck(
      req.params.id
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
  },

  postCreateDeck: async (req, res) => {
    const image =
      'https://s3.us-east-1.amazonaws.com/gamewith-en/article_tools/genshin-impact/gacha/card_i_85.png';
    const initialImage = {
      namedeck: req.body.namedeck,
      imgdeckone: image,
      imgdecktwo: image,
      imgdeckthree: image,
    };

    await deckModel.createDeck(initialImage, req.params.id);
    try {
      return res.status(201).json();
    } catch (error) {
      return res.json(error);
    }
  },

  putUpdateImageAndNameDeck: async (req, res) => {
    await deckModel.updateImageAndNameDeck(req.body, req.params.id);
    const [decks] = await deckModel.findAllDeck(req.query);
    if (decks.some((e) => e.id == req.params.id)) {
      try {
        return res.status(204).json('deck modifié');
      } catch (error) {
        return res.json(error);
      }
    } else {
      return res.status(404).json('Le deck est introuvable');
    }
  },

  deleteOneDeck: async (req, res) => {
    await deckModel.deleteDeck(req.params);
    try {
      return res
        .status(204)
        .json(`le deck numero ${req.body} à bien été supprimé`);
    } catch (error) {
      return res.json(error);
    }
  },
};

module.exports = deckController;
