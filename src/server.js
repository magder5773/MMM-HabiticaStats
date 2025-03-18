import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(join(__dirname, 'public')));

async function fetchHabiticaStats() {
  const userId = process.env.HABITICA_USER_ID;
  const apiToken = process.env.HABITICA_API_TOKEN;
  
  try {
    const response = await fetch(`https://habitica.com/api/v3/user?userFields=stats`, {
      headers: {
        'x-api-user': userId,
        'x-api-key': apiToken
      }
    });
    
    const data = await response.json();
    return {
      health: {
        current: Math.floor(data.data.stats.hp),
        max: 50
      },
      experience: {
        current: Math.floor(data.data.stats.exp),
        max: data.data.stats.toNextLevel
      },
      mana: {
        current: Math.floor(data.data.stats.mp),
        max: data.data.stats.maxMP
      },
      level: data.data.stats.lvl,
      class: data.data.stats.class,
      gold: Math.floor(data.data.stats.gp)
    };
  } catch (error) {
    console.error('Error fetching Habitica stats:', error);
    return null;
  }
}

app.get('/api/stats', async (req, res) => {
  const stats = await fetchHabiticaStats();
  if (stats) {
    res.json(stats);
  } else {
    res.status(500).json({ error: 'Failed to fetch Habitica stats' });
  }
});

app.listen(port, () => {
  console.log(`Magic Mirror Habitica module running on port ${port}`);
});