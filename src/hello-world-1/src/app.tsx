import {Button, Rows, Text} from '@canva/app-ui-kit'
import {FormattedMessage, useIntl} from 'react-intl'
import * as styles from 'styles/components.css'
import {useAddElement} from 'utils/use_add_element'

import { LIB } from './consts'
import { explore_browser_context } from './env-debug'
import { useSelection } from 'utils/use_selection_hook'


/////////////////////////////////////////////////

import { LSKⵧCOLORⵧBG } from './x-logger'
switch (true) {
	case (self.location.hostname.startsWith('app-aagy7u8y7zq.')):
		localStorage.setItem(LSKⵧCOLORⵧBG, 'bisque')
		break
	case (self.location.hostname.startsWith('app-aagzhuqsatm.')):
		localStorage.setItem(LSKⵧCOLORⵧBG, 'lightcyan')
		break
	default:
		break
}

/////////////////////////////////////////////////

// APIs https://www.canva.dev/docs/apps/integrating-canva/
import * as canvaⳇasset from '@canva/asset'
import * as canvaⳇdesign from '@canva/design'
import * as canvaⳇerror from '@canva/error'
import * as canvaⳇplatform from '@canva/platform'
import * as canvaⳇuser from '@canva/user'
import * as canvaⳇapp_i18n_kit from '@canva/app-i18n-kit'
import * as canvaⳇapp_ui_kit from '@canva/app-ui-kit'


async function get_info_on_selection(...selections: any) {
	console.xgroup(`[${LIB}] get_info_on_selection()...`)

	console.xlog(`[${LIB}] selections =`, selections)

	console.xlog(`[${LIB}] Canva APIs =`, {
		canvaⳇasset,
		canvaⳇdesign,
		canvaⳇerror,
		canvaⳇplatform,
		canvaⳇuser,
		canvaⳇapp_i18n_kit,
		canvaⳇapp_ui_kit,
	})

	selections.forEach((selection: any) => {
		if (selection.count === 0)
			return

		selection.read().then(x => {
			console.xlog(`[${LIB}] selection.read() =`, selection, x)
		})
	})

	const context = canvaⳇplatform.appProcess.current.getInfo();
	const userToken = await canvaⳇuser.auth.getCanvaUserToken();
	const designToken = await canvaⳇdesign.getDesignToken();

	console.xlog(`[${LIB}] Canva infos: =`, {
		context,
		userToken,
		designToken,
	})

	console.xgroupEnd()
}

/////////////////////////////////////////////////

export const App = () => {
	console.xlog(`[${LIB}] <App> render...`)

	const selectionⵧplaintext = useSelection('plaintext')
	const selectionⵧimage = useSelection('image')
	const selectionⵧvideo = useSelection('video')

	const addElement = useAddElement()

	const onClick = () => {
		addElement({
			type: 'text',
			children: ['Hello world!'],
		})
	}

	const intl = useIntl()

	const url‿obj = new URL(window.location.href);


	return (
		<div className={styles.scrollContainer}>
			<Rows spacing="2u">

				<Text>
					<strong>{self.origin}</strong><br/>
				</Text>
				<Text>
					<em>LS `<code>PRETEND-API-KEY</code>` = <code>{(() => {
						try {
							return localStorage.getItem('PRETEND-API-KEY') || '[EMPTY]'
						}
						catch {
							return '[ERROR]'
						}
					})()}</code></em><br/>
				</Text>
				<Text>
					This is a TEST app currently served from: `<code>{url‿obj.hostname}</code>`.
				</Text>
				<Button variant="primary" onClick={onClick} stretch>
					{intl.formatMessage({
						defaultMessage: 'Insert "Hello World"',
						description:
							'Button text to do something cool. Creates a new text element when pressed.',
					})}
				</Button>

				<Button variant="secondary" onClick={() => get_info_on_selection(selectionⵧplaintext, selectionⵧimage, selectionⵧvideo)}>
					Get Info on selection
				</Button>

				<Button variant="secondary" onClick={explore_browser_context}>
					{intl.formatMessage({
						defaultMessage: 'Explore env',
						description:
							'Will explore the current browser context when pressed.',
					})}
				</Button>
				<Text>
					That's all for now...
				</Text>
			</Rows>
		</div>
	)
}
