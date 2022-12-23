const Card = require('../models/card');

exports.getCards = (req, res) => {
  Card.find().select()
    .then((cards) => {
      res.json({
        cards
      })
    })
    .catch(err => console.log(err));
}

exports.getCard = (req, res) => {
  Card.findOne({
      _id: req.params.id
    }).select()
    .then((card) => {
      res.json({
        card
      })
    })
    .catch(err => console.log(err));
}

exports.addCard = (req, res) => {
  Card.create(req.body)
    .then(card => {
      res.send(201, card);
    })
    .catch(err => res.send(err));
}

exports.editCard = (req, res) => {
  Card.findOneAndUpdate({
      _id: req.params.id
    }, {
      upsert: true
    })
    .then(card => {
      res.send(204, {
        card
      });
    })
    .catch(err => res.send(err));
}

exports.deleteCard = (req, res) => {
  Card.findOneAndDelete({
      _id: req.params.id
    })
    .then(res => res.send(204, 'Card is deleted'))
    .catch(err => res.send(err));
}
