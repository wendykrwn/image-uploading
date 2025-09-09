import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

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
      <div {...getRootProps()} className="uploader-container card">
        <input type="file" accept="image/*" {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
        <div>
            {currentImage && <img className="image-uploaded" src={currentImage} alt="" />}
        </div>
        {
          errorMessage
        }
      </div>
    )
  }


export default ImageUploader