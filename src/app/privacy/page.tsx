import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <section className="space-y-6">
        <p>
          <strong>Effective Date:</strong> April 20, 2025
        </p>
        <p>
          <strong>Project:</strong> ChainElect
        </p>
        <p>
          <strong>Prepared by:</strong> Masum Reza (JohnRTitor)
        </p>

        <h2 className="text-2xl font-semibold mt-8">1. Introduction</h2>
        <p>
          At ChainElect, we are committed to protecting your privacy and handling your data with
          transparency and integrity...
        </p>

        <h2 className="text-2xl font-semibold mt-8">2. Data We Collect</h2>
        <h3 className="text-xl font-medium">2.1 Wallet Information</h3>
        <ul className="list-disc ml-6">
          <li>
            <strong>Wallet Address:</strong> Required for all on-chain actions.
          </li>
          <li>
            <strong>Network Information:</strong> To verify compatibility with supported chains.
          </li>
        </ul>
        <h3 className="text-xl font-medium">2.2 Smart Contract Interactions</h3>
        <p>
          All activity (e.g., voting, registration) is publicly recorded on the Ethereum
          blockchain.
        </p>
        <h3 className="text-xl font-medium">2.3 Application Metrics</h3>
        <p>We may collect anonymized interaction data to optimize the user experience.</p>

        <h2 className="text-2xl font-semibold mt-8">3. How We Use Your Data</h2>
        <ul className="list-disc ml-6">
          <li>To authenticate users via their wallet address.</li>
          <li>To record secure and transparent voting and participation on-chain.</li>
          <li>To improve UI/UX using anonymized feedback.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">4. Data Sharing and Disclosure</h2>
        <p>
          Blockchain data is public by design. We do not share or sell data to third parties. Tools
          like Wagmi or Viem may log usage for debugging and telemetry.
        </p>

        <h2 className="text-2xl font-semibold mt-8">5. Data Security</h2>
        <p>
          Wallet-based login ensures decentralized control. No sensitive data is stored on our
          servers. Admin keys are securely handled.
        </p>

        <h2 className="text-2xl font-semibold mt-8">6. Your Responsibilities</h2>
        <p>
          You are responsible for keeping your wallet credentials secure. ChainElect cannot restore
          lost keys or wallets.
        </p>

        <h2 className="text-2xl font-semibold mt-8">7. Children’s Privacy</h2>
        <p>
          ChainElect is not intended for individuals under 13. No data is knowingly collected from
          minors.
        </p>

        <h2 className="text-2xl font-semibold mt-8">8. Changes to this Privacy Policy</h2>
        <p>
          We may update this policy as needed. Notices will be shown in-app or posted to the site.
        </p>

        <h2 className="text-2xl font-semibold mt-8">9. Contact</h2>
        <p>For any questions, reach out to the maintainer:</p>
        <p>
          <strong>Masum Reza (JohnRTitor)</strong>
          <br />
          Email: <em>[Contact method TBD]</em>
        </p>
      </section>
    </main>
  );
}
