const connection = require('../config/db_config');

const db = connection.promise();

const findAllDeck = () => db.query('SELECT namedeck FROM deck');

const findAllDeckForOneUser = (id) => db.query(
  'SELECT deck.id, namedeck FROM deck INNER JOIN user ON user.id=deck.user_id WHERE user.id=?',
  [id],
);

const findAllCardForOneDeck = (id) => db.query(
  'SELECT name, element, url, type FROM card JOIN card_deck ON card_deck.card_id=card.id WHERE deck_id=?',
  [id],
);

const findNumberCardInTheDeck = (deckId, cardId) => db.query(
  'SELECT COUNT(card_id) AS numberCard FROM card_deck WHERE deck_id=? AND card_id=?',
  [deckId, cardId],
);

const findTotalNumberCardInTheDeck = (deckId) => db.query(
  'SELECT COUNT(card_id) AS numberCard FROM card_deck WHERE deck_id=?',
  [deckId],
);

const findPersonnageNumberCardInTheDeck = (deckId) => db.query(
  'SELECT COUNT(*) AS numberPersonnageCard FROM card_deck JOIN card ON card.id=card_deck.card_id WHERE deck_id=? and type="personnage"',
  [deckId],
);

const createDeck = ({ namedeck }, id) => db.query('INSERT INTO deck (namedeck, user_id) VALUES (?, ?)', [
  namedeck,
  id,
]);

const updateNameDeck = ({ namedeck }, id) => db.query('UPDATE deck SET namedeck=? WHERE id=?', [namedeck, id]);

const deleteDeck = ({ id }) => db.query('DELETE FROM deck WHERE id=?', [id]);

module.exports = {
  findAllDeck,
  findAllDeckForOneUser,
  findAllCardForOneDeck,
  findNumberCardInTheDeck,
  findTotalNumberCardInTheDeck,
  findPersonnageNumberCardInTheDeck,
  createDeck,
  updateNameDeck,
  deleteDeck,
};
