import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BsChatRightQuote, BsChatQuote, BsDownload, BsHeart} from "react-icons/bs"
// import {HiSpeakerWave} from "react-icons/hi"
import {RxSpeakerLoud} from "react-icons/rx"
import {GrNext, GrLinkNext} from "react-icons/gr"
import { MdOutlineNavigateNext } from "react-icons/md"
import {FcNext} from "react-icons/fc"
import { FaChevronRight, FaRegHeart } from "react-icons/fa"
import {toast} from "react-toastify"

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import html2canvas from "html2canvas"

import Quote from './components/Quote'

function App() {
  const [count, setCount] = useState(0)
  const options = {
    size: 20,
    // color: "yellow"
  }

  function captureCanvas() {

    const element = document.querySelector('.capture')

    html2canvas(element).then( (canvas) => {
        const image = canvas.toDataURL()

        canvas.toBlob( (blob) => {

          const link = document.createElement('a')
          
          link.href = URL.createObjectURL(blob)
          link.download = 'capture.png'

          document.body.appendChild(link)
          link.click()

          document.body.removeChild(link)
          URL.revokeObjectURL(link)
        })
    }).catch( (error) => {
      console.log("Failed TO Capture Image")
      toast.error("Failed To download image. Try again Later");

    })
  }

  const speakText = () => {
    const message = new SpeechSynthesisUtterance();
    message.text = "It is only when we take chances, when our lives improve. The initial and the most difficult risk that we need to take is to become honest."; // Replace with the desired text to be spoken
    window.speechSynthesis.speak(message);
  };


  return (
    <main>

      
      <Navbar />
      <section>
        <div>
          {/* <h1>Jarvis Quotes</h1> */}
        <div className="capture">
          <Quote />
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
          <span>
            
            <FaChevronRight size={options.size} color={options.color} />
          </span>
        </div>
        </div>
      </section>

      
<Footer />
    </main>
  )
}

export default App
