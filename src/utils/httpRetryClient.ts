export class HttpRetryClient {
    constructor(
        private readonly defaultRetries = 3,
        private readonly defaultDelayMs = 500,
    ) {}

    async fetchJson<T = any>(
        url: string,
        retries = this.defaultRetries,
        delayMs = this.defaultDelayMs,
    ): Promise<T | null> {
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                const res = await fetch(url);

                if (res.ok) {
                    return (await res.json()) as T;
                }
                if (res.status === 404) {
                    // console.log(`ℹ️ 404 sur ${url}, ressource indisponible`);
                    return null;
                }

                // 429 = rate limit, 5xx = erreur serveur temporaire
                if ((res.status === 429 || res.status >= 500) && attempt < retries) {
                    const wait = delayMs * 2 ** attempt;

                    console.log(
                        `⚠️ ${res.status} sur ${url}, retry dans ${wait}ms ` +
                            `(tentative ${attempt + 1}/${retries})`,
                    );

                    await new Promise((resolve) => setTimeout(resolve, wait));
                    continue;
                }

                throw new Error(`Échec fetch ${url} : ${res.status} ${res.statusText}`);
            } catch (error) {
                if (attempt >= retries) {
                    throw error;
                }

                const wait = delayMs * 2 ** attempt;

                console.log(
                    `⚠️ Erreur réseau sur ${url}: ${error instanceof Error ? error.message : error}. ` +
                        `Retry dans ${wait}ms ` +
                        `(tentative ${attempt + 1}/${retries})`,
                );

                await new Promise((resolve) => setTimeout(resolve, wait));
            }
        }

        throw new Error(`Échec fetch ${url} après ${retries + 1} tentatives`);
    }
}

export const httpRetryClient = new HttpRetryClient();
