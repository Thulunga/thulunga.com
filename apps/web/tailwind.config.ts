import type { Config } from "tailwindcss";
import { thulungaConfig } from "@thulunga/config";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      ...thulungaConfig.theme?.extend,
    },
  },
  plugins: [],
};

export default config;
