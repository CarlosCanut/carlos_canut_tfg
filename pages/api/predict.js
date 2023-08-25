// pages/api/predict.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Handle POST request
      var draftSelection = req.body
      
      const prediction = await fetch('https://getdraftrecommendations.azurewebsites.net/api/GetRecommendation?code=_xa3LE2hVxa8xQcr-5B0UfdS35_pvXmtH41RXfnJ-xCvAzFuTev1Ww==', {
          method: 'POST',
          body: JSON.stringify(draftSelection),
          headers: {
              'Content-Type': 'application/json'
          }
      });
      res.status(200).json(await prediction.json());
    } else {
      // Handle other request methods
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  