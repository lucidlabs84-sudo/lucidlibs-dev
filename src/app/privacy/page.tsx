export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted mb-8">Last updated: June 29, 2026</p>

        <div className="space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. What We Collect</h2>
            <p>
              StyleSnap does not collect, store, or transmit any personal information.
              The extension operates entirely within your browser and does not send
              your browsing data, CSS styles, or any website content to external servers.
            </p>
            <p className="mt-2">
              When you purchase StyleSnap Pro, your payment is processed by Dodo Payments.
              We receive only your email address and license activation status — no payment
              details are stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Extension Permissions</h2>
            <p>
              StyleSnap requests the following permissions, and here is exactly why:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-foreground">activeTab</strong> — to inspect CSS on the current page only when you activate the extension</li>
              <li><strong className="text-foreground">storage</strong> — to save your license key and preferences locally on your device</li>
              <li><strong className="text-foreground">scripting</strong> — to inject the CSS inspection overlay into the page you are inspecting</li>
            </ul>
            <p className="mt-2">
              None of these permissions are used to collect or transmit data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Data Processing</h2>
            <p>
              All CSS extraction, Tailwind conversion, and design token generation happens
              entirely on your device. No website data is ever sent to our servers. The only
              network request the extension makes is to validate your license key against our
              license API (api.lucidlibs.dev) when you activate or periodically verify your Pro status.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Third-Party Services</h2>
            <p>
              <strong>Dodo Payments</strong> — handles all payment processing for StyleSnap Pro.
              Their privacy policy is available at{" "}
              <a href="https://dodopayments.com/privacy" className="text-accent underline">
                dodopayments.com/privacy
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Contact</h2>
            <p>
              For privacy-related questions, contact us at{" "}
              <a href="https://lucidlibs.dev/stylesnap/feedback" className="text-accent underline">
                lucidlibs.dev/stylesnap/feedback
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
