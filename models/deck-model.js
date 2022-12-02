const connection = require('../config/db_config');

const db = connection.promise();

const findAllDeck = () => db.query('SELECT namedeck FROM deck');

const findAllDeckForOneUser = (id) =>
  db.query(
    'SELECT namedeck FROM deck INNER JOIN user ON user.id=deck.user_id WHERE user.id=?',
    [id]
  );

const findAllCardForOneDeck = (id) =>
  db.query(
    'SELECT name, element FROM card JOIN card_deck ON card_deck.card_id=card.id WHERE deck_id=?',
    [id]
  );

const createDeck = ({ namedeck }, id) =>
  db.query('INSERT INTO deck (namedeck, user_id) VALUES (?, ?)', [
    namedeck,
    id,
  ]);

const updateNameDeck = ({ namedeck }, id) =>
  db.query('UPDATE deck SET namedeck=? WHERE id=?', [namedeck, id]);

const deleteDeck = ({ id }) => db.query('DELETE FROM deck WHERE id=?', [id]);

module.exports = {
  findAllDeck,
  findAllDeckForOneUser,
  findAllCardForOneDeck,
  createDeck,
  updateNameDeck,
  deleteDeck,
};
