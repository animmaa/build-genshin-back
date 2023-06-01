const cardModel = require('../models/card-model');
const deckModel = require('../models/deck-model');
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
    const [cards] = await cardModel.findAllCardPersonnage();

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

    const [arrayCard] = await deckModel.findAllIdenticalCardInTheDeck(deckId);

    const [cards] = await cardModel.findAllCardPersonnage();

    console.log('liste carte presente', arrayCard);
    if (cards.some((el) => el.id === cardId)) {
      for (const iterator of arrayCard) {
        if (iterator.card_id === cardId) {
          return res.status(409).json('la carte personnage est déjà présente');
        }
      }
    }

    for (const element of arrayCard) {
      if (element.nb_card_identical >= 3 && element.card_id === cardId) {
        console.log(element);
        return res.status(409).json('cette carte est déjà présente 3 fois');
      }
    }

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
