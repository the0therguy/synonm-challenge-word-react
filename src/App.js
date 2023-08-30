import './App.css';
import {useState} from "react";

function App() {
  const [word, setWord] = useState("")
  const [synonym, setSynonym] = useState([])
  const [loading, setLoading] = useState(false)
  const fetchData = async (word) => {
    setLoading(true)
    await fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
      .then(response=> response.json())
      .then(setSynonym)
    setLoading(false)
  }
  /*
   uncontrolled is when we use ref (useRef())
   controlled is when we use useState(). the state becomes the “single source of truth” for the input elements. Therefore, the App component shown above is a controlled component.
  */
  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetchData(word)
  }

  const handleWordClick = async (word) => {
    await fetchData(word)
    setWord(word)
  }
  if (loading) {
    return <h1 className="text-decoration-style: solid">Loading......</h1>
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <label htmlFor="user-input">word: </label>
          <input id="user-input"
                 value={word}
                 onChange={(e)=>setWord(e.target.value)}
          />
          <br/>
          <button className="rounded-none">Submit</button>
        </form>

        {
          loading ? <div className="loading">Loading......</div> : <>
            <ul>
              {synonym.map((synonym, idx)=>(
                <li className="word" key={idx} onClick={()=>handleWordClick(synonym.word)}>
                  {synonym.word}
                </li>
              ))}
            </ul>
          </>
        }

      </header>
    </div>
  );
}

export default App;
