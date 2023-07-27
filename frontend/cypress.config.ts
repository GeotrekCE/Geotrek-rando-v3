import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    retries: {
      runMode: 3,
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotOnRunFailure: false,
  },
});
