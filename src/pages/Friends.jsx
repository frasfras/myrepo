import React, {Component} from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import Layout from "../components/shared/Layout";
import * as db from "../firestore";
import FriendsList from './FriendsList';

// import './App.css';

// var Airtable = require('airtable');
// var records;
// var base = new Airtable({apiKey: 'keyjVpG4zXCD49VfC'}).base('appw2jyygHfhv6Xse');

// import { process } from '@progress/kendo-data-query';
// import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
// import { DropDownList } from '@progress/kendo-react-dropdowns';
// import { Window } from '@progress/kendo-react-dialogs';
import pets from '../friend.json';

const friends_LIST = {
  name: "",
  email: ""
}

class Friends extends Component {

  state = {
    dropdownlistCategory: null,
    gridDataState: {
      sort: [
        { field: "name", dir: "asc" }
      ],
      skip: 0,
      take: 10
    },
    submitted: false,
    name: "",
    email: "",
    records: []

  }

  componentDidMount(){

 
  }


  handleDropDownChange = (e) => {
    let newDataState = { ...this.state.gridDataState };
    console.log('ok');
    if (e.target.value.CategoryID !== null) {
      newDataState.filter = {
        logic: 'and',
        filters: [{ field: 'post', operator: 'eq', value: e.target.value.post }]
      }
      newDataState.skip = 0
    } else {
      newDataState.filter = []
      newDataState.skip = 0
    }
    this.setState({
      dropdownlistCategory: e.target.value.CategoryID,
      gridDataState: newDataState
    });
  }

  handleGridDataStateChange = (e) => {
    this.setState({gridDataState: e.dataState});
  }

  render() {
     var txt;
     var itech;
    
     itech = <iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrsnpuJgqtxSoZzB?backgroundColor=blue&viewControls=on" 
     frameborder="0" onmousewheel="" width="70%" height="583" 
     style={{background: 'transparent border: 2px solid #ccc'}}></iframe>;
        
      const text = (
        <div id="In" className="page inbox-page">
          <ul>
            <li>
              {/* <h6>Add things</h6> */}
              <p>
          
              {itech}
              </p>
            </li>
           
          </ul>
        </div>)
             

    return (
       
      <div className="container px-5 py-5 mx-auto">
        
        <p>
         
        </p>
        <Layout >
        <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">Invite Friends!</h1>
        <h4 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">to share things with</h4>
           {itech}
           
        <h1 className="text-2xl font-medium title-font mb-4 text-white tracking-widest">My Friends!</h1>
         
        <Grid
          data={process(pets, this.state.gridDataState)}
          pageable={true}
          sortable={true}
          {...this.state.gridDataState}
          onDataStateChange={this.handleGridDataStateChange}
          style={{ height: "400px" }}>
          <GridColumn field="name" title="Friend Name" />
         
          <GridColumn field="email" title="email"  />
         
         
        
        </Grid>
        
        </Layout>
      </div>
    );
  }
}
export default Friends;
