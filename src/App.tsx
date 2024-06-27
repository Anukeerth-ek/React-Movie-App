import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviesList from "./components/MoviesList";
import Navbar from "./components/Navbar";
import  { lazy, Suspense } from "react";
import MovieDetails from "./pages/MovieDetails";
const FavoriteMoviesList = lazy(() => import("./pages/FavoriteMoviesList"));
function App() {
     return (
          <Router>
               <div>
                    <Navbar />
                    <div className="bg-white">
                         <Routes>
                              <Route path="/" element={<MoviesList />} />
                              <Route
                                   path="/favourite"
                                   element={
                                        <Suspense fallback={<div>Loading...</div>}>
                                             <FavoriteMoviesList />
                                        </Suspense>
                                   }
                              />
                              <Route path="/movieDetail" element={<MovieDetails/>}/>
                         </Routes>
                    </div>
               </div>
          </Router>
     );
}

export default App;
