import React, { useState } from 'react';
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import {BasicQuiz} from './pages/BasicQuiz'
import { DetailedQuiz } from './pages/DetailedQuiz';
import { Form, Button } from 'react-bootstrap';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App(): React.JSX.Element {
  const [key, setKey] = useState<string>(keyData); //for api key input
        
  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  // Set up the ChatGPT API
  function setupAPI() {
    // Update the key
    handleSubmit();

    //alert(localStorage.getItem(saveKeyData));
  }

  // Routing info to go to the correct page
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/BasicQuiz" element={<BasicQuiz />}></Route>
          <Route path="/DetailedQuiz" element={<DetailedQuiz />}></Route>
        </Routes>
      </HashRouter>

      <footer className="API-Key-Menu">
        <Form>
          <Form.Label>API Key:</Form.Label>
          <Form.Control id="API-Input" type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
          <br></br>
          <Button className="Submit-Button" type="button" onClick={setupAPI}>Submit</Button>
        </Form>

        Made By:
        Thomas Lavallee,
        Brayan Hernandez,
        Matthew Stone
      </footer>
    </div>
  );
}

export default App;
