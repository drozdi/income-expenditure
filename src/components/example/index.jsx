import { AccordionExample } from './accordion';
import { BtnExample } from './btn';
import { BtnGroupExample } from './btnGroup';
import { CardsExample } from './cards';
import { InputExample } from './input';
import { ListExample } from './list';
import { MessageExample } from './message';
import { ProgressExample } from './progress';
import { SpinnerExample } from './spinner';

export * from './accordion';
export * from './btn';
export * from './btnGroup';
export * from './cards';
export * from './input';
export * from './list';
export * from './message';
export * from './progress';
export * from './spinner';

export default function ({
	btn = false,
	input = false,
	btnGroup = false,
	list = false,
	message = false,
	spinner = false,
	progress = false,
	cards = false,
	accordion = false,
}) {
	return (
		<div className="py-8">
			{btnGroup && <BtnGroupExample />}
			{btn && <BtnExample />}
			{input && <InputExample />}
			{list && <ListExample />}
			{message && <MessageExample />}
			{spinner && <SpinnerExample />}
			{progress && <ProgressExample />}
			{cards && <CardsExample />}
			{accordion && <AccordionExample />}
		</div>
	);
}
