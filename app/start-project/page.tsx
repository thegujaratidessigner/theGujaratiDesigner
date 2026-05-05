import Head from "next/head";
import Script from "next/script";

/**
 * Start Project Builder page
 * Inline-loads the Vite SPA assets directly from public/ root
 */
export default function StartProjectPage() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#6d2ff0" />
        <meta name="description" content="Start your project with The Gujarati Designer — Logo, Branding, Website & Social Media services. Build your inquiry like a cart and send via WhatsApp." />
        <link rel="canonical" href="https://www.thegujaratidesigner.in/start-project/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Start Project | The Gujarati Designer" />
        <meta property="og:description" content="Build your project inquiry — Logo, Branding, Website & Social Media. Send instantly on WhatsApp." />
        <meta property="og:url" content="https://www.thegujaratidesigner.in/start-project/" />
        <meta property="og:image" content="https://www.thegujaratidesigner.in/logo.png" />
        <meta name="twitter:card" content="summary" />
        <title>TGD Start Project Builder | The Gujarati Designer</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/start-project-assets/index-DJszeMJR.css" crossOrigin="anonymous" />
      </Head>
      <div id="root" />
      <Script
        src="/start-project-assets/index-DTxwY_hm.js"
        strategy="beforeInteractive"
        crossOrigin="anonymous"
      />
    </>
  );
}
