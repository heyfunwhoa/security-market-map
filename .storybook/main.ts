import type { StorybookConfig } from "@storybook/nextjs-vite";

// Component playground (see docs/ui-bank-adoption.md). Stories use the real catalog,
// so every state shown here is one the published map can produce.
const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(ts|tsx)"],
  addons: [],
  framework: { name: "@storybook/nextjs-vite", options: {} },
  staticDirs: ["../public"],
  core: { disableTelemetry: true },
};
export default config;
