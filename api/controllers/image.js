require('dotenv').config();

const handleApiCall = (req, res) => {
    const returnClarifaiRequestOptions = () => {
        const PAT = process.env.myPAT;
        const USER_ID = process.env.myUSER_ID;       
        const APP_ID = process.env.myAPP_ID;
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
            .then(response => {
                if (!response.ok) {
                    throw new Error('Person Vehicle Detection API call failed');
                }
                response.json();
            })
            .then(data => {
                if (!data?.outputs || data.outputs.length === 0) {
                    throw new Error('Person Vehicle Detection returned no outputs');
                }
                return data;
            });
        };

        const fetchOCRSceneEnglish = () => {
            return fetch("https://api.clarifai.com/v2/models/ocr-scene-english-paddleocr/versions/40dbb2c9cde44a27af226782e7157006/outputs", returnClarifaiRequestOptions())
                .then(response => {
                    if (!response.ok) {
                        throw new Error('OCR Scene English API call failed');
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data?.outputs || data.outputs.length === 0) {
                        throw new Error('OCR Scene English returned no outputs');
                    }
                    return data;
                });
        };

    // Using Promise.all() to wait for both fetches to complete
    Promise.all([fetchPersonVehicleDetection(), fetchOCRSceneEnglish()])
        .then(results => {
            const [personVehicleData, ocrSceneData] = results;
            res.json({
                personVehicleDetection: personVehicleData,
                ocrSceneEnglish: ocrSceneData
            });
        })
        .catch(err => {
            console.error('Error working with the API:', err);
            res.status(400).json({ error: 'Error working with the API', details: err.message });
        });
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

