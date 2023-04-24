import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import React from "react";
import styled from "styled-components";
import { Button } from "@/components/Button";
import { AppContainer } from "@/components/containers";
import { Header } from "@/Header/Header";

const JustifyCenterWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Login() {
  const session = useSession();
  const supabase = useSupabaseClient();
  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Header />
      <AppContainer>
        {!session ? (
          <Auth
            supabaseClient={supabase}
            providers={["google"]}
            onlyThirdPartyProviders={true}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        ) : (
          <JustifyCenterWrapper>
            <Button fontLevel={3} onClick={signout}>
              Sign Out
            </Button>
          </JustifyCenterWrapper>
        )}
      </AppContainer>
    </>
  );
}
