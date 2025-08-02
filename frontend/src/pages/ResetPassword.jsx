import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../redux/userSlice';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const { loading } = useSelector((state) => state.user);

    const resetFunc = async () => {
        if (!password) {
            setError('Please enter a new password');
            return;
        }
        
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        
        try {
            setError('');
            setMessage('');
            const result = await dispatch(resetPassword({ token, password })).unwrap();
            setMessage(result.message || 'Password reset successfully');
            
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate('/auth');
            }, 2000);
            
        } catch (err) {
            setError(err.message || 'Something went wrong');
        }
    }

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='w-1/2 space-y-4'>
            <div className='text-2xl font-bold'>Şifre Sıfırlama</div>
            <Input 
                placeholder='Yeni Şifre' 
                onChange={(e)=>{setPassword(e.target.value)}} 
                name='password' 
                id="password" 
                type="password" 
            />
            <Input 
                placeholder='Şifreyi Tekrarla' 
                onChange={(e)=>{setConfirmPassword(e.target.value)}} 
                name='confirmPassword' 
                id="confirmPassword" 
                type="password" 
            />
            {error && <div className='text-red-500 text-sm'>{error}</div>}
            {message && <div className='text-green-500 text-sm'>{message}</div>}
            <Button 
                name={loading ? "Sıfırlanıyor..." : "Şifreyi Sıfırla"} 
                onClick={resetFunc} 
                disabled={loading}
            />
        </div>
    </div>
  )
}

export default ResetPassword