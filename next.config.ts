import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The whole site is static, so it exports to plain HTML and there is no
  // server anywhere in the deployment.
  output: "export",
  // Emits /work/sentryquery/index.html instead of /work/sentryquery.html, which
  // is what any static host serves cleanly without rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
