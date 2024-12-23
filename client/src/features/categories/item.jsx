import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, ButtonGroup, ListItem, ListItemButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCategories,
	getLoading,
	getTypes,
} from '../../entites/categories/categoriesSlice';
import localStorageService from '../../shared/services/localStorage.service';
import Link from '../../shared/ui/link';
import { useToast } from '../toast';

export default function () {
	const dispatch = useDispatch();
	const types = useSelector(getTypes);
	const isLoading = useSelector(getLoading);
	const categories = useSelector(getCategories(accountId)) || [];
	const userId = localStorageService.getUserId();
	const toast = useToast();

	return (
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
						onClick={() => handlerDelete(category._id, category.label)}
						title="Удалить"
					>
						<DeleteIcon />
					</Button>
				</ButtonGroup>
			}
		>
			<ListItemButton>{category.label}</ListItemButton>
		</ListItem>
	);
}
