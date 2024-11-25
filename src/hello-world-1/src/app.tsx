import {Button, Rows, Text} from '@canva/app-ui-kit'
import {FormattedMessage, useIntl} from 'react-intl'
import * as styles from 'styles/components.css'
import {useAddElement} from 'utils/use_add_element'


/////////////////////////////////////////////////

// APIs https://www.canva.dev/docs/apps/integrating-canva/
import * as canvaⳇasset from '@canva/asset'
import * as canvaⳇdesign from '@canva/design'
import * as canvaⳇerror from '@canva/error'
import * as canvaⳇplatform from '@canva/platform'
import * as canvaⳇuser from '@canva/user'
import * as canvaⳇapp_i18n_kit from '@canva/app-i18n-kit'
import * as canvaⳇapp_ui_kit from '@canva/app-ui-kit'

const APP_DEBUG_ID = 'XXX CANVA APP XXX'

function explore_browser_context() {
	console.log(`${APP_DEBUG_ID}`, {
		canvaⳇasset,
		canvaⳇdesign,
		canvaⳇerror,
		canvaⳇplatform,
		canvaⳇuser,
		canvaⳇapp_i18n_kit,
		canvaⳇapp_ui_kit,
	})

	// TODO check top frame
}

/////////////////////////////////////////////////

export const App = () => {
	console.log(`${APP_DEBUG_ID} refresh...`)

	const addElement = useAddElement()

	const onClick = () => {
		addElement({
			type: 'text',
			children: ['Hello world!'],
		})
	}

	const intl = useIntl()

	return (
		<div className={styles.scrollContainer}>
			<Rows spacing="2u">

				<Text>
					<FormattedMessage
						defaultMessage="Hello, world!"
						description="Instructions for how to make changes to the app. Do not translate <code>src/app.tsx</code>."
						values={{
							code: (chunks) => <code>{chunks}</code>,
						}}
					/>
				</Text>
				<Button variant="primary" onClick={onClick} stretch>
					{intl.formatMessage({
						defaultMessage: 'Do something cool',
						description:
							'Button text to do something cool. Creates a new text element when pressed.',
					})}
				</Button>

				<Button variant="secondary" onClick={explore_browser_context}>
					{intl.formatMessage({
						defaultMessage: 'Explore env',
						description:
							'Will explore the current browser context when pressed.',
					})}
				</Button>
				<Text>
					<FormattedMessage
						defaultMessage="
              To make changes to this app, edit the <code>src/app.tsx</code> file,
              then close and reopen the app in the editor to preview the changes.
            "
						description="Instructions for how to make changes to the app. Do not translate <code>src/app.tsx</code>."
						values={{
							code: (chunks) => <code>{chunks}</code>,
						}}
					/>
				</Text>
			</Rows>
		</div>
	)
}
