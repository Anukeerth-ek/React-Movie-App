import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesList from './components/MoviesList';
import Navbar from './components/Navbar';
import FavoriteMoviesList from './components/FavoriteMoviesList';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className='bg-white'>
          <Routes>
            <Route path="/" element={<MoviesList />} />
            <Route path="/favourite" element={<FavoriteMoviesList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
