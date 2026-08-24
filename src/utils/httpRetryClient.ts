export class HttpRetryClient {
    constructor(
        private readonly defaultRetries = 3,
        private readonly defaultDelayMs = 500,
    ) {}

    async fetchJson<T = any>(
        url: string,
        retries = this.defaultRetries,
        delayMs = this.defaultDelayMs,
    ): Promise<T> {
        for (let attempt = 0; attempt <= retries; attempt++) {
            const res = await fetch(url);

            if (res.ok) return res.json();

            // 429 = rate limit, 5xx = erreur serveur temporaire -> on retry
            if ((res.status === 429 || res.status >= 500) && attempt < retries) {
                const wait = delayMs * 2 ** attempt; // backoff exponentiel
                console.log(
                    `⚠️  ${res.status} sur ${url}, retry dans ${wait}ms (tentative ${attempt + 1}/${retries})`,
                );
                await new Promise((resolve) => setTimeout(resolve, wait));
                continue;
            }

            throw new Error(`Échec fetch ${url} : ${res.status} ${res.statusText}`);
        }

        throw new Error(`Échec fetch ${url} après ${retries} tentatives`);
    }
}

export const httpRetryClient = new HttpRetryClient();
