import { useForm } from 'react-hook-form'
import { api } from '../../../shared/api'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../entites/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export const SignUpForm = () => {
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const {
		register,
		handleSubmit,
		// formState: { errors },
	} = useForm()

	const onSubmit = async (data) => {
		dispatch(registerUser(data))
			.unwrap()
			.then(() => {
				navigate('/users')
			})
			.catch((err) => console.log(err))
	}
	return (
		<form onSubmit={handleSubmit(onSubmit)} className=' space-y-6 '>
			<div className='mt-2'>
				<input
					className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					{...register('username', { required: true })}
					placeholder='username'
				/>
			</div>
			<div className='mt-2'>
				<input
					className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					{...register('password', { required: true })}
					placeholder='password'
				/>
			</div>
			<div className='mt-2'>
				<input
					{...register('email', { required: true })}
					placeholder='email'
					className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
				/>
			</div>
			<button
				type='submit'
				disabled={isLoading}
				className='text-white font-bold py-2 px-4 rounded bg-blue-500'
			>
				{isLoading ? 'Loading...' : 'Sign Up'}
			</button>
		</form>
	)
}
