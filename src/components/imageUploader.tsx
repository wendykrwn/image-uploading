import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import uploadImg from "../assets/exit.svg"
import {clsx} from "clsx"
import axios from "axios";
import ProgressBar from "./progressBar";
import ShowImageUploaded from "./showImageUploaded";

const startFakeProgress = (setProgress:Function,setIsDroped:Function) => {
  let fakeProgress = 0;
  const interval = setInterval(() => {
    fakeProgress = Math.min(fakeProgress + Math.random() * 7 + 3, 100);
    setProgress(Math.round(fakeProgress));
    if(fakeProgress>=100){
      clearInterval(interval);
      setIsDroped(false)
    }
  }, 150);
}

function ImageUploader() {

    const [currentImage, setCurrentImage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [progress, setProgress] = useState(0);
    const [isDroped, setIsDroped] = useState(false)

    useEffect(()=>{
      if(isDroped){
        startFakeProgress(setProgress,setIsDroped)
      }
    },[isDroped])

    const onDrop =  useCallback(async (acceptedFiles:[File] )=> {
      setIsDroped(true)
      const currFile = acceptedFiles[0]
      const formData = new FormData()
      formData.append("image", currFile);

      try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setCurrentImage(res.data.url);
      setErrorMessage("")
    } catch(error){
        const message = error?.response?.data?.error || error?.message;
        setErrorMessage(message)
        setIsDroped(false)
      }

    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <section className="uploader-container">
          {
            isDroped && <ProgressBar progressPercent={progress}/>
          }
          {
            (!isDroped && !currentImage) &&
            <div {...getRootProps()} className={clsx("card", 
            isDragActive && 'active' ,
            )}>
              <div className="card-dashed">
                <div>
                  <input type="file" accept="image/*" {...getInputProps()} />
                    <img src={uploadImg} alt="image download" className="img-upload" />
                    <p>Drag & drop a file or <strong>browse files</strong></p>
                    <p className="img-valid">JPG,PNG or GIF - Max file size 2MB</p>
                
                  {
                    errorMessage && <p className="error-message">{errorMessage}</p>
                  }
                </div>
              </div>
            </div>
          }
          {
             (currentImage && progress==100) && <ShowImageUploaded imgUrl={currentImage}/>
          }
      </section>
    )
  }


export default ImageUploader