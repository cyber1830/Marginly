export function hasDemoSession(request: Request) {
  return (
    request.headers
      .get("cookie")
      ?.split(";")
      .some((cookie) => cookie.trim().startsWith("marginly_demo_session=")) ??
    false
  );
}
