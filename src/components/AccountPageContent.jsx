"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Typography from "./ui/Typography/Typography";
import { useAuth } from "./AuthProvider";

const Page = styled.div`
  width: min(100% - 2rem, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;
  padding: 3.75rem 0 4.5rem;
`;

const Panel = styled.section`
  display: grid;
  max-width: 640px;
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.78);
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.soft};
`;

const Label = styled(Typography)`
  color: ${({ theme }) => theme.colors.softText};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
`;

export default function AccountPageContent() {
  const router = useRouter();
  const { isHydrated, session } = useAuth();

  useEffect(() => {
    if (isHydrated && !session) {
      router.push("/login");
    }
  }, [isHydrated, router, session]);

  if (!session) {
    return null;
  }

  return (
    <Page>
      <Panel aria-labelledby="account-title">
        <Typography id="account-title" variant="h1">
          Account
        </Typography>
        <Typography>
          This protected page is shown only after a valid demo sign-in.
        </Typography>
        <div>
          <Label variant="caption">Name</Label>
          <Typography>{session.name}</Typography>
        </div>
        <div>
          <Label variant="caption">Email</Label>
          <Typography>{session.email}</Typography>
        </div>
      </Panel>
    </Page>
  );
}
