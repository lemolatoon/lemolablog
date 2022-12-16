import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import React from "react";
import { AppContainer } from "../src/components/containers";
import { Header } from "../src/Header/Header";

export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  return (
    <>
      <Header />
      <AppContainer>
        {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        ) : (
          <p>Accout page will go here.</p>
        )}
      </AppContainer>
    </>
  );
}
