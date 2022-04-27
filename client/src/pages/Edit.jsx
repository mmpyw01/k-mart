import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { useDispatch } from "react-redux";
import { updateCard } from "../redux/apiCalls";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  width: 200px;
  color: white;
  background-color: black;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #ffffff;
      color: black;
  }
`;

const Edit = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [card, setCard] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [band, setBand] = useState("");
  const [artist, setArtist] = useState("");
  const [desc, setDesc] = useState("");
  const [bandTrade, setBandTrade] = useState("");
  const [artistTrade, setArtistTrade] = useState("");
  const [descTrade, setDescTrade] = useState("");
  const [contact, setContact] = useState("");
  const [inStock, setInStock] = useState("");
  var element = {};
  let testNum = 0;

    const sendInfo = () => {
      testNum =1;
      element.title = card.title;
      element.band = card.band;
      element.artist = card.artist;
      element.desc = card.desc;
      element.bandTrade = card.bandTrade;
      element.artistTrade = card.artistTrade;
      element.descTrade = card.descTrade;
      element.contact=card.contact;
      element.inStock=card.inStock;
      console.log(element)
  }
  const handleClick = (e) => {
    e.preventDefault();
    if(title){element.title = title;}
    if(band){element.band = band;}
    if(artist){element.artist = artist;}
    if(desc){element.desc = desc;}
    if(bandTrade){element.bandTrade = bandTrade;}
    if(artistTrade){element.artistTrade = artistTrade;}
    if(descTrade){element.descTrade = descTrade;}
    if(contact){element.contact = contact;}
    if(inStock){element.inStock = inStock;}
    // element.title = title;
    // element.band = band;
    // element.artist = artist;
    // element.desc = desc;
    // element.bandTrade = bandTrade;
    // element.artistTrade = artistTrade;
    // element.descTrade = descTrade;
    // element.contact=contact;
    // element.inStock=inStock;
    console.log(element)
    console.log("updateUser")
    updateCard(id,element, dispatch);
    

    
    //dispatch(resetProduct());
    //window.location = '/';   

  };

  useEffect(() => {
    const getCard = async () => {
      try {
        const res = await publicRequest.get("/cards/find/" + id);
        setCard(res.data);
      } catch {}
    };
    getCard();
  }, [id]);
  
  console.log("id",id)



  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
      {!testNum && sendInfo()}
        <ImgContainer>
          <Image src={card.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>
            <input type="text" Value={card.title} onChange={(e) => setTitle(e.target.value)}/>
          </Title>
          <h2>Details</h2>
          <Desc>
            <h3>Band / Artist:</h3>
            <input type="text" Value={card.band} onChange={(e) => setBand(e.target.value)}/>  / <input type="text" Value={card.artist} onChange={(e) => setArtist(e.target.value)}/>
            <h3>Card information:</h3>
            <input type="text" Value={card.desc} onChange={(e) => setDesc(e.target.value)}/>
          </Desc>
          <h2>Want to Trade Details</h2>
          <Desc>
            <h3>Band / Artist:</h3>
            <input type="text" Value={card.bandTrade} onChange={(e) => setBandTrade(e.target.value)}/>  / <input type="text" Value={card.artistTrade} onChange={(e) => setArtistTrade(e.target.value)}/>
            <h3>Card information:</h3>
            <input type="text" Value={card.descTrade} onChange={(e) => setDescTrade(e.target.value)}/>
          </Desc>
          <Desc>
            <h3>Contact:</h3>
            <input type="text" Value={card.contact} onChange={(e) => setContact(e.target.value)}/>
          </Desc>
          <Desc>
            <h3>Available</h3>
            <select name="inStock" id="idStock" onChange={(e) => setInStock(e.target.value)}>
              <option value="true" >Yes</option>
              <option value="false">No</option>
            </select>
          </Desc>
          <Button onClick={handleClick}>Update </Button>
        </InfoContainer>
        
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Edit;
