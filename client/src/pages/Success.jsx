import { Add, Remove } from '@material-ui/icons';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import { userRequest, setToken } from "../requestMethods"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { addProduct, updateProduct,resetProduct } from "../redux/cartRedux";
import { useLocation } from 'react-router-dom';
import {
    Redirect,
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom/cjs/react-router-dom.min";
import { addOrder } from '../redux/apiCalls';

const dotenv = require("dotenv");
dotenv.config();

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`

`
const Wrapper = styled.div`
    align-items: center;
    justify-content: center;
    padding: 20px;
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"}
`
const TopTexts = styled.div`

`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`

const Info = styled.div`
    flex:3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
`
const ProductDetail = styled.div`
    flex:2; 
    display: flex;
`
const Image = styled.img`
    width:200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span``
const ProductID = styled.span``
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
    flex:1;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display:flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
`
const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
`
const Hr = styled.hr`
    background-color: #eee;
    border: none ;
    height: 10px;
`


const Summary = styled.div`
    flex:1;
    border:0.5px solid lightgray;
    border-radius: 18px;
    padding: 20px;
    height: 50vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24"};

`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const Button = styled.button`
    width: 500px;
    padding: 10px;
    align-items: center;
    background-color: black;
    cursor: pointer;
    color: white;
    font-weight: 600;
`





const Success = () => {

  const location = useLocation()
  const dispatch = useDispatch();
  let isSendInfo = 0;
  const sendInfo = () => {
    isSendInfo = 1;
    console.log("location", location);
    var element = {};
    element.userId = location.state.user.username;
    element.key = location.key;
    element.products = location.state.products.products;
    element.address = location.state.stripeData.billing_details.address;
    element.amount = location.state.stripeData.amount;
    element.receipt_url = location.state.stripeData.receipt_url;
    element.status = location.state.stripeData.status;
    

    console.log(element)
    addOrder(element, dispatch);
    console.log("resetProduct")
    dispatch(resetProduct());

  }
  const handleClick = () => {

    
    

    window.location = '/';   

  };

  
  // getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //   const product = { ...inputs, img: downloadURL, categories: cat };
  //   addProduct(product,dispatch)
  // });
  return (
        <Container>
            <Announcement />
            <Navbar />
            <Wrapper>
                <div>
                    <Title>Successful</Title>
                    {!isSendInfo && sendInfo()}
                    <br></br>
                    {/* <Button onClick={sendInfo}>
                        Confirmation
                    </Button> */}
                    <br></br>
                    <Button onClick={handleClick}>
                        Go to Home
                    </Button>

                </div>
            </Wrapper>
        </Container>
    )
}

export default Success