import OpenAI from "openai";
import React from "react";

interface ResultsPageProps {
    quizType: "Basic" | "Detailed",
    userAnswers: string, 
    connection: OpenAI
}

export function ResultsPage({quizType, userAnswers, connection}: ResultsPageProps): React.JSX.Element {
    return <div className="Results-Page">
        Results Page
    </div>
}