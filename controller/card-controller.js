const cardModel = require('../models/card-model');
const checkJwt = require('../middleware/checkJwt');

const cardController = {
  getAllCards: async (req, res) => {
    const [cards] = await cardModel.findAllCard(req.query);
    try {
      res.json(cards);
    } catch (error) {
      res.json(error);
    }
  },

  getAllCardsEquipment: async (req, res) => {
    const [cards] = await cardModel.findAllCardEquipement(req.query);
    try {
      res.json(cards);
    } catch (error) {
      res.json(error);
    }
  },

  getAllCardsEvent: async (req, res) => {
    const [cards] = await cardModel.findAllCardEvent(req.query);
    try {
      res.json(cards);
    } catch (error) {
      res.json(error);
    }
  },

  getAllCardsPersonnage: async (req, res) => {
    const [cards] = await cardModel.findAllCardPersonnage(req.query);
    try {
      res.json(cards);
    } catch (error) {
      res.json(error);
    }
  },

  getAllCardsSupport: async (req, res) => {
    const [cards] = await cardModel.findAllCardSupport(req.query);
    try {
      res.json(cards);
    } catch (error) {
      res.json(error);
    }
  },

  getFindOneCardById: async (req, res) => {
    const [[oneCard]] = await cardModel.findOneCardById(req.params.id);
    try {
      if (oneCard) {
        res.json(oneCard);
      } else {
        res.status(404).json();
      }
    } catch (error) {
      res.json(error);
    }
  },

  postCardInTheDeck: async (req, res) => {
    const cardId = Number(req.params.cardid);
    const deckId = Number(req.params.deckid);
    try {
      await cardModel.addCardInTheDeck(cardId, deckId);
      return res.status(201).json('la carte a ete ajouter au deck');
    } catch (error) {
      return res.json(error);
    }
  },

  deleteCardInTheDeck: async (req, res) => {
    const deckId = Number(req.params.deck_id);
    const cardId = Number(req.params.card_id);
    try {
      await cardModel.deleteCardInTheDeck(cardId, deckId);
      return res.status(201).json(`deck ${deckId}`);
    } catch (error) {
      return res.json(error);
    }
  },
};

module.exports = cardController;
