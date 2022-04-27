import React from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from 'styled-components';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {update} from '../redux/apiCalls'
import "../pages/update.css";


const Profile=()=>{
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    console.log(user)
    const handleClick = (e) => {
        e.preventDefault();
        console.log(user)
        var element = {};
        element.userid = user._id;
        element.name = name;
        element.lastname = lastname;
        element.username = username;
        element.email=email;
        element.password=password;
        console.log(element)
        console.log("updateUser")
        update(element, dispatch);
        
        console.log(user)
        
        //dispatch(resetProduct());
        //window.location = '/';   

    };
    
    return (
        <div className="update">
            <Announcement />
            <Navbar/>
        <div className="updateWrapper">
          <h3 className="updateTitle">Update Your Account</h3>
          <div className="updateContainer">
            <form>
              {/* <div className="formItem">
                <label>Profile Picture</label>
                <div className="profilePic">
                  <img
                    className="avatar"
                    src="https://images.pexels.com/photos/3024627/pexels-photo-3024627.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <span className="change">Change</span>
                </div>
              </div> */}
              <div className="formItem">
                <label>Name</label>
                <input
                  className="formInput"
                  type="text"
                  placeholder={user.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="formItem">
                <label>Lastname</label>
                <input
                  className="formInput"
                  type="text"
                  placeholder={user.lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
              <div className="formItem">
                <label>Username</label>
                <input
                  className="formInput"
                  type="username"
                  placeholder={user.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="formItem">
                <label>Email</label>
                <input
                  className="formInput"
                  type="email"
                  placeholder={user.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="formItem">
                <label>Password</label>
                <input className="formInput" 
                type="password" 
                placeholder="********"
                onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                disabled={user.pending}
                className="updateButton"
                onClick={handleClick}
              >
                Update
              </button>
              {user.error && <span className="error">Something went wrong!</span>}
              {user.error === false && (
                <span className="success">Account has been updated!</span>
              )}
            </form>
          </div>
        </div>
        <Footer/>
      </div>
      )
}
export default Profile