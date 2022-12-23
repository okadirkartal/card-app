const express = require('express');
const {
  getCards,
  getCard,
  addCard,
  editCard,
  deleteCard
} = require('../controllers/card');

const router = express.Router();

router.get("/", getCards);
router.get("/:id", getCard);
router.post("/", addCard);
router.put("/:id", editCard);
router.delete("/:id", deleteCard);

module.exports = router;
