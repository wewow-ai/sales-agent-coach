import { useSession } from "next-auth/react";

export function useRole() {
  const { data: session } = useSession();
  console.log(session); // Log session to verify role

  const role = session?.user?.role as 'ADMIN' | 'TEAM_LEAD' | 'AGENT' | undefined;

  return {
    isAdmin: role === 'ADMIN',
    isTeamLead: role === 'TEAM_LEAD',
    isAgent: role === 'AGENT',
    role,
  };
}
