import Table from './components/Table.js'
import Details from './components/Details.js'
import Error from './components/Error.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
// import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/tickets">
            <Table />
          </Route>
          <Route path="/ticket/:id">
            <Details />
          </Route>
          <Route path="/error">
            <Error />
          </Route>
          <Route exact path="/">
            <Redirect to="/tickets" />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
