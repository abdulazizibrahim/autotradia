import React from 'react';
import './App.css';
import Header from './components/header/header.components';
import {Route, Switch, Redirect} from 'react-router-dom';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import HomePage from './pages/homepage/homepage.componenets';
import Footer from './components/footer/footer.components';
import SignInAndSignOutPage from './pages/sign-in-sign-up/sign-in-sign-up.components';
import {setCurrentUser} from './redux/user/user.action';
import sellerPage from './pages/sellerpage/sellerpage.components';
import PostAd from './components/post-ad/post-ad.components';
import {connect} from 'react-redux';
import DisplayAd from './components/display-ads/display-ads.components';
import TheAd from './components/the-ad/the-ad.components';
import AllAds from './components/all-ads/all-ads.components';
class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser ({
              id: snapshot.id,
              ...snapshot.data()
            });
          });
      }
      else{
        setCurrentUser(userAuth);
      }
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
    console.log(this.props.currentUser);
  return (
    <div>
      <Header/>
      <Switch>
        <Route  exact path ='/' component = {HomePage}/>
        <Route  exact path ='/sellerpage' component = {sellerPage}/>
        <Route  exact path ='/sellerpage/myads' component = {DisplayAd}/>
        <Route  exact path ='/sellerpage/postad' component = {PostAd}/>
        <Route  exact path ='/allads/thead' component = {TheAd}/>
        <Route  exact path ='/allads' component = {AllAds}/>
        <Route exact path ='/signin' render={() => this.props.currentUser ? (<Redirect to = '/sellerpage'/>) : (<SignInAndSignOutPage/>)}/>
      </Switch>
      <Footer/>
    </div>  
  );
  }
}
const mapStateToProps = ({user}) =>({
  currentUser : user.currentUser
})

const mapDispatchToProps = dispatch =>({
  setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
