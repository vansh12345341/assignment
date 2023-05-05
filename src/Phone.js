import React, { useState, useRef, useEffect } from 'react';
import './PhoneVerificationPopup.css';

const PhoneVerificationPopup = ({ onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  
  const handleInput = (index, e) => {
    const value = e.target.value;
    if (!isNaN(value) && value.length === 1) {
      const otpCopy = [...otp];
      otpCopy[index] = value;
      setOtp(otpCopy);
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      const otpCopy = [...otp];
      otpCopy[index] = '';
      setOtp(otpCopy);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };
  
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('text/plain');
    if (/^\d{6}$/.test(pastedData)) {
      const otpCopy = pastedData.split('');
      setOtp(otpCopy);
      inputRefs.current[0].focus();
    }
    e.preventDefault();
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    } else if (e.key === 'Backspace' && index > 0) {
      const otpCopy = [...otp];
      otpCopy[index] = '';
      setOtp(otpCopy);
      inputRefs.current[index - 1].focus();
    }
  };
  
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);
  
  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Phone Verification</h2>
        <p className="otp-text">Enter the OTP sent to XXXXX-XX513</p>
        <p>Please enter the 6 digit OTP sent to your phone number</p>
        <div className="otp-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="1"
              value={digit}
              ref={(ref) => inputRefs.current[index] = ref}
              onChange={(e) => handleInput(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => handlePaste(e)}
            />
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PhoneVerificationPopup;
