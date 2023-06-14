import { toast } from "react-toastify"
import html2canvas from "html2canvas"

export function capture(authorName) {

    const element = document.querySelector('.capture')

    html2canvas(element).then( (canvas) => {
        const image = canvas.toDataURL()

        canvas.toBlob( (blob) => {

          const link = document.createElement('a')
          
          link.href = URL.createObjectURL(blob)
          link.download = `${authorName}.png`

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