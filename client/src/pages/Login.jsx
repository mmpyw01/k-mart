import { useState } from "react";
//import "../pages/Login.css";
import FormInput from "../components/formInput/FormInput";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { login } from "./../redux/apiCalls";
import { Link } from 'react-router-dom';

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
background: linear-gradient(
    rgba(255, 255, 255, 0.7),
    rgba(255, 255, 255, 0.3)
  ),
  url("https://images.pexels.com/photos/114979/pexels-photo-114979.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500");
background-size: cover;
background-position: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;

const Form = styled.form`
  background-color: white;
  padding: 0px 50px;
  border-radius: 10px;
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


const Error = styled.span`
  color: red;
`;


const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory()
  const { isFetching, error } = useSelector((state) => state.user);

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Enter an username !",
      label: "Username",
      pattern: "^[A-Za-z0-9]{1,16}$",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Enter a password!",
      label: "Password",
      pattern: `^[a-zA-Z0-9]{1,20}$`,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    var element = {};
    element.username = values.username;
    element.password=values.password;
    login(dispatch,element);
    console.log(error)
    if(!error){
      history.push('/')
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>SIGN IN</Title>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <Button>Submit</Button>
        {error && <Error>Something went wrong...</Error>}
        <div>or create a new account
          <Link to ="/register1"  style={{ color: "red" , textAlign:'center' }}> HERE </Link>
        </div>
      </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;