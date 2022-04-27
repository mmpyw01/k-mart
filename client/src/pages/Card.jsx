import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation,useHistory,Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { useDispatch,useSelector } from "react-redux";
import { checkConversations,createConversations,getUserByUsername } from './../redux/apiCalls';
import { setToken } from './../requestMethods';

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

const Card = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [card, setCard] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser);
  console.log("user",user)
  const sendInfo = async () => {



    alert("start");
    const x = await getUserByUsername(`${card.userId}`);
    console.log("x",x)
    //console.log("location", location);
    var element = {};
    // element.senderId = location.state.user.username;
    element.senderId = `${user._id}`;
    element.receiverId = `${x?.data.others._id}`;
    let a = await checkConversations(element);
    console.log("a",a.data)
    if(a.data?._id){
        console.log("Already Create : Do nothing")
        console.log("conversation ID :",a.data?._id);
    }else{
        console.log("Creating Conversations")
        a = await createConversations(element);
        console.log("conversation ID :",a.data._id)
    }
    

    console.log("end Conversation Part")

    const message = {
        sender: user._id,
        text: `card name : ${card.title}  `,
        conversationId: a.data._id,
        img: `${card.img}`
    };

    // const receiverId = currentChat.members.find(
    //     (member) => member !== user._id
    // );

    // socket.current.emit("sendMessage", {
    //     senderId: user._id,
    //     receiverId,
    //     text: newMessage,
    // });

    try {
        setToken()
        const res = await userRequest.post("/messages", message);
        console.log(res)
    } catch (err) {
        console.log(err);
    }

    history.push("/messenger", {
        currentChat: a.data,
    });

  }
  useEffect(() => {
    const getCard = async () => {
      try {
        const res = await publicRequest.get("/cards/find/" + id);
        setCard(res.data);
      } catch {}
    };
    getCard();
  }, [id]);

  return (
    <Container>
      <Announcement />
      <Navbar />
      {console.log(card)}
      <Wrapper>
        <ImgContainer>
          <Image src={card.img} />
        </ImgContainer>
        
        <InfoContainer>
          <Title>{card.title}</Title>
          <h4>Post by:{card.userId}</h4>
          <h2>Details</h2>
          <Desc>
            <h3>Band / Artist:</h3>
            <p>{card.band} / {card.artist}</p> 
            <h3>Card information:</h3>
            <p>{card.desc}</p>
          </Desc>
          <h2>Want to Trade Details</h2>
          <Desc>
          <h3>Band / Artist:</h3>
            <p>{card.bandTrade} / {card.artistTrade}</p> 
            <h3>Card information:</h3>
            <p>{card.descTrade}</p>
          </Desc>
          <Desc>
            <h3>Contact:</h3>
            <p>{card.contact}</p>
          </Desc>

          <Button onClick={sendInfo}>TRADE</Button>
        </InfoContainer>
        
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Card;
