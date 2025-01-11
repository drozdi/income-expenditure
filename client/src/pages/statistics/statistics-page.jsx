import { Box, Stack, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import StatisticsAccount from '../../features/statistics/account';
export function StatisticsPage() {
	const { account } = useParams();
	const [date, setDate] = useState(dayjs());

	return (
		<>
			<Stack
				direction="row"
				spacing={2}
				alignItems="center"
				justifyContent="space-between"
				sx={{ mb: 2 }}
			>
				<Typography gutterBottom variant="h5">
					Статистика
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'right',
					}}
				>
					<DatePicker
						defaultValue={date}
						format="YYYY MMMM"
						views={['year', 'month']}
						onChange={setDate}
					/>
				</Box>
			</Stack>

			<StatisticsAccount from={date.format('YYYY-MM')} accountId={account} />
		</>
	);
}
