import { Box } from '@mui/material';
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
			<StatisticsAccount from={date.format('YYYY-MM')} accountId={account} />
		</>
	);
}
