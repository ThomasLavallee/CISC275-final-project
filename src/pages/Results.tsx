import OpenAI from "openai";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./ResultsComponentStyles.css";

interface ResultsPageProps {
    quizType: string,
    userAnswers: string, 
    connection: OpenAI
}

// Number of questions per quiz
const numBasicQuestions: number = 10;
const numDetailedQuestions: number = 10;

// Prompts depending on quiz
const basicPrompt: string = "This is a list of ten questions and answers that a user has selected. Using this list, generate five career choices for this user that would best fit based on their answers to the questions. With each career option, provide an explanation of what the career is, its average salary, and what characteristics the user has that makes them a good fit. Your output should only be the five careers, explanations, salaries, and characteristics. Do not add anything else to your response.";
const detailedPrompt: string = "This is a list of ten questions and answers that a user has selected. Using this list, generate five career choices for this user that would best fit based on their answers to the questions. With each career option, provide a lengthy explanation of what the career is, its average salary, and what characteristics the user has that makes them a good fit. After this, generate two industries the user might be interested in. With each industry, provide a lengthy explanation of what the industry is, as well as what characteristics make the user a good fit. Your output should only be the five careers, explanations, salaries, and characteristics, as well as two industries and explanations. Do not add anything else to your response.";

export function ResultsPage({quizType, userAnswers, connection}: ResultsPageProps): React.JSX.Element {
    const [results, setResults] = useState<string>("");

    // Make sure all questions are answered + are in correct format before sending them out
    function checkAnswerFormat() {
        // Check if all questions are answered 
        const answerArray: string[] = userAnswers.split(".");  
        
        let numQuestions: number;
        if (quizType === "Basic") {
            numQuestions = numBasicQuestions;
        } else {
            numQuestions = numDetailedQuestions;
        }

        // Check if all questions have answers
        let allAnswered: boolean = answerArray.reduce((allAnswered: boolean, currentPair: string) => {
            // Separate question and answer
            let questionAnswerPair: string[] = currentPair.split("?");

            return allAnswered && (questionAnswerPair.length > 2); 
        }, true)

        // Check all questions are answered
        if ((answerArray.length - 1) !== numQuestions && !allAnswered) {
            return false;
        } else {
            return true;
        }
    }

    // Return a string containing the results
    async function getAnswers() {  
        // Make sure all answers are received
        let allFormatted: boolean = checkAnswerFormat();
        if (allFormatted) {
            // Figure out prompt to use depending on quiz
            let prompt: string;  
            if (quizType === "Basic") {
                prompt = basicPrompt;
            } else {
                prompt = detailedPrompt;
            }

            // Add results to prompt
            prompt += userAnswers;

            const completion = await connection.chat.completions.create({
                model: "gpt-4.1",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            });

            const report: string | null = completion.choices[0].message.content;

            if (report !== null) {
                setResults(report);
            }
            
            alert(report);
        } else {
            alert("Unformatted");
        }
    }
    

    return <div className="Results-Page">
        <h3>{quizType} Results Page</h3>
        <br></br>

        {(results === "") ?
            <div className="Loading-Screen">


            </div>
            :
            <span>{results}</span>
        }   
        <Button onClick={getAnswers}>Call GPT</Button>
    </div>

}