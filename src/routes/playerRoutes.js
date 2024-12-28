const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController.js');

router.get('/:id', playerController.getPlayerById);
router.get('/', playerController.getPlayers);

module.exports = router;