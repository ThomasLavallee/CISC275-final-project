import React, { Dispatch, SetStateAction } from 'react';
import { QuizDescription } from '../components/QuizDescription';

interface HomepageProps {
  setQuizType: Dispatch<SetStateAction<string>>
}

export function Homepage({setQuizType}: HomepageProps): React.JSX.Element {
  const quizInstructions: string[] = ["Select and navigate to the quiz you would like to take", "Answer each question in the quiz by selecting an option from the dropdown then selecting 'next'", "After answering all the questions, enter the API key and submit", "Then click 'View Results' to see your Career Quiz Results!"];  
  const basicCareerDescription: string[] = ["Identify your career interests swiftly", "Answer 10 simple questions quickly", "Get a detailed report featuring five careers that best match your responses, each with an in-depth explanation of why it's a good fit for you", "Receive information on each career's average salary and characteristics that make you a good fit for the career"]
  const detailedCareerDescription: string[] = ["Understand your career desires in detail", "Answer 16 questions in minutes", "Receive an in-depth report of five careers that fit you, complete with detailed explanations, average salaries, and key characteristics you possess that make you fit for the career" , "Learn about your personality type and traits based on your responses"];

    return <div className='Homepage-Container'>
            <div className='Instruction-Container'>
              <h4 className="Homepage-Description-Headers">Instructions:</h4>
              <div className='Homepage-Instructions'>
                {
                  quizInstructions.map((currentInstruction: string) => {
                    return <div>
                            <div key={currentInstruction}>{currentInstruction}</div>
                            <br></br>
                            </div>
                  })
                }
              </div>
            </div>
            
            <QuizDescription quizType='BasicQuiz' description={basicCareerDescription} setQuizType={setQuizType}></QuizDescription>
            <QuizDescription quizType='DetailedQuiz' description={detailedCareerDescription} setQuizType={setQuizType}></QuizDescription>
  </div>
}