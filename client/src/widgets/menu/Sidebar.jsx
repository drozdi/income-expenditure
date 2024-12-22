import { List, ListItem, ListItemButton } from '@mui/material';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
export function Sidebar({ className }) {
	return (
		<aside className={classNames('relative bg-sidebar shadow-xl', className)}>
			<List>
				<ListItem>
					<ListItemButton component={Link} to="/">
						Главная
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton component={Link} to="/categories/">
						Категории
					</ListItemButton>
				</ListItem>
				<ListItem>
					<ListItemButton component={Link} to="/accounts">
						Счета
					</ListItemButton>
				</ListItem>
			</List>
		</aside>
	);
}
