import logo from './logo.gif';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import QrScanner from './components/scanner/QrScanner';
import NoPage from './components/NoPage';
import DriverListview from './components/driver/DriverListview';
import BookingPost from './components/booking/BookingPost';
import SuccessPage from './components/booking/SuccessPage';
import Registration from './components/driver/Registration';
import Location from './components/driver/Location';
import StatusOverview from './components/overview/StatusOverview';


function App() {
  return (
    <BrowserRouter>
      <Routes>          
        <Route path="/scan" element={<QrScanner />} />
        <Route path="/driver" element={<DriverListview />} />
        <Route path="/driver/reg" element={<Registration />} />
        <Route path="/notFound" element={<NoPage />} />
        <Route path="/booking" element={<BookingPost />} />
        <Route path="/booking/success" element={<SuccessPage />} />
        <Route path="/statusOverview" element={<StatusOverview />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/" element={
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Test Environment
                    <a href='/driver'>Driver</a>
                  </p>
                </header>
                <QrScanner></QrScanner>
              </div>
            }>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
