import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Components
import Header from './Header';
import Footer from './Footer';

//Containers
import Home from '../containers/Home';
import News from '../containers/News';
import GalleryItem from '../containers/GalleryItem';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Header/>
            <Switch>
              <Route path={'/news/:id'} component={News}/>
              <Route path={'/galleries/:id'} component={GalleryItem}/>
              <Route exact path={'/'} component={Home}/>
            </Switch>
            <Footer/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
