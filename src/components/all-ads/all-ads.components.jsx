import React from 'react';
import './all-ads.styles.scss';
import {Redirect} from 'react-router-dom';
import '../view-add/view-add.styles.scss';
import firebase from '../../firebase/firebase.utils';
class AllAds extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            records : [],
            goto : false,
            dox : null
        }
    }
    data;
    componentWillMount(){
        this.data = [];
        this.getData();
    }
    componentWillUnmount(){
        this.data = [];
        this.filter = [];
        this.setState({records : [],dox : null, goto : false})
      }
    getData = async ()=>{
        try {
            await firebase.firestore().collection('users').get().then(
                snapShot =>{
                    snapShot.forEach( async doc => 
                        {
                            console.log(doc.id);
                            try {
                                await firebase.firestore().collection(`users/${doc.id}/ads`).get().then(
                                    snapStuff =>{
                                        snapStuff.forEach(docs =>{
                                            console.log(docs);
                                            this.data.push(docs.data());
                                        })
                                    }
                                    
                                   )
                                   this.setState({records: this.data});
                                    console.log(this.state.records);
                                
                            } catch (error) {
                                alert(error);
                            }
                            
                        })
                }
            )
           
        } catch (error) {
            alert(error);
        }
        
    }
    filter = [];
    name = this.props.location.state.id;
    filteredList(){
       this.filter = this.data.filter(item => item.make.toLowerCase().includes(this.name.toLowerCase()))
       console.log(this.filter)

    }
    eventClick =(doc) =>{
        this.setState({goto : true, dox : doc})
        //console.log(this.state.dox);
        //console.log(doc.target);
    }
    render()
    {
        
      if(this.state.goto === true)
      {
         return(<Redirect to ={{pathname : '/allads/thead', state : {id : this.state.dox}}}/>);
     }
        if(this.name != null)
        {
            this.filteredList();
        }
        else{
            this.filter = this.data;
        }
        console.log(this.state.records.length);
        console.log(this.state.records);
      if(this.filter.length !== 0)
      { 
        //console.log(this.state.records.length);
      return(
      <div  key = '1'class='container' style={{marginTop : '20px'}}>
        {this.filter.map((doc, index) => ( 
      <div class='table' key = {index} onClick={()=>this.eventClick(doc)} >
          <div class='row' style={{borderRadius:"1px solid grey" }}>
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
      </div>
       ))}
  </div>)
      }
      else{
        return(<p>............</p>)
      }
    }
}
export default AllAds;