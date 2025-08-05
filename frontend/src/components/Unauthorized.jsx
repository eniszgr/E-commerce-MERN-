import React from 'react';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 text-center">
        <div className="text-red-500 text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Erişim Reddedildi
        </h1>
        <p className="text-gray-600 mb-6">
          Buraya erişme yetkiniz yok. Bu sayfa sadece admin kullanıcılar için erişilebilir.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}

export default Unauthorized; 