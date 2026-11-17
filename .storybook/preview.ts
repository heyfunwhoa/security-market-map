import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    backgrounds: { options: { paper: { name: "Paper", value: "oklch(0.972 0.012 88)" } } },
  },
  initialGlobals: { backgrounds: { value: "paper" } },
};
export default preview;
