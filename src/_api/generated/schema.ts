import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios"

/**
 * Super simple mock interceptor:
 * - If enabled, and a request matches a route in `mocks`,
 *   we return a resolved AxiosResponse immediately (no network).
 * - Otherwise, request proceeds normally.
 *
 * NOTE: Keep mock payloads matching your *post-envelope* expectation.
 * If your envelope interceptor returns `payload.data`, then the mock
 * should be an *enveloped* object so it flows through identically.
 */
export function attachMockInterceptor(client: AxiosInstance) {
  const enabled = (import.meta as any).env?.VITE_API_MOCKS === "true"
  if (!enabled) return

  // ---- Define your mocks here (start small) ----
  // Key format: `${METHOD} ${PATH}`
  const mocks: Record<string, unknown> = {
    "GET /auth/me": {
      success: true,
      data: {
        id: "11111111-1111-1111-1111-111111111111",
        email: "bill@phaeno.test",
        roles: ["Phaeno-Admin"],
      },
      meta: {
        requestId: crypto.randomUUID(),
        timestampUtc: new Date().toISOString(),
      },
    },

    "POST /auth/sign-in": {
      success: true,
      data: {
        // whatever your SignInResult success variant is
        kind: "complete",
        accessToken: "mock-access-token",
      },
      meta: {
        requestId: crypto.randomUUID(),
        timestampUtc: new Date().toISOString(),
      },
    },
  }

  client.interceptors.request.use((config) => {
    const method = (config.method ?? "get").toUpperCase()
    const url = normalizeUrl(config)
    const key = `${method} ${url}`

    const mockPayload = mocks[key]
    if (mockPayload === undefined) return config

    // Attach a custom adapter that returns the mocked response
    config.adapter = async (cfg: AxiosRequestConfig) => {
      const response: AxiosResponse = {
        data: mockPayload,
        status: 200,
        statusText: "OK",
        headers: { "x-mock": "true" },
        config: cfg,
      }
      return response
    }

    return config
  })
}

// Tries to map absolute URLs to their path, and removes query strings.
function normalizeUrl(config: AxiosRequestConfig) {
  const raw = String(config.url ?? "/")
  const noQuery = raw.split("?")[0]

  // If axios is called with absolute URL, strip down to pathname.
  try {
    const base = typeof config.baseURL === "string" ? config.baseURL : "http://localhost"
    const u = new URL(noQuery, base)
    return u.pathname
  } catch {
    return noQuery.startsWith("/") ? noQuery : `/${noQuery}`
  }
}
