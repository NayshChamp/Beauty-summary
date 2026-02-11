import { redirect, fail } from '@sveltejs/kit';

export async function load({ locals }) {
  if (locals.user) {
    throw redirect(302, '/');
  }
  return {};
}

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await request.formData();
    const name = (form.get('name') || '').toString().trim();
    const email = (form.get('email') || '').toString().trim();

    if (!name || !email) {
      return fail(400, { error: 'Please enter your name and email.', name, email });
    }

    const user = {
      id: 1,
      name,
      email,
    };

    cookies.set('user', JSON.stringify(user), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    throw redirect(303, '/');
  },
};

