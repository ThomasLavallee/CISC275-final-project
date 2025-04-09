import OpenAI from "openai";
import React from "react";

interface ResultsPageProps {
    quizType: string,
    userAnswers: string, 
    connection: OpenAI
}

export function ResultsPage({quizType, userAnswers, connection}: ResultsPageProps): React.JSX.Element {
    return <div className="Results-Page">
        {quizType} Results Page
    </div>
}