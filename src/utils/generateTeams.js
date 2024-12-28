const Player = require('../models/playerModel');
const Team = require('../models/teamModel');

async function generateRandomTeams(teamCount = 5, excludePlayers = []) {
  try {
    // Fetch players with playerCode and exclude selected ones
    let players = await Player.find({ 
      playerCode: { $exists: true, $ne: null },
      _id: { $nin: excludePlayers } 
    });

    const extractCodeType = (code) => code ? code.substring(0, 3) : null;
    const shuffle = (array) => {
      return array.sort(() => Math.random() - 0.5);
    };
    // Group by playerCode

    const grouped = players.reduce((acc, player) => {
        const codeType = extractCodeType(player.playerCode);
        if (codeType) {
          acc[codeType] = acc[codeType] || [];
          acc[codeType].push(player);
        }
        return acc;
      }, {});
      let teams = Array.from({ length: teamCount }, () => ({
        batsman: [],
        bowler: [],
        ballingAllRounders: [],
        girls: [],
        battingAllRounders:[]
      }));
  
      // Distribute players evenly
      Object.keys(grouped).forEach((codeType) => {
        const shuffledPlayers = shuffle(grouped[codeType]);
        console.log(shuffledPlayers)
        shuffledPlayers.forEach((player, index) => {
          const teamIndex = index % teamCount;
          switch (codeType) {
            case 'BAT':
              teams[teamIndex].batsman.push(player._id);
              break;
            case 'BAL':
              teams[teamIndex].battingAllRounders.push(player._id);
              break;
            case 'BOW':
              teams[teamIndex].ballingAllRounders.push(player._id);
              break;
            case 'GAL':
              teams[teamIndex].girls.push(player._id);
              break;
          }
        });
      });

      await Team.deleteMany({});
      // console.log(teams)
      // Save generated teams
      const savedTeams = await Team.insertMany(
        teams.map((t, index) => ({
          name: `Team ${index + 1}`,
          captain: null,
          viceCaptain: null,
          batsmen: t.batsman,
          bowlers: t.bowler,
          battingAllRounders: t.battingAllRounders,
          ballingAllRounders: t.ballingAllRounders,
          girls: t.girls,
          cplTitles: []
        }))
      );
  
      // console.log('Teams generated and saved:', savedTeams);
      return savedTeams;
  
    } catch (error) {
      console.error('Error generating teams:', error);
    }
  }
  
  module.exports = generateRandomTeams;



  