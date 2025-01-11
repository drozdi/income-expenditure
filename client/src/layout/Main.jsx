import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectIsAuth } from '../entites/auth/authSlice';
import { Footer, Header, Sidebar } from '../widgets';
export function MainLayout() {
	const isAuth = useSelector(selectIsAuth);
	return (
		<Box
			sx={{
				position: 'absolute',
				top: 0,
				left: 0,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				height: '100%',
				width: '100%',
			}}
		>
			<Header />
			<Box sx={{ pt: 10, display: 'flex', width: '100%', maxWidth: '100%' }}>
				{isAuth && (
					<Box
						component="nav"
						sx={{
							width: 256,
							pt: 2,
							display: { xs: 'none', md: 'block' },
						}}
					>
						<Sidebar />
					</Box>
				)}
				<Box component="main" sx={{ flex: '1 1 auto', px: 4 }}>
					<Outlet />
				</Box>
			</Box>
			<Footer />
		</Box>
	);
}
