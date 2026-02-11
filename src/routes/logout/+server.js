import { redirect } from '@sveltejs/kit';

export async function POST({ cookies }) {
  cookies.delete('user', { path: '/' });
  throw redirect(303, '/');
}

