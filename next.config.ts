/** @type {import('next').NextConfig} */
const isGH = process.env.GITHUB_PAGES === 'true';
const repo = 'portfolio'; // <-- your subpath

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  ...(isGH ? { basePath: `/${repo}`, assetPrefix: `/${repo}/` } : {}),
};
