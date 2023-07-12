const connection = require('../config/db_config');

const db = connection.promise();

const findAllDeck = () => db.query('SELECT namedeck, id FROM deck');

const statusPublish = (id) =>
  db.query('SELECT publish FROM deck WHERE id=?', [id]);

const findAllDeckForOneUser = (id) =>
  db.query(
    'SELECT deck.id, namedeck, imgdeckone, imgdecktwo, imgdeckthree, publish FROM deck INNER JOIN user ON user.id=deck.user_id WHERE user.id=? ORDER BY deck.id desc',
    [id]
  );

const findAllInfosForOneDeck = (id) =>
  db.query(
    'SELECT namedeck, imgdeckone, imgdecktwo, imgdeckthree FROM deck WHERE id=?',
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
    'SELECT COUNT(card_id) AS numberCard FROM card_deck JOIN card ON card.id=card_deck.card_id WHERE deck_id=?',
    [deckId]
  );

const findPersonnageNumberCardInTheDeck = (deckId) =>
  db.query(
    'SELECT COUNT(*) AS numberPersonnageCard FROM card_deck JOIN card ON card.id=card_deck.card_id WHERE deck_id=? and type="personnage"',
    [deckId]
  );

const findAllNumberCardInTheDeckWithoutCharacter = (deckId) =>
  db.query(
    'SELECT COUNT(*) AS numberCard FROM card_deck JOIN card ON card.id=card_deck.card_id WHERE deck_id=? and type!="personnage"',
    [deckId]
  );

const findAllIdenticalCardInTheDeck = (deckId) =>
  db.query(
    'SELECT card_id, count(card_id) as nb_card_identical FROM card_deck WHERE deck_id=? GROUP BY card_id',
    [deckId]
  );

const findFullDeck = () =>
  db.query(
    'SELECT DISTINCT deck_id, COUNT(deck_id) AS fulldeck, namedeck, imgdeckone, imgdecktwo, imgdeckthree FROM card_deck JOIN deck ON deck.id=card_deck.deck_id WHERE publish=1 GROUP BY deck_id HAVING fulldeck = 33'
  );

const createDeck = ({ namedeck, imgdeckone, imgdecktwo, imgdeckthree }, id) =>
  db.query(
    'INSERT INTO deck (namedeck, imgdeckone, imgdecktwo, imgdeckthree, user_id) VALUES (?, ?, ?, ?, ?)',
    [namedeck, imgdeckone, imgdecktwo, imgdeckthree, id]
  );

const updateImageAndNameDeck = (
  { namedeck, imgdeckone, imgdecktwo, imgdeckthree },
  id
) =>
  db.query(
    'UPDATE deck SET namedeck=?, imgdeckone=?, imgdecktwo=?, imgdeckthree=? WHERE id=?',
    [namedeck, imgdeckone, imgdecktwo, imgdeckthree, id]
  );

const updatePublishDeckTrue = (id) =>
  db.query('UPDATE deck SET publish = true WHERE publish = false AND id=?', [
    id,
  ]);

const updatePublishDeckFalse = (id) =>
  db.query('UPDATE deck SET publish = false WHERE publish = true AND id=?', [
    id,
  ]);

const deleteDeck = ({ id }) => db.query('DELETE FROM deck WHERE id=?', [id]);

module.exports = {
  findAllDeck,
  statusPublish,
  findAllDeckForOneUser,
  findAllInfosForOneDeck,
  findAllCardForOneDeck,
  findFullDeck,
  findNumberCardInTheDeck,
  findTotalNumberCardInTheDeck,
  findAllNumberCardInTheDeckWithoutCharacter,
  findAllIdenticalCardInTheDeck,
  findPersonnageNumberCardInTheDeck,
  createDeck,
  updateImageAndNameDeck,
  updatePublishDeckTrue,
  updatePublishDeckFalse,
  deleteDeck,
};
