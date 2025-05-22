/**
 * General knowledge quiz data with questions, answer options, and correct answers
 * Each question includes a unique id, question text, options array, and correct answer
 */

const quizData = [
  {
    id: 1,
    question: "Which planet in our solar system is known as the 'Red Planet'?",
    options: [
      "Venus",
      "Mars",
      "Jupiter",
      "Saturn"
    ],
    correctAnswer: "Mars",
    timeLimit: 30 // time in seconds
  },
  {
    id: 2,
    question: "Which element has the chemical symbol 'Au'?",
    options: [
      "Silver",
      "Gold",
      "Aluminum",
      "Copper"
    ],
    correctAnswer: "Gold",
    timeLimit: 30
  },
  {
    id: 3,
    question: "What is the capital city of Japan?",
    options: [
      "Seoul",
      "Beijing",
      "Tokyo",
      "Bangkok"
    ],
    correctAnswer: "Tokyo",
    timeLimit: 30
  },
  {
    id: 4,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo"
    ],
    correctAnswer: "Leonardo da Vinci",
    timeLimit: 30
  },
  {
    id: 5,
    question: "Which of these animals is a mammal?",
    options: [
      "Shark",
      "Seahorse",
      "Dolphin",
      "Octopus"
    ],
    correctAnswer: "Dolphin",
    timeLimit: 30
  },
  {
    id: 6,
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean"
    ],
    correctAnswer: "Pacific Ocean",
    timeLimit: 30
  },
  {
    id: 7,
    question: "Which country is home to the Great Barrier Reef?",
    options: [
      "Brazil",
      "Australia",
      "Mexico",
      "Thailand"
    ],
    correctAnswer: "Australia",
    timeLimit: 30
  },
  {
    id: 8,
    question: "What is the smallest prime number?",
    options: [
      "0",
      "1",
      "2",
      "3"
    ],
    correctAnswer: "2",
    timeLimit: 30
  },
  {
    id: 9,
    question: "Which of these instruments is a woodwind?",
    options: [
      "Violin",
      "Trumpet",
      "Clarinet",
      "Drums"
    ],
    correctAnswer: "Clarinet",
    timeLimit: 30
  },
  {
    id: 10,
    question: "Which famous scientist developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Marie Curie",
      "Nikola Tesla"
    ],
    correctAnswer: "Albert Einstein",
    timeLimit: 30
  }
];

export default quizData;
