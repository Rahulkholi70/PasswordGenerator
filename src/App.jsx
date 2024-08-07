import { useCallback, useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumber] = useState(false);
  const [charAllowed, setChar] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null)
  const passwordGenertor = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed)
      str += "!@#$%^&*()_+~`|}{[]:;?><"
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])


  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(() => {
    passwordGenertor()
  }, [length, numberAllowed, charAllowed])

  return (
    <>
      <div className=' w-full max-w-md mx-auto my-10 px-10 py-20 bg-gray-300 rounded-xl'>
        <h1 className='text-center text-2xl'>Password Generator</h1>
        <div className='flex justify-center items-center '>
          <input type="text" className='bg-slate-400 border-x-slate-950 my-5 px-9 py-2' readOnly value={password} placeholder='Password' ref={passwordRef} />
          <button className='bg-blue-600 rounded  px-9 py-2 shrink-0 ' onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='' >
          <input type="range" min={6}
            max={20}
            value={length}
            onChange={(event) => {
              setLength(event.target.value)
            }}
            className=' px-9 my-2' />
          <label className='text-xl' >Range : {length} </label>
          <div>
            <input type="checkbox"
              defaultValue={numberAllowed}
              onChange={
                () => {
                  setNumber(!numberAllowed)
                }
              } />
            <label>Number</label>
            <input type="checkbox"
              defaultValue={charAllowed}
              onChange={
                () => {
                  setNumber(!charAllowed)
                }
              } />
            <label>charac</label>
          </div>
        </div>
      </div>
    </>
  )
}
export default App
