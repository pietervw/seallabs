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
        <p className="mt-1 text-sm text-slate-500">Effective date: July 27, 2026</p>

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
              Sirens Emulator does not collect, sell, share, or transmit personal
              information. The app has no user accounts, advertising, analytics,
              location tracking, contacts access, microphone recording, or
              server-based service.
            </p>
            <p className="mt-4">
              The app stores your choices—such as sound, light, timing, and
              disclaimer settings—locally on your device using the device&apos;s
              local preferences storage. These settings are not sent to Seal
              Labs or to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">3. Device permissions</h2>
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
            <h2 className="mb-3 text-xl font-semibold text-slate-950">4. Sharing and security</h2>
            <p>
              Because the app does not transmit personal information, it does
              not share personal information with Seal Labs, service providers,
              advertisers, or other third parties. We nevertheless use the
              platform&apos;s normal permission and storage controls to help protect
              the app&apos;s local data. No method of storage is completely secure.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">5. Retention and deletion</h2>
            <p>
              Local preferences remain on your device until you clear the app&apos;s
              data, reset the app, or uninstall it. Since Sirens Emulator does
              not maintain accounts or remote personal-data records, there is no
              server-side account or personal profile to delete. You can contact
              us if you have a privacy question or believe the app has handled
              information unexpectedly.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">6. Children&apos;s privacy</h2>
            <p>
              Sirens Emulator is not directed to children under 13, and we do
              not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">7. Changes to this policy</h2>
            <p>
              If the app&apos;s data practices change, we will update this policy on
              this page before or when the change is released and update the
              effective date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950">8. Contact</h2>
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
