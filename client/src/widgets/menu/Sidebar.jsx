import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

function ListItemLink({ children, to }) {
	return (
		<ListItemButton
			component={NavLink}
			to={to}
			style={({ isActive }) => ({
				backgroundColor: isActive ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
			})}
		>
			<ListItemText>{children}</ListItemText>
		</ListItemButton>
	);
}

ListItemLink.propTypes = {
	children: PropTypes.node,
	to: PropTypes.string.isRequired,
};

export function Sidebar() {
	return (
		<Box component="aside" sx={{ boxShadow: 1 }}>
			<List>
				<ListItem disablePadding>
					<ListItemLink to="/">Главная</ListItemLink>
				</ListItem>

				<ListItem disablePadding>
					<ListItemLink to="/transaction/expense">Расход</ListItemLink>
				</ListItem>

				<ListItem disablePadding>
					<ListItemLink to="/transaction/income">Доход</ListItemLink>
				</ListItem>

				<ListItem disablePadding>
					<ListItemLink to="/transactions/">История</ListItemLink>
				</ListItem>

				<ListItem disablePadding>
					<ListItemLink to="/categories/">Категории</ListItemLink>
				</ListItem>

				<ListItem disablePadding>
					<ListItemLink to="/accounts">Счета</ListItemLink>
				</ListItem>
			</List>
		</Box>
	);
}
