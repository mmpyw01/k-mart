import styled from "styled-components";
import { popularCards } from "../data";
import Card from "./Card";
import { useEffect, useState } from 'react';
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Cards = ({ cat, filters, sort }) => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/cards?category=${cat}`
            : "http://localhost:5000/api/cards"
        );
        setCards(res.data);
      } catch (err) {}
    };
    getCards();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredCards(
        cards.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [cards, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredCards((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredCards((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredCards((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  

  return (
    <Container>
      {cat
        ? filteredCards.map((item) => <Card item={item} key={item.id} />)
        : cards
            .slice(0, 8)
            .map((item) => <Card item={item} key={item.id} />)}
    </Container>
  );
};

export default Cards;