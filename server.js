
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Database Table with PostGIS
const initDb = async () => {
  try {
    await pool.query('CREATE EXTENSION IF NOT EXISTS postgis;');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS incidents (
        id SERIAL PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        description TEXT,
        location GEOGRAPHY(Point, 4326) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    console.log("Database initialized successfully");
  } catch (err) {
    console.error("DB Init Error:", err);
  }
};
initDb();

// Endpoints
app.post('/api/report', async (req, res) => {
  const { type, description, lat, lng } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO incidents (type, description, location) VALUES ($1, $2, ST_MakePoint($3, $4)) RETURNING *',
      [type, description, lng, lat]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/incidents', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, type, description, ST_Y(location::geometry) as lat, ST_X(location::geometry) as lng, created_at FROM incidents ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Backend listening at http://0.0.0.0:${port}`);
});
