const mongoose = require("mongoose");



const playerSchema = new mongoose.Schema({
    name:{type:String,
        trim:true,
        lowercase:true
    },
    gender:{type:String,enum:["Male","Female"]},
    email:{type:String,unique:true},
    phone:{type:String,
        trim:true,
        lowercase:true,
        unique:true
    },
    specialization:{
        type:String,
        enum:["Batsman","Bowler","Batting all-rounder","Bowling all-rounder","Wicket-keeper","Girls","Captain","Vice Captain"]
    },
    hasPlayedCpl :{
        type:Boolean
    },
    centre:{
        type:String,
        trim:true,
        uppercase:true
    },
    batch:{
        type:String,
        trim:true
    },
    tags:[String],
    playerCode:{type:String,trim:true},
    
    jersey:{
        name:{type:String,trim:true},
        length:{type:String,enum:["Full","Half"]},
        tshirtSize:Number,
        pantSize:Number,
}

})


const PlayerModel = mongoose.model("Player",playerSchema);


module.exports = PlayerModel;