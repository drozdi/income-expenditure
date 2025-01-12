import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { Card, CardContent, CardHeader, CardMedia, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	selectAccounts,
	selectLoading,
	selectTypes,
} from '../../entites/accounts/accountsSlice';
import Link from '../../shared/link';
import localStorageService from '../../shared/services/localStorage.service';
import { currencyFormat } from '../../shared/utils/currency-format';
export default function MainAccounts({ onClick }) {
	const navigate = useNavigate();
	const isLoading = useSelector(selectLoading);
	const userId = localStorageService.getUserId();
	const accounts = useSelector(selectAccounts) || [];
	const types = useSelector(selectTypes);
	const handleClick = (id) => {
		if (onClick) {
			onClick(id);
		} else {
			navigate(`/statistics/${id}`);
		}
	};
	return (
		<Stack
			direction="row"
			spacing={2}
			useFlexGap
			alignItems="stretch"
			justifyContent="flex-start"
		>
			{accounts.map((account) => (
				<Stack
					direction="column"
					spacing={2}
					key={account._id}
					justifyContent="space-between"
					alignItems="stretch"
					sx={{
						':hover': {
							boxShadow: 2,
						},
						minHeight: '100%',
						cursor: 'pointer',
					}}
					component={Card}
					onClick={() => {
						handleClick(account._id);
					}}
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

MainAccounts.propTypes = {
	onClick: PropTypes.func,
};
