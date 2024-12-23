import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
	Button,
	ButtonGroup,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListSubheader,
} from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteCategory,
	getCategories,
	getLoading,
	getTypes,
} from '../../entites/categories/categoriesSlice';
import localStorageService from '../../shared/services/localStorage.service';
import Link from '../../shared/ui/link';
import { useToast } from '../toast';

export default function ({ className, accountId, type }) {
	const dispatch = useDispatch();
	const types = useSelector(getTypes);
	const isLoading = useSelector(getLoading);
	const categories = useSelector(getCategories(accountId)) || [];
	const userId = localStorageService.getUserId();
	const toast = useToast();

	const grouped = useMemo(() => {
		return categories.filter((category) => category.type === type);
	}, [categories, type]);

	const handlerDelete = async (id, label) => {
		if (confirm(`Удалить категорию "${label}"?`)) {
			dispatch(deleteCategory(id))
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

	return (
		<List className={className}>
			{!categories.length && (
				<ListItem>
					<ListSubheader>
						Нет категорий. Добавьте новую категорию.
					</ListSubheader>
				</ListItem>
			)}
			{grouped.map((category) => (
				<ListItem
					key={category._id}
					divider
					disablePadding
					disableGutters
					secondaryAction={
						<ButtonGroup variant="text">
							<Button
								component={Link}
								to={`/account/${category.account}/category/${category._id}`}
								title="Редактировать"
							>
								<EditIcon />
							</Button>
							<Button
								onClick={() =>
									handlerDelete(category._id, category.label)
								}
								title="Удалить"
							>
								<DeleteIcon />
							</Button>
						</ButtonGroup>
					}
				>
					<ListItemButton>{category.label}</ListItemButton>
				</ListItem>
			))}
			<ListItem disablePadding disableGutters>
				<ListItemButton
					component={Link}
					to={`/account/${accountId}/category/?type=${type}`}
				>
					<ListItemIcon>
						<AddIcon />
					</ListItemIcon>
					Добавить категорию
				</ListItemButton>
			</ListItem>
		</List>
	);
}
