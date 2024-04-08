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
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.github.io'
            },
            {
                protocol: 'https',
                hostname: 'codecov.io'
            },
            {
                protocol: 'https',
                hostname: 'img.shields.io'
            }
        ]
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

export default config;
