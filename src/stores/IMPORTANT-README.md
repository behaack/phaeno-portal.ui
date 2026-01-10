# BEFORE PRODUCTION

- move refreshToken to httpOnly cookie
- keep accessToken in memory only (no persist)
- use a refresh endpoint + interceptor queue
