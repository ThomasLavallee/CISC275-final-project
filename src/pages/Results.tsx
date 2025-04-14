import OpenAI from "openai";
import React from "react";
import { Button } from "react-bootstrap";

interface ResultsPageProps {
    quizType: string,
    userAnswers: string, 
    connection: OpenAI
}

export function ResultsPage({quizType, userAnswers, connection}: ResultsPageProps): React.JSX.Element {
    function checkAnswerFormat() {
        // Make sure all questions are answered 
        const answerArray: string[] = userAnswers.split("\\.");  
        
        alert(answerArray);
    }

    return <div className="Results-Page">
        {quizType} Results Page

        <Button onClick={checkAnswerFormat}>Show Answers</Button>
    </div>

}