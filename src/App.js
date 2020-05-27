import React, { Component } from 'react';
import domtoimage from 'dom-to-image-more'

//Import CSS
import './App.css';
import './styles/styles.css';

//Import components
import Header from './components/header';
import Form from './components/form';
import Content from './components/content';
import Result from './components/result';

class App extends Component {
  state = {
    images: [],
    activeImage: '',
    textTop: '',
    textBottom: '',
    isMemeGenerated: false
  }

  //create refs
  contentContainerRef = React.createRef();
  resultContainerRef = React.createRef();


  //Fetch images from https://api.imgflip.com/get_memes
  fetchImages = async () => {
    //Get the memes
    const imgData = await fetch('https://api.imgflip.com/get_memes')
                          .then(res => res.json())
                          .catch(err => console.error(err));
    const memes = await imgData.data.memes;
    //update images state
    await this.setState({ images: memes });

    //update activeImage state
    await this.setState({ activeImage: memes[0].url });

  }

  handleInputChange = (evt) => {
    if (evt.target.name === 'text-top') {
      //update textTop state
      this.setState({ textTop: evt.target.value });
    } else {
      //update textBottom state
      this.setState({ textBottom: evt.target.value });
    }
  }

  //choose random images from imaged fetched from api.imgflip.com
  handleImageChange = () => {
    //choose random image
    const randomNum = Math.floor(Math.random() * this.state.images.length)
    const image = this.state.images[randomNum]
    console.log(image)
    //update active image state
    this.setState({ activeImage: image.url })
  }

  //Handle image upload via file input
  handleImageInputChange = (evt) => {
    //Update activeImage state
    this.setState({ activeImage: window.URL.createObjectURL(evt.target.files[0])});
  }

  //Handle Meme Generation
  handleMemeGeneration = () => {
    //Remove any existing images
    if (this.resultContainerRef.current.childNodes.length > 0) {
      this.resultContainerRef.current.removeChild(this.resultContainerRef.current.childNodes[0])
    }

    //generate meme image from the content of 'content' div
    domtoimage.toPng(this.contentContainerRef.current).then((dataUrl) => {
      //Create new image
      const img = new Image();

      //Use url of the generated image as src
      img.src = dataUrl;

      //Append new image to DOM
      this.resultContainerRef.current.appendChild(img);

      //Update state for isMemeGenerated
      this.setState({ isMemeGenerated: true });
    });
  }

  //Handle resetting the meme generator/removing existing pictures
  handleMemeReset = () => {
    //Remove existing child node inside result container (generated meme image)
    this.resultContainerRef.current.removeChild(this.resultContainerRef.current.childNodes[0]);

    //Update state for isMemeGenerated
    this.setState({ isMemeGenerated: false });
  }

  //Fetch images when App component mounts
  async componentDidMount() {
    await this.fetchImages();
  }

  render() {
    return (
      <div className="App">
        <Header />
        {/* Add Form Component */}
        <Form
          textTop={this.state.textTop}
          textBottom={this.state.textBottom}
          handleImageInputChange={this.handleImageInputChange}
          handleInputChange={this.handleInputChange}
          handleImageChange={this.handleImageChange}
          handleMemeGeneration={this.handleMemeGeneration}
          handleMemeReset={this.handleMemeReset}
          isMemeGenerated={this.state.isMemeGenerated}
        />

          {/* Add Content Component */}
          <Content 
            activeImage={this.state.activeImage}
            contentContainerRef={this.contentContainerRef}
            textBottom={this.state.textBottom}
            textTop={this.state.textTop}
          />

          {/* Add Result Component */}
          <Result resultContainerRef={this.resultContainerRef} />
      </div>
    )
  }

}

export default App;
