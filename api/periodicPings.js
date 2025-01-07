require('dotenv').config();
const fs = require('fs');
const path = require('path');

const INTERVAL = 20 * 60 * 1000; // 20 minutes in milliseconds
const personVehicleModelUrl = "https://api.clarifai.com/v2/models/person-detection-efficientdet-lite/versions/b71b4b4e28214100906f2ad6933e1726/outputs";
const ocrSceneEnglishModelUrl = "https://api.clarifai.com/v2/models/ocr-scene-english-paddleocr/versions/40dbb2c9cde44a27af226782e7157006/outputs";
const LOG_FILE = path.join(__dirname, 'ping_logs.txt');

const logMessage = (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFile(LOG_FILE, logEntry, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err.message);
        }
    });
};

const returnClarifaiRequestOptions = (modelUrl) => {
    const PAT = process.env.myPAT;
    const USER_ID = process.env.myUSER_ID;
    const APP_ID = process.env.myAPP_ID;
    const SAMPLE_IMAGE_URL = "https://carpp.online/logo192.png";

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": SAMPLE_IMAGE_URL
                    }
                }
            }
        ]
    });

    return {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Key ${PAT}`
        },
        body: raw
    };
};

const pingModel = async (modelName, modelUrl) => {
    try {
        const requestOptions = returnClarifaiRequestOptions(modelUrl);
        const response = await fetch(modelUrl, requestOptions);

        if (!response.ok) {
            throw new Error(`Failed to ping ${modelName} - Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.outputs) {
            logMessage(`${modelName}: Success`);
        } else {
            logMessage(`${modelName}: No outputs returned`);
        }
    } catch (error) {
        logMessage(`${modelName}: Error - ${error.message}`);
    }
};

const startPeriodicPings = () => {
    setInterval(() => pingModel("Person Vehicle Detection", personVehicleModelUrl), INTERVAL);
    setInterval(() => pingModel("OCR Scene English", ocrSceneEnglishModelUrl), INTERVAL);
    pingModel("Person Vehicle Detection", personVehicleModelUrl); // Initial ping
    pingModel("OCR Scene English", ocrSceneEnglishModelUrl); // Initial ping
};

module.exports = startPeriodicPings;
