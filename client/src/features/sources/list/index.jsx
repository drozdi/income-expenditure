import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchSources,
	getLoading,
	getSources,
} from '../../../entites/source/sourceSlice';
import { XItem, XItemLabel, XItemSection, XList } from '../../../shared/ui';
import { Loader } from '../../loader';
export default () => {
	const dispatch = useDispatch();
	const list = useSelector(getSources);
	const isLoading = useSelector(getLoading);
	useEffect(() => {
		dispatch(fetchSources());
	}, []);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<XList>
			{list.map((source, index) => (
				<XItem key={index}>
					<XItemSection>
						<XItemLabel>{index}</XItemLabel>
					</XItemSection>
				</XItem>
			))}
		</XList>
	);
};
