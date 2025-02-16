
const LIB = 'ENV'


export function explore_browser_context() {
	playWithIndexedb()

	console.xlog(`[${LIB}]`, {
		global: {
			self, // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope
			globalThis,
			'self.origin': self.origin,
			'self.isSecureContext': self.isSecureContext,
		},
		'process.env': globalThis?.process?.env,
		'top.localStorage.keys': (() => {
			try {
				// if cross-origin, will throw
				const localStorage = window.top.localStorage
				return Array.from({length: localStorage.length}, (item, index) => localStorage.key(index))
			}
			catch (err) {
				return err
			}
		})(),
		'window': {
			top: window.top,
			document: window.document,
			navigator: window.navigator,
			opener: window.opener,
			frameElement: window.frameElement,
			viewport: {
				w: window.innerWidth,
				h: window.innerHeight,
			},
			'isTop?': window.top === window,
			url_obj: new URL(window.location.href),
		},
		storages: {
			local: localStorage.length,
			session: sessionStorage.length,
		},
	})
}

explore_browser_context()




function playWithIndexedb() {
	// TODO externalize
	async function toPromise(req /** : IDBRequest */ ) {
		const resolved = false

		const { promise, resolve, reject } = Promise.withResolvers();

		function try_to_resolve() {
			if (req.readyState !== 'done')
				return false

			if (resolved)
				return false

			if (req.error) {
				reject(error)
				return true
			}

			const { result, transaction, source } = req
			resolve([ result, transaction, source ])

			return true
		}

		try_to_resolve()

		if (!resolved) {
			req.addEventListener('error', try_to_resolve)
			req.addEventListener('success', try_to_resolve)

			promise.finally(() => {
				req.removeEventListener('error', try_to_resolve)
				req.removeEventListener('success', try_to_resolve)
			})
		}

		return promise
	}

	const { indexedDB } = globalThis

	const ↆreq1 = toPromise(indexedDB.open('foo', 1))
	const ↆreq2 = toPromise(indexedDB.open('bar', 3))
}


/*
document.addEventListener('keyup', (event) => {
	console.xlog(`[${LIB}] keyup`, event)
})*/

/*;(function jailbreak() {
	const parent = window.parent;
	const iframes = Array.from(parent.document.getElementsByTagName('iframe'))
	const myIframe = iframes.find(iframe => (new URL(iframe.getAttribute('src') || '/')).href === window.location.href)
	console.xlog(`[${LIB}] iframes`, {
		iframes,
		myIframe,

	})

	if (!myIframe) {
		console.xlog(`[${LIB}] no self iframe found??`);
		return
	}

	const hasSandbox = !!myIframe.getAttribute('sandbox')

	if (!hasSandbox) {
		console.xlog(`[${LIB}] successfully escaped from sandbox ⭑`)
		return
	}

	// Build a new iframe to replace the old one.
	const currentIframe = myIframe;
	let newIframe = parent.document.createElement("iframe");
	attr_loop: for (const attributeName of currentIframe.getAttributeNames()) {
		let value = currentIframe.getAttribute(attributeName)

		console.xlog(`[${LIB}] iframe attr PREVIOUS ${attributeName} = ${value}`);

		switch(attributeName) {
			case 'sandbox':
				continue attr_loop

			case 'allow':
				//value = '*'
				continue attr_loop
				break

			case 'referrerpolicy':
				value = 'unsafe-url'
				break

			default:
				break
		}
		if (['sandbox'].includes(attributeName))
			continue;

		console.xlog(`[${LIB}] iframe attr NEW ${attributeName} = ${value}`);
		newIframe.setAttribute(attributeName, value as any);
	}
	currentIframe.replaceWith(newIframe);
})()*/


/*
setTimeout(async () => {
	const text = await navigator.clipboard.readText();
	console.xlog(`${APP_DEBUG_ID} clipboard content =`, text);
}, 2000);
*/
