const PrimaryButton = ({text,logo,handleClick}:{text:string,logo:string,handleClick:React.MouseEventHandler<HTMLButtonElement>}) => {
    return(
        <button className="btn btn-primary" onClick={handleClick}>
            <img className="btn-logo" src={logo} alt={text} />
            {text}
        </button>
    )
}

export default PrimaryButton