import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import {
	AppBar,
	Button,
	IconButton,
	Menu,
	MenuItem,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../entites/auth/authSlice';
import { selectUser } from '../../entites/settings/settingsSlice';
import LogOutBtn from '../../features/auth/sign-out';
import Link from '../../shared/link';

export function Header() {
	const isAuth = useSelector(selectIsAuth);
	const [anchorEl, setAnchorEl] = useState(null);
	const user = useSelector(selectUser);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<AppBar position="absolute">
			<Toolbar>
				<Stack
					component={Link}
					color="inherit"
					to="/"
					underline="none"
					direction="column"
					alignItems="center"
					sx={{ mr: 2 }}
				>
					<CurrencyRubleIcon sx={{ fontSize: 32 }} />
					<Typography
						variant="h6"
						noWrap
						sx={{
							display: { xs: 'none', md: 'flex' },
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
						}}
					>
						Finance
					</Typography>
				</Stack>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					News
				</Typography>
				{isAuth ? (
					<div>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircleIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem
								component={Link}
								onClick={handleClose}
								to="/settings"
							>
								{user.username}
							</MenuItem>
							<MenuItem>
								<LogOutBtn />
							</MenuItem>
						</Menu>
					</div>
				) : (
					<Button color="inherit" component={Link} to="/auth">
						Войти
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
}
