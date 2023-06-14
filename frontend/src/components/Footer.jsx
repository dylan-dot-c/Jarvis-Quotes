import { useState, useEffect } from "react";

function Footer() {
    const [theme, setTheme] = useState("light")

    const changeTheme = function(theme) {
        const html = document.documentElement
        html.setAttribute("data-theme", theme)
        setTheme(theme)
    }

    useEffect( () => {
        changeTheme(theme);
    }, [theme])

    return(
        <footer>
            <span className="theme-black"
                onClick={() => changeTheme('dark')}
            >
                A
            </span>
            <span className="theme-white"
                onClick={() => changeTheme('light')}
            >
                A
            </span>
            <span className="theme-purple"
                onClick={() => changeTheme('purple')}
            >
                A
            </span>

            <span className="theme-blue"
                onClick={() => changeTheme('blue')}
            >
                A
            </span>
            <span className="theme-red"
                onClick={() => changeTheme('red')}
            >
                A
            </span>
        </footer>
     )
}

export default Footer;