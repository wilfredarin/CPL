const mongoose = require('mongoose');
const XLSX = require('xlsx');
const Player = require('../models/playerModel');
require('dotenv').config({ path: '../.env' });
// MongoDB Connection 
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Function to import Excel data
async function importPlayersFromExcel(filePath) {
  try {
    // Load Excel File
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];  // Use first sheet
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Map Excel data to Player model fields
    const players = sheetData.map(row => ({
      name: row['Name'],  // Match Excel column names
      email: row['Email'],
      phone: row['Number'],
      specialization: row['Role'],  // Batsman, Bowler, All-Rounder
      cplExperience: row['CPL Experience'] === 'Yes' ? true : false,
      centre: row["Centre"],
      batch:row["Batch"],
    //   tags: row['Tags'] ? row['Tags'].split(',') : [],
      gender:row["Gender"],
      jersey: {
        name: row['Jersey Name'],
        length: row['Jersey Length'],
        tshirtSize: row['T-Shirt Size'],
        pantSize: row['Pant Size']
      },
      playerCode:row["playerCode"]
    }));

    // Insert into MongoDB
    await Player.insertMany(players);
    console.log('Players imported successfully!');
  } catch (error) {
    console.error('Error importing players:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the script
importPlayersFromExcel('../uploads/players.xlsx');  // Path to your Excel file
