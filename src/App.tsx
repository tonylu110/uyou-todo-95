import { List as List95, Modal, TaskBar, TitleBar } from '@react95/core'
import { Access220, Computer, Signup } from '@react95/icons'
import { useState } from 'react'
import Account from './components/Account'
import List from './components/List'

function App() {
  const [window, setWindow] = useState(false)
  const [showAcc, setShowAcc] = useState(!localStorage.getItem('uid'))

  const uid = localStorage.getItem('uid')
  if (uid !== '' && uid !== null) {
    fetch('https://api.todo.uyou.org.cn/gettodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid,
      }),
    }).then((res) => {
      return res.json()
    }).then((res) => {
      localStorage.setItem('todo', res.data)
    })
  }

  return (
    <div className="w-screen h-screen bg-#5aa">
      <div className="flex flex-col">
        <Access220 className="mt-8 ml-8" onClickCapture={() => setWindow(true)} />
        <Signup className="mt-8 ml-8" onClickCapture={() => setShowAcc(true)} />
      </div>
      {window && (
        <Modal
          title="All ToDos"
          icon={<Computer variant="16x16_4" />}
          width="800px"
          height="600px"
          overflow="auto"
          dragOptions={{
            defaultPosition: {
              x: 200,
              y: 30,
            },
          }}
          titleBarOptions={[<TitleBar.Close key="close" onClick={() => setWindow(false)} />]} // <TitleBar.Minimize key="minimize" onClick={() => setWindow(false)} />
          menu={[{
            name: 'File',
            list: (
              <List95 width="200px">
                <List95.Item onClick={() => setWindow(false)}>Exit</List95.Item>
              </List95>
            ),
          }]}
        >
          <Modal.Content>
            <List />
          </Modal.Content>
        </Modal>
      )}
      {showAcc && (
        <Modal
          title="Account"
          width="300px"
          height="200px"
          dragOptions={{
            defaultPosition: {
              x: 100,
              y: 20,
            },
          }}
          titleBarOptions={[<TitleBar.Close key="close" onClick={() => setShowAcc(false)} />]}
        >
          <Modal.Content>
            <Account />
          </Modal.Content>
        </Modal>
      )}
      <TaskBar list={(
        <List95>
          <List95.Item icon={<Access220 variant="32x32_4" />} onClick={() => setWindow(true)}>
            All ToDos
          </List95.Item>
          <List95.Item icon={<Signup variant="32x32_4" />} onClick={() => setShowAcc(true)}>
            Account
          </List95.Item>
        </List95>
      )}
      />
    </div>
  )
}

export default App
