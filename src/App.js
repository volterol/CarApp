import React, { Component } from 'react';
import Header from './components/Header/Header';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
//import NumRecognition from './components/NumRecognition/NumRecognition';
import VehicleNumRecognition from './components/VehicleNumRecognition/VehicleNumRecognition';



const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  blueBox: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: '',
    entries: 0
  },
  isNumLoaded: false,
  num: '',
  rejectedNums: [],
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onButtonSubmit = () => {

    if (this.state.input.trim() === '') {
      alert('Please provide a valid image URL.');
      return;
    }

    this.setState({box: [], imageUrl: this.state.input, isNumLoaded: true, num: '' });
    fetch('https://carpp.online:3000/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch image.');
        }
        return response.json();
      })
      .then((data) => {
        const numLocations = this.filterNums(data).filtered_arr.map((i) =>
          data.ocrSceneEnglish.outputs[0].data.regions[i].region_info.bounding_box
        );
        const numLocationLines = numLocations.map((location) => this.calculateBorders(location));
        const vehicleData = this.filterVehicles(data).map((i) =>
          data.personVehicleDetection.outputs[0].data.regions[i].region_info.bounding_box
        );
        const vehicleLocationLines = vehicleData.map((location) => this.calculateBorders(location));
  
        // Filter boxes and plates based on blueBox
        this.displayBox(numLocationLines, vehicleLocationLines);
        const { filteredPlates, rejectedPlates } = this.outputNumPlate(data, vehicleLocationLines); 
  
        this.loadNum(filteredPlates, rejectedPlates); 
        this.updateImageEntries(); //triggers hadleImage in server.js
      })
      .catch((error) => {
        console.log('error', error);
        alert('Error processing the image. Please try again.');
      });
  };
  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined,
      entries: data.entries
    }})
  }

  calculateBorders = (data) => {
    const clarifai = data;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifai.left_col * width,
      topRow: clarifai.top_row * height,
      rightCol: width - (clarifai.right_col * width),
      bottomRow: height - (clarifai.bottom_row * height)
    }
  };

  isBoxWithinBlueBox = (box, blueBox) => {
    return (
      box.leftCol >= blueBox.leftCol &&
      box.rightCol <= blueBox.rightCol &&
      box.topRow >= blueBox.topRow &&
      box.bottomRow <= blueBox.bottomRow
    );
  };

  displayBox = (boxes, blueBoxes) => {
    // Filter each box to see if it's within any blueBox
    const filteredBoxes = boxes.filter((box) =>
      blueBoxes.some((blueBox) => this.isBoxWithinBlueBox(box, blueBox))
    );
    this.setState({ box: filteredBoxes });
  };

  filterNums = (data) => {
    console.log(data);
    let filtered_arr = [];
    let strings_arr = [];
    let x = 0;
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '1234567890';
    Object.values(data.ocrSceneEnglish.outputs[0].data.regions).forEach((i) => {
      let numString = i.data.text.raw;
      if (numString.length >= 5 
        && numString.length <= 7 
        && numbers.includes(numString.charAt(0)) 
        && numbers.includes(numString.charAt(1))
        && alphabet.includes(numString.charAt(-1).toLowerCase())
        && alphabet.includes(numString.charAt(-2).toLowerCase())) {
          filtered_arr.push(x);
          strings_arr.push(numString)
        } 
        x++;
    });
    return { filtered_arr, strings_arr }
  };

  filterVehicles = (data) => {
    let x = 0;
    let filtered_arr = [];
    Object.values(data.personVehicleDetection.outputs[0].data.regions).forEach((i) => {
      let confirmVehicle = i.data.concepts[0]?.name;
      if (confirmVehicle === 'vehicle') {
        filtered_arr.push(x);
      }
      x++;
    });
    return filtered_arr;
  };

  outputNumPlate = (data, blueBoxes) => {
    const numData = this.filterNums(data); // Get filtered indices and strings
    const arr1 = numData.filtered_arr; // Indices of valid plates
    const filteredPlates = []; // Plates within blueBoxes
    const rejectedPlates = []; // Plates outside blueBoxes
  
    arr1.forEach((i) => {
      const boundingBox = data.ocrSceneEnglish.outputs[0].data.regions[i].region_info.bounding_box;
      const plateBoundingBox = this.calculateBorders(boundingBox);
  
      // Check if the plate's bounding box is inside any blueBox
      const isInsideBlueBox = blueBoxes.some((blueBox) =>
        this.isBoxWithinBlueBox(plateBoundingBox, blueBox)
      );
  
      let numPlate = data.ocrSceneEnglish.outputs[0].data.regions[i].data.text.raw;
  
      // Remove spaces from the recognized plate number
      numPlate = numPlate.replace(/\s+/g, '');
  
      if (isInsideBlueBox) {
        filteredPlates.push(numPlate); // Add to filtered plates
      } else {
        rejectedPlates.push(numPlate); // Add to rejected plates
      }
    });
  
    return { filteredPlates, rejectedPlates };
  };
  

  loadNum = (filteredPlates, rejectedPlates) => {
    this.setState({
      num: filteredPlates,         // Set filtered plates
      rejectedNums: rejectedPlates // Set rejected plates
    });
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  };

  updateImageEntries = () => {
    const { user } = this.state;
  
    fetch('https://carpp.online:3000/image', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: user.id }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update image entries.');
        }
        return response.json();
      })
      .then((entries) => {
        this.setState(Object.assign(this.state.user, { entries }));
      })
      .catch((error) => {
        console.error('Error updating image entries:', error);
      });
  };  

  render() {
    const { isSignedIn, imageUrl, route, box, num, rejectedNums, isNumLoaded } = this.state;
    return (
      <div className="max-w-[1024px] flex flex-col justify-center mx-auto px-4 font-sans">
        <Header 
        isSignedIn={isSignedIn} 
        onRouteChange={this.onRouteChange} 
        name={this.state.user.name} 
        entries={this.state.user.entries}
        />
        { route === 'home'
          ? <div>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <Rank 
                name={this.state.user.name} 
                num={num} 
                isNumLoaded={isNumLoaded}
                rejectedNums={rejectedNums}
              />
              <VehicleNumRecognition 
                box={box} 
                imageUrl={imageUrl}
                name={this.state.user.name} 
                entries={this.state.user.entries}
              />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  };
};

export default App;
