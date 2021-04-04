import React from 'react';
import { Icon } from '@iconify/react';
import bxCar from '@iconify/icons-bx/bx-car';
import {Redirect} from 'react-router-dom';
import cardImage from '@iconify/icons-bi/card-image';
import './post-ad.styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUploader from 'react-images-upload';
import Button from 'react-bootstrap/Button';
import firebase from '../../firebase/firebase.utils';
import {connect} from 'react-redux';
class PostAd extends React.Component{
    constructor(){
        super();
        this.state = { pictures: [],
            city : '',
            carmake : '',
            carmodel : '',
            registration : '',
            mileage : undefined,
            color : '',
            description : '',
            price  : undefined,
            number : undefined,
            priceError : '',
            mileageError : '',
            modelError : '',
            phoneError : '',
            colorError : '',
            cityError : '',
            registrationError : '',
            enginetypeError : '',
            engineccError : '',
            transmissionError : '',
            assembleError : '',
            enginetype : '',
            enginecc   : undefined,
            transmission : '',
            assemble : '',
            year : undefined,
            count : undefined,
            upload : 0
        
        };
         this.onDrop = this.onDrop.bind(this);

    }
    onDrop(picture) {
        console.log(picture);
        picture.name = 'lol';
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
    maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
         object.target.value = object.target.value.slice(0, object.target.maxLength)
          }
        }
    validate = () => {
        let phoneError = undefined;
        let priceError =  undefined;
        let mileageError = undefined;
        let yearError = undefined;
        let modelError = '';
        let cityError = '';
        let transmissionError = '';
        let enginetypeError = '';
        let engineccError = '';
        let assembleError = '';
        let colorError = '';
        let registrationError = '';


        if((Math.floor(Math.log10(this.state.number))+1) < 11)
        {
            phoneError = "phone number entered is invalied"
        }
        if(!this.state.price)
        {
            priceError = "please fill this field with actual price"
        }
        if(!this.state.year)
        {
            yearError = "please fill this field with actual year"
        }
        if(!this.state.registration)
        {
            registrationError = "please fill this field with actual price"
        }
        if(!this.state.color)
        {
            colorError = "please fill this field with actual price"
        }
        if(!this.state.city)
        {
            cityError = "please fill this field with actual price"
        }
        if(!this.state.transmission)
        {
            transmissionError = "please fill this field with actual price"
        }
        if(!this.state.assemble)
        {
            assembleError = "please fill this field with actual price"
        }
        if(!this.state.enginetype)
        {
            enginetypeError = "please fill this field with actual price"
        }
        if(!this.state.enginecc)
        {
            engineccError = "please fill this field with actual price"
        }
        if(!this.state.carmodel)
        {
            modelError = "please fill this field with actual model"
        }
        if(!this.state.mileage)
        {
            mileageError = "please fill this field with actual mileage"
        }
        if(phoneError ||yearError|| priceError || modelError || mileageError || transmissionError || assembleError || engineccError || enginetypeError || colorError || cityError || registrationError)
        {
            this.setState({ yearError, phoneError, priceError, mileageError, modelError, transmissionError, assembleError, engineccError, enginetypeError, colorError, cityError, registrationError});
            return false;
        }
        return true;
    }
    
    handleSubmit = async (event) => {
            event.preventDefault();
            var currentUser = this.props;
            const{city, carmake, carmodel, registration, mileage, color, description, price, number, transmission, assemble, enginetype, enginecc, year} = this.state;
            const isValid = this.validate();
           // console.log(currentUser.currentUser.id);
            if (isValid) {
              //console.log(this.state);
              //console.log(currentUser.id);
               // console.log(this.state.pictures);
             await this.getCount();
             await this.handleUpload();
             await this.createUserAd(currentUser, city, carmake, carmodel, registration, mileage, color, description, price, number,transmission, assemble, enginetype, enginecc,year);
             await this.updateCount();

            
              // clear form
              //console.log(docid);
              this.setState({
                  upload : 1
              })
              
            }
            else{
                alert("please fix the errors or fill all details to proceed");
            }
            
            
          };

          handleUpload = async() =>{
               var i = 0;
              this.state.pictures.map(picture => {
                const uploadTask = firebase.storage().ref(`images/ad-${this.state.count}-${i}`).put(picture);
                uploadTask.on(
                    "state_changed",
                    snapShot => {},
                    error => {
                        console.log(error);
                    },
                   
                )
                i =  i + 1;
              })
          }
        
          getCurrentDate(separator='-'){

            let newDate = new Date()
            let date = newDate.getDate();
            let month = newDate.getMonth() + 1;
            let year = newDate.getFullYear();
            
            return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
            }
          createUserAd = async (currentUser, city, carmake, carmodel, registration, mileage, color, description, price, number,transmission, assemble, enginetype, enginecc,year) => {
            console.log(currentUser);
            if(!currentUser) return ;
              console.log(this.state.count);
              await firebase.firestore().doc(`users/${currentUser.currentUser.id}/ads/${this.state.count}`).set({
                seller : currentUser.currentUser.displayName,
                city : city,
                make : carmake,
                model : carmodel,
                registration : registration,
                mileage : mileage,
                color : color,
                description : description,
                price : price,
                phone : number,
                engineCapacity : enginecc,
                engineType : enginetype,
                assembled : assemble,
                transmission : transmission,
                adNo : this.state.count,
                date : this.getCurrentDate(),
                year : year,
                picCount : this.state.pictures.length
              }).then(function() {
                console.log("Document successfully written!");
            }).catch(function(error) {
              console.error("Error adding document: ", error);
            } );
              
          }
          

          getCount = async() =>{
            await firebase.firestore().collection('count').doc('number').get().then((doc)=>{
                if(doc.exists){
                    this.setState({count: doc.data().adNumber});
                    console.log("Document data:", this.state.count);
                }
                else {
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
          }
          updateCount = async() =>{
              await firebase.firestore().collection('count').doc('number').update({
                  adNumber : this.state.count + 1
              }).then(function() {
                console.log("Document successfully updated!");
            })
            .catch(function(error) {
                console.error("Error updating document: ", error);
            });
          }
    
    handleChange = event =>{
            const {name, value} = event.target;
            this.setState({[name] : value});
     }
     
     componentWillUnmount(){
        this.setState({ pictures: [],
            city : '',
            carmake : '',
            carmodel : '',
            registration : '',
            mileage : undefined,
            color : '',
            description : '',
            price  : undefined,
            number : undefined,
            priceError : '',
            mileageError : '',
            modelError : '',
            colorError : '',
            cityError : '',
            registrationError : '',
            enginetypeError : '',
            engineccError : '',
            transmissionError : '',
            assembleError : '',
            phoneError : '',
            enginetype : '',
            enginecc   : undefined,
            transmission : '',
            assemble : '',
            upload : 0
        
        })
     }
    render(){
        if(this.state.upload === 1){
            return(
                <Redirect to ='/sellerpage'/>
            )
        }
        if(!this.props.currentUser){
            return(
              <Redirect to = '/signin'/>
            )
          }
        const {city, carmake, carmodel, registration, mileage, color, description, price, number, enginecc, enginetype, transmission, assemble, year} = this.state;
        return(
        <form onSubmit = {this.handleSubmit}>
            <div className = 'post-ad'>
                    <div className = 'headline'>
                        <h1 className = 'heading'>Sell your Car with Easy & Simple Steps !</h1>
                        <span className = 'sub-heading'> It's free and takes less than a minute</span>
                        <div className = 'options'>
                            <Icon icon={bxCar}  width = '30px' height = '30px' color = '#223c7a'/>
                            <span className = 'line'>post your ad by providing details and uploadind images</span>      
                            <Icon icon={cardImage}  width = '30px' height = '30px' color = '#223c7a'/>
                        </div>
                    </div>

                    <div className = 'border-line'>
                        <div className = 'head'>
                            <h3>Car Information</h3>
                            <span>(All fields marked with * are mandatory)</span>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div  className = 'form'>
                                <label className = 'label'>City <span class="text-error">*</span></label>    
                                <select className = 'dropdown' name ='city' value={city} onChange = {this.handleChange} placeholder = 'City' required>
                                <option value="null">Please Select City</option>
                                <option value="Islamabad">Islamabad</option>
                                <option value="Lahore">Lahore</option>
                                <option value="Karachi">Karachi</option>
                                <option value="Peshawar">Peshawar</option>
                              </select>
                              <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.cityError}
                            </div>
                            </div>

                        <div  className = 'form'>
                            <label className = 'label'>Car Make <span class="text-error">*</span></label>    
                            <select className = 'dropdown' name = 'carmake' value = {carmake} onChange = {this.handleChange} placeholder = 'Car Make' required>
                                <option value="null">Please Select Car Make</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Honda">Honda</option>
                                <option value="BMW">BMW</option>
                                <option value="Mercedes">Mercedes</option>
                            </select>
                        </div>
                        <div className = 'form'>
                            <label className = 'label'>Car Model <span class="text-error">*</span></label>
                            <input type="text" name="carmodel" value={carmodel} onChange = {this.handleChange} className = 'dropdown' required/>  
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.modelError}
                            </div>  
                        </div>

                        <div className = 'form'>
                            <label className = 'label'>Model year<span class="text-error">*</span></label>
                            <input  type = "number"  maxLength = "4" onChange = {this.handleChange}  name = 'year'value={year} placeholder = '2019' onInput={this.maxLengthCheck} className = 'dropdown' required/>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.yearError}
                            </div> 
                        </div>

                        <div  className = 'form'>
                            <label className = 'label'>Car Registration City <span class="text-error">*</span></label>    
                            <select className = 'dropdown' placeholder = 'registration' onChange = {this.handleChange} name='registration' value={registration} required>
                                <option value="null">Registration city</option>
                                <option value="Islamabad">Islamabad</option>
                                <option value="Lahore">Lahore</option>
                                <option value="Karachi">Karachi</option>
                                <option value="Peshawar">Peshawar</option>
                            </select>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.registrationError}
                            </div>
                        </div>
                        
                        <div className = 'form'>
                            <label className = 'label'>Mileage KM<span class="text-error">*</span></label>
                            <input type="number" name="mileage" placeholder = 'mileage' onChange = {this.handleChange} label='Mileage' value={mileage} className = 'dropdown' required />  
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.mileageError}
                            </div>  
                        </div>
                        <div className = 'form'>
                            <label className = 'label'>Car Color<span class="text-error">*</span></label>
                            <input type="text" placeholder = 'car color' name="color" onChange = {this.handleChange} value={color} className = 'dropdown' required />   
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.colorError}
                            </div>
                        </div>
                        <div className = 'form'>
                            <label className = 'label'>Ad Description</label>
                            <textarea className = 'description' name = 'description' onChange = {this.handleChange} value={description} placeholder = 'describe your car' type = 'text' />   
                        </div>
                    </form>                    
                </div>

                <div className = 'border-line'>
                    <div className = 'head'>
                        <h3>Add Images <Icon icon={cardImage}  width = '30px' height = '30px' color = '#223c7a'/></h3>
                        <span>You can upload upto 10 images</span>
                    </div>
                <ImageUploader
                withIcon={true}
                withPreview={true}
                buttonText=' + Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                />
                </div>
                <div className = 'border-line'>
                    <div className = 'head'>
                        <h3>Additional Information </h3>
                    </div>
                    <div  className = 'form'>
                            <label className = 'label'>Engine Type<span class="text-error">*</span></label>    
                            <select className = 'dropdown'  onChange = {this.handleChange} name='enginetype' value={enginetype} required>
                                <option value="null">Engine Type</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="Electric">Electric</option>
                                <option value="CNG">CNG</option>
                            </select>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.enginetypeError}
                            </div>
                    </div>
                    <div className = 'form'>
                        <label className = 'label'>Engine Capacity<span class="text-error">*</span> (cc)</label>
                        <input type="number" name="enginecc" onChange = {this.handleChange} value ={enginecc} className = 'dropdown' required />
                        <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.engineccError}
                            </div>
                    </div>
                    <div  className = 'form'>
                            <label className = 'label'>Transmission<span class="text-error">*</span></label>    
                            <select className = 'dropdown'  onChange = {this.handleChange} name='transmission' value={transmission} required>
                                <option value="null">Transmission</option>
                                <option value="Automatic">Automatic</option>
                                <option value="Manual">Manual</option>/
                            </select>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.transmissionError}
                            </div>
                    </div>
                    <div  className = 'form'>
                            <label className = 'label'>Assemble<span class="text-error">*</span></label>    
                            <select className = 'dropdown'  onChange = {this.handleChange} name='assemble' value={assemble} required>
                                <option value= 'null'>Assemble</option>
                                <option value="Local">Local</option>
                                <option value="Foreign">Foreign</option>/
                            </select>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.assembleError}
                            </div>
                    </div>
                
                </div>
                <div className = 'border-line'>
                    <div className = 'head'>
                        <h3>Finishing Up</h3>
                        <span>Provide your contact details and estimated price.</span>
                    </div>
                    <div className = 'form'>
                            <label className = 'label'>Car Price<span class="text-error">*</span></label>
                            <input type="number" name="price" onChange = {this.handleChange} value ={price} className = 'dropdown' required />
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.priceError}
                            </div>    
                     </div>
                     <div className = 'form'>
                            <label className = 'label'>Phone Number<span class="text-error">*</span></label>
                            <input  type = "number" minLength='11' maxLength = "12" onChange = {this.handleChange} placeholder='923000555555'  name = 'number'value={number} onInput={this.maxLengthCheck} className = 'dropdown' required/>
                            <div style={{ fontSize: 12, color: "red" }}>
                                {this.state.phoneError}
                            </div> 
                     </div>
                        <Button className = 'buttons' type='submit' >Submit</Button>
                </div>
            </div>
        </form>
        )
    }
}

const mapStateToProps = state => ({
    currentUser : state.user.currentUser
});

export default connect(mapStateToProps)(PostAd);