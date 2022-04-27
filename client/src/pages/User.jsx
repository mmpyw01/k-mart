import React from "react";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from 'styled-components';
import User_cat from '../components/User_cat'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  flex: 1;
  margin: 30px;
  padding: 20px;
  height: 10vh;
  position: relative;
`;
const Title = styled.h1`
    font-size: 90px;
`;
const User = () => {
  const user = useSelector((state) => state.user.currentUser);
    return (
      <div>
        <Announcement />
        <Navbar/>
        <Container>
            <Title>Hi, {user.name} !</Title>
        </Container>
        <User_cat/>
        <Footer/>
      </div>
    );
  };

  export default User;