/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let basePath = '';
if (isGithubActions) {
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
  basePath = repoName ? `/${repoName}` : '/vdcet-official-website';
} else if (process.env.NODE_ENV === 'production') {
  basePath = '/vdcet-official-website';
}

const nextConfig = {
  output: 'export',
  basePath: basePath,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
