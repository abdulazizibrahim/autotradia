import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Zoom } from "react-slideshow-image";
// style was imported in index.css
// import "react-slideshow-image/dist/styles.css";

class Slideshow extends React.Component{
  
    zoomOutProperties = {
      duration: 5000,
      transitionDuration: 0,
      infinite: true,
      indicators: true,
      scale: 0.4,
      arrows: true
    };
    componentWillUnmount(){
      this.images = []
    }
    images = []
    getImage=()=>{
      var piclen = this.props.len;
      var adno = this.props.adno;
      for(var i =0; i<piclen; i++){
        this.images.push(`https://firebasestorage.googleapis.com/v0/b/auto-tradia.appspot.com/o/images%2Fad-${adno}-${i}?alt=media&token=f18a0d03-2d86-4772-9dce-d833b8deb953`);
      }
    }
    render(){
      this.getImage();
      return(
        <div className="slide-container" style={{width : "100%"}}>
        <Zoom {...this.zoomOutProperties}>
        {this.images.map((each, index) => (
          <img key={index} style={{ width: "100%" }} alt = 'display'src={each} />
        ))}
      </Zoom>
    </div>
      )
    }
  
}

export default Slideshow;
