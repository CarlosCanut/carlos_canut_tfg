// pages/api/predict.js

export default function handler(req, res) {
    if (req.method === 'POST') {
      // Handle POST request
      res.status(200).json({ message: 'Predicting...' });
    } else {
      // Handle other request methods
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  