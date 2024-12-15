import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchAccounts,
	getAccounts,
	getLoading,
} from '../../entites/accounts/accountsSlice';
import { XItem, XItemLabel, XItemSection, XList } from '../../shared/ui';
import { Loader } from '../loader';
export default () => {
	const dispatch = useDispatch();
	const list = useSelector(getAccounts);
	const isLoading = useSelector(getLoading);
	useEffect(() => {
		dispatch(fetchAccounts());
	}, [dispatch]);

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
