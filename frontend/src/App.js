import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddQuestion from './Componants/AddQuestions';
import FilteredQuestions from './Componants/FilteredQuestions';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
      // Fetch data from backend
      axios.get("http://localhost:3001/api/users")
          .then((response) => {
              setUsers(response.data); // Update state with fetched data
          })
          .catch((error) => {
              console.error("Error fetching users:", error);
          });
  }, []);


  const [questions, setQuestions] = useState([]);

  useEffect(() => {
      // Fetch data from backend
      axios.get("http://localhost:3001/api/questions")
          .then((response) => {
              setQuestions(response.data); // Update state with fetched data
          })
          .catch((error) => {
              console.error("Error fetching users:", error);
          });
  }, []);

  return (
    <div className="App">

    <h2>Users List</h2>
    {users.length === 0 ? (
        <p>No users found.</p>
    ) : (
        <ul>
            {users.map((user) => (
                <li key={user._id}>
                    <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
                </li>
            ))}
        </ul>
    )}

<h2>Questions List</h2>
    {questions.length === 0 ? (
        <p>No users found.</p>
    ) : (
        <ul>
            {questions.map((question) => (
                <li key={question._id}>
                    <strong>Name:</strong> {question.subject}, <strong>Email:</strong> {question.question}
                </li>
            ))}
        </ul>
    )}

    <AddQuestion/>
    <FilteredQuestions/>

    </div>
  );
}

export default App;
