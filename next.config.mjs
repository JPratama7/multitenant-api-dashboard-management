/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.externals.push({
        "pg-hstore": "commonjs pg-hstore",
        "uglify-js": "commonjs uglify-js",
      });
    }
    return config;
  },
};

export default nextConfig;
