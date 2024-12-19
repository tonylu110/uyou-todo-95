import { Button, Checkbox, Frame, Input } from '@react95/core'
import { useState } from 'react'
import setItem from '../../utils/setItem'

export interface todo {
  text: string
  id: number
  ok: boolean
}

function List() {
  const [list, setList] = useState<todo[]>(JSON.parse(localStorage.getItem('todo')!).data)

  const setOk = (id: number, ok: boolean) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id)
        list[i].ok = ok
    }

    setList([...list])
    setItem({ data: list })
  }

  const [text, setText] = useState('')

  const add = (text: string) => {
    list.unshift({
      id: new Date().getTime(),
      text,
      ok: false,
    })

    setList([...list])
    setItem({ data: list })
    setText('')
  }

  const del = (id: number) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].id === id)
        list.splice(i, 1)
    }

    setList([...list])
    setItem({ data: list })
  }

  return (
    <div>
      <div className="flex mb-3">
        <Input flex={1} mr="$10" value={text} onChange={v => setText(v.target.value)} />
        <Button onClick={() => add(text)}>+</Button>
      </div>
      {list.map(item => (
        <Frame key={item.id} bgColor="$material" w="100%" h="auto" boxShadow="$in" className="p-2 flex justify-between mb-3">
          <div>
            <Checkbox checked={item.ok} onChange={() => setOk(item.id, !item.ok)} />
            <span className={`${item.ok ? 'line-through' : ''}`}>{item.text}</span>
          </div>
          <Button onClick={() => del(item.id)}>delete</Button>
        </Frame>
      ))}
    </div>
  )
}

export default List
