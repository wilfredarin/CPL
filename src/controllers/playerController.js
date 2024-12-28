// GET route to view individual player details
const Player = require('../models/playerModel');
exports.getPlayerById = async function(req, res){
    try {
      const player = await Player.findById(req.params.id); // Fetch player details by ID
      res.render('player-detail', { player });
    } catch (error) {
      console.error('Error fetching player:', error);
      res.status(500).send('Error fetching player details');
    }
  };
  


    
exports.getPlayers = async function(req, res){
    try {
      const players = await Player.find({});
       // Fetch all players from the database
      res.render('player', { players });
    } catch (error) {
      console.error('Error fetching players:', error);
      res.status(500).send('Error fetching players');
    }
  };
  