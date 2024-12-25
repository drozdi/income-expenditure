import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, ListItem, ListItemText, TextField } from '@mui/material';
import { useDialogs } from '@toolpad/core/useDialogs';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../entites/categories/categoriesSlice';
export default function ({ account, type }) {
	const dialogs = useDialogs();
	const dispatch = useDispatch();
	const notifications = useNotifications();
	const [newLabel, setNewLabel] = useState('');

	const handlerSave = async () => {
		const label = newLabel.trim();
		if (!label) {
			await dialogs.alert('Введите название!', {
				title: 'Ошибка!',
			});
			return;
		}
		dispatch(addCategory({ account, type, label }))
			.unwrap()
			.then((data) => {
				notifications.show(`Категория "${data.label}" успешна сохранена!`, {
					severity: 'success',
					autoHideDuration: 3000,
				});
				setNewLabel('');
			})
			.catch(({ error }) => {
				notifications.show(error, {
					severity: 'error',
					autoHideDuration: 3000,
				});
			});
	};

	const handlerKeyPress = ({ key }) => {
		if (key === 'Enter') {
			handlerSave();
		}
	};

	return (
		<ListItem
			disablePadding
			disableGutters
			secondaryAction={
				<Button onClick={handlerSave} title="Сохранить">
					<AddCircleOutlineIcon />
				</Button>
			}
		>
			<ListItemText>
				<TextField
					fullWidth
					hiddenLabel
					placeholder="Название категории"
					variant="filled"
					size="small"
					value={newLabel}
					onChange={({ target }) => setNewLabel(target.value)}
					onKeyPress={handlerKeyPress}
				/>
			</ListItemText>
		</ListItem>
	);
}
