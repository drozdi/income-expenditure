import { useSelector } from 'react-redux';
import { getActive } from '../../entites/loader/loaderSlice';
import { XSpinner } from '../../shared/ui';
export function Loader() {
	const isActive = useSelector(getActive);
	return (
		isActive && (
			<div className="fixed top-0 left-0 h-screen w-screen backdrop-blur">
				<div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-36 h-36">
					<XSpinner size="10em" thickness={3} color="primary" />
				</div>
			</div>
		)
	);
}
