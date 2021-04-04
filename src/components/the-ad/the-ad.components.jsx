import React from 'react';
import './the-ad.styles.scss';
// npm install --save-dev @iconify/react @iconify/icons-dashicons
import {Icon} from '@iconify/react';
import locationAlt from '@iconify/icons-dashicons/location-alt';
import bxCalendar from '@iconify/icons-bx/bx-calendar';
import Slideshow from '../slideshow/slideshow.components';
import speedometerSharp from '@iconify/icons-ion/speedometer-sharp';
import sharpLocalGasStation from '@iconify/icons-ic/sharp-local-gas-station';
import manualshiftIcon from '@iconify/icons-whh/manualshift';
import phoneIcon from '@iconify/icons-carbon/phone';
class TheAd extends React.Component{
 
  data = this.props.location.state.id;
  render()
  {
    return(
      <div className = 'the-ad'>
        <div className ='top'>
        <div className ='name'> 
    <h2>{this.data.make} {this.data.model}</h2>
          <span style ={{color:"grey"}}><Icon icon={locationAlt}  height = '20px' width = '20px'/> {this.data.city}, Pakistan</span>
        </div>
        <div className ='colsx'>
            <div className = 'price'>
              <h3 style={{color :'green'}}>PKR {this.data.price}</h3>                
            </div>
            <div className = 'phone'>
              <span style={{paddingLeft : '35px'}}><Icon icon={phoneIcon} width ='20px' height='20px'/> 0344-5548462</span>
            </div>
            <h3 style={{color: "#223c7a"}}>Seller's Information</h3>
            <div>
              <label>Name : </label>
              <span>   {this.data.seller}</span>
              </div>
              <div>
              <label>Address : </label>
              <span>  {this.data.city}, Pakistan</span>
              </div>              
          </div>
          </div>
        <div className = 'rowsy'>
          <div className ='colsy'>
            <Slideshow len ={this.data.picCount} adno ={this.data.adNo} />
            <div className = 'icon-container'>
              <div className = 'icons'>
                <Icon icon={bxCalendar} width='30px' height='30px'/>
                  <span>{this.data.year}</span>
              </div>
              <div className = 'icons' >
              <Icon icon={speedometerSharp} width='30px' height='30px'/>
                <span> {this.data.mileage} KM</span>
              </div>
              <div className = 'icons' >
              <Icon icon={sharpLocalGasStation} width='30px' height='30px'/>
                <span> {this.data.engineType}</span>
              </div>
              <div className = 'icons' >
              <Icon icon={manualshiftIcon} width='30px' height='30px'/>
                <span> {this.data.transmission}</span>
              </div>
            </div>
            <div>
              <div class="table">
                  <div class="row">
                    <div class="col-2"style={{color: "#223c7a"}}>Registered City</div>
                    <div class="col-2">{this.data.registration}</div>
                    <div class="col-2"style={{color: "#223c7a"}}>Color</div>
                    <div class="col-2">{this.data.color}</div>
                  </div>
                  <div class="row">
                    <div class="col-2"style={{color: "#223c7a"}}>Assembled</div>
                      <div class="col-2">{this.data.assembled}</div>
                    <div class="col-2"style={{color: "#223c7a"}}>Engine Capacity</div>  
                      <div class="col-2">{this.data.engineCapacity}</div>
                  </div>
                  <div class="row">
                    <div class="col-2" style={{color: "#223c7a"}}>Ad Reference</div>
                    <div class="col-2">#{this.data.adNo}</div>
                    <div class="col-2" style={{color: "#223c7a"}}>Uploade Date</div>
                    <div class="col-2">{this.data.date}</div>
                  </div>
                </div>
              </div>
                <div className = 'seller'>
                  <h3>Seller's Remarks</h3>
                    <p>{this.data.description}</p>
                </div>
            </div> 
            
          </div>
        </div>
    )
  }
}
export default TheAd;