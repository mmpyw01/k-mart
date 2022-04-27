import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from './../responsive';

const Container1 = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;

const Container = styled.div`
  flex: 1;
  margin: 20px;
  height: 40vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({height: "50vh"})}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  font-size: 45px;
  margin-bottom: 20px;
`;

const Desc = styled.p`
  color: white;
  margin: 5px 0px;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 1px;
  margin-bottom: 50px;
  textAlign: "center";
  ${mobile({ textAlign: "center" })}
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const User_cat = () => {
  return (
    <Container1>
    <Container >
      <Link to="/profile">
      <Image src="https://www.formica.com/th-th/-/media/formica/asia/products/swatch-images/7897/7897-swatch.jpg?rev=8de32fe74ce84d4f8ce3908ace6323fd"/>
      <Info>
        <Title>Profile</Title>
        <Desc>you can edit you profile information here</Desc>
        <Button>VIEW OR EDIT</Button>
      </Info>
      </Link>
      </Container>
      <Container>
      <Link to="/orderlist">
      <Image src="https://www.formica.com/th-th/-/media/formica/asia/products/swatch-images/6901/6901-fullsheet.jpg?rev=f63b6e3cf10e4aaab42d71865d84e83a"/>
      <Info>
        <Title>Order History</Title>
        <Desc>view and manage your order infromation here</Desc>
        <Button>VIEW HERE</Button>
      </Info>
      </Link>
      </Container>
      <Container>
      <Link to="/trade_history">
      <Image src="https://www.formica.com/th-th/-/media/formica/asia/products/swatch-images/2478/2478-swatch.jpg?rev=02da49e825cc43a89648770b252afd98"/>
      <Info>
        <Title>Your Trade</Title>
        <Desc>view and manage your trade information </Desc>
        <Button>VIEW TRADE</Button>
      </Info>
      </Link>
      </Container>
    </Container1>
  )
}

export default User_cat