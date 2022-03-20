import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch as Switching,
  Route,
} from "react-router-dom";
import "./App.css";
import { useStateValue } from "./config/StateProvider";
import Home from "./pages/Home Screen/Home";

function App() {
  const [{}, dispatch] = useStateValue();

  return (
    <div className="app">
      <Router>
        <Switching>
          <Route path="/home">{<Home />}</Route>
        </Switching>
      </Router>
    </div>
  );
}

export default App;
