import OpenAI from "openai";
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ResultsPageProps {
    quizType: string,
    userAnswers: string, 
    connection: OpenAI
}

export function ResultsPage({quizType, userAnswers, connection}: ResultsPageProps): React.JSX.Element {
    return <div className="Results-Page">
        <Link to={"/"}>
            <Button>Home</Button>
        </Link>
        {quizType} Results Page
    </div>

}