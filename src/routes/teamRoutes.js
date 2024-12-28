const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController.js');


router.get('/', teamController.getTeams);
// router.get('/', teamController.showTeams);
router.get('/generate', teamController.showGeneratePage);
router.post('/api/teams/generate-teams', teamController.generateTeams);
router.get('/teams', teamController.showGeneratedTeams);
router.get('/edit-team/:teamId',teamController.getTeamEdit)
router.post('/edit-team/:teamId',teamController.postTeamEdit)
module.exports = router;





