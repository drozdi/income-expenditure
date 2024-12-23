import { useDispatch, useSelector } from 'react-redux';
import {
	deleteAccount,
	getAccounts,
	getLoading,
} from '../../entites/accounts/accountsSlice';
import localStorageService from '../../shared/services/localStorage.service';
import { useToast } from '../toast';

import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, ButtonGroup, Card, CardContent, CardHeader, Stack } from '@mui/material';
import Link from '../../shared/ui/link';
import { currencyFormat } from '../../shared/utils/currency-format';

export default () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(getLoading);
	const userId = localStorageService.getUserId();
	const toast = useToast();
	const accounts = useSelector(getAccounts) || [];
	const handlerDelete = async (id, label) => {
		if (confirm(`Удалить счет "${label}"?`)) {
			dispatch(deleteAccount(id))
				.unwrap()
				.then((data) => {
					toast.show({
						children: 'Удалено',
						color: 'positive',
					});
				})
				.catch(({ error }) => {
					toast.show({
						children: error,
						color: 'negative',
					});
				});
		}
	};
	if (!accounts.length) {
		return (
			<div className="text-center">Нет активных счетов. Добавьте новый счёт.</div>
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
						className="hover:shadow-sm hover:shadow-black"
					>
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
								title={account.label}
								subheader={
									account?.owner?._id === userId
										? 'Мой'
										: account.owner.name
								}
							/>
							<CardContent>{currencyFormat(account.balance)}</CardContent>
						</Stack>
						<ButtonGroup
							sx={{ flex: '0 0 0 auto' }}
							variant="text"
							orientation="vertical"
						>
							<Button>Hist</Button>
							<Button title="Доход">
								<BookmarkAddIcon />
							</Button>
							<Button title="Расход">
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
					className="hover:shadow-sm hover:shadow-black"
				>
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
						<Button>Hist</Button>
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
