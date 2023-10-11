import React, { useState } from "react";
import questions from "./question";

const Variable = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [answerPopup, setAnswerPopup] = useState(null);

  const handleAnswer = (userChoice) => {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const isCorrect = userChoice === correctAnswer;

    const popupColor = isCorrect ? "bg-green-500" : "bg-red-500";
    const popupText = isCorrect ? "Correct!" : "Incorrect";

    setAnswerPopup({ color: popupColor, text: popupText });

    setTimeout(() => {
      setAnswerPopup(null);
    }, 1500); // Popup disappears after 1.5 seconda

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: questions[currentQuestionIndex].question, answer: userChoice, isCorrect },
    ]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };


    const handleRefresh = () => {
      window.location.reload();
    }

  return (
    <div>
      <div className="w-full text-center mb-7 text-white">
        <h1 className="font-semibold text-3xl">Var <span className=" text-gray-200">/</span> Let <span className=" text-gray-200">/</span> Const:</h1>
        <p className="font-semibold text-xl text-gray-400">A Quiz Game</p>
      </div>
      {showResults ? (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-1/2 table-container">
            <table className="table-fixed w-full text-white">
              <thead>
                <tr className="bg-gray-800">
                  <th className="w-1/2 border border-gray-600 py-2 px-4">Question</th>
                  <th className="w-1/4 border border-gray-600 py-2 px-4">User Answer</th>
                  <th className="w-1/4 border border-gray-600 py-2 px-4">Result</th>
                </tr>
              </thead>
              <tbody>
                {userAnswers.map((userAnswer, index) => (
                  <tr key={index}>
                    <td className="w-1/2 border border-gray-600 py-2 px-4">
                      {userAnswer.question}
                    </td>
                    <td className="w-1/4 border border-gray-600 py-2 px-4">
                      {userAnswer.answer}
                    </td>
                    <td className="w-1/4 border border-gray-600 py-2 px-4">
                      {userAnswer.isCorrect ? "Correct" : "Incorrect"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={handleRefresh} className="w-48 h-10 bg-gray-600 rounded-xl text-white font-semibold mt-6">Try Again</button>
        </div>
      ) : (
        <div className="text-white text-center">
          <p className="font-semibold text-xl">
            {questions[currentQuestionIndex].question}
          </p>
          <div className="flex justify-center mt-4">
            <button
              className="bg-green-500 text-white px-4 py-2 mx-2 rounded"
              onClick={() => handleAnswer("Yes")}
            >
              Yes
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 mx-2 rounded"
              onClick={() => handleAnswer("No")}
            >
              No
            </button>
          </div>
          {answerPopup && (
            <div
              className={`popup ${answerPopup.color} mt-9 py-1 rounded-lg`}
              style={{ animation: "fade-out 1s" }}
            >
              <div className="popup-content">
                <p>{answerPopup.text}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Variable;
