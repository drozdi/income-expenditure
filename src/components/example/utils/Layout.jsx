import { Link, Outlet } from 'react-router-dom';
import { ThemeProvider } from '../../../hooks/useTheme';
import { AppProvider } from '../../app';
import { XIcon, XItem, XItemLabel, XItemSection, XList } from '../../ui';
import { XLayout } from '../../ui/layout';
export function Layout() {
	return (
		<AppProvider config={{ smKey: 'app-1' }}>
			<XLayout container={true} overlay={true} toggle={true} view="lhr lpr lff">
				{{
					left: (props) => (
						<XList separator={true}>
							<XItem to="btn" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-button-pointer</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XBtn</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="btn-group" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-card-outline</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XBtnGroup</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="input" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-form-textbox</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XInput</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="list" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-view-list</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XList</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="message" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-message-alert-outline</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XMessage</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="spinner" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-reload</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XSpinner</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="progress" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-progress-helper</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XProgress</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="cards" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-cards</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XCards</XItemLabel>
								</XItemSection>
							</XItem>
							<XItem to="accordion" LinkComponent={Link}>
								<XItemSection side={true}>
									<XIcon>mdi-table-column</XIcon>
								</XItemSection>
								<XItemSection>
									<XItemLabel lines={true}>XAccordion</XItemLabel>
								</XItemSection>
							</XItem>
						</XList>
					),
					header: <ThemeProvider.Toggler></ThemeProvider.Toggler>,
					footer: 'footer',
					//right: 'right',
					default: (props) => <Outlet />,
				}}
			</XLayout>
		</AppProvider>
	);
}
