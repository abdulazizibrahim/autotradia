import React from 'react';
import './image-container.styles.scss';

const imageConatiner = ({image}) =>(
    <div className = 'image-container'>
        <img src ={image} alt = 'img'/>
    </div>
)
export default imageConatiner;