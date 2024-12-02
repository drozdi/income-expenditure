import { XBtn, XCard, XCardActions, XCardSection } from '../ui';
export function CardsExample() {
	return (
		<div className="max-w-4xl m-auto py-4 relative">
			<h2 className="text-center text-2xl mb-4 bg-bgmb1">XCard</h2>
			<div className="max-w-lg m-auto">
				<XCard border>
					<XCardSection horizontal>
						<XCardSection className="bg-bgmb5">sdfsdfsdf</XCardSection>
						<XCardSection className="bg-bgmb2">sdfsdfsdf</XCardSection>
						<XCardSection className="bg-bgmb3">sdfsdfsdf</XCardSection>
					</XCardSection>
					<XCardActions align="end">
						<XBtn color="positive">positive</XBtn>
						<XBtn color="accent">accent</XBtn>
						<XBtn color="warning">warning</XBtn>
					</XCardActions>
				</XCard>
			</div>
		</div>
	);
}
