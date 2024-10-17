/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'xylex.ams3.cdn.digitaloceanspaces.com', 
            'api.qrserver.com',
            'm.media-amazon.com',
            'upload.wikimedia.org',
            'images.unsplash.com'
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                ],
            },
            {
                source: '/sw.js',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/javascript; charset=utf-8',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'no-cache, no-store, must-revalidate',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self'",
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/pricing',
                destination: 'https://xylex.ai',
                permanent: true,
            },
        ];
    },
};
export default nextConfig;