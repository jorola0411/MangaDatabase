import { React } from 'react'
import Home from "./components/Home"
import Manga from "./components/Manga"
import './App.css'
import { Routes, Route} from "react-router"
function App() {


  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/manga/:id" element={<Manga/>} />
    </Routes>
  )
}

export default App
