import React , { useState } from 'react';
import './App.css';
import PhoneVerificationPopup from './Phone';
function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  }

  return (
    <div className="App">
      <button className="popup-button" onClick={handleClick}>Verify Phone</button>
      {showPopup && <PhoneVerificationPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default App;
