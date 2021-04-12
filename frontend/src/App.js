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
import Elections from "./Elections";
import Candidates from "./Candidates";
import ElectionForm from "./ElectionForm";

/*
 MENU / ROUTER MAPPING
*/
const router_config = [
  {name: "Ballot", path: "/ballot", component: ElectionBallot},
  {name: "Decrypt", path: "/decrypt", component: DecryptVote},
  {name: "Elections", path: "/elections", component: Elections, is_menu:true},
  {name: "Candidates", path: "/candidates", component: Candidates},
  {name: "Election Form", path: "/election-form", component: ElectionForm},
]


/*
  APPLICATION

*/
export default function App() {
  return (
    <Router>
        <ul className="menu">
            {router_config.map((item, i)=>{
                if(item.is_menu){
                  return(<li>
                      <Link to={item.path}>{item.name}</Link>
                  </li>)
                }
                
            })}
        </ul>
        <hr />
        <Switch>
            {router_config.map((item)=>{
                return (<Route exact path={item.path}>
                    <h1 className="text-2xl">{item.name}</h1>
                    {React.createElement(item.component)}
                </Route>)
            })}

        </Switch>
    </Router>
  );
}

