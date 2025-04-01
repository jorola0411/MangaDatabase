import { Link } from "react-router";

function Header({ handleLogout, isAuthenticated }) {
    return (
        <header className="bg-gray-800 text-white text-3xl p-4 flex flex-col md:flex-row md:justify-between items-center">  <Link to="/">Jao's Manga  </Link>
            <div>
                <span className="pr-20">Cool Manga to read</span>
                {isAuthenticated ? <button onClick={handleLogout} className="border bg-gray-800 text-2xl hover:bg-red-500 text-white p-1 cursor-pointer transition-colors">Log Out</button> : <Link className="border bg-gray-800 p-1 hover:bg-green-500 text-white text-2xl hover:text-black rounded transition-colors mt-3" to="/sign-in">Log In</Link>}
            </div>
        </header>
    )
}
export default Header;