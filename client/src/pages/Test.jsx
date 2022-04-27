import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import PostAddIcon from '@mui/icons-material/PostAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';

const Container = styled.div`
  background-image: linear-gradient(-90deg,#82B4FF,#f26edf);
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  color: white;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  color: white;
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const quantity = useSelector(state=>state.cart.quantity)
  const persistRoot = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const user = persistRoot && JSON.parse(persistRoot).currentUser;
  const history = useHistory()

  function logOut(){
    localStorage.clear()
    history.push('/')
    window.location.reload(false);
  }
  console.log("user",user)

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to = "/" style={{ textDecoration: 'none' , color: '#000' }}>
          <Logo>K-MART</Logo>
          </Link>
        </Center>
        <Right>
          {user?
          <>
          <Link to="/cart" style={{color: '#ffffff'}}>
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
          <Link to="/trade" style={{color: '#ffffff'}}>
          <MenuItem>
            <Badge  color="primary">
              <PostAddIcon />
            </Badge>
          </MenuItem>
          </Link>
          
          <Link to="/user" style={{color: '#ffffff'}}>
          <MenuItem>
            <Badge color="primary">
            <AccountCircleIcon />
            </Badge>
          </MenuItem>
          </Link>
          <button onClick={logOut} style={{cursor:'pointer'}}>LOGOUT</button>
          </>
          :
          <>
          <Link to = "/register" style={{ textDecoration: 'none', color: '#000' }}>
          <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to = "/login" style={{ textDecoration: 'none' , color: '#000'}}>
          <MenuItem >SIGN IN</MenuItem>
          </Link>
          </>
          }
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;