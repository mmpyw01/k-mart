import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Trades from "../components/Trades";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation,Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import { userRequest, setToken, publicRequest } from "../requestMethods"
import { useSelector, useDispatch } from 'react-redux';



const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${props => props.type === "filled" && "none"};
  background-color: ${props => props.type === "filled" ? "black" : "transparent"};
  color: ${props => props.type === "filled" && "white"}
`;

const Option = styled.option``;

const TradeList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [userCard, setUserCard] = useState({});

  


  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Top>
        <Title>START YOUR TRADE</Title>
        <Link to={`/post`}>
          <TopButton type="filled">POST TO TRADE</TopButton>
        </Link>    
      </Top>
      <h2>Your post</h2>
      <FilterContainer>
        <Filter>
          <Select name="band" onChange={handleFilters}>
              <Option disabled>
                Band
              </Option>
              <Option>--</Option>
              <Option>BLACKPINK</Option>
              <Option>BTS</Option>
              <Option>EXO</Option>
              <Option>NCT</Option>
              <Option>RED VELVET</Option>
              <Option>TWICE</Option>
              <Option>AESPA</Option>
              <Option>Stray Kids</Option>
            </Select>
            <Select name="artist" onChange={handleFilters}>
              <Option disabled>
                Artist
              </Option>
              <Option>--</Option>
              <Option>Felix</Option>
              <Option>Winter</Option>
              <Option>Sungchan</Option>
              <Option>Karina</Option>
            </Select>
        </Filter>
        <Filter>
          <FilterText>Sort:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Trades userCard={userCard} />
      <Footer />
    </Container>
  );
};

export default TradeList;
