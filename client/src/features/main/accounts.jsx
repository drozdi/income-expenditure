import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

import { Card, CardContent, CardHeader, CardMedia, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectAccounts,
	selectLoading,
	selectTypes,
} from '../../entites/accounts/accountsSlice';
import Link from '../../shared/link';
import localStorageService from '../../shared/services/localStorage.service';
import { currencyFormat } from '../../shared/utils/currency-format';
export default function MainAccounts() {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);
	const userId = localStorageService.getUserId();
	const accounts = useSelector(selectAccounts) || [];
	const types = useSelector(selectTypes);
	return (
		<Stack
			direction="row"
			spacing={2}
			useFlexGap
			alignItems="stretch"
			justifyContent="flex-start"
		>
			{accounts.map((account) => (
				<Link
					key={account._id}
					to={`/statistics/${account._id}`}
					underline="none"
					sx={{
						':hover': {
							boxShadow: 2,
						},
					}}
				>
					<Stack
						direction="column"
						spacing={2}
						justifyContent="space-between"
						alignItems="stretch"
						sx={{
							minHeight: '100%',
						}}
						component={Card}
					>
						<CardHeader
							title={account.label}
							subheader={`(${types[account.type] || account.type})`}
						/>
						<CardMedia
							sx={{
								textAlign: 'center',
							}}
						>
							<CloseIcon />
						</CardMedia>
						<CardContent>{currencyFormat(account.balance)}</CardContent>
					</Stack>
				</Link>
			))}
			<Link
				to={`/account/`}
				underline="none"
				sx={{
					':hover': {
						boxShadow: 2,
					},
				}}
			>
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
					<CardMedia
						sx={{
							textAlign: 'center',
						}}
					>
						<AddCircleOutlineIcon sx={{ fontSize: 48 }} />
					</CardMedia>
					<CardContent>Новый счет</CardContent>
				</Stack>
			</Link>
		</Stack>
	);
}
