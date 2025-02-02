import logo from './logo.gif';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import QrScanner from './components/scanner/QrScanner';
import NoPage from './components/NoPage';
import DriverListview2 from './components/driver/DriverListView2';
import BookingPost from './components/booking/BookingPost';
import SuccessPage from './components/booking/SuccessPage';
import Registration from './components/driver/Registration';
import Location from './components/driver/Location';
import StatusOverview from './components/overview/StatusOverview';
import ScannerHome from './components/scanner/ScannerHome';


function App() {
  return (
    <BrowserRouter>
      <Routes>          
        <Route path="/scan" element={<ScannerHome />} />
        <Route path="/scan/step" element={<QrScanner path="/nextStep" />} />
        <Route path="/scan/gate" element={<QrScanner path="/signIn" />} />
        <Route path="/scan/start" element={<QrScanner path="/startLoading" />} />
        <Route path="/scan/end" element={<QrScanner path="/endLoading" />} />
        <Route path="/driver" element={<DriverListview2 />} />
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
                    <br/>
                    <a href='/statusOverview'>Status</a>
                    <br/>
                    <a href='/booking'>Booking</a>
                  </p>
                </header>
              </div>
            }>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
