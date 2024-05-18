import React from 'react';
import { Carousel } from 'antd';
import pic1 from '../assets/Picture1.jpg';
import pic2 from '../assets/Picture2.jpg';

const contentStyle = {
  height: '500px', 
  position: 'relative',
  textAlign: 'center',
};

const imageStyle = {
  width: '100%',
  height: '500px',
  objectFit: 'cover',
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#3c1947',
  opacity: 0.8,
  zIndex: 1, 
};

const imgContainerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
};

const HomeCarousel = () => (
  <Carousel autoplay>
    <div style={contentStyle}>
      <div style={imgContainerStyle}>
        <img src={pic1} alt="Shelves pic" style={imageStyle} />
        <div style={overlayStyle}></div>
      </div>
    </div>
    <div style={contentStyle}>
      <div style={imgContainerStyle}>
        <img src={pic2} alt="Shelves pic" style={imageStyle} />
        <div style={overlayStyle}></div>
      </div>
    </div>
    <div style={contentStyle}>
      <div style={imgContainerStyle}>
        <img src={pic1} alt="Shelves pic" style={imageStyle} />
        <div style={overlayStyle}></div>
      </div>
    </div>
    <div style={contentStyle}>
      <div style={imgContainerStyle}>
        <img src={pic1} alt="Shelves pic" style={imageStyle} />
        <div style={overlayStyle}></div>
      </div>
    </div>
  </Carousel>
);

export default HomeCarousel;