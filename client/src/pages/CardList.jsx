import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Cards from "../components/Cards";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useState } from "react";

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
const Option = styled.option``;

const CardList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");


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
      <Title>TRADE</Title>
      <FilterContainer>
      <Filter>
          <FilterText>Filter Products:</FilterText>
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
      <Cards cat="TRADE" filters={filters} sort={sort} />
      <Footer />
    </Container>
  );
};

export default CardList;
