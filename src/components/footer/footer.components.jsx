import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './footer.styles.scss';
const Footer =()=>{
  return(
    <div className='main-footer'>
        <div className='container'> 
          <div className='row'>
            <div className ='col'>
                <h4>AutoTradia INC</h4>
                <ul className ='list-unstyled'>
                  <li>+923085333444</li>
                  <li>Islamabad, Pakistan</li>
                </ul>
            </div>
            <div className ='col'>
                <h4>Cars</h4>
                <ul className ='list-unstyled'>
                  <li>New Cars</li>
                  <li>OLd Cars</li>
                </ul>
            </div>
            <div className ='col'>
                <h4>Services</h4>
                <ul className ='list-unstyled'>
                  <li>Sell Cars</li>
                  <li>Buy Cars</li>
                </ul>
            </div>
          </div>
          <hr/>
          <div className ='row'>
              <p className='col-sm'> 
                &copy;{new Date().getFullYear()} AutoTradia INC | All rights reserved | Terms of Service | Privacy
              </p>
          </div>
        </div>
    </div>
  )
}
export default Footer;