import type { todo } from '../components/List'

export interface todolist {
  data: todo[]
}

export default function (localStorageSetTodoList: todolist) {
  const uid = localStorage.getItem('uid')

  localStorage.setItem('todo', JSON.stringify(localStorageSetTodoList))

  if (uid) {
    fetch('https://api.todo.uyou.org.cn/edittodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
        data: JSON.stringify(localStorageSetTodoList),
      }),
    }).then((res) => {
      return res.json()
    })
  }
}
