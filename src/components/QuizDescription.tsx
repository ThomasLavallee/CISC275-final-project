import React from "react";
import { Button } from "react-bootstrap";

interface QuizDescriptionProps {
    quizType: "Basic" | "Detailed",
    description: string[]
  }

export function QuizDescription({quizType, description}: QuizDescriptionProps): React.JSX.Element {
    
    return <div className="quizDescription">
        <div className="quizDescriptionContainer">
            <ul>
            {
                description.map((sentence: string) => {
                    return <li>{sentence}</li>
                })
            }
            </ul>
        </div>
        <Button>Begin {quizType} Quiz</Button>
    </div>
}