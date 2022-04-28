import { useState } from "react";
//import "../pages/Login1.css";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FormInput from "../components/formInput/FormInput";
import { useDispatch,useSelector } from "react-redux";

import styled from "styled-components";

import { update } from "./../redux/apiCalls";

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 90vh;
background: linear-gradient(
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  ),
  url("https://i0.wp.com/www.grotonucc.org/wp-content/uploads/2020/04/008-Rainy-Ashville.png?fit=2400%2C2000&ssl=1");
background-size: cover;
background-position: center;
`;

const Wrapper = styled.div`
  padding: 10px;
  background-color: white;
  border-radius: 10px;
`;

const Form = styled.form`
  background-color: white;
  padding: 30px 60px;
`;

const Title = styled.h1`
  color: rgb(77, 1, 77);
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: none;
  background-color: rebeccapurple;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 30px;
`;


const Profile = () => {
  const [values, setValues] = useState({
    username: "",
    name:"",
    lastname:"",
    email:""
  });
  const dispatch = useDispatch();
  const user = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user || "{}")?.currentUser;
  console.log(user)
  console.log(user.name)
  console.log(user.name)

  const inputs = [
    {
        id: 1,
        name: "name",
        type: "text",
        placeholder: user.name,
        errorMessage:
          "Please enter a firstname and include at 3-16 letters.",
        label: "Firstname",
        pattern: "^[A-Za-z]{3,16}$",
        required: true,
      },
      {
        id: 2,
        name: "lastname",
        type: "text",
        placeholder: user.lastname,
        errorMessage:
        "Please enter a lastname and include at 3-16 letters.",
        label: "Lastname",
        pattern: "^[A-Za-z0-9]{3,16}$",
        required: true,
      },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: user.email,
      errorMessage:
      "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "username",
      type: "username",
      placeholder: user.username,
      errorMessage:
      "Username should be 8-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{1,16}$",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

        console.log(user)
        var element = {};
        element.userid = user._id;
        element.name = values.name;
        element.lastname = values.lastname;
        element.username = values.username;
        element.email=values.email;
        console.log("element")
        console.log(element)
        console.log("updateUser")
        update(element, dispatch);
        console.log("after")
        console.log(user)
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log("value")
    console.log(values)
  };

  return (
    <div >
      <Announcement />
      <Navbar/>
      <Container>
          <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>UPDATE  PROFILE</Title>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <Button>Update</Button>
        <div>Please logout then login again</div>
        <div>to see the update.</div>
      </Form></Wrapper>
     </Container>
      <Footer />
</div >
  );
};

export default Profile;