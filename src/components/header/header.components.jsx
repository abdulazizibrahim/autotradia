import React from 'react';
import {Link} from 'react-router-dom';
import {auth} from '../../firebase/firebase.utils';
import './header.styles.scss';
import {connect} from 'react-redux';



const Header = ({currentUser}) =>(
    <div className = 'header'>
        <Link to ='/'>
            <h1><span className = 'highlight'>Auto</span>Tradia</h1>
        </Link>
        
        <div className ='options'>
            <Link className='option' to = '/sellerpage'>
                SELL
            </Link>
            <Link className='option' to = '/'>
                SERVICES
            </Link>
            {
                currentUser ?
                    <div className = 'option'  onClick = {()=>auth.signOut()}>SIGN OUT</div>

                :
                <Link className='option' to = '/signin'>SIGN IN</Link>
            }
        </div>
    </div>
)

const mapStateToProps = state => ({
    currentUser : state.user.currentUser
});
export default connect(mapStateToProps)(Header);