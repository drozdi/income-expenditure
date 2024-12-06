import { SignUpForm } from '../features/auth/sign-up/sign-up-form'

export const SignUp = () => {
	return (
		<div className='flex justify-center items-center min-h-full flex-1 flex-col  '>
			<h1>SignUp</h1>
			<div className='border border-gray-300 py-10 px-10 max-w-[400px]'>
				<SignUpForm />
			</div>
		</div>
	)
}
