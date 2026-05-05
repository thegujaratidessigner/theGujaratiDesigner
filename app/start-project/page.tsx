export const dynamic = "force-dynamic";

import Navbar from "../_components/Navbar";
import Footer from "../_components/sections/Footer";

export default function StartProjectPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">Start Project Builder</h1>
          <p className="text-muted mb-6">
            Build your project inquiry — Logo, Branding, Website & Social Media services.
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 text-sm">
            <p className="font-semibold">⚠️ Integration in progress</p>
            <p className="mt-1">
              The Start Project Builder is being integrated. Please check back shortly or contact us directly.
            </p>
          </div>
        </div>
      </main>
      <Footer footerLinks={{}} />
    </>
  );
}
