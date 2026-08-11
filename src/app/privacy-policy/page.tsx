import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Sirens Emulator",
  description: "Privacy Policy for the Sirens Emulator mobile application.",
  alternates: { canonical: "/sirens-emulator/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#f6f8fb] px-6 py-16 text-slate-800 sm:px-10">
      <article className="mx-auto max-w-3xl rounded-3xl bg-white px-7 py-10 shadow-sm ring-1 ring-slate-200 sm:px-14 sm:py-14">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          Seal Labs
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-500">For Sirens Emulator</p>
        <p className="mt-1 text-sm text-slate-500">Effective date: August 11, 2026</p>

        <div className="mt-10 space-y-9 text-[15px] leading-7 text-slate-600">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">1. Overview</h2>
            <p>
              Sirens Emulator is an entertainment app from Seal Labs that plays
              configurable siren sounds and can optionally flash your device&apos;s
              camera light. This Privacy Policy explains what information the
              app accesses and how it is handled.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">2. Information we collect</h2>
            <p>
              Sirens Emulator does not require an account and does not collect
              your name, email address, contacts, advertising ID, photos, video,
              microphone recordings, or precise GPS location. The app contains
              no advertising and does not sell personal information.
            </p>
            <p className="mt-4">
              The app sends limited usage analytics to a self-hosted Umami
              service operated by Seal Labs. These analytics include app screen
              views and actions such as acknowledging the disclaimer, opening or
              saving settings, and starting or stopping an effect. Event details
              may include the selected sound, visual colour, animation speed,
              camera LED mode, delay, duration, keep-screen-on choice, whether a
              feature succeeded, and a general error type. They do not contain
              user-entered content because the app has no free-text input.
            </p>
            <p className="mt-4">
              Analytics requests also contain the device language, screen
              resolution, a general platform user-agent, and normal connection
              information such as the IP address received by the server. Umami
              may use the IP address to estimate an approximate country, region,
              or city. The app does not request location permission or access
              GPS coordinates.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">3. Local information</h2>
            <p>
              Your selected sound, light, animation, camera LED, delay, duration,
              keep-screen-on, and disclaimer choices are stored in local app
              preferences so they can be restored the next time you open the
              app. These local preferences stay on your device unless included
              in a device backup managed by your operating system or backup
              provider.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">4. Device permissions</h2>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong>Camera:</strong> optional and used only to operate the
                device&apos;s torch/flash when you enable Camera LED flashing. The
                app does not capture, save, or send photos or video.
              </li>
              <li>
                <strong>Notifications:</strong> optional and used to show an
                active-session notification and a Stop control while a sound
                effect is running.
              </li>
              <li>
                <strong>Foreground service and wake lock:</strong> used while an
                effect is active so playback and the optional light effect can
                continue when the app is not in the foreground.
              </li>
            </ul>
            <p className="mt-4">
              You can deny or revoke permissions in your device settings. The
              core app remains usable without Camera LED flashing or notifications.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">5. How information is used and shared</h2>
            <p>
              Seal Labs uses analytics only to understand feature usage, improve
              the app, and diagnose reliability problems. Analytics are sent to
              <strong> oumatjie.slouchypete.dev</strong>, the developer&apos;s
              self-hosted Umami instance. We do not use this information for
              advertising or sell it. Infrastructure providers may process
              connection information on our behalf where necessary to host and
              secure the analytics service, or where disclosure is required by
              law.
            </p>
            <p className="mt-4">
              We use reasonable technical and organisational safeguards, but no
              transmission or storage system can be guaranteed completely secure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">6. Retention and your choices</h2>
            <p>
              Local preferences remain on your device until you clear the app&apos;s
              data or uninstall it. Analytics are retained only for as long as
              reasonably needed for product analysis, reliability, security, and
              legal obligations. Because the app has no account and analytics are
              not linked to your name or email address, we may not be able to
              identify a particular analytics record as yours. You may still
              contact us with an access or deletion request, and we will respond
              as required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">7. Children&apos;s privacy</h2>
            <p>
              Sirens Emulator is not directed to children under 13, and we do
              not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">8. Changes to this policy</h2>
            <p>
              If the app&apos;s data practices change, we will update this policy on
              this page before or when the change is released and update the
              effective date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">9. Contact</h2>
            <p>
              Seal Labs is the developer of Sirens Emulator. For privacy
              questions, contact{" "}
              <a href="mailto:hello@seallabs.io">hello@seallabs.io</a>.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
          <Link href="/">Seal Labs</Link> · <a href="mailto:hello@seallabs.io">Contact privacy support</a>
        </div>
      </article>
    </main>
  );
}
