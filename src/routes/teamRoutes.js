const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController.js');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', teamController.getTeams);
// router.get('/', teamController.showTeams);
router.get('/generate', authMiddleware,teamController.showGeneratePage);
router.post('/api/teams/generate-teams', teamController.generateTeams);
router.get('/teams', teamController.showGeneratedTeams);
router.get('/edit-team/:teamId',authMiddleware,teamController.getTeamEdit)
router.post('/edit-team/:teamId',authMiddleware,teamController.postTeamEdit)
module.exports = router;





