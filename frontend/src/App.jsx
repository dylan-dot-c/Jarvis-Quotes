import { useState, useEffect } from 'react'
import './App.css'
import {BsChatRightQuote, BsChatQuote, BsDownload, BsHeart} from "react-icons/bs"
import {RxSpeakerLoud} from "react-icons/rx"
import { FaChevronRight, FaRegHeart } from "react-icons/fa"
// import {toast} from "react-toastify"

import PreLoader from './components/PreLoader'
// import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Quote from './components/Quote'

import { capture } from '../utilities/captureScreen'

function App() {

const [quote, setQuote] = useState({})
const [genres, setGenres] = useState([])
const [currentGenre, setCurrentGenre] = useState("motivational")
const [isLoading, setIsLoading] = useState(false)

  const options = {
    size: 20,
    // color: "yellow"
  }

  // function to speak the quote
  const speakText = () => {
    const message = new SpeechSynthesisUtterance();
    // message.voice = SpeechSynthesisVoice.name()
    message.text = `${quote.quoteText} ${quote.quoteAuthor}`
    window.speechSynthesis.speak(message);
  };

  const getNewQuote = async () => {
    setIsLoading(true)
    const endpoint = `https://quote-garden.onrender.com/api/v3/quotes/random?genre=${currentGenre}`

    const res = await fetch(endpoint)
    const info = await res.json()

    console.log(info.data[0])
    setQuote(info.data[0])
     
    setIsLoading(false)
  }

  useEffect( () => {
    getNewQuote()
    getGenres()
  }, [])

  var genreOptions = []


    genreOptions = genres.map( (genre, index) => {
      return(
        <option key={index} value={genre}>{genre}</option>
      )
    })


const getGenres = async () => {
  const endpoint = "https://quote-garden.onrender.com/api/v3/genres"
  const response = await fetch(endpoint)
  const data = await response.json()

  setGenres(data.data)
  console.log(data.data)
}

function captureCanvas() {
  capture(quote.quoteAuthor)
}

function handleChange(e) {
  const {value} = e.target
  console.log(value)
  setCurrentGenre(value)
}

useEffect( () => {

  getNewQuote();
  
}, [currentGenre])

  return (
    <main>
      <nav>
            <select name="currentGenre" id="current" onChange={handleChange} value={currentGenre}>
              {genreOptions}  
            </select>  <h1> Quotes</h1>
            <p>Best place to get access to over 75000+ quotes.</p>
      </nav>
      <section>
        <div>
          {/* <h1>Jarvis Quotes</h1> */}

          {
            isLoading ?
            <PreLoader />
            :
            <>
            <div className="capture">
              <Quote quote={quote}/>
              <div className="icon"><BsChatQuote size={100} /></div>
            </div>
            <div className="buttons">
            <span
              onClick={captureCanvas}
            ><BsDownload size={options.size} color={options.color} /></span>
            <span
              onClick={speakText}
            ><RxSpeakerLoud size={options.size} color={options.color} /></span>
            <span>
              <FaRegHeart size={options.size} color={options.color} />
            </span>
            <span onClick={getNewQuote}>
              
              <FaChevronRight size={options.size} color={options.color} />
            </span>
          </div>
          </>
          }

        </div>
      </section>

<Footer />
    </main>
  )
}

export default App
