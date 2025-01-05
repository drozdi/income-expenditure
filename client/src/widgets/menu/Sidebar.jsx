import { Box, List, ListItem, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
export function Sidebar() {
	return (
		<Box component="aside" sx={{ boxShadow: 1 }}>
			<List>
				<ListItem disablePadding>
					<ListItemButton component={Link} to="/">
						Главная
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton
						component={Link}
						to="/statistics/675ed9c4444bb8cd1b565d2a/"
					>
						Статистика
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
					<ListItemButton component={Link} to="/transactions/">
						История
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
		</Box>
	);
}
