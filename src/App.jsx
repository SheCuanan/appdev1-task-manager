
import { useEffect, useState } from 'react'
import { SignIn } from './components/SignIn'
import { SignUp } from './components/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return unsubscribe
  }, [])

  return (
    <Router>
        <Routes>
            <Route path="/" element={user ? <TaskList user={user} /> : <SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    </Router>
);
}

export default App





// import React, { useState, useEffect } from 'react';
// import './App.css'
// import { db } from './firebase';
// import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

// function App() {
//   const [task, settask] = useState([]);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, 'task'), (snapshot) => {
//       const taskList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       settask(taskList);
//     });
//     return () => unsubscribe();
//   }, []);

//   const addTask = async (e) => {
//     e.preventDefault();
//     if (title && description) {
//       await addDoc(collection(db, 'task'), { title, description, status: 'pending' });
//       setTitle('');
//       setDescription('');
//     }
//   };

//   const updatetasktatus = async (id, status) => {
//     const taskRef = doc(db, 'task', id);
//     await updateDoc(taskRef, { status: status === 'pending' ? 'completed' : 'pending' });
//   };

//   const deleteTask = async (id) => {
//     const taskRef = doc(db, 'task', id);
//     await deleteDoc(taskRef);
//   };

//   return (
//     <div>
//       <h1>Task Manager</h1>
//       <form onSubmit={addTask}>
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
//         <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" required />
//         <button type="submit">Add Task</button>
//       </form>
//       <ul>
//         {task.map(task => (
//           <li key={task.id} style={{ color: task.status === 'completed' ? 'green' : 'white' }}>
//             <h2>{task.title}</h2>
//             <p>{task.description}</p>
//             <p>Status: {task.status}</p>
//             <button onClick={() => updatetasktatus(task.id, task.status)}>Status</button>
//             <button onClick={() => deleteTask(task.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
