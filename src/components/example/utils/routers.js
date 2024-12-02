import {
	AccordionExample,
	BtnExample,
	BtnGroupExample,
	CardsExample,
	InputExample,
	ListExample,
	MessageExample,
	ProgressExample,
	SpinnerExample,
} from '../index';

export default [
	{
		path: '',
		element: <div>Home</div>,
	},
	{
		path: 'btn',
		element: <BtnExample />,
	},
	{
		path: 'btn-group',
		element: <BtnGroupExample />,
	},
	{
		path: 'input',
		element: <InputExample />,
	},
	{
		path: 'list',
		element: <ListExample />,
	},
	{
		path: 'message',
		element: <MessageExample />,
	},

	{
		path: 'spinner',
		element: <SpinnerExample />,
	},

	{
		path: 'progress',
		element: <ProgressExample />,
	},
	{
		path: 'cards',
		element: <CardsExample />,
	},
	{
		path: 'accordion',
		element: <AccordionExample />,
	},
];
