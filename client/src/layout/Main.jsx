import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Footer, Header, Sidebar } from '../widgets';
export function MainLayout() {
	return (
		<Box
			sx={{
				position: 'absolute',
				top: 0,
				left: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				overflow: 'hidden',
				height: '100vh',
				width: '100vw',
			}}
		>
			<Header />
			<Box sx={{ pt: 10, display: 'flex', flex: '1 1 auto' }}>
				<Box component="nav" sx={{ width: 256 }}>
					<Sidebar />
				</Box>
				<Box component="main" sx={{ flex: '1 1 auto', p: 2 }}>
					<Outlet />
				</Box>
			</Box>
			<Footer className="" />
		</Box>
	);
}
