'use client';

import { useState, useSyncExternalStore } from 'react';
import {
  ArrowRight,
  LayoutTemplate,
  MonitorSmartphone,
  SunMoon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

const release = '0.3.0';
const dismissedReleaseKey = 'nacre-changelog-dismissed-release';
const seenReleaseKey = 'nacre-changelog-seen-release';

function subscribeToReleaseState() {
  return () => {};
}

function getReleaseIsUnread() {
  try {
    const dismissedRelease = window.localStorage.getItem(dismissedReleaseKey);
    const seenRelease = window.sessionStorage.getItem(seenReleaseKey);
    return dismissedRelease !== release && seenRelease !== release;
  } catch {
    return true;
  }
}

export function ChangelogUpdate() {
  const [open, setOpen] = useState(false);
  const [hasReadRelease, setHasReadRelease] = useState(false);
  const releaseIsUnread = useSyncExternalStore(
    subscribeToReleaseState,
    getReleaseIsUnread,
    () => false,
  );
  const isUnread = releaseIsUnread && !hasReadRelease;

  function openReleaseNotes() {
    try {
      window.sessionStorage.setItem(seenReleaseKey, release);
    } catch {
      // The release notes can still open when browser storage is unavailable.
    }
    setHasReadRelease(true);
    setOpen(true);
  }

  function closeForSession() {
    try {
      window.sessionStorage.setItem(seenReleaseKey, release);
    } catch {
      // The announcement can still close when browser storage is unavailable.
    }
    setHasReadRelease(true);
    setOpen(false);
  }

  return (
    <>
      <button
        className="changelog-trigger"
        data-unread={isUnread || undefined}
        type="button"
        aria-label={`What's new in Nacre UI, release ${release}${isUnread ? ', unread' : ''}`}
        onClick={openReleaseNotes}
      >
        <span className="changelog-trigger-dot" aria-hidden="true" />
        <span className="changelog-trigger-label">What&apos;s new</span>
        <span className="changelog-trigger-version">{release}</span>
      </button>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (nextOpen) setOpen(true);
          else closeForSession();
        }}
      >
        <DialogContent className="changelog-dialog">
          <aside
            className="changelog-release-rail"
            aria-label={`Release ${release}`}
          >
            <span className="changelog-eyebrow">Nacre UI / Changelog</span>
            <div className="changelog-version-card">
              <strong>{release}</strong>
              <time dateTime="2026-09">September 2026</time>
            </div>
            <p>A complete portfolio, ready to make your own.</p>
            <div className="changelog-rail-note" aria-hidden="true">
              <i />
              <span>Templates</span>
              <span>Responsive</span>
              <span>Built to adapt</span>
            </div>
            <div className="changelog-rail-signature" aria-hidden="true">
              <Image src="/nacre-mark.png" alt="" width={46} height={46} />
              <span>
                Edition
                <strong>05 / 2026</strong>
              </span>
            </div>
          </aside>

          <div className="changelog-body">
            <header className="changelog-heading">
              <DialogTitle>Your portfolio, thoughtfully composed.</DialogTitle>
              <DialogDescription>
                Release {release} introduces Nacre UI templates with a complete
                developer portfolio you can shape into your own.
              </DialogDescription>
            </header>

            <dl className="changelog-list">
              <div>
                <span className="changelog-list-icon" aria-hidden="true">
                  <LayoutTemplate />
                </span>
                <div>
                  <dt>Developer portfolio</dt>
                  <dd>
                    A polished home page plus dedicated work, experience,
                    technology, event, and credential views.
                  </dd>
                </div>
              </div>
              <div>
                <span className="changelog-list-icon" aria-hidden="true">
                  <MonitorSmartphone />
                </span>
                <div>
                  <dt>Responsive by design</dt>
                  <dd>
                    Editorial layouts, navigation, galleries, and footer details
                    adapt cleanly from desktop to mobile.
                  </dd>
                </div>
              </div>
              <div>
                <span className="changelog-list-icon" aria-hidden="true">
                  <SunMoon />
                </span>
                <div>
                  <dt>Theme continuity</dt>
                  <dd>
                    Light and dark preferences now persist while navigating the
                    template, with refined contrast across the main site.
                  </dd>
                </div>
              </div>
            </dl>

            <div className="changelog-actions">
              <Link
                href="/templates/developer-portfolio"
                onClick={closeForSession}
              >
                View the template <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
