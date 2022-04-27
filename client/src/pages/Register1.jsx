import { useState } from "react";
//import "../pages/register1.css";
import FormInput from "../components/formInput/FormInput";
import { register } from "./../redux/apiCalls";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

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
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
`;

const Form = styled.form`
  align-items: center;
  justify-content: center;
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

const Link = styled.a`
text-align: center;
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Register1 = () => {
  const [values, setValues] = useState({
    name: "",
    lastname:"",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const history = useHistory()

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Firstname",
      errorMessage:
        "Name should be 3-16 characters and shouldn't include any special character!",
      label: "Name",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "Lastname",
      errorMessage:
        "Lastname should be 3-16 characters and shouldn't include any special character!",
      label: "Lastname",
      pattern: "^[A-Za-z]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 8-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{8,16}$",
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    var element = {};
    element.name = values.name;
    element.lastname = values.lastname;
    element.email=values.email;
    element.username = values.username;
    element.password=values.password;
    register(dispatch,element);
    history.push('/login')
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Register</Title>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <Button>Submit</Button>
        <Link>Already</Link>
      </Form>
      </Wrapper>
    </Container>
  );
};

export default Register1;
