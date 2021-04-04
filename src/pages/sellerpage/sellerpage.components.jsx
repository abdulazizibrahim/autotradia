import React from 'react';
import {connect} from 'react-redux';
import './sellerpage.styles.scss';
// npm install --save-dev @iconify/react @iconify/icons-mdi
import { Icon, InlineIcon } from '@iconify/react';
import bullhornIcon from '@iconify/icons-mdi/bullhorn';
import userEdit from '@iconify/icons-fa-solid/user-edit';
import eyeShowSolid from '@iconify/icons-clarity/eye-show-solid';
import {Link, Redirect} from 'react-router-dom';

class sellerPage extends React.Component{

    render(){
        if(!this.props.currentUser){
            return(
                <Redirect to ='signin'/>
            )
        }
        else{
            var currentUser = this.props.currentUser;
            return(
                <div className = 'seller-page'>
        <div className = 'ass'>
        <h1 className = 'h1s'><span className = 'highlight'>Welcome  </span>{currentUser.displayName}</h1>
        </div>
        <div className ='options'>
            <Link className = 'box' to = '/sellerpage/postad' >
            <InlineIcon icon={bullhornIcon}  width = '200px' height = '200px'/>
                Post An Ad
            </Link>
            <div className = 'box'>
            <Link className = 'box' to = '/sellerpage/myads' >
            <Icon icon={eyeShowSolid}  width = '200px' height = '200px'/>
                View My Ads
            </Link>
            </div>
            <div className = 'box'>
            <Icon icon={userEdit}  width = '200px' height = '200px'/>
                Edit Profile
            </div>
        </div>
    </div>
            )   
        }
    }
}


const mapStateToProps = state => ({
    currentUser : state.user.currentUser
});

export default connect(mapStateToProps)(sellerPage);