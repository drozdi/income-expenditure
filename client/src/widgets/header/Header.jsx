import classNames from 'classnames';

import logoSvg from '../../shared/images/logo.svg';

import { XBtn } from '../../shared/ui';

export function Header({ className }) {
	return (
		<header className={classNames('w-full h-20 bg-primary shadow-header', className)}>
			<div className="flex items-center justify-between h-full px-4">
				<div className="h-full">
					<img className="max-w-full max-h-full" src={logoSvg} alt="logo" />
					<h1 className="sm:hidden">Finance</h1>
				</div>

				<div className="text-white">email</div>

				<div className="flex items-center">
					<div>
						<XBtn to="/">Выйти</XBtn>
					</div>
				</div>
			</div>
		</header>
	);
}
