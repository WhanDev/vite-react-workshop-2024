/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from 'axios'
import {jwtDecode} from 'jwt-decode'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            const api = 'https://workshop-react-api.vercel.app/login'
            const res = await axios.post(api, { username, password })

            const decode = jwtDecode(res.data.token)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user_id', decode.user_id)
            setTimeout(() => {
                window.location.reload()
            }, 500)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='bg-gray-100 h-screen flex justify-center items-center'>
            <div className='bg-white px-20 py-10 rounded-lg shadow-lg'>
                <p className='text-2xl text-center'>
                    Welcome Back
                </p>
                <hr className='my-5' />
                <form>
                    <div className='flex flex-col w-full'>
                        <label className='text-1xl'>Username</label>
                        <input type='text' placeholder='ชื่อผู้ใช้' className='border border-gray-400 w-full rounded-lg mt-1 mb-3 p-2'
                            onChange={(e) => setUsername(e.target.value)} />
                        <label className='text-1xl'>Password</label>
                        <input type='password' placeholder='รหัสผ่าน' className='border border-gray-400 w-full rounded-lg mt-1 mb-5 p-2'
                            onChange={(e) => setPassword(e.target.value)} />
                        <button className='bg-purple-600 w-full rounded-lg text-white p-2'
                            onClick={handleClick}>
                            <p className='text-2xl'>
                                เข้าสู่ระบบ
                            </p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login