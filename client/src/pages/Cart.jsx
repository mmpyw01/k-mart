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
    width: 100%;
    padding: 10px;
    background-color: black;
    cursor: pointer;
    color: white;
    font-weight: 600;
`


const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory()
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser)


    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                //setToken()
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                })
                //history.push("/success",{data:res.data});
                history.push("/success", {
                    stripeData: res.data,
                    products: cart,
                    user: user,
                });
            } catch (error) {

            }
        }
        stripeToken && makeRequest();
    }, [stripeToken, cart.total, history])


    const handleClick = (direction, id, color, size) => {
        let productId = cart.products.filter(x => x._id === id)
        let productSize = productId.filter(x => x.size === size)
        let product = productSize.find(x => x.color === color)
        if (direction === "dec") {
            //if()
            const toDo = "dec"
            console.log("first")
            console.log(cart.products)
            //product.quantity-=1
            console.log("product")
            console.log(product)
            console.log("sending")

            dispatch(
                updateProduct({ product, toDo })
            );

            //window.location.reload();

        } else {
            const toDo = "inc"
            //cart.products.find(x => x._id === id).quantity += 1
            console.log("esle", product)
            dispatch(
                updateProduct({ product, toDo })
            );
        }
    };

    const handleClickReset = () =>{
        dispatch(
            resetProduct()
        );
    }

    console.log("Incart",cart)
    return (
        <Container>
            <Announcement />
            <Navbar />

            <Wrapper>
                <Title>Your Bag</Title>
                <Top>

                    <TopButton>Continue Shopping</TopButton>
                    <TopTexts>
                        <TopText>Shopping Bag ({cart.quantity})</TopText>
                  

                    </TopTexts>

                    <TopButton type="filled" onClick={handleClickReset}>reset cart</TopButton>


                </Top>
                <Bottom>
                    <Info>
                        {cart.quantity > 0 && cart.products.map(product => (
                            <Product>
                                <ProductDetail>
                                    {product.img != null && <Image src={product.img} />}
                                    <Details>
                                        <ProductName> <b>Product:</b> {product.title}</ProductName>
                                        <ProductID><b>ID:</b> {product._id} </ProductID>
                                        <ProductColor color={product.color} />
                                        <ProductSize><b>Size</b> {product.size}</ProductSize>

                                    </Details>

                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>

                                        <Remove value="dec" onClick={() => handleClick("dec", product._id, product.color, product.size)} />
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Add value="inc" onClick={() => handleClick("inc", product._id, product.color, product.size)} />
                                    </ProductAmountContainer>
                                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                                </PriceDetail>

                            </Product>
                        ))
                        }
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>Order Summary</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>

                        {user ?

                            <StripeCheckout
                                name="K-MART"
                                image = "https://ecommercenews.eu/wp-content/uploads/2013/06/most_common_payment_methods_in_europe.png"
                                billingAddress
                                shippingAddress
                                description={`Your total is $${cart.total}`}
                                amount={cart.total * 100}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <Button >CHECKOUT</Button>
                                {/* onClick={() => window.open("/success", "_blank")} */}
                            </StripeCheckout>
                            : <Redirect to="/login" />}
                    </Summary>

                </Bottom>
            </Wrapper>


            <Footer />
        </Container>
    )
}

export default Cart