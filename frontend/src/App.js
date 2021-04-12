import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ElectionBallot from "./ElectionBallot";
import DecryptVote from "./DecryptVote";
import './App.css'

/*
 MENU / ROUTER MAPPING
*/
const router_config = [
  {name: "Ballot", path: "/ballot", component: ElectionBallot},
  {name: "Decrypt", path: "/decrypt", component: DecryptVote},
  {name: "Item 3", path: "/3"}
]


/*
  APPLICATION

*/
export default function App() {
  return (
    <Router>
        <ul className="menu">
            {router_config.map((item)=>{
                return(<li>
                    <Link to={item.path}>{item.name}</Link>
                </li>)
            })}
        </ul>
        <hr />
        <Switch>
            {router_config.map((item)=>{
                return (<Route exact path={item.path}>
                    <h1>{item.name}</h1>
                    {React.createElement(item.component)}
                </Route>)
            })}

        </Switch>
    </Router>
  );
}

