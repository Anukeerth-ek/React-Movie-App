import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoviesList from "./components/MoviesList";
import Navbar from "./components/Navbar";

const FavoriteMoviesList = lazy(() => import("./components/FavoriteMoviesList"));
import  { lazy, Suspense } from "react";
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
                         </Routes>
                    </div>
               </div>
          </Router>
     );
}

export default App;
