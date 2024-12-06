import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { loginUser } from '../entites/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export const SignIn = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { register, handleSubmit, formState } = useForm()

	const onSubmit = (data) => {
		dispatch(loginUser(data))
			.unwrap()
			.then(() => {
				navigate('/users')
			})
	}
	return (
		<div>
			<h1>SignIn</h1>
			<div>
				<form className='space-y-6 mx-auto max-w-[400px]  border border-gray-300 rounded'>
					<div className='mt-2'>
						<label>Email</label>
						<input
							className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							{...register('email', { required: true })}
						/>
					</div>
					<div className='mt-2'>
						<label>password</label>
						<input
							className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							{...register('password', { required: true })}
						/>
					</div>
					<button
						className='bg-red-500 border border-gray-300 rounded'
						type='submit'
						onClick={handleSubmit(onSubmit)}
					>
						SignIn
					</button>
				</form>
			</div>
		</div>
	)
}
