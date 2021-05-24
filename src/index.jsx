import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ListPage from "./pages/ListPage";
import HomePage from "./pages/HomePage";
import Friends from "./pages/Friends";
import Loading from "./components/shared/Loading";
import SignIn from "./components/SignIn";
// import useAuth from "./hooks/useAuth";
import { Calendar } from '@progress/kendo-react-dateinputs';
import { HashRouter } from 'react-router-dom';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import * as db from "./firestore";
import pets from './pets.json';
import '@progress/kendo-theme-default/dist/all.css';

export const UserContext = React.createContext();


function App() {
// const {user,loading} = useAuth();
const [user, setUser] = React.useState(null);
const [loading, setLoading] = React.useState(true);
const [ windowVisible, set] = React.useState(true);
// console.log(loading);

React.useEffect(() => {
 return  db.checkAuth((user) => {
    setLoading(false);
    setUser(user);
  });

}, [])
      
 if (loading) return <Loading />;
  return user ? <AuthApp user={user} /> : <UnAuthApp />;
}

function AuthApp({user} ) {
  return (
  
    <BrowserRouter>
      <Switch>
      <UserContext.Provider value = {user} >
        {/* <Route path="/:listId" component={ListPage} /> */}
        <Route exact path="/" component={HomePage } /> 
        <Route exact path="/friends" component={Friends } /> 
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
    
  );
}

function UnAuthApp() {
  return <SignIn/>;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);