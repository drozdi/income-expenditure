import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectAccounts } from '../../entites/accounts/accountsSlice';
import { selectLoading, selectUser } from '../../entites/settings/settingsSlice';

import LoadingButton from '@mui/lab/LoadingButton';
import {
	Button,
	FormControl,
	InputLabel,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	Stack,
} from '@mui/material';
import { useDialogs } from '@toolpad/core/useDialogs';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useEffect, useMemo, useState } from 'react';
import settingsService from '../../shared/services/settings.service';

export default function SettingsUsers({ onSaved }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const dialogs = useDialogs();
	const notifications = useNotifications();
	const isLoading = useSelector(selectLoading);
	const user = useSelector(selectUser);
	const [users, setUsers] = useState([]);
	const accounts = useSelector(selectAccounts);
	const myAccounts = useMemo(
		() => accounts.filter((account) => account.owner._id === user._id),
		[accounts, user],
	);
	const mapLabel = useMemo(() => {
		const map = {};
		Object.entries(myAccounts).forEach(([key, account]) => {
			map[account._id] = account.label;
		});
		return map;
	}, [myAccounts]);

	const handleChange =
		(id) =>
		({ target }) => {
			const newUsers = [...users];
			const index = newUsers.findIndex((t) => t._id === id);
			if (index > -1) {
				newUsers[index].accounts = target.value;
			}
		};

	useEffect(() => {
		settingsService.getUsers().then(({ data }) => {
			setUsers(data);
		});
	}, []);
	const handleSubmit = () => {
		console.log(users);
		settingsService.updateUsers(users).then((data) => {
			notifications.show(`Пользователи обновлены!`, {
				severity: 'success',
				autoHideDuration: 3000,
			});
			onSaved?.(data);
		});
	};
	return (
		<>
			<List>
				{users.map((user) => (
					<ListItem
						key={user._id}
						secondaryAction={
							<FormControl sx={{ width: 300 }} size="small">
								<InputLabel>Доступ</InputLabel>
								<Select
									multiple
									input={<OutlinedInput label="Доступ" />}
									renderValue={(selected) =>
										selected.map((s) => mapLabel[s]).join(', ')
									}
									onChange={handleChange(user._id)}
									defaultValue={user.accounts}
								>
									{myAccounts.map((account) => (
										<MenuItem key={account._id} value={account._id}>
											{account.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						}
					>
						<ListItemText>
							{user.username} ({user.email})
						</ListItemText>
					</ListItem>
				))}
			</List>
			<Stack direction="row" justifyContent="center" spacing={2}>
				<LoadingButton
					loading={isLoading}
					color="success"
					type="submit"
					variant="contained"
					onClick={handleSubmit}
				>
					{isLoading ? 'Обновляеться...' : 'Сохранить'}
				</LoadingButton>
				<Button
					color="secondary"
					disabled={isLoading}
					onClick={() => navigate(-1)}
					variant="contained"
				>
					{isLoading ? 'Обновляеться...' : 'Назад'}
				</Button>
			</Stack>
		</>
	);
}

SettingsUsers.propTypes = {
	onSaved: PropTypes.func,
};
