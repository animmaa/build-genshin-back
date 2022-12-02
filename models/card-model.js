const connection = require('../config/db_config');

const db = connection.promise();

const findAllCard = () => db.query('SELECT * FROM card');

const findOneCardById = (id) =>
  db.query('SELECT * FROM card WHERE id = ?', [id]);

const addCardInTheDeck = ({ card_id }, deck_id) =>
  db.query('INSERT INTO card_deck (deck_id, card_id) VALUES (?, ?)', [
    deck_id,
    card_id,
  ]);

const deleteCardInTheDeck = ({ id }) =>
  db.query('DELETE FROM card_deck WHERE id=?', [id]);

module.exports = {
  findAllCard,
  findOneCardById,
  addCardInTheDeck,
  deleteCardInTheDeck,
};
