/**
 * Sample quiz data with questions, answer options, and correct answers
 * Each question includes a unique id, question text, options array, and correct answer
 */

const quizData = [
  {
    id: 1,
    question: "What is React.js?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database management system",
      "An operating system"
    ],
    correctAnswer: "A JavaScript library for building user interfaces",
    timeLimit: 30 // time in seconds
  },
  {
    id: 2,
    question: "Which of the following is used to pass data from parent to child component?",
    options: [
      "State",
      "Props",
      "Context",
      "Reducer"
    ],
    correctAnswer: "Props",
    timeLimit: 30
  },
  {
    id: 3,
    question: "What hook is used to handle side effects in React?",
    options: [
      "useState",
      "useEffect",
      "useContext",
      "useReducer"
    ],
    correctAnswer: "useEffect",
    timeLimit: 30
  },
  {
    id: 4,
    question: "Which method is used to render a React component?",
    options: [
      "render()",
      "ReactDOM.render()",
      "display()",
      "show()"
    ],
    correctAnswer: "ReactDOM.render()",
    timeLimit: 30
  },
  {
    id: 5,
    question: "What is JSX in React?",
    options: [
      "JavaScript XML - A syntax extension for JavaScript",
      "JavaScript Extension",
      "JavaScript Extra",
      "JavaScript XHR"
    ],
    correctAnswer: "JavaScript XML - A syntax extension for JavaScript",
    timeLimit: 30
  },
  {
    id: 6,
    question: "Which lifecycle method is called after a component has been rendered?",
    options: [
      "componentWillMount",
      "componentDidMount",
      "componentDidUpdate",
      "componentWillUpdate"
    ],
    correctAnswer: "componentDidMount",
    timeLimit: 30
  },
  {
    id: 7,
    question: "What is the purpose of React Router?",
    options: [
      "Data fetching",
      "State management",
      "Navigation between pages",
      "Form validation"
    ],
    correctAnswer: "Navigation between pages",
    timeLimit: 30
  },
  {
    id: 8,
    question: "What does the useState hook return?",
    options: [
      "A single state value",
      "An array with state value and update function",
      "A boolean indicating if state was set",
      "An object with current and previous state"
    ],
    correctAnswer: "An array with state value and update function",
    timeLimit: 30
  },
  {
    id: 9,
    question: "Which package is commonly used for state management in large React applications?",
    options: [
      "React-State",
      "React-Manager",
      "Redux",
      "Context-API"
    ],
    correctAnswer: "Redux",
    timeLimit: 30
  },
  {
    id: 10,
    question: "What is a Higher Order Component (HOC) in React?",
    options: [
      "A component with many nested elements",
      "A function that takes a component and returns a new component",
      "The top level component in a React application",
      "A component with complex state logic"
    ],
    correctAnswer: "A function that takes a component and returns a new component",
    timeLimit: 30
  }
];

export default quizData;
