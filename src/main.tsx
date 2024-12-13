import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'virtual:uno.css'

import '@react95/core/GlobalStyle';
import '@react95/core/themes/win95.css';

const localToDo = localStorage.getItem('todo')

if (!localToDo) {
  localStorage.setItem('todo', JSON.stringify({data: [{
    id: new Date().getTime(),
    text: 'Walcome to use uyou ToDo 95',
    ok: false
  }]}))
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
