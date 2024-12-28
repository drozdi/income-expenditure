import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
	Button,
	ButtonGroup,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField,
} from '@mui/material';
import { useDialogs } from '@toolpad/core/useDialogs';
import { useNotifications } from '@toolpad/core/useNotifications';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteCategory,
	editCategory,
	selectEditId,
	updateCategory,
} from '../../entites/categories/categoriesSlice';

export default function CategoriesItem({ className, category }) {
	const inputRef = useRef();
	const notifications = useNotifications();
	const dialogs = useDialogs();
	const dispatch = useDispatch();
	const isEditing = useSelector(selectEditId) === category._id;
	const [newLabel, setNewitLabel] = useState(category.label);

	const handlerSave = async () => {
		const label = newLabel.trim();
		if (!label) {
			await dialogs.alert('Введите название!', {
				title: 'Ошибка!',
			});
			return;
		}
		dispatch(updateCategory({ ...category, label }))
			.unwrap()
			.then((data) => {
				notifications.show(`Категория "${data.label}" успешна изменена!`, {
					severity: 'success',
					autoHideDuration: 3000,
				});
			})
			.catch(({ error }) => {
				notifications.show(error, {
					severity: 'error',
					autoHideDuration: 3000,
				});
			});
	};
	const handlerDelete = async () => {
		const deleteConfirmed = await dialogs.confirm(
			`Точно хотите удалить категорию "${category.label}"?`,
			{
				title: 'Удалить?',
				okText: 'Да',
				cancelText: 'Отмена',
			},
		);

		if (deleteConfirmed) {
			dispatch(deleteCategory(category._id))
				.unwrap()
				.then((data) => {
					notifications.show(`Категория "${category.label}" успешно удалена!`, {
						severity: 'success',
						autoHideDuration: 3000,
					});
				})
				.catch(({ error, payload }) => {
					notifications.show(error, {
						severity: 'error',
						autoHideDuration: 3000,
					});
				});
		}
	};

	const handlerEdit = () => {
		dispatch(editCategory(category._id));
	};
	const handlerCancel = () => {
		dispatch(editCategory(null));
	};

	const handlerBlur = ({ relatedTarget }) => {
		if (relatedTarget?.closest('li')?.dataset?.id === category._id) {
			return;
		}
		handlerSave();
	};
	const handlerKeyPress = ({ key }) => {
		if (key === 'Enter') {
			handlerSave();
		}
	};

	const handlerDblclick = () => {
		dispatch(editCategory(category._id));
	};

	useEffect(() => {
		if (isEditing && inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef, isEditing]);

	return (
		<ListItem
			className={className}
			key={category._id}
			onDoubleClick={handlerDblclick}
			divider
			disablePadding
			disableGutters
			data-id={category._id}
			secondaryAction={
				isEditing ? (
					<ButtonGroup variant="text">
						<Button
							aria-label="Сохранить"
							title="Сохранить"
							onClick={handlerSave}
						>
							<SaveIcon />
						</Button>
						<Button
							aria-label="Отмена"
							title="Отмена"
							onClick={handlerCancel}
						>
							<CancelIcon />
						</Button>
					</ButtonGroup>
				) : (
					<ButtonGroup variant="text">
						<Button
							aria-label="Редактировать"
							title="Редактировать"
							onClick={handlerEdit}
						>
							<EditIcon />
						</Button>
						<Button
							aria-label="Удалить"
							title="Удалить"
							onClick={handlerDelete}
						>
							<DeleteIcon />
						</Button>
					</ButtonGroup>
				)
			}
		>
			{isEditing ? (
				<ListItemText>
					<TextField
						inputRef={inputRef}
						fullWidth
						hiddenLabel
						variant="filled"
						size="small"
						value={newLabel}
						onChange={({ target }) => setNewitLabel(target.value)}
						onBlur={handlerBlur}
						onKeyPress={handlerKeyPress}
					/>
				</ListItemText>
			) : (
				<ListItemButton>
					<ListItemText>{category.label}</ListItemText>
				</ListItemButton>
			)}
		</ListItem>
	);
}

CategoriesItem.propTypes = {
	className: PropTypes.string,
	category: PropTypes.object,
};
