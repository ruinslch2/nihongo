import './App.css'
import Router from "./Route.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Router/>
        </BrowserRouter>
    )
}

export default App
