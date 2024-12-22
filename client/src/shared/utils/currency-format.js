export const currencyFormat = (amount = 0) => {
	return amount.toLocaleString('ru-RU', {
		style: 'currency',
		currency: 'RUB',
	});
};
