import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from './../responsive';

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
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

const CategoryItem = ({item}) => {
  return (
    <Container>
      <Link to={`/${item.link}/${item.cat}`}>
      <Image src={item.img}/>
      <Info>
        <Title>{item.title}</Title>
        <Desc>{item.desc}</Desc>
        <Button>SEE MORE</Button>
      </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem
