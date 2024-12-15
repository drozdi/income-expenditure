import { XSpinner } from '../../shared/ui';
export function Loader({ isActive }) {
	return (
		isActive && (
			<div className="absolute top-0 left-0 w-full h-full min-w-60 min-h-60 backdrop-blur flex justify-center content-center items-center z-50">
				<XSpinner size="10rem" thickness={3} color="primary" />
			</div>
		)
	);
}
