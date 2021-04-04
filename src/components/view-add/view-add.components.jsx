import React from 'react';
import './view-add.styles.scss';
import tesla from '../../assets/tesla.jpg';
const viewAdd = () =>(
    <div class='container'>
        <div class='table'>
            <div class='row' style={{borderRadius:"1px solid grey" }}>
                <div class='col-2'>
                    <img src={tesla} alt = 'logo' height ='120px' width='150px'></img>
                </div>
                <div class='col-3' style={{marginLeft:"25px"}}>
                    <h5>lol</h5>
                    <span style={{fontSize:"14px" ,color:"grey",marginBottom:"15px"}}>l</span>
                    <ul style={{fontSize:"14px" ,color:"grey",paddingLeft: "0px", marginTop:"20px"}}>
                        <li className ='li'>2007</li>
                        <li className ='li'>500km</li>
                        <li className ='li'>lol</li>
                        <li className ='li'>alal</li>
                        <li className ='li'>lol</li>
                    </ul>
                </div>
                <div class='col-sm-4-offset-2 pull-right'><h5>Rs  909</h5></div>
            </div>
        </div>
    </div>
)
export default viewAdd;