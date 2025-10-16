const request = require('supertest');
const express = require('express');
const cors = require('cors');

const app = express();
const whitelist = [process.env.FRONTEND_URL || 'http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'success' });
});

describe('CORS validation', () => {
  it('should allow requests from the whitelisted frontend URL', async () => {
    const response = await request(app)
      .get('/test')
      .set('Origin', 'http://localhost:5173');
    expect(response.status).toBe(200);
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });

  it('should not allow requests from other origins', async () => {
    const response = await request(app)
      .get('/test')
      .set('Origin', 'http://different-origin.com');
    // a CORS error returns a 500 status code
    expect(response.status).toBe(500);
  });
});