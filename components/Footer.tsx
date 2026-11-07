import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="section-pad mx-auto max-w-6xl py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/#home"
              className="inline-block font-display text-lg sm:text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity select-none"
            >
              Kevin Daniel <span className="text-primary">Christio.</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              UI/UX Designer passionate about crafting digital products that are intuitive, polished, and purposeful.
            </p>
            <div className="mt-5 flex gap-3">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-ice">Navigation</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><a href="#home" className="hover:text-primary">Home</a></li>
              <li><a href="#services" className="hover:text-primary">Services</a></li>
              <li><a href="#portfolio" className="hover:text-primary">Projects</a></li>
              <li><a href="#experience" className="hover:text-primary">Experience</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-ice">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>kevindanielnainggolan@gmail.com</li>
              <li>+62 877-7333-8031</li>
              <li>Jakarta, Indonesia</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-ice">Newsletter</h4>
            <p className="mt-4 text-sm text-muted">Latest project updates and design thoughts.</p>
            <form className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-full border border-border bg-ink px-4 py-2 text-xs text-ice outline-none placeholder:text-muted focus:border-primary"
              />
              <button className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-primary-dark">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Kevin Daniel Christio Nainggolan. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
