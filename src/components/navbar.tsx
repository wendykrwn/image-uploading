import { useEffect, useState } from "react";
import logo from "/logo.svg"
import moon from "/src/assets/Moon_fill.svg"
import sun from "/src/assets/Sun_fill.svg"

type NavbarProps = {
    onLogoClick: () => void
  }

const Navbar = ({ onLogoClick }: NavbarProps) => {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
      }, [theme]);
    const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="pointer" onClick={onLogoClick} >
                    <img src={logo} alt="logo"/>
                </div>
                <button className="toggle-theme"
                    type="button"
                    data-theme-toggle
                    aria-label="Change to dark theme"
                    onClick={toggleTheme}
                >
                    {
                        theme=="light" ? 
                        <img src={moon} alt="image de lune"/>
                        :
                        <img src={sun} alt="image de soleil"/>
                    }
                </button>
            </div>
        </div>
    )
}

export default Navbar