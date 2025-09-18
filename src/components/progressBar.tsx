const ProgressBar = ({progressPercent=0}:{progressPercent:Number}) => {
    return(
        <div className="progress-bar-container card">
            <p><span className="strong">Uploading</span>,please wait..</p>
            <div className="progress-bar"
                style={{ ["--progress" as any]: `${progressPercent}%` }}
            />
            
        </div>
    )
}

export default ProgressBar