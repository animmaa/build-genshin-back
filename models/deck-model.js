const connection = require('../config/db_config');

const db = connection.promise();

const findAllDeck = () => db.query('SELECT namedeck, id FROM deck');

const findAllDeckForOneUser = (id) =>
  db.query(
    'SELECT deck.id, namedeck, imgdeckone, imgdecktwo, imgdeckthree FROM deck INNER JOIN user ON user.id=deck.user_id WHERE user.id=?',
    [id]
  );

const findAllCardForOneDeck = (id) =>
  db.query(
    'SELECT name, element, url, type FROM card JOIN card_deck ON card_deck.card_id=card.id WHERE deck_id=? ORDER BY FIELD(type, "personnage", "equipement", "support", "event")',
    [id]
  );

const findNumberCardInTheDeck = (deckId, cardId) =>
  db.query(
    'SELECT COUNT(card_id) AS numberCard FROM card_deck WHERE deck_id=? AND card_id=?',
    [deckId, cardId]
  );

const findTotalNumberCardInTheDeck = (deckId) =>
  db.query(
    'SELECT COUNT(card_id) AS numberCard FROM card_deck WHERE deck_id=?',
    [deckId]
  );

const findPersonnageNumberCardInTheDeck = (deckId) =>
  db.query(
    'SELECT COUNT(*) AS numberPersonnageCard FROM card_deck JOIN card ON card.id=card_deck.card_id WHERE deck_id=? and type="personnage"',
    [deckId]
  );

const findFullDeck = () =>
  db.query(
    'SELECT DISTINCT deck_id, COUNT(deck_id) AS fulldeck, namedeck FROM card_deck JOIN deck ON deck.id=card_deck.deck_id GROUP BY deck_id HAVING fulldeck = 30'
  );

const createDeck = ({ namedeck, imgdeckone, imgdecktwo, imgdeckthree }, id) =>
  db.query(
    'INSERT INTO deck (namedeck, imgdeckone, imgdecktwo, imgdeckthree, user_id) VALUES (?, ?, ?, ?, ?)',
    [namedeck, imgdeckone, imgdecktwo, imgdeckthree, id]
  );

// const updateNameDeck = ({ namedeck }, id) =>
//   db.query('UPDATE deck SET namedeck=? WHERE id=?', [namedeck, id]);

const updateNameDeck = (
  { namedeck, imgdeckone, imgdecktwo, imgdeckthree },
  id
) =>
  db.query(
    'UPDATE deck SET namedeck=?, imgdeckone=?, imgdecktwo=?, imgdeckthree=? WHERE id=?',
    [namedeck, imgdeckone, imgdecktwo, imgdeckthree, id]
  );

const deleteDeck = ({ id }) => db.query('DELETE FROM deck WHERE id=?', [id]);

module.exports = {
  findAllDeck,
  findAllDeckForOneUser,
  findAllCardForOneDeck,
  findFullDeck,
  findNumberCardInTheDeck,
  findTotalNumberCardInTheDeck,
  findPersonnageNumberCardInTheDeck,
  createDeck,
  updateNameDeck,
  deleteDeck,
};
