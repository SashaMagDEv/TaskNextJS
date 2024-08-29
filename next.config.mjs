/** @type {import('next').NextConfig} */
const nextConfig = {
        compiler: {
            styledComponents: true,
        },
        transpilePackages: ['@mui/x-charts'],
        reactStrictMode: true,
        swcMinify: true,

};

export default nextConfig;


