export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-muted mb-8">Last updated: July 2, 2026</p>

        <div className="space-y-8 text-muted leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. What We Collect</h2>
            <p>
              StyleSnap does <strong>not</strong> collect, store, or transmit your browsing
              activity, the CSS you inspect, or any website content. Inspection, Tailwind
              conversion, design-token extraction, and AI-prompt generation all happen
              entirely inside your browser and never leave your device.
            </p>
            <p className="mt-2">The only data we process:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-foreground">License key</strong> — sent to our license server when you activate or validate StyleSnap Pro.</li>
              <li><strong className="text-foreground">Email address</strong> — only if you choose to provide one for checkout, license recovery, or feedback.</li>
              <li><strong className="text-foreground">A coarse device label</strong> (e.g. “macOS”, “Windows”) — used only to name your activation so you can manage your devices.</li>
              <li><strong className="text-foreground">Feedback you submit</strong> — the message and optional rating/email you send via the feedback form.</li>
            </ul>
            <p className="mt-2">
              Payments are handled by Dodo Payments; no payment details are stored on our servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Extension Permissions</h2>
            <p>
              StyleSnap requests only the permissions it uses, and here is exactly why:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-foreground">Host access (all sites)</strong> — the inspector overlay must run on whatever page you choose to inspect. No site is targeted and page content is never transmitted.</li>
              <li><strong className="text-foreground">activeTab</strong> — to capture the visible tab for the optional annotated-screenshot feature, only when you trigger it.</li>
              <li><strong className="text-foreground">storage</strong> — to save your license state and preferences locally on your device.</li>
              <li><strong className="text-foreground">tabs</strong> — to message the active tab and to open the checkout or support page in a new tab.</li>
              <li><strong className="text-foreground">clipboardWrite</strong> — to copy CSS, Tailwind classes, or an AI prompt to your clipboard.</li>
              <li><strong className="text-foreground">notifications</strong> — to show brief confirmations such as “Copied!”.</li>
              <li><strong className="text-foreground">contextMenus</strong> — to add a right-click entry that opens Settings.</li>
            </ul>
            <p className="mt-2">
              None of these permissions are used to collect or transmit your browsing data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Data Processing</h2>
            <p>
              All CSS extraction, Tailwind conversion, design-token extraction, and AI-prompt
              generation happen entirely on your device. The only network requests the extension
              makes are to our own backend (api.lucidlibs.dev) to activate/validate your license
              and to submit feedback you choose to send. We do not sell or share your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Third-Party Services</h2>
            <p>
              <strong>Dodo Payments</strong> — handles all payment processing for StyleSnap Pro.
              Checkout opens on their site in a new tab. Their privacy policy is available at{" "}
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
              </a>{" "}or lucidlibs@outlook.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
