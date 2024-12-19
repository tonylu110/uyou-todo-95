import { Alert, Button, Input, TitleBar } from '@react95/core'
import { useState } from 'react'

function Account() {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')
  const [uname, setUname] = useState(localStorage.getItem('uname'))

  const [showAlert, setShowAlert] = useState(false)

  const [alertMsg, setAlertMsg] = useState('')
  const [type, setType] = useState<'error' | 'info' | undefined>()

  const login = () => {
    if (!name || !pass) {
      setType('error')
      setAlertMsg('please input username and password!')
      setShowAlert(true)
    }
    else {
      fetch('https://api.todo.uyou.org.cn/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uname: name,
          passwd: pass,
        }),
      })
        .then(res => res.json())
        .then((res) => {
          if (res._id) {
            localStorage.setItem('uid', res._id)
            localStorage.setItem('uname', name)
            setUname(name)
            fetch(`https://api.todo.uyou.org.cn/todoexist?uid=${res._id}`)
              .then(res => res.json())
              .then((res) => {
                if (res.code === 200) {
                  fetch('https://api.todo.uyou.org.cn/addtodo', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      uid: localStorage.getItem('uid'),
                      data: localStorage.getItem('todo'),
                    }),
                  })
                    .then(res => res.json())
                    .then((res) => {
                      if (res.code === 200) {
                        setType('info')
                        setAlertMsg('sync success!')
                        setShowAlert(true)
                      }
                    })
                }
                else {
                  fetch('https://api.todo.uyou.org.cn/gettodo', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      uid: localStorage.getItem('uid'),
                    }),
                  })
                    .then(res => res.json())
                    .then((res) => {
                      if (res._id) {
                        localStorage.setItem('todo', res.data)
                        setType('info')
                        setAlertMsg('sync success!')
                        setShowAlert(true)
                      }
                      else {
                        setType('info')
                        setAlertMsg('sync fail!')
                        setShowAlert(true)
                      }
                    })
                }
              })
          }
          else {
            setAlertMsg('username or password error')
            setShowAlert(true)
          }
        })
        .catch(() => {
          setType('error')
          setAlertMsg('login error')
          setShowAlert(true)
        })
    }
  }

  const logout = () => {
    localStorage.setItem('uname', '')
    localStorage.setItem('uid', '')
    setUname('')
  }

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {!uname
        ? (
            <>
              <div>
                <Input width="100%" value={name} onChange={e => setName(e.target.value)} mb="$10" />
                <Input width="100%" type="password" value={pass} onChange={e => setPass(e.target.value)} />
              </div>
              <Button onClick={login}>Login</Button>

              {showAlert && (
                <Alert
                  title="ERROR"
                  type={type}
                  message={alertMsg}
                  titleBarOptions={[<TitleBar.Close key="close" onClick={() => setShowAlert(false)} />]}
                  hasSound
                  buttons={[{
                    value: 'OK',
                    onClick: () => setShowAlert(false),
                  }]}
                />
              )}
            </>
          )
        : (
            <>
              <div>
                {uname}
              </div>
              <Button onClick={logout}>Logout</Button>
            </>
          )}
    </div>
  )
}

export default Account
