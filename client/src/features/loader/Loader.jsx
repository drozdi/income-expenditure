import { XSpinner } from '../../shared/ui';
export function Loader() {
	return (
		<div className="w-full h-full min-w-60 min-h-60 backdrop-blur flex justify-center content-center items-center">
			<XSpinner size="10rem" thickness={3} color="primary" />
		</div>
	);
}
