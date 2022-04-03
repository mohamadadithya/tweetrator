/* If you wanna deploy this app to netlify, 
you must change the import to 
'@sveltejs/adapter-netlify' 
*/
import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	}
};

export default config;
