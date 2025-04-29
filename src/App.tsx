import React, { useState } from 'react';
import OpenAI from "openai";
import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import {BasicQuiz} from './pages/BasicQuiz'
import { DetailedQuiz } from './pages/DetailedQuiz';
import { Form, Button } from 'react-bootstrap';
import { ResultsPage } from './pages/Results';
import { Link } from 'react-router-dom' // for home and quiz buttons

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App(): React.JSX.Element {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [APIValid, setAPIValid] = useState<boolean>(false); // Checks if API key is valid
  const [currentQuiz, setQuizType] = useState<string>("Basic"); // Track quiz type taken
  const [answers, setAnswers] = useState<string>("");

  // API connection, will get set when view results is clicked
  let client = new OpenAI({apiKey: key, dangerouslyAllowBrowser: true});;
        
  //sets the local storage item to the api key the user inputed
  // function handleSubmit() {
  //   localStorage.setItem(saveKeyData, JSON.stringify(key));
  //   window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  // }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  // Sets up the ChatGPT API, sets client
  async function setupAPI() {
    // Make sure API key saved
    if (key === null) {
      return;
    }

    // Try to connect to API
    try {
      client = new OpenAI({apiKey: key, dangerouslyAllowBrowser: true});
      
      // Tells the API how it will be acting
      const completion = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: "You generate career interests and recommendation reports. You will be given Question Answer pairs to either a basic or detailed quiz and must come up with career recommendations",
            },
        ],
      });

      console.log(completion.choices[0].message.content);

      setAPIValid(true);
    }
    catch (error) {
      setAPIValid(false);
    }
  }

  // Routing info to go to the correct page and API input box
  return (
    <HashRouter>
      <div className="App">
        <header id="Navbar">
        <h2 style={{color: "white"}} id="Homepage-Title">Career Portal</h2> 
        <span id="Navbar-Buttons-Wrapper">
            <Link to="/">
              <Button className="Navbar-Buttons">Home</Button>
            </Link>
            <Link to="/BasicQuiz">
              <Button className="Navbar-Buttons" onClick={() => {setQuizType("Basic")}}>Basic Quiz</Button>
            </Link>
            <Link to="/DetailedQuiz">
              <Button className="Navbar-Buttons" onClick={() => {setQuizType("Detailed")}}>Detailed Quiz</Button>
            </Link>
          </span>
          
        </header>
        
          <Routes>
            <Route path="/" element={<Homepage setQuizType={setQuizType}/>}></Route>
            <Route path="/BasicQuiz" element={<BasicQuiz validAPI={APIValid} setAppAnswers={setAnswers}/>}></Route>
            <Route path="/DetailedQuiz" element={<DetailedQuiz validAPI={APIValid} setAppAnswers={setAnswers}/>}></Route>
            <Route path='/Results' element={<ResultsPage quizType={currentQuiz} userAnswers={answers} connection={client}/>}></Route>
          </Routes>

        <footer className="API-Key-Menu">
          <Form id="API-Form-Wrapper">
            <div>
            <Form.Label>API Key:</Form.Label>
            {
              (APIValid) ? <span style={{color: "Green"}}> API Key is Valid</span> : <span style={{color: "Red"}}> API Key is Invalid</span>
            }
            </div>
            <br></br>
            <Form.Control id="API-Input" type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
            <Button className="Submit-Button" type="button" onClick={setupAPI}>Submit</Button>

            <p>
              Developed By:
              Thomas Lavallee,
              Brayan Hernandez,
              Matthew Stone
            </p>
          </Form>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
