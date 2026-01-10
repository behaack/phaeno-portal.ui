# Important gotcha: hydration (persist) vs interceptor timing

Because you’re using persist(sessionStorage), on first load there’s a moment where:

- store exists

- but tokens may not be hydrated yet

If you attach interceptors before hydration, getState().accessToken may be null for the first request.

Two ways to handle that:

## Option A: ensure hydration before first API call

Call your waitForHydration() in app bootstrap before mounting routes that fire queries.

## Option B: don’t persist tokens (best security)

Keep access token in memory only (no hydration issues, safer).
