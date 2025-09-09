import logo from "/logo.svg"
import moon from "/src/assets/Moon_fill.svg"
import sun from "/src/assets/Sun_fill.svg"

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-content">
                <a href="#">
                    <img src={logo} alt="logo"/>
                </a>
                <button className="toggle-theme"
                    type="button"
                    data-theme-toggle
                    aria-label="Change to dark theme"
                >
                    <img src={moon} alt="image de lune"/>
                </button>
            </div>
        </div>
    )
}

export default Navbar