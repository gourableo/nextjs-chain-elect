import React from "react";

const TermsOfServicePage = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

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

        <h2 className="text-2xl font-semibold mt-8">1. Acceptance of Terms</h2>
        <p>
          By accessing or using ChainElect (&quot;the Platform&quot;), you agree to be bound by
          these Terms of Service...
        </p>

        <h2 className="text-2xl font-semibold mt-8">2. Description of the Platform</h2>
        <p>ChainElect is a decentralized, blockchain-based electronic voting platform...</p>

        <h2 className="text-2xl font-semibold mt-8">3. User Eligibility and Roles</h2>
        <ul className="list-disc ml-6">
          <li>
            <strong>Voter:</strong> Register with a wallet, vote in elections, etc.
          </li>
          <li>
            <strong>Candidate:</strong> Register, update info, and enroll in elections.
          </li>
          <li>
            <strong>Admin:</strong> Manage elections and users.
          </li>
          <li>
            <strong>Public Visitor:</strong> View results without registration.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">4. Blockchain & Wallet Integration</h2>
        <p>You must connect an Ethereum-compatible wallet to use most features...</p>

        <h2 className="text-2xl font-semibold mt-8">5. Smart Contract Interaction</h2>
        <p>All activities are processed via Ethereum-compatible smart contracts...</p>

        <h2 className="text-2xl font-semibold mt-8">6. Security and Privacy</h2>
        <p>Wallet-based authentication is used. No passwords are stored...</p>

        <h2 className="text-2xl font-semibold mt-8">7. Availability and Performance</h2>
        <p>
          The platform aims for 24/7 uptime. Response and transaction time targets are stated in
          our documentation...
        </p>

        <h2 className="text-2xl font-semibold mt-8">8. Prohibited Activities</h2>
        <p>Users must not exploit or misuse the platform in any way...</p>

        <h2 className="text-2xl font-semibold mt-8">9. Intellectual Property</h2>
        <p>
          All software and content are the property of Masum Reza (JohnRTitor) unless otherwise
          noted...
        </p>

        <h2 className="text-2xl font-semibold mt-8">10. Disclaimer of Warranties</h2>
        <p>ChainElect is provided “as is” without warranties...</p>

        <h2 className="text-2xl font-semibold mt-8">11. Limitation of Liability</h2>
        <p>The platform and its developers are not liable for any losses or damages...</p>

        <h2 className="text-2xl font-semibold mt-8">12. Modifications</h2>
        <p>We may update these terms at any time. Continued use indicates acceptance...</p>

        <h2 className="text-2xl font-semibold mt-8">13. Governing Law</h2>
        <p>These terms are governed by international laws related to decentralized platforms...</p>
      </section>
    </main>
  );
};

export default TermsOfServicePage;
