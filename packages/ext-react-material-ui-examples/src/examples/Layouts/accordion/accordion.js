import React, { Component } from 'react';
import { Container, Panel, Accordion } from '@sencha/ext-react-modern';
import BasicGridExample from '../../Grid/BasicGrid/BasicGrid';
import ProgressBar from '../../ProgressBar/ProgressBar';

 export default class AccordionLayoutExample extends Component {
	render() {
		return(
			<Container scrollable flex={1} layout="center">
				<Accordion
					title="Accordion"
					width={700}
					height={700}
					scrollable
					openable={2}
				>
					<Panel
						bodyPadding={10}
						flex={1}
						title="Accordion Item 1"
						tools={[
							{ iconCls: 'x-fa fa-thumb-tack' },
							{ iconCls: 'x-fa fa-thumb-tack fa-rotate-90' },
							{ iconCls: 'x-fa fa-gear' }
						]}
						html="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus neque, mollis id auctor eget, aliquet vel augue. Sed egestas fermentum tempus. Praesent hendrerit eros et enim laoreet suscipit. Nam diam ante, ullamcorper id congue non, accumsan non augue. Aliquam non libero augue, vitae molestie orci. Nulla ac enim nec velit rhoncus venenatis. Aenean orci quam, eleifend ut aliquam iaculis, pellentesque ut arcu. Suspendisse lobortis commodo magna, vitae sodales orci luctus vestibulum. Cras eget ipsum sapien, vel dapibus metus. Etiam sed augue sit amet massa commodo commodo. Nam pellentesque dapibus ipsum. Proin eget malesuada magna. Curabitur elit diam, pellentesque id fermentum eget, congue ultricies nibh. Nunc tincidunt sem at diam porta tincidunt. Suspendisse fringilla felis in lectus blandit vulputate. Suspendisse mollis ipsum nec ante congue ut porttitor nunc bibendum. Maecenas mollis sem non justo iaculis vitae consequat augue pulvinar. Sed aliquet malesuada lobortis. Maecenas malesuada eros sed erat ultricies eleifend. Nulla facilisi. Pellentesque pharetra molestie mollis. Aenean venenatis tempus urna, quis convallis quam cursus eget."
					>
					</Panel>
					<Panel
						bodyPadding={10}
						flex={1}
						layout="fit"
						title="Accordion Item 2"
					>
						<ProgressBar></ProgressBar>
					</Panel>
					<Panel
						bodyPadding={10}
						flex={1}
						title="Accordion Item 3 (titleCollapse)"
						titleCollapse={true}
						layout="fit"
						tools={[
							{ iconCls: 'x-fa fa-thumb-tack' },
							{ iconCls: 'x-fa fa-thumb-tack fa-rotate-90' },
							{ iconCls: 'x-fa fa-gear' }
						]}
					>
						<BasicGridExample></BasicGridExample>
					</Panel>
					<Panel
						bodyPadding={10}
						flex={1}
						title="Accordion Item 4"
						html="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed risus neque, mollis id auctor eget, aliquet vel augue. Sed egestas fermentum tempus. Praesent hendrerit eros et enim laoreet suscipit. Nam diam ante, ullamcorper id congue non, accumsan non augue. Aliquam non libero augue, vitae molestie orci. Nulla ac enim nec velit rhoncus venenatis. Aenean orci quam, eleifend ut aliquam iaculis, pellentesque ut arcu. Suspendisse lobortis commodo magna, vitae sodales orci luctus vestibulum. Cras eget ipsum sapien, vel dapibus metus. Etiam sed augue sit amet massa commodo commodo. Nam pellentesque dapibus ipsum. Proin eget malesuada magna. Curabitur elit diam, pellentesque id fermentum eget, congue ultricies nibh. Nunc tincidunt sem at diam porta tincidunt. Suspendisse fringilla felis in lectus blandit vulputate. Suspendisse mollis ipsum nec ante congue ut porttitor nunc bibendum. Maecenas mollis sem non justo iaculis vitae consequat augue pulvinar. Sed aliquet malesuada lobortis. Maecenas malesuada eros sed erat ultricies eleifend. Nulla facilisi. Pellentesque pharetra molestie mollis. Aenean venenatis tempus urna, quis convallis quam cursus eget."
					>
					</Panel>
				</Accordion>
			</Container>
		)
	}
}