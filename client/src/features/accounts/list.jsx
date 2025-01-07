import { useNotifications } from '@toolpad/core/useNotifications';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteAccount,
	selectAccounts,
	selectLoading,
	selectTypes,
} from '../../entites/accounts/accountsSlice';
import localStorageService from '../../shared/services/localStorage.service';

import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import {
	Button,
	ButtonGroup,
	Card,
	CardContent,
	CardHeader,
	Stack,
	Typography,
} from '@mui/material';
import { default as Link, default as link } from '../../shared/link';
import { currencyFormat } from '../../shared/utils/currency-format';

import { fetchCategories } from '../../entites/categories/categoriesSlice';

export default () => {
	const notifications = useNotifications();
	const dispatch = useDispatch();
	const isLoading = useSelector(selectLoading);
	const userId = localStorageService.getUserId();
	const accounts = useSelector(selectAccounts) || [];
	const types = useSelector(selectTypes);
	const handlerDelete = async (id, label) => {
		if (confirm(`Удалить счет "${label}"?`)) {
			dispatch(deleteAccount(id))
				.unwrap()
				.then((data) => {
					dispatch(fetchCategories()).then(() => {
						notifications.show(`Удалено!`, {
							severity: 'success',
							autoHideDuration: 3000,
						});
					});
				})
				.catch(({ error, payload }) => {
					notifications.show(error ?? payload, {
						severity: 'error',
						autoHideDuration: 3000,
					});
				});
		}
	};
	if (!accounts.length) {
		return (
			<Typography align="center">
				Нет активных счетов. Добавьте новый счёт.
			</Typography>
		);
	}
	return (
		<>
			<Stack direction="column" spacing={2}>
				{accounts.map((account) => (
					<Stack
						component={Card}
						key={account._id}
						direction="row"
						justifyContent="space-between"
						sx={{
							':hover': {
								boxShadow: 4,
							},
						}}
					>
						<Button
							component={link}
							to={`/statistics/${account._id}`}
							title="Статистика"
						>
							<EqualizerIcon fontSize="large" />
						</Button>
						<Stack
							component={Link}
							to={`/account/${account._id}`}
							direction="column"
							underline="none"
							sx={{
								flex: '1 1 auto',
							}}
						>
							<CardHeader
								title={
									account.label +
									` (${types[account.type] || account.type})`
								}
								subheader={
									account?.owner?._id === userId
										? 'Мой'
										: account.owner.name
								}
							/>
							<CardContent></CardContent>
							<CardContent>{currencyFormat(account.balance)}</CardContent>
						</Stack>

						<ButtonGroup
							sx={{ flex: '0 0 0 auto' }}
							variant="text"
							orientation="vertical"
						>
							<Button
								component={link}
								to={`/transactions/?account=${account._id}`}
								title="Транзакции"
							>
								<ManageSearchIcon />
							</Button>
							<Button
								component={link}
								to={`/categories/${account._id}`}
								title="Категории"
							>
								<SpeakerNotesIcon />
							</Button>
							<Button
								component={link}
								to={`/transaction/income?account=${account._id}`}
								title="Доход"
							>
								<BookmarkAddIcon />
							</Button>
							<Button
								component={link}
								to={`/transaction/expense?account=${account._id}`}
								title="Расход"
							>
								<BookmarkRemoveIcon />
							</Button>
							<Button
								onClick={() => handlerDelete(account._id, account.label)}
								title="Удалить"
							>
								<DeleteOutlineIcon />
							</Button>
						</ButtonGroup>
					</Stack>
				))}

				<Stack
					component={Card}
					direction="row"
					justifyContent="space-between"
					alignItems="stretch"
					sx={{
						':hover': {
							boxShadow: 4,
						},
					}}
				>
					<Button title="Статистика" disabled>
						<EqualizerIcon fontSize="large" />
					</Button>
					<Stack
						component={Link}
						to={`/account/`}
						direction="column"
						underline="none"
						sx={{
							flex: '1 1 auto',
						}}
					>
						<CardHeader title="Новый " subheader="Счет" />
						<CardContent>Новый счет</CardContent>
					</Stack>
					<ButtonGroup
						sx={{
							flex: '0 0 0 auto',
						}}
						variant="text"
						orientation="vertical"
						disabled
					>
						<Button title="Транзакции">
							<ManageSearchIcon />
						</Button>
						<Button component={link} to={`/categories/`} title="Категории">
							<SpeakerNotesIcon />
						</Button>
						<Button title="Доход">
							<BookmarkAddIcon />
						</Button>
						<Button title="Расход">
							<BookmarkRemoveIcon />
						</Button>
						<Button title="Удалить">
							<DeleteOutlineIcon />
						</Button>
					</ButtonGroup>
				</Stack>
			</Stack>
		</>
	);
};
