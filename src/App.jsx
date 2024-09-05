import { useState , useCallback , useEffect , useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed , setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  //useRef Hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "0123456789"
    if(charAllowed) str += "!@$%^&*-_+=[]{}~`"

    for(let i = 0 ; i <= length ; i++){
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  } , [length , numberAllowed , charAllowed , setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,25)
    window.navigator.clipboard.writeText(password)
  } ,[password])

  useEffect(() => {
    passwordGenerator()
  }, [length , numberAllowed , charAllowed , passwordGenerator])

  return (
    <>
      <h1 className='text-4xl text-center text-white'>Password generator</h1>
      <div className='flex-col justify-center items-center w-fit md:w-2/6 h-20 ml-96 shadow-md rounded-lg px-4 my-8 py-4 text-3xl text-orange-500 bg-gray-700'>Password generator
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className='outline-none w-full h-6 mt-4 py-1 px-3' placeholder='password' readOnly ref={passwordRef}/>
        <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 h-9 mt-4 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}} />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => {
            setNumberAllowed((prev) => !prev)
          }} />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" defaultChecked={charAllowed} id='characterInput' onChange={() => {
            setCharAllowed((prev) => !prev)
          }} />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
      </div>
      
    </>
  )
}

export default App
