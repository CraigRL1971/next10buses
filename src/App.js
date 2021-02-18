import { Route, Switch, withRouter } from 'react-router-dom'
import Home from './Views/Home'
import MapView from './Views/MapView'
import JourneyView from './Views/JourneyView'

function App() {
  return (
    <div>
        <Switch>
          <Route path="/mapview">
            <MapView />
          </Route>
          <Route path="/journeyview">
            <JourneyView />  
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
    </div>
  );
}

export default withRouter(App);
