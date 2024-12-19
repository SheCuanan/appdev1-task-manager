
import React, { useState, useEffect } from 'react';
// import { db } from './firebase';
import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const taskList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
    });
    return () => unsubscribe();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (title && description) {
      await addDoc(collection(db, 'tasks'), { title, description, status: 'pending' });
      setTitle('');
      setDescription('');
    }
  };

  const updateTaskStatus = async (id, status) => {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, { status: status === 'pending' ? 'completed' : 'pending' });
  };

  const deleteTask = async (id) => {
    const taskRef = doc(db, 'tasks', id);
    await deleteDoc(taskRef);
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={addTask}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" required />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ color: task.status === 'completed' ? 'green' : 'white' }}>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => updateTaskStatus(task.id, task.status)}>Status</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;