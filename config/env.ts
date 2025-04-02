const env: { DATABASE_URL?: string; JWT_SECRET: string; PORT: string | number } = {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET ?? 'fallback_secret_key', // Ensure it's always a string
    PORT: process.env.PORT ?? 5000,
};

export default env;
