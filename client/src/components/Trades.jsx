import styled from "styled-components";
import { popularTrades } from "../data";
import Trade from "./Trade";
import { useEffect, useState } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { userRequest, setToken, publicRequest } from "../requestMethods"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Trades = ({ cat, filters, sort }) => {
  const [trades, setTrades] = useState([]);
  const [filteredTrades, setFilteredTrades] = useState([]);
  const [userCard, setUserCard] = useState({});

  const userId = useSelector(state => state.user.currentUser.username)

  useEffect(() => {
    const getTrades = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/cards?category=${cat}`
            : "http://localhost:5000/api/cards"
        );
        setTrades(res.data);
      } catch (err) {}
    };
    getTrades();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredTrades(
        trades.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [trades, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredTrades((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredTrades((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredTrades((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  useEffect(() => {
    const getUserCard = async () => {
      try {
        const res = await publicRequest.get(`/orders/trade/${userId}`);
        setUserCard(res.data);
      } catch { }
    };
    getUserCard();
  }, [userId])

  


  return (
    <Container>
      {console.log("userCard",userCard.length,userCard)}
      { userCard.length&&userCard
            .slice(0, 8)
            .map((item) => <Trade item={item} key={item.id} />)}
    </Container>
  );
};

export default Trades;