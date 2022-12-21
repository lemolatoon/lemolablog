import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import "../styles/global.css";
import "zenn-content-css";
import Head from "next/head";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // https://supabase.com/docs/guides/with-nextjs
  const [supabase] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    import("zenn-embed-elements");
  }, []);
  return (
    <>
      <Head>
        <script src="https://embed.zenn.studio/js/listen-embed-event.js"></script>
      </Head>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Component {...pageProps} />
      </SessionContextProvider>
    </>
  );
}
