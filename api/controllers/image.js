require('dotenv').config();

const handleApiCall = (req, res) => {
    const returnClarifaiRequestOptions = () => {
        
        // Your PAT (Personal Access Token) can be found in the portal under Authentification
        const PAT = process.env.myPAT;
        // Specify the correct user_id/app_id pairings
        // Since you're making inferences outside your app's scope
        const USER_ID = process.env.myUSER_ID;       
        const APP_ID = process.env.myAPP_ID;
        // Change these to whatever model and image URL you want to use
        const IMAGE_URL = req.body.input;
      
        const raw = JSON.stringify({
          "user_app_id": {
              "user_id": USER_ID,
              "app_id": APP_ID
          },
          "inputs": [
              {
                  "data": {
                      "image": {
                          "url": IMAGE_URL
                      }
                  }
              }
          ]
        });
      
        const requestOptions = {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Key ' + PAT
          },
          body: raw
        };
      
        
        return requestOptions;
       
      };
    
    const fetchPersonVehicleDetection = () => {
        return fetch("https://api.clarifai.com/v2/models/person-detection-efficientdet-lite/versions/b71b4b4e28214100906f2ad6933e1726/outputs", returnClarifaiRequestOptions())
            .then(response => response.json());
    }

    const fetchOCRSceneEnglish = () => {
        return fetch("https://api.clarifai.com/v2/models/ocr-scene-english-paddleocr/versions/40dbb2c9cde44a27af226782e7157006/outputs", returnClarifaiRequestOptions())
            .then(response => response.json());
    }

    // Using Promise.all() to wait for both fetches to complete
    Promise.all([fetchPersonVehicleDetection(), fetchOCRSceneEnglish()])
        .then(results => {
            const [personVehicleData, ocrSceneData] = results;
            res.json({
                personVehicleDetection: personVehicleData,
                ocrSceneEnglish: ocrSceneData
            });
        })
        .catch(err => res.status(400).json('Error working with the API'));
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}

