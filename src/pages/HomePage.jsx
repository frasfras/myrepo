import React from "react";
import CreateList from "../components/CreateList";
import Lists from "../components/Lists";
import Layout from "../components/shared/Layout";
import {UserContext} from '../index';
import FriendsList from './FriendsList';

function HomePage() {
  const user =   React.useContext(UserContext);
  // console.log(user.uid);
  return (
    <Layout>
      <CreateList user={user} />
      <Lists user={user}/>
      
      <FriendsList/>
    </Layout>
  );
}

export default HomePage;
