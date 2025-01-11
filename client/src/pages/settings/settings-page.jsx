import { Divider, Stack, Typography } from '@mui/material';
import SettingForm from '../../features/settings/form';
import SettingsUsers from '../../features/settings/users';
export function SettingsPage() {
	return (
		<Stack direction="column" spacing={2} justifyContent="center">
			<Typography gutterBottom variant="h5">
				Настройки профиля
			</Typography>
			<SettingForm />
			<Divider />
			<Typography gutterBottom variant="h5">
				Доступ к счетам
			</Typography>
			<SettingsUsers />
		</Stack>
	);
}
