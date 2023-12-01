// src/server.ts

const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('roi_data.db');

// Create 'roi' table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS roi (
    id INTEGER PRIMARY KEY,
    initial_value REAL,
    expected_return REAL,
    start_date TEXT,
    end_date TEXT,
    annual_roi REAL,
    datetime TEXT
  )
`);

// Parse JSON requests
app.use(bodyParser.json());

// Fetch previous calculations from the database
app.get('/previousCalculations', (_req, res) => {
  db.all('SELECT * FROM roi order by Id desc', (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
      console.error('Retrieve Success');
    }
  });
});

// Calculate ROI and save to the database
app.post('/calculateROI', (req, res) => {
  const { initialValue, expectedReturn, startDate, endDate } = req.body;

  // Calculate investment duration in years
  const investmentDuration = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (365 * 24 * 60 * 60 * 1000);

  // Calculate total investment
  const totalInvestment = initialValue + expectedReturn;

  // Calculate annual ROI
  const annualROI = ((expectedReturn / totalInvestment) * 100) / investmentDuration;

  const timestamp = new Date().toLocaleString();

  // Save data to the database
  db.run(
    'INSERT INTO roi (initial_value, expected_return, start_date, end_date, annual_roi, datetime) VALUES (?, ?, ?, ?, ?, ?)',
    [initialValue, expectedReturn, startDate, endDate, annualROI, timestamp],
    (err) => {
      if (err) {
        console.error('Error inserting data:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log('Data inserted into the database');
        res.status(200).json({ message: 'ROI calculation saved successfully', annualROI });
      }
    }
  );
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/calculator.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
