import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

import { Card, CardContent, CardHeader, CardMedia, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts, getLoading } from '../../entites/accounts/accountsSlice';
import localStorageService from '../../shared/services/localStorage.service';
import Link from '../../shared/ui/link';
import { useToast } from '../toast';
export default () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(getLoading);
	const userId = localStorageService.getUserId();
	const toast = useToast();
	const accounts = useSelector(getAccounts) || [];
	return (
		<Stack
			direction="row"
			spacing={2}
			useFlexGap
			sx={{
				justifyContent: 'flex-start',
				alignItems: 'stretch',
			}}
		>
			{accounts.map((account) => (
				<Link key={account._id} to={`/account/${account._id}`} underline="hover">
					<Stack
						direction="column"
						spacing={2}
						sx={{
							justifyContent: 'space-between',
							alignItems: 'stretch',
							minHeight: '100%',
						}}
						component={Card}
					>
						<CardHeader title={account.label} />
						<CardMedia className="text-center">
							<CloseIcon />
						</CardMedia>
						<CardContent>Новый счет</CardContent>
					</Stack>
				</Link>
			))}
			<Link to={`/account/`} underline="hover">
				<Stack
					direction="column"
					spacing={2}
					sx={{
						justifyContent: 'space-between',
						alignItems: 'stretch',
						minHeight: '100%',
					}}
					component={Card}
				>
					<CardHeader title="Счет" />
					<CardMedia className="text-center">
						<AddCircleOutlineIcon sx={{ fontSize: 48 }} />
					</CardMedia>
					<CardContent>Новый счет</CardContent>
				</Stack>
			</Link>
		</Stack>
	);
};
