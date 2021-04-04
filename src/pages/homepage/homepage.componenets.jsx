import React from 'react';
import './homepage.styles.scss';
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect} from 'react-router-dom';
import { Icon} from '@iconify/react';
import carEstate from '@iconify/icons-mdi/car-estate';
import carConvertible from '@iconify/icons-mdi/car-convertible';
import carSports from '@iconify/icons-mdi/car-sports';
import searchOutlined from '@iconify/icons-ant-design/search-outlined';
import rickshawElectric from '@iconify/icons-mdi/rickshaw-electric';
import carBattery from '@iconify/icons-fa-solid/car-battery';
import inspectionIcon from '@iconify/icons-flat-color-icons/inspection';
import outlineSubscriptions from '@iconify/icons-ic/outline-subscriptions';
import auth0Icon from '@iconify/icons-logos/auth0';

class HomePage extends React.Component{
    constructor(){
        super();
        this.state = {
            search : '',
            goto : 0
        }
    }
   
    componentDidMount(){
        this.setState({goto:0});
    }
    componentWillUnmount(){
        this.setState({goto:0});
    }
    handleChange = event =>{
        const { value, name } = event.target;
        this.setState({[name] : value})
    }
    eventClick = () =>{
        this.setState({goto : 1})
    }
    render(){
        console.log(this.state.goto);
        if(this.state.goto === 1)
        {
            return(<Redirect to ={{pathname : '/allads', state : {id : this.state.search}}}/>)
        }
        return(
            <div className = 'homepage'>
        <div className = 'image-container'>
            <h1 className = 'text'>
                Find Used Cars In Pakistan
            </h1>
            <span className = 'text2'>With Thousands of cars , we have just the right one for you</span>
            <div className = 'wrapper'>
                <input className ="searchx" type = "text" placeholder = 'Search Cars' value = {this.state.search} name='search' onChange={this.handleChange}  />
                <button className = 'search-button' type ='search'onClick={this.eventClick} ><Icon icon={searchOutlined} width='25px' height='25px'/></button>
            </div>
        </div> 

        <div className ='boxes'>
            <div className ='box'onClick={this.eventClick}>
                <Icon icon={carEstate} width='200px' height='200px'/>
                <h3>SUV</h3>
                <p>Buy used SUVs in Pakistan</p>
            </div>
            <div className ='box'onClick={this.eventClick}>
                <Icon icon={carConvertible} width='200px' height='200px' />
                <h3>Exotic Cars</h3>
                <p>Buy used exotic cars in Pakistan</p>
            </div>
            <div className ='box'onClick={this.eventClick}>
                <Icon icon={carSports}  width='200px' height='200px'/>
                <h3>Luxary Cars</h3>
                <p>Buy used luxary cars in Pakistan</p>
            </div>
            <div className ='box'onClick={this.eventClick}>
                <Icon icon={rickshawElectric}  width='200px' height='200px'/>
                <h3>Electric Cars</h3>
                <p>Buy used electric cars in Pakistan</p>
            </div>
            <div className ='box'onClick={this.eventClick}>
                <Icon icon={carBattery}  width='200px' height='200px'/>
                <h3>Hybrid Cars</h3>
                <p>Buy used hybrid cars in Pakistan</p>
            </div>
        </div>

        <div className = 'preview'>
            <h1>Featured Cars Preview</h1>
        </div>

        <div className = 'features'>
            <div className ='feature'>
            <Icon icon={auth0Icon} width='200px' height='200px'/>
                <h4>Authourized dealers</h4>
                <span>sell your car through our Authourized dealers</span>
            </div>
            <div className ='feature'>
            <Icon icon={inspectionIcon} width='200px' height='200px'/>
                <h4>Inspection</h4>
                <span>Get your car inspectioned by our engineers.</span>
            </div>
            <div className ='feature'>
                <Icon icon={outlineSubscriptions} width='200px' height='200px'/>
                <h4>Subscribe</h4>
                <span>Subscribe to our newsletter</span>
            </div>
        </div>
    </div>
        )
    }
}

export default HomePage;