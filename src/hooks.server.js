/** @type {import('@sveltejs/kit').Handle} */

export const handle = async ({ event, resolve }) => {
	const allowedPaths = ['/'];
	const requestPath = event.url.pathname;

	if (!allowedPaths.includes(requestPath)) {
		return new Response('Error 404: Path not found', { status: 404 });
	}

	return resolve(event);
};
