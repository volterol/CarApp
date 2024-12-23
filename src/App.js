import React, { Component } from 'react';
import Header from './components/Header/Header';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Sidebar from './components/Sidebar/Sidebar';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import NumRecognition from './components/NumRecognition/NumRecognition';



const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: ''
  },
  isNumLoaded: false,
  num: '',
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
      .then(data => {
        const numLocations = this.filterNums(data).filtered_arr.map((i) => data.ocrSceneEnglish.outputs[0].data.regions[i].region_info.bounding_box);
        const numLocationLines = numLocations.map(location => this.calculateBorders(location));
        this.displayBox(numLocationLines);
        this.loadNum(this.outputNumPlate(data));
        })
      .catch(error => {
        console.log('error', error);
        alert('Error processing the image. Please try again.');
      });
  }
  
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined
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
  }

  displayBox = (box) => {
    this.setState({box: box});
  }

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
  }

  outputNumPlate = (data) => {
    const arr1 = this.filterNums(data).filtered_arr;
    const plateNumbers = [];

    // Loop through each filtered region
    arr1.forEach(i => {
        let numPlate = data.ocrSceneEnglish.outputs[0].data.regions[i].data.text.raw;
        
        // Remove spaces within a recognized plate number
        numPlate = numPlate.replace(/\s+/g, '');

        // Add the cleaned plate number to the array
        plateNumbers.push(numPlate);
    });

    return plateNumbers;
  }

  loadNum = (num) => {
    this.setState({num: num});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box, num, isNumLoaded } = this.state;
    return (
      <div className="max-w-[1024px] mx-auto px-4 font-sans">
        <Header 
        isSignedIn={isSignedIn} 
        onRouteChange={this.onRouteChange} 
        name={this.state.user.name} 
        />
        <Sidebar />
        { route === 'home'
          ? <div>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <NumRecognition box={box} imageUrl={imageUrl} />
              <Rank name={this.state.user.name} num={num} isNumLoaded={isNumLoaded} />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;
