import React,{useContext, useEffect} from "react";
import { NavBar, NavLink } from "../components/NavLink";
import {LogoutButton} from '../components/LogoutButton'
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    console.log("Inside dashboard effect")
    console.log(authContext.user)
    if(authContext.user.loggedIn!==true){
      console.log("before navigate")
      navigate('/');
    }
  },[navigate,authContext.user])
  const logoutUser = ()=>{
    signOut(auth).then(() => {
      console.log("Signed user out successfully!!")
      authContext.setuser({});
      localStorage.removeItem('user');
      navigate('/')
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log("Unable to logout!")
      console.table(error);
    });
  }
  return (
    <>
      <NavBar>
        <NavLink to="/add-item">Add Item</NavLink>
        <NavLink to="/add-category">Add Category</NavLink>
        <NavLink to="/add-order">Add Orders</NavLink>
        <NavLink to="/add-client">Add Client</NavLink>
        <NavLink to="/items">View Items</NavLink>
        <NavLink to="/orders">Outgoing Orders</NavLink>
        <NavLink to="">Check Stocks</NavLink>
        <div>|</div>
        <LogoutButton onClick={()=>logoutUser()}>Logout</LogoutButton>
      </NavBar>
    </>
  );
}


export default Dashboard;
