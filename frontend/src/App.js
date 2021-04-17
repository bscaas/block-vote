import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import ElectionBallot from "./ElectionBallot";
import DecryptVote from "./DecryptVote";
import './App.css'
import Elections from "./Elections";
import Candidates from "./Candidates";
import ElectionForm from "./ElectionForm";
import CandidateForm from "./CandidateForm";
import VoterForm from "./VoterForm";


/*
MENU / ROUTER MAPPING
*/
const router_config = [
  {name: "Home", path: "/", component: Home, is_menu: true},
  {name: "About", path: "/about", component: About, is_menu: true},
  {name: "Ballot", path: "/ballot", component: ElectionBallot},
  {name: "Decrypt", path: "/decrypt", component: DecryptVote},
  {name: "Elections", path: "/elections", component: Elections, is_menu:true},
  {name: "Candidates", path: "/candidates", component: Candidates},
  {name: "Candidate Form", path: "/candidate-form", component: CandidateForm},
  {name: "Election Form", path: "/election-form", component: ElectionForm},
  {name: "Register Voter", path: "/voter-form", component: VoterForm},
]


/*
  APPLICATION

*/
export default function App() {
  return (
    <Router>
        <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between px-2 bg-blueGray-500 rounded border-2 border-green-200">
          <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
            <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="/">
              <img className="rounded-lg md:w-56" 
                src={`${process.env.PUBLIC_URL}/assets/images/logo.png`} 
                alt="logo"/>
            </a>
            <button className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button">
              <span className="block relative w-6 h-px rounded-sm bg-white"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
              <span className="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
            </button>
          </div>
          <div className="flex lg:flex-grow items-center">
            <ul className="flex flex-col lg:flex-row list-none ml-auto">
              {router_config.map((item, i)=>{
                  if(item.is_menu){
                    return(<li className="nav-item">
                        <Link className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75" to={item.path}>{item.name}</Link>
                    </li>)
                  }
                  
              })}
            </ul>
          </div>
        </nav>


        
        <Switch>
            {router_config.map((item)=>{
                return (<Route exact path={item.path}>
                    <div className="p-5 pb-0">
                      {React.createElement(item.component)}
                    </div>
                </Route>)
            })}

        </Switch>
    </Router>

  );
}

