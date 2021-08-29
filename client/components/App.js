import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
 
import SongList from './SongList';
import SongCreate from './SongCreate';
import SongDetail from './SongDetail';
 
class App extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/" component={SongList} />
          <Route exact path="/songs/new" component={SongCreate} />
          <Route exact path="/songs/:id" component={SongDetail}/>
          {/* <Route component={SongList} /> */}
        </Switch>
      </div>
    );
  }
}
 
export default App;