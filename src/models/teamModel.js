const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  captain: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  viceCaptain: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  batsmen: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  bowlers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  ballingAllRounders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  battingAllRounders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  cplTitles :[String],
  girls:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
});

module.exports = mongoose.model('Team', teamSchema);
