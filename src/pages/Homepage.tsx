import React, { Dispatch, SetStateAction } from 'react';
import { QuizDescription } from '../components/QuizDescription';

interface HomepageProps {
  setQuizType: Dispatch<SetStateAction<string>>
}

export function Homepage({setQuizType}: HomepageProps): React.JSX.Element {
  const quizInstructions: string[] = ["Select and navigate to the quiz you would like to take", "Answer each question in the quiz by selecting an option from the dropdown then selecting 'next'", "After answering all the questions, enter the API key and submit", "Then click 'View Results' to see your Career Quiz Results!"];  
  const basicCareerDescription: string[] = ["Identify your career interests quickly", "Answer 20 simple questions in minutes", "Receive detailed report of career interests and personality traits"]
  const detailedCareerDescription: string[] = ["Understand your career desires in detail", "Receive detailed report of career interests, personality traits, and workplace preferences", "Provides insights into specific roles, including required skills and typical work environments"];

    return <div>
      <div className = 'Whole-Homepage'>
        <header>
        
        </header>

        <div className='Homepage-Container'>
            <div className='Instruction-Container'>
              <h4>Instructions:</h4>
              <ol className='Homepage-Instructions'>
                {
                  quizInstructions.map((currentInstruction: string) => {
                    return <li key={currentInstruction}>{currentInstruction}</li>
                  })
                }
              </ol>
            </div>
            
            <QuizDescription quizType='BasicQuiz' description={basicCareerDescription} setQuizType={setQuizType}></QuizDescription>
            <QuizDescription quizType='DetailedQuiz' description={detailedCareerDescription} setQuizType={setQuizType}></QuizDescription>
        </div>
    </div>
  </div>
}