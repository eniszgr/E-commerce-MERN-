import React from 'react';
import { useNavigate } from 'react-router-dom';

function AccessDenied() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Buraya Erişme Yetkiniz Yok
        </h1>
        <p className="text-gray-600 mb-8">
          Bu sayfaya erişmek için admin yetkisine sahip olmanız gerekmektedir.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}

export default AccessDenied; 