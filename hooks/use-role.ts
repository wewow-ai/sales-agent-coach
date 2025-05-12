import { useSession } from "next-auth/react";

export function useRole() {
  const { data: session } = useSession();
  console.log(session); // Log session to verify role

  const role = session?.user?.role as 'admin' | 'team_lead' | 'agent' | undefined;

  return {
    isAdmin: role === 'admin',
    isTeamLead: role === 'team_lead',
    isAgent: role === 'agent',
    role,
  };
}
