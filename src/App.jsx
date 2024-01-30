import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(); // length of password
  const [useNum, setNum] = useState(false); // using number
  const [charAllowed, setCharAllowed] = useState(false);  // use special characters
  const [password, setPassword] = useState(""); // use password

  // useRef hook 
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(useNum) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+-=[]{}";

    for(let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, useNum, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator();
  }, [length, useNum, charAllowed, passwordGenerator])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-black bg-gray-400'>
        <h1 className='text-3xl text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>

          <button onClick={copyPasswordToClipboard} 
          className='outline-none bg-blue-500 text-white px-5 py-0.5 shrink'>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6} 
            max={100} 
            value={length} 
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}} 
            />
            <label>Length: {length} </label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={useNum}
              id='numberInput'
              onChange={() => {
                setNum((prev) => !prev);
              }}
            /> 
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={charAllowed}
              id='numberInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            /> 
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
