import PrimaryButton from "./buttons/primaryButton"
import linkLogo from "../assets/Link.svg"
import downloadLogo from "../assets/download.svg"

const ShowImageUploaded = ({imgUrl}:{imgUrl:string}) => {

    const handleShare = () => {
        navigator.clipboard.writeText(imgUrl)
          .then(() => alert("URL copiée !"))
          .catch(() => alert("Impossible de copier l'URL"));
      };

      
    const downloadImage = async () => {
            try{
                const filename = imgUrl.split("/").pop();
                if (!filename) throw new Error("Impossible de récupérer le nom de fichier");

                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/download/${filename}`)
                if (!response.ok) {
                    throw new Error("Erreur lors du téléchargement");
                }
                    const blob = await response.blob();

                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob);
                    link.download = filename;
                    link.click();

                    URL.revokeObjectURL(link.href);
            } catch (err) {
                console.error("Erreur download:", err);
            }
        } 
      
    return(
        <div className="image-uploaded-container">
            <div className="card">
                <div className="img-container">
                    <img className="image-uploaded" src={imgUrl} alt={"image uploaded"} />
                </div>
            </div>
            <div className="buttons-container">
                <PrimaryButton 
                    text={"Share"}
                    logo={linkLogo}
                    handleClick={handleShare}
                />
                <PrimaryButton 
                    text={"Download"}
                    logo={downloadLogo}
                    handleClick={downloadImage}
                />
            </div>
        </div>
    )
}

export default ShowImageUploaded