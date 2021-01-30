import { Route, Switch } from 'react-router-dom'
import Home from './Views/Home'
import MapView from './Views/MapView'
import JourneyView from './Views/JourneyView'

function App() {
  return (
    <div>
        <Switch>
          <Route exact path="/mapview">
            <MapView />
          </Route>
          <Route exact path="/journeyview">
            <JourneyView />  
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
