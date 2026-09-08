import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Portfolio Template',
  description:
    'A responsive, content-rich developer portfolio template from Nacre UI.',
  robots: { index: false, follow: false },
};

export default function DeveloperPortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            "try{document.documentElement.dataset.portfolioTheme=localStorage.getItem('nacre-developer-portfolio-theme')==='light'?'light':'dark'}catch{}",
        }}
      />
      {children}
    </>
  );
}
