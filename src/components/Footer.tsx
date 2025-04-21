import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold mb-4">ChainElect</h3>
            <p className="text-sm text-muted-foreground">
              A decentralized, blockchain-powered web application designed to provide secure,
              transparent, and tamper-proof electronic voting.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/public"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Public Elections
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} ChainElect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
