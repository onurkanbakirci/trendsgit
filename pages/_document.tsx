import { Html, Head, Main, NextScript } from 'next/document';
import { Analytics } from "@vercel/analytics/react"
import { AxiomWebVitals } from "next-axiom"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Analytics />
        <SpeedInsights />
        <AxiomWebVitals />
      </body>
    </Html>
  );
}
