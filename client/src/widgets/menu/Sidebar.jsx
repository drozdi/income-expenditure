import { List, ListItem, ListItemButton } from '@mui/material';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
export function Sidebar({ className }) {
	return (
		<aside className={classNames('relative bg-sidebar shadow-xl', className)}>
			<List>
				<ListItem disablePadding>
					<ListItemButton component={Link} to="/">
						Главная
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton component={Link} to="/transaction/expense">
						Расход
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton component={Link} to="/transaction/income">
						Доход
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton component={Link} to="/categories/">
						Категории
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton component={Link} to="/accounts">
						Счета
					</ListItemButton>
				</ListItem>
			</List>
		</aside>
	);
}
