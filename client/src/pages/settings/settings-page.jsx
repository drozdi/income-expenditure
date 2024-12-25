import { Stack, Typography } from '@mui/material';
import SettingForm from '../../features/settings/form';
export function SettingsPage() {
	return (
		<Stack direction="column" spacing={2} justifyContent="center">
			<Typography variant="h4">Настройки профиля</Typography>
			<SettingForm />
		</Stack>
	);
}
