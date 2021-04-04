import React from 'react';
import './display-ads.styles.scss';
import '../view-add/view-add.styles.scss';
import {connect} from 'react-redux';
import firebase from '../../firebase/firebase.utils';
import { Icon} from '@iconify/react';
import deleteIcon from '@iconify/icons-iwwa/delete';
import { Redirect } from 'react-router-dom';


//const getUser = async(user) =>{
    
  // console.log(data);
   //return data;
 // }
 class DisplayAd extends React.Component{
  constructor(){
      super();
      this.state = {
        records: [],
        delete : 0
      }
  }

  componentDidMount(){
    this.displayAd();
  }
  data = []
  displayAd = async () =>{
    var currentUser = this.props;
    try {
      await firebase.firestore().collection(`users/${currentUser.currentUser.id}/ads`).get().then(
        snapShot => {
          snapShot.forEach(doc => { 
            this.data.push(doc.data())
            console.log(doc.id);
          })
          console.log(this.data)
        }
      )
      this.setState({ records : this.data })
      
    } catch (error) {
      console.log(error);
    }
    console.log(this.state.records);
   //data.forEach(element => {
     //  render(viewAdd({element}));
      // console.log(element);
       
  // });
    //console.log('in');
   // const data = getUser({currentUser});
   // console.log(data);
    //data.forEach(doc => {
      //  console.log(doc);
    //});
}
    componentWillUnmount(){
      this.data = [];
      this.setState({records : []});
    }

    deleteAd =async(doc)=>{
      var currentUser = this.props;
     for(var i =0; i<doc.picCount; i++){
       await firebase.storage().ref(`images/ad-${doc.adNo}-${i}`)
       .delete().then(function() {
        // File deleted successfully
      }).catch(function(error) {
        // Uh-oh, an error occurred!
      });
     }
     await firebase.firestore().collection(`users/${currentUser.currentUser.id}/ads`).doc(`${doc.adNo}`).delete().then(function() {
      alert("Document successfully deleted! please refresh");
      }).catch(function(error) {
      console.error("Error removing document: ", error);
      this.setState({delete : 1});
  });
  
    }

    render()
    {
      if(!this.props.currentUser){
        return(
          <Redirect to = '/signin'/>
        )
      }
      if(this.state.records.length !== 0)
      { 
      return(
      <div class='container' style={{marginTop : '20px'}}>
        {this.state.records.map((doc, index) => (
      <div class='table'>
          <div class='row' key ={index} style={{borderRadius:"1px solid grey" }}>
              <div class='col-2'>
                  <img src={`https://firebasestorage.googleapis.com/v0/b/auto-tradia.appspot.com/o/images%2Fad-${doc.adNo}-0?alt=media&token=f18a0d03-2d86-4772-9dce-d833b8deb953`} alt = 'logo' height ='150px' width='180px'></img>
              </div>
              <div class='col-3' style={{ paddingLeft:"60px",marginLeft:"20px"}}>
              <h3>{doc.make} {doc.model}</h3>
                  <span style={{fontSize:"18px" ,color:"grey",marginBottom:"15px"}}>{doc.city}</span>
                  <div style={{paddingBottom:"30px"}}></div>
                  <ul style={{fontSize:"16px" ,color:"grey",paddingLeft: "0px", marginTop:"20px"}}>
                      <li className ='li'>{doc.year}</li>
                      <li className ='li'>{doc.mileage}km</li>
                      <li className ='li'>{doc.engineType}</li>
                      <li className ='li'>{doc.engineCapacity}</li>
                      <li className ='li'>{doc.transmission}</li>
                  </ul>
              </div>
              <div class='col-md-4-offset-6 pull-right' style={{paddingLeft:"110px",marginLeft:"20px"}}><h4>Rs {doc.price}</h4></div>
          </div>
          <div className='delete' onClick={()=>this.deleteAd(doc) }><Icon icon={deleteIcon} width='20px' height='20px'/>Delete Ad</div>
      </div>
       ))}
  </div>)
      }
      else{
        return(<p>.............</p>)
      }
    }

}

const mapStateToProps = state => ({
    currentUser : state.user.currentUser
});

export default connect(mapStateToProps)(DisplayAd);