export async function handle({ event, resolve }) {
  // Read user from cookie (very simple demo auth)
  const userCookie = event.cookies.get('user');
  if (userCookie) {
    try {
      event.locals.user = JSON.parse(userCookie);
    } catch {
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
}
