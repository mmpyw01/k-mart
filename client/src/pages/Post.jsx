import React from 'react'
import Creatable from 'react-select/creatable'
import styled from "styled-components";
import { mobile } from "../responsive";
import Announcement from '../components/Announcement'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar'
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "../pages/update.css";

import { useDispatch } from 'react-redux';
import app from '../firebase';
import { addCard } from '../redux/apiCalls';
import { useSelector } from 'react-redux';

const Container = styled.div``;

const Wrapper = styled.div`
  width: 50%;
  padding: 40px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;



const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
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


const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'white' : 'black',
    padding: 20
  })
}

export default function NewCard() {
  const [inputs, setInputs] = useState({})
  const [file, setFile] = useState(null)
  const cat = "TRADE";
  const dispatch = useDispatch()
  const [roleValue, setRoleValue] = useState('')
  const user = useSelector((state) => state.user.currentUser.username);
  const userId = user;
  console.log("user", userId)
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  console.log(inputs)



  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime + file.name;
    const storage = getStorage(app)
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const Card = { ...inputs, img: downloadURL, categories: cat, userId };
          addCard(Card, dispatch);
          window.location = '/cards/:categories';
        });
      }
    );

  };
  return (
    <Container>
      <Announcement />
      <Navbar />
      <div className="updateWrapper">
        <h1 className="updateTitle">Post to Trade</h1>
          <div className="updateContainer">
          <form >
            <h2 className="addSubCardTitle">Details</h2>
            <div className="formItem">
              <label>Image:  </label>
              <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
            </div>
            <div className="formItem">
              <label>Card name:  </label>
              <input className="formInput" name="title" type="text" placeholder="Band-Artist" onChange={handleChange} />
            </div>
            <div className="formItem">
              <label>Band:</label>
              <input className="formInput" name="band" type="text" placeholder="description..." onChange={handleChange} />
            </div>
            <div className="formItem">
              <label>Artist:</label>
              <input className="formInput" name="artist" type="text" placeholder="description..." onChange={handleChange} />
            </div>
            <div className="formItem">
              <label>Card Information:</label>
              <input className="formInput" name="desc" type="text" placeholder="description..." onChange={handleChange} />
            </div>
            <h2 className="addSubCardTitle">Want to Trade details</h2>
            <div className="formItem">
              <label>Card name:</label>
              <input className="formInput" name="titleTrade" type="text" placeholder="Band-Artist" onChange={handleChange} />
            </div>
            <div className="formItem">
              <label>Band:</label>
              <input className="formInput" name="bandTrade" type="text" placeholder="description..." onChange={handleChange} />
            </div>
            <div className="formItem">
              <label>Artist:</label>
              <input className="formInput" name="artistTrade" type="text" placeholder="description..." onChange={handleChange} />
            </div>
            <div className="formItem">
              <label>Card Information:</label>
              <input className="formInput" name="descTrade" type="text" placeholder="description..." onChange={handleChange} />
            </div>
            <div className="formItem">
              <label>Contact:</label>
              <input className="formInput" name="contact" type="text" placeholder="description..." onChange={handleChange} />
            </div>

            <Button onClick={handleClick} className="addCardButton">POST</Button>
          </form>
        </div>
      </div>
      <Footer />
    </Container>
  );
}
