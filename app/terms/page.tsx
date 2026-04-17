import type { Metadata } from "next";
import Navbar from "../_components/Navbar";
import Footer from "../_components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions – The Gujarati Designer",
  description:
    "Read the terms and conditions for working with The Gujarati Designer — covering payment, refunds, revisions, timelines, and general policies.",
};

const sections = [
  {
    number: "01",
    title: "Payment & Refund Policy",
    items: [
      {
        heading: "Advance Payment",
        body: "A 50% advance payment is required before work begins.",
      },
      {
        heading: "Balance Payment",
        body: "The remaining 50% is due upon initial project delivery, such as a raw video or first design draft.",
      },
      {
        heading: "Final Delivery",
        body: "All final files and project handovers will occur only after the full payment is received.",
      },
      {
        heading: "Refund Eligibility",
        body: "A 100% refund is offered only if the project is in its initial stages and work (such as scripting, planning, or editing) has not yet started.",
      },
      {
        heading: "Service Charge",
        body: "A 20% service charge will be deducted from the total amount for any processed refund.",
      },
    ],
  },
  {
    number: "02",
    title: "Working Hours & Availability",
    items: [
      {
        heading: "Office Hours",
        body: "Our office operates from 11:00 AM to 8:00 PM, Monday to Friday.",
      },
      {
        heading: "Closures",
        body: "We are closed on Saturdays, Sundays, and all national holidays.",
      },
      {
        heading: "Off-Hour Requests",
        body: "Work requests submitted during closures will begin processing on the next business day.",
      },
    ],
  },
  {
    number: "03",
    title: "Video Editing Policy",
    items: [
      {
        heading: "Revisions",
        body: "Clients are entitled to two rounds of free revisions. Subsequent revisions will incur a charge of ₹100 each.",
      },
      {
        heading: "Revision Process",
        body: "All requested changes must be provided in a single, well-structured document.",
      },
      {
        heading: "Delivery Timeline",
        body: "The standard delivery timeframe is between 3 to 5 days.",
      },
      {
        heading: "Files Provided",
        body: "Only final edited video files are delivered. Raw footage requests will incur additional charges.",
      },
      {
        heading: "Additional Costs",
        body: "Extra charges apply for additional creators, reshoots, or requesting the same video in two different aspect ratios.",
      },
      {
        heading: "Duration Billing",
        body: "If a video duration exceeds 35 seconds, it will be billed at the 60-second video rate.",
      },
      {
        heading: "Communication",
        body: "Clients must use official channels only and should not contact editors personally via calls or messages.",
      },
    ],
  },
  {
    number: "04",
    title: "Graphic Design Policy",
    items: [
      {
        heading: "Revisions",
        body: "Two rounds of revisions are allowed per project. Additional revisions are charged based on complexity.",
      },
      {
        heading: "Delivery Times — Logos & Branding",
        body: "4–7 business days.",
      },
      {
        heading: "Delivery Times — Social Media Graphics",
        body: "2–4 business days.",
      },
      {
        heading: "Delivery Times — Packaging & Print Designs",
        body: "5–10 business days.",
      },
      {
        heading: "Urgent Delivery",
        body: "Requests for delivery within 24–48 hours are available at an additional cost.",
      },
      {
        heading: "Source Files",
        body: "Files such as AI or PSD are only provided if included in the package or for an extra fee.",
      },
      {
        heading: "Assets",
        body: "Clients must provide all necessary assets (logos, text, brand colors) before the project begins.",
      },
    ],
  },
  {
    number: "05",
    title: "Website & App Development Policy",
    items: [
      {
        heading: "Development Timeline",
        body: "Standard delivery for a basic website is 10–15 business days. Complex apps or e-commerce sites will take longer based on the agreed project scope.",
      },
      {
        heading: "Content Requirement",
        body: "The client must provide all website/app content (text, images, product data) before development starts.",
      },
      {
        heading: "Maintenance",
        body: "One month of free technical support is provided post-launch. Any ongoing maintenance or feature updates will be charged separately.",
      },
      {
        heading: "Hosting & Domain",
        body: "Costs for third-party services like hosting, domain registration, and premium plugins are not included in the development fee unless specified.",
      },
      {
        heading: "Testing & Approval",
        body: "Once the beta version is delivered, the client has 5 working days to provide a single document of feedback for revisions.",
      },
    ],
  },
  {
    number: "06",
    title: "General Terms",
    items: [
      {
        heading: "Portfolio Right",
        body: "The Gujarati Designer retains the right to use completed projects in portfolios and promotions unless otherwise agreed upon.",
      },
      {
        heading: "Client Delays",
        body: "Any delay in providing required content or assets from the client side will affect the final delivery timeline.",
      },
      {
        heading: "File Formats",
        body: "Projects will be delivered in agreed formats such as JPEG, PNG, MP4, PDF, or live code links.",
      },
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-background overflow-hidden pt-36 pb-20 px-6">
          {/* Background orb */}
          <div
            aria-hidden
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none opacity-[0.07]"
            style={{
              background: "radial-gradient(ellipse, #7c3aed 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <p className="text-sm text-[#a855f7] font-semibold tracking-widest uppercase mb-4">
              Legal
            </p>
            <h1
              className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6"
              style={{ fontFamily: "var(--font-syne)" }}
            >
              Terms &{" "}
              <span className="bg-gradient-to-r from-[#a855f7] to-[#ec4899] bg-clip-text text-transparent">
                Conditions
              </span>
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-2xl mx-auto">
              Please read these terms carefully before engaging our services. By
              proceeding with any project, you agree to the policies outlined
              below.
            </p>
            <p className="text-xs text-muted/60 mt-6">
              Effective from the date of project initiation · The Gujarati
              Designer, Ahmedabad, Gujarat, India
            </p>
          </div>
        </section>

        {/* Terms sections */}
        <section className="bg-background px-6 pb-32">
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((sec) => (
              <div
                key={sec.number}
                className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] overflow-hidden"
              >
                {/* Section header */}
                <div className="flex items-center gap-4 px-8 py-6 border-b border-[var(--border-subtle)]">
                  <span
                    className="text-xs font-bold font-mono text-[#a855f7] bg-[#a855f7]/10 border border-[#a855f7]/20 px-2.5 py-1 rounded-full shrink-0"
                  >
                    {sec.number}
                  </span>
                  <h2
                    className="text-lg md:text-xl font-bold text-foreground"
                    style={{ fontFamily: "var(--font-syne)" }}
                  >
                    {sec.title}
                  </h2>
                </div>

                {/* Policy items */}
                <div className="divide-y divide-[var(--border-subtle)]">
                  {sec.items.map((item, i) => (
                    <div key={i} className="px-8 py-5 flex flex-col sm:flex-row sm:gap-8">
                      <p
                        className="text-sm font-semibold text-foreground shrink-0 sm:w-56 mb-1 sm:mb-0"
                        style={{ fontFamily: "var(--font-syne)" }}
                      >
                        {item.heading}
                      </p>
                      <p className="text-sm text-muted leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Footer note */}
            <p className="text-center text-xs text-muted/60 pt-6 leading-relaxed">
              These terms are subject to change without prior notice. For
              queries, contact us at{" "}
              <a
                href="mailto:thegujaratidesigner@gmail.com"
                className="text-[#a855f7] hover:underline"
              >
                thegujaratidesigner@gmail.com
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
