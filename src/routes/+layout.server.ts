import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const publicRoutes = ['/faq', '/landing', '/auth/login', '/auth/callback', '/credits', '/day'];

export const load: LayoutServerLoad = async ({ locals, url }) => {
	const isPublicRoute = publicRoutes.some((route) => url.pathname.startsWith(route));

	if (!locals.user && !isPublicRoute) {
		throw redirect(302, '/landing');
	}

	return {
		user: locals.user ?? null
	};
};
