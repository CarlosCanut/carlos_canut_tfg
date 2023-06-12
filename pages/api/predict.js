// pages/api/predict.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      // Handle POST request
      var draftSelection = req.body
      
      const prediction = await fetch('https://loldrafts.azurewebsites.net/api/GetRecommendation?code=vfynHemzgvugvz7ceQhqVFrVKxgWlgfHsgiqd3bkaJK7AzFuiVfv1Q==', {
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
  