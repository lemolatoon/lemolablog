import { useSession } from "@supabase/auth-helpers-react";
import React from "react";
import { AppContainer } from "../src/components/containers";
import { Header } from "../src/Header/Header";

export default function Home() {
  const session = useSession();
  return (
    <>
      <Header />
      <AppContainer>
        {!session ? (
          <p>Initial page without session.</p>
        ) : (
          <p>Initial page with session.</p>
        )}
      </AppContainer>
    </>
  );
}
