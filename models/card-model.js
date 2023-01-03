const connection = require('../config/db_config');

const db = connection.promise();

const findAllCard = () => db.query('SELECT * FROM card ORDER BY type');

const findAllCardPersonnage = () => db.query('SELECT * FROM card WHERE type="personnage" ORDER BY name');

const findAllCardEvent = () => db.query('SELECT * FROM card WHERE type="event" ORDER BY name');

const findAllCardEquipement = () => db.query('SELECT * FROM card WHERE type="equipement" ORDER BY name');

const findAllCardSupport = () => db.query('SELECT * FROM card WHERE type="support" ORDER BY name');

const findOneCardById = (id) => db.query('SELECT * FROM card WHERE id = ?', [id]);

const addCardInTheDeck = (cardId, deckId) => db.query('INSERT INTO card_deck (deck_id, card_id) VALUES (?, ?)', [
  deckId,
  cardId,
]);

// const deleteLotCardInTheDeck = ({ id }) =>
//   db.query('DELETE FROM card_deck WHERE id=?', [id]);
// requete qui supprime toute les carte identique

const deleteCardInTheDeck = (cardId, deckId) => db.query('DELETE FROM card_deck WHERE deck_id=? AND card_id=? LIMIT 1', [
  deckId,
  cardId,
]);

module.exports = {
  findAllCard,
  findAllCardEquipement,
  findAllCardEvent,
  findAllCardPersonnage,
  findAllCardSupport,
  findOneCardById,
  addCardInTheDeck,
  deleteCardInTheDeck,
};
