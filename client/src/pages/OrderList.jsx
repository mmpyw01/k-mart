import { Add, Remove } from '@material-ui/icons';
import { useEffect, useState } from "react";
import styled from 'styled-components';
import Footer from './../components/Footer';
import Navbar from './../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import { userRequest, setToken, publicRequest } from "../requestMethods"
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { getOrder } from "./../redux/apiCalls";
import Announcement from './../components/Announcement';
import { Link } from 'react-router-dom';
import { 
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom/cjs/react-router-dom.min";

const dotenv = require("dotenv");
dotenv.config();

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`

`
const Wrapper = styled.div`
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

const ProductSize = styled.span``

const Hr = styled.hr`
    background-color: #eee;
    border: none ;
    height: 10px;
`



const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`


const OrderList = () => {
  const cart = useSelector((state) => state.cart);
  const [order, setOrder] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory()

  const userid = useSelector(state => state.user.currentUser.data.userId)
  console.log("userid", userid)


  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await userRequest.get("/orders/find/" + userid);
        setOrder(res.data);
      } catch { }
    };
    getOrder();
  }, [userid])

  const handleClick = (direction, id, color, size) => {

  };

  const handleClickReset = () => {
    // dispatch(
    //     resetProduct()
    // );
  }

  console.log("order",order)
  return (
    <Container>
      <Announcement />
      <Navbar />
      
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <Link to="/products/:categories">
          <TopButton>Continue Shopping</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag ({cart.quantity})</TopText>

          </TopTexts>




        </Top>
        <Bottom>
          <Info> 
            {order[0] && order.map(order => (
              <Product>
                <ProductDetail>
                  {/* {product.img != null && <Image src={product.img} />} */}
                  <Details>
                    <ProductName> <b>Order :</b> {order.key}</ProductName>
                    <ProductID><b>Amount :</b> {order.amount/100} </ProductID>

                    <ProductSize><b>Status :</b> {order.status}</ProductSize>
                    <ProductSize><b>receipt :</b> {order.receipt_url}</ProductSize>


                  </Details>

                </ProductDetail>
                

              </Product>
            ))
            }
            <Hr />
          </Info>


        </Bottom>
      </Wrapper>

      <Footer />
    </Container>
  )
}

export default OrderList