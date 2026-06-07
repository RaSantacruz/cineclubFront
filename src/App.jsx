import "./index.css"
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import FilmsInCompetition from './components/Pages/FilmsInCompetition';
import PrieviousFilms from './components/Pages/PrieviousFilms';
import ProgrammedFilms from './components/Pages/ProgrammedFilms';
import OneFilm from './components/Pages/OneFilm';
import About from './components/Pages/About';
import AddFilm from './components/BackOffice/AddFilm'
import EditFilm from './components/BackOffice/EditFilms'
import Nav from './components/Nav';
import TestPage from './components/TestPage';
import {AuthProvider} from './contexts/AuthContext';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./ThemeProvider";
import EditFilms from "./components/BackOffice/EditFilms";
import EditOneFilm from "./components/BackOffice/EditOneFilm";


export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/FilmsInCompetition" element={<FilmsInCompetition />} />
            <Route path="/previous" element={<PrieviousFilms />} />
            <Route path="/programmed" element={<ProgrammedFilms />} />
            <Route path="/film/:filmId" element={<OneFilm />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin/addFilms" element={<AddFilm />} />
            <Route path="/admin/editFilms" element={<EditFilms/>} />
            <Route path="/admin/editOneFilm/:filmId" element={<EditOneFilm />} />
            <Route path="/test" element={<TestPage />} />
            
            
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}
