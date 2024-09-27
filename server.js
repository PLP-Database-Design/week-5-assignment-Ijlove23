Mrequire('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const app = express();

// Database connection
const connection = mysql.createConnection({
  host: process.env.localhost,
  user: process.env.root,
  password: process.env.Mi223344,
  database: process.env.hospital_db
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

// Retrieve all patients
app.get('/patients', (req, res) => {
  const sql = 'SELECT patientID, firstName, lastName, dateOfBirth FROM patients';
  
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving patients');
    }
    res.json(results);
  });
});

// Retrieve all providers
app.get('/providers', (req, res) => {
  const sql = 'SELECT firstName, lastName, specialty FROM providers';
  
  connection.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving providers');
    }
    res.json(results);
  });
});

// Filter patients by first name
app.get('/patients/filter', (req, res) => {
  const firstName = req.query.firstName;
  const sql = 'SELECT patientID, firstName, lastName, dateOfBirth FROM patients WHERE firstName = ?';
  
  connection.query(sql, [firstName], (err, results) => {
    if (err) {
      return res.status(500).send('Error filtering patients by first name');
    }
    res.json(results);
  });
});

// Retrieve providers by specialty
app.get('/providers/filter', (req, res) => {
  const specialty = req.query.specialty;
  const sql = 'SELECT firstName, lastName, specialty FROM providers WHERE specialty = ?';
  
  connection.query(sql, [specialty], (err, results) => {
    if (err) {
      return res.status(500).send('Error retrieving providers by specialty');
    }
    res.json(results);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
