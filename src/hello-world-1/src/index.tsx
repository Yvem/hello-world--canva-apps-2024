import './x-logger';
import { LIB } from './consts';

/////////////////////////////////////////////////
console.xgroup(`[${LIB}] loading...`);

console.xdebug(`[${LIB}/index.tsx] Hello!`);

console.xlog(`canva global object =`, globalThis.canva);

/////////////////////////////////////////////////

import { AppUiProvider } from '@canva/app-ui-kit';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import '@canva/app-ui-kit/styles.css';
import { AppI18nProvider } from '@canva/app-i18n-kit';

import './index.css';

/////////////////////////////////////////////////

const root‿elt = document.getElementById('root');
if (!root‿elt) throw new Error('??? no #root!');
root‿elt.innerText = 'Loading…'

let is_rendered = false;
function render(caller: string) {
	if (is_rendered) return;
	createRoot(root‿elt).render(
		<AppI18nProvider>
			<AppUiProvider>
				<App caller={caller}/>
			</AppUiProvider>
		</AppI18nProvider>,
	);
}
//render('legacy')

/////////////////////////////////////////////////

function register_activities() {
	// TODO use registerActivity from an import instead
	canva.activities.registerActivity('designEditing', {
		renderUi: async (): Promise<void> => {
			console.xinfo(`Activity called!!!!`);
			render('Activity:designEditing/renderUi');
		},
		someOtherAction: () => Promise.resolve(),
	});

	canva.activities.registerActivity('default', {
		renderDefaultUi: async (): Promise<void> => {
			console.xinfo(`Activity called!!!!`);
			render('Activity:default/renderDefaultUi');
		},
		someOtherAction: () => Promise.resolve(),
	});

	canva.activities.registerActivity('anotherActivity', {
		action1: () => Promise.resolve(),
		action2: () => Promise.resolve(),
	});
}
register_activities(); // Works but the host should expect it
//setTimeout(register_activities) // Doesn't work, SHOULD?

/////////////////////////////////////////////////

console.xgroupEnd();

if (module.hot) {
	module.hot.accept('./app', render);
}
