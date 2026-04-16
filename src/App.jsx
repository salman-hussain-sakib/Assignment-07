import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TimelineProvider } from './context/TimelineContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FriendDetails from './pages/Frienddetails';
import Timeline from './pages/Timeline';
import Stats from './pages/Stats';
import NotFound from './pages/Notfound';
import './App.css';

function App() {
  return (
    <TimelineProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/friend/:id" element={<FriendDetails />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </TimelineProvider>
  );
}


export default App;
