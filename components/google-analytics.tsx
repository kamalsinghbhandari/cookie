"use client"

import Script from "next/script"

export function GoogleAnalytics() {
  return (
    <>
      <Script strategy="afterInteractive" src={`https://www.googletagmanager.com/gtag/js?id=G-MEASUREMENT_ID`} />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-MEASUREMENT_ID');
        `}
      </Script>
    </>
  )
}
