import Link from 'next/link';
import { Logo } from './ui/logo';
import { LuInstagram, LuLinkedin, LuTwitter } from 'react-icons/lu';

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Brand */}
        <div className="flex flex-col items-center gap-2">
          <Logo className="flex w-28" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            Delightful event experiences for communities everywhere.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Luma. All rights reserved.
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Link
              href="/discover"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Discover
            </Link>
            <Link
              href="/create"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Create event
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <LuTwitter size={18} />
            </a>

            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <LuInstagram size={18} />
            </a>

            <a
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <LuLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
