// next.config.mjs
import { i18n } from './next-i18next.config.js';

const nextConfig = {
        i18n,
        compiler: {
                styledComponents: true,
        },
        transpilePackages: ['@mui/x-charts'],
        reactStrictMode: true,
        swcMinify: true,
};

export default nextConfig;
