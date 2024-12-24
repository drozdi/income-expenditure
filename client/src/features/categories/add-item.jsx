import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, ListItem, ListItemText, TextField } from '@mui/material';
import { useNotifications } from '@toolpad/core/useNotifications';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../entites/categories/categoriesSlice';
export default function ({ account, type }) {
	const dispatch = useDispatch();
	const notifications = useNotifications();
	const [label, setLabel] = useState('');

	const handlerSave = () => {
		dispatch(addCategory({ account, type, label }))
			.unwrap()
			.then((data) => {
				notifications.show(`Категория "${data.label}" успешна сохранена!`, {
					severity: 'success',
					autoHideDuration: 3000,
				});
				setLabel('');
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
					value={label}
					onChange={({ target }) => setLabel(target.value)}
					onKeyPress={handlerKeyPress}
				/>
			</ListItemText>
		</ListItem>
	);
}
