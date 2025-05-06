import OpenAI from "openai";
import React, {useRef, useState } from "react";
import "./ResultsComponentStyles.css";

interface ResultsPageProps {
    quizType: string,
    userAnswers: string, 
    connection: OpenAI
}

// Number of questions per quiz
const numBasicQuestions: number = 10;
const numDetailedQuestions: number = 16;

// Prompts depending on quiz
const basicPrompt: string = `
    This is a list of ten questions and answers that a user has selected. Using this list, generate five career choices for this user that would best fit based on their answers 
    to the questions. With each career option, provide an explanation of what the career is, its average salary, and what characteristics the user has that makes them a good fit.
    Your output should only be the five careers, explanations, salaries, and characteristics. Add a '|' between each career option. Begin each career option with the name of the
    career followed by a colon; do not start with 'Career Option 1:' or '1:'. Within each career option, add a '^' at the beginning of the salary section and a '@' at the 
    end of the salary section. Do not add 
    anything else to your response.
`
const detailedPrompt: string = `
    This is a list of questions and answers that a user has selected. Using this list, generate five career choices for this user that would best fit based on their
    answers to the questions. With each career option, provide a lengthy explanation of what the career is, its average salary, and what characteristics the user has that makes 
    them a good fit. At the end include a section explaining the user’s personality type, skills, 6 personality traits and ideal workplace environment. Your output should only
    be the five careers, explanations, salaries, personality, skills, traits, and ideal workplace. Do not add anything else to your response, address the user as “you”. 
    Separate information about each career with a '|' and start the personality section with a '%', also add a '^' at the beginning and end of the salary section.  
`

export function ResultsPage({quizType, userAnswers, connection}: ResultsPageProps): React.JSX.Element {
    const [results, setResults] = useState<string>("");
    const hasInitialized = useRef(false);

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
        } else {
            setResults("All Questions were not Answered");
        }
    }

    // List of all 15 sections for the 5 careers (Each career has an explanation, salary, and characteristics)
    let careerSections: string[] = results.split("|").map(career => career.trim().split("^").map(s => s.trim())).flat();
    console.log(careerSections);

    // Only call ChatGPT if we are on results page
    if (!hasInitialized.current) {
        getAnswers();

        hasInitialized.current = true;
    }

    // Get each separate career
    let careers: string[] = results.split("|");

    // Get each careers description
    let careerDescriptions = careers.map((career: string) => {
        const endIndex = career.indexOf("^");

        if (endIndex !== -1) {
            return career.substring(0, endIndex);
        }
        return "";
    })

    // Get each careers salaries
    let salaries = careers.map((career: string) => {
        const startIndex = career.indexOf("^");
        const endIndex = career.lastIndexOf("@");

        if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
            return career.substring(startIndex + 1, endIndex);
        }
        return "";
    });

    // Get each careers reasoning
    let reasonings = careers.map((career: string) => {
        const startIndex = career.indexOf("@");

        if (startIndex !== -1) {
            return career.substring(startIndex + 1);
        }
        return "";
    })

    // Display loading screen while results are processing
    return <div className="Results-Page">

        {(results === "") ?
            <div className="Loading-Screen">
                <h3 style={{color: "white"}}>Generating Results...</h3>

                <div className="black-hole-core"></div>
                <div className="particle-stream" style={{ "--delay": "0s", "--angle": "0deg" } as React.CSSProperties}></div>
                <div className="particle-stream" style={{ "--delay": "0.5s", "--angle": "120deg" } as React.CSSProperties}></div>
                <div className="particle-stream" style={{ "--delay": "1s", "--angle": "240deg" } as React.CSSProperties}></div>

                <div className="jet jet-top"></div>
                <div className="jet jet-bottom"></div>
            </div>
            :
            <span>
                <h3>{quizType} Results Page</h3>
                {results}

                <br></br>
                {
                    careers.map((career: string, currentIndex: number) => {
                        return <div className="Career-Section">
                            {careerDescriptions[currentIndex]}
                            {salaries[currentIndex]}
                            {reasonings[currentIndex]}
                        </div>
                    })
                }
            </span>
        }   
    </div>
}