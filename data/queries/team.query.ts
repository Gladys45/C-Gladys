import type { TeamMember } from "../models/team";

export function getTeam(items: TeamMember[]) {
  return [...items];
}

export function getTeamMemberById(items: TeamMember[], id: string) {
  return items.find((m) => m.id === id) ?? null;
}