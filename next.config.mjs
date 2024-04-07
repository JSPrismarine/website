/** @type {import('next').NextConfig} */
let config = {
    poweredByHeader: false,
    reactStrictMode: true,
    trailingSlash: true,
    swcMinify: true,
    productionBrowserSourceMaps: true,
    compress: true,
    experimental: {
        scrollRestoration: true,
        esmExternals: true,
        optimizePackageImports: ['@nordcom/nordstar']
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.github.io'
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

export default config;
