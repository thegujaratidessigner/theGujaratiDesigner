/**
 * Start Project Builder page
 * Embeds the prebuilt Vite SPA via iframe from public/start-project/index.html
 */
export default function StartProjectPage() {
  return (
    <iframe
      src="/start-project/index.html"
      title="Start Project Builder"
      className="w-full h-screen border-0"
      loading="eager"
    />
  );
}
