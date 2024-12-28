const Team = require('../models/teamModel');
const Player = require('../models/playerModel');
const generateRandomTeams = require('../utils/generateTeams');

// Show landing page
exports.showTeams = async (req, res) => {
  const teams = await Team.find().populate('captain viceCaptain');
  res.render('index', { teams });
};

// Show generate page
exports.showGeneratePage = (req, res) => {
  res.render('generate');
};

// Generate teams and redirect
exports.generateTeams = async (req, res) => {
  await generateRandomTeams();
  res.redirect('/');
};

// Show team players after generation
exports.showGeneratedTeams = async (req, res) => {
  const teams = await Team.find()
    .populate('players')
    .populate('captain viceCaptain');

  res.render('teams', { teams });
};





exports.getTeams = async function (req, res) {
  try {
    const teams = await Team.find()
      .populate('captain', 'name playerCode')  // Populate captain with name and playerCode
      .populate('viceCaptain', 'name playerCode')  // Populate vice-captain with name and playerCode
      .populate('batsmen', 'name playerCode')  // Populate batsmen with name and playerCode
      .populate('bowlers', 'name playerCode')  // Populate bowlers with name and playerCode
      .populate('battingAllRounders', 'name playerCode')  // Populate batting all-rounders with name and playerCode
      .populate('ballingAllRounders', 'name playerCode')  // Populate bowling all-rounders with name and playerCode
      .populate('girls', 'name playerCode');  // Populate girls with name and playerCode

    // Render the landing page with teams data
    res.render('landing', { teams });
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).send('Server error');
  }
}




// GET route to show the edit form



exports.getTeamEdit = async function (req, res){
  try {
    // Find the team by ID
    console.log(req.params.teamId);
    const team = await Team.findById(req.params.teamId)
      .populate('captain viceCaptain batsmen bowlers ballingAllRounders battingAllRounders girls');

  
    // Fetch all players to display in the dropdown list for captain and vice-captain
    const players = await Player.find({playerCode: { $exists: false }});

    res.render('edit-team', {
      team,
      players,
    });
  } catch (error) {
    console.error('Error fetching team:', error);
    res.status(500).send('Error fetching team');
  }
};



// POST route to handle the team edit form submission
  exports.postTeamEdit = async function(req, res){
  try {
    const { name, captain, viceCaptain } = req.body;

    // Update team with new name, captain, and vice-captain
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.teamId,
      {
        name,
        captain,  // Update captain with new ID
        viceCaptain,  // Update vice-captain with new ID
      },
      { new: true }  // Return the updated document
    );

    // Redirect to the updated team page
    res.redirect("/");
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).send('Error updating team');
  }
};
