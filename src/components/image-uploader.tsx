import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import uploadImg from "../assets/exit.svg"
import {clsx} from "clsx"

function ImageUploader() {

    const [currentImage, setCurrentImage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')


    const onDrop =  useCallback(async (acceptedFiles:[File] )=> {
      const currFile = acceptedFiles[0]
      const formData = new FormData()
      formData.append("image", currFile);
      try{
        console.log({APIURL:import.meta.env.VITE_API_URL})
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
        method: "POST",
        body: formData,
        })

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Erreur upload");
        }
        const data = await response.json();
        setCurrentImage(data.url)
        setErrorMessage("")

      }catch (error) {
        setErrorMessage(error.message)
      }

    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <section className="uploader-container">
        <div {...getRootProps()} className={clsx("card", 
        isDragActive && 'active' ,
        )}>
          <div className="card-dashed">
            <input type="file" accept="image/*" {...getInputProps()} />
              <img src={uploadImg} alt="image download" className="img-upload" />
              <p>Drag & drop a file or <strong>browse files</strong></p>
              <p className="img-valid">JPG,PNG or GIF - Max file size 2MB</p>
            <div>
                {currentImage && <img className="image-uploaded" src={currentImage} alt="" />}
            </div>
            {
              errorMessage
            }
          </div>
         
        </div>
      </section>
    )
  }


export default ImageUploader