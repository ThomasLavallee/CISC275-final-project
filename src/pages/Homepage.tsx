import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { QuizDescription } from '../components/QuizDescription';

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

export function Homepage(): React.JSX.Element {
    const basicCareerDescription: string[] = ["Identify your career interests quickly", "Answer 20 simple questions in minutes", "Receive detailed report of career interests and personality traits"]
    const detailedCareerDescription: string[] = ["Understand your career desires in detail", "Receive detailed report of career interests, personality traits, and workplace preferences", "Provides insights into specific roles, including required skills and typical work environments"];
    
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

    return <div>
        <header>
        
        </header>

        <div className='Homepage-Container'>
            <QuizDescription quizType='BasicQuiz' description={basicCareerDescription}></QuizDescription>
            <QuizDescription quizType='DetailedQuiz' description={detailedCareerDescription}></QuizDescription>
        </div>

        <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control type="password" placeholder="Insert API Key Here" onChange={changeKey}></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>Submit</Button>
        </Form>
        Team Members:
        Thomas Lavallee
        Brayan Hernandez
        Matthew Stone
  </div>
}