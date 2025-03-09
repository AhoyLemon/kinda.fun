import { createApp } from "./main";
import { renderToString } from "vue/server-renderer";

export async function render(url) {
  const { app, router } = createApp();

  // Set the router to the desired URL
  router.push(url);
  await router.isReady();

  // Render the app to a string
  const appHtml = await renderToString(app);

  return appHtml;
}
