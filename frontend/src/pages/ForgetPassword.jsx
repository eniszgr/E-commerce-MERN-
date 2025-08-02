import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../redux/userSlice';

function ForgetPassword() {
    const [email,setEmail]= useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);
    
    const forgotFunc = async () => {
        if (!email) {
            setError('Please enter your email address');
            return;
        }
        
        try {
            setError('');
            setMessage('');
            const result = await dispatch(forgotPassword(email)).unwrap();
            setMessage(result.message || 'Check your email for password reset instructions');
        } catch (err) {
            setError(err.message || 'Something went wrong');
        }
    }
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='w-1/2 space-y-4'>
            <div className='text-2xl font-bold'>Forget Password</div>
            <Input 
                placeholder='Email' 
                onChange={(e)=>{setEmail(e.target.value)}} 
                name='email' 
                id="email" 
                type="email" 
            />
            {error && <div className='text-red-500 text-sm'>{error}</div>}
            {message && <div className='text-green-500 text-sm'>{message}</div>}
            <Button 
                name={loading ? "Sending..." : "Send"} 
                onClick={forgotFunc} 
                disabled={loading}
            />
        </div>
    </div>
  )
}

export default ForgetPassword