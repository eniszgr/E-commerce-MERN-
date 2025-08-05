import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AccessDenied() {
  const navigate = useNavigate();
  const [time, setTime] = useState(5);

  //if timer is 0 or negative, redirect to home page
  useEffect(() => {
    if (time <= 0) {
      navigate('/');
      return;
    }
    //setInterval calls the function time that we want type of miliseconds
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); 
  }, [time, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Buraya Erişme Yetkiniz Yok
        </h1>
        <p className="text-gray-600 mb-8">
          You can not access this page.
        </p>
        <div className="pb-8">
          You are directing to home page in {time} seconds
        </div>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Hemen Dön
        </button>
      </div>
    </div>
  );
}

export default AccessDenied;