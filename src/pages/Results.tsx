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
    end of the salary section. Do not add anything else to your response. Address the user as 'you'.
`
const detailedPrompt: string = `
    This is a list of ten questions and answers that a user has selected. Using this list, generate five career choices for this user that would best fit based on their answers 
    to the questions. With each career option, provide an explanation of what the career is, its average salary, and what characteristics the user has that makes them a good fit.
    Your output should only be the five careers, explanations, salaries, and characteristics. Add a '|' between each career option. Begin each career option with the name of the
    career followed by a colon; do not start with 'Career Option 1:' or '1:'. Within each career option, add a '^' at the beginning of the salary section and a '@' at the 
    end of the salary section. Do not add anything else to your response. Address the user as 'you'. At the end include a section starting with a '~' and not a '=' explaining the user's 
    personality type. Begin a section with a '=' describing 6 personality traits, separate each option with a comma and do not use numbers, capitalize each trait, do not explain
    each trait.
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
        const endIndex = career.indexOf("~");

        if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
            return career.substring(startIndex + 2, endIndex);
        } else if (startIndex !== -1) {
            return career.substring(startIndex + 2);
        }
        return "";
    })

    let personalityDescription = "";
    let personalityTraits = "";
    let personalityList: string[] = [];

    if (quizType === "Detailed") {
        // Get description of personality
        personalityDescription = results.slice(results.indexOf("~") + 1, results.indexOf("="));

        // Get list of personality traits
        personalityTraits = results.slice(results.indexOf("=") + 1);
        personalityList = personalityTraits.split(",")

    }

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
                <h1>{quizType} Quiz Results</h1>

                <br></br>
                {
                    careers.map((career: string, currentIndex: number) => {
                        return <div className="Career-Section">
                            <h3 style={{fontSize: "127%", paddingTop: "2%"}}>
                                {careerDescriptions[currentIndex].substring(0, careerDescriptions[currentIndex].indexOf(':') + 1).trim()}
                            </h3>
                            <p style={{ fontSize: "100%" }}>
                                {careerDescriptions[currentIndex].substring(careerDescriptions[currentIndex].indexOf(':') + 1).trim()}
                            </p>
                            
                            <p style={{fontWeight:"bold", display: "inline-block", paddingTop: "1%"}}>{salaries[currentIndex].substring(0, salaries[currentIndex].indexOf(':') + 1)}</p>
                            <p style={{display: 'inline-block', paddingTop: "1%"}}>{salaries[currentIndex].substring(salaries[currentIndex].indexOf(':') + 1)}</p>


                            <br></br>
                            {reasonings[currentIndex]}
                        </div>
                    })
                }

                {(personalityList.length > 0) ?

                <div id="personality-wrapper" style={{paddingLeft: "10%", paddingRight: "10%"}}>
                    <p style={{fontWeight:"bold"}}>{personalityDescription}</p>

                    Your Top Personality Traits:

                    <div style={{paddingLeft: "10%", paddingRight: "10%"}}>
                            {
                                personalityList.map((trait) => {
                                    return <div>{trait}</div>;
                                })
                            }
                        
                    </div>
                </div>
                :
                <span></span>

                }
            </span>
        }   
    </div>
}