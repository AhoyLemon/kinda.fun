export interface PresenterContext {
  isEventActive: boolean;
  roomCreatorID: string;
  /** Case-insensitive substring the host's name must contain, so "Corporate Lemon" still counts. */
  presenterName: string;
}

interface PresenterCandidate {
  playerID?: string;
  name?: string | null;
}

/** In event mode, the host whose name matches `presenterName` presents: dealt a hand, but doesn't take a seat or play for points. */
export function isPresenterPlayer(player: PresenterCandidate, ctx: PresenterContext): boolean {
  if (!ctx.isEventActive || !ctx.roomCreatorID || !ctx.presenterName) return false;
  if (player.playerID !== ctx.roomCreatorID) return false;
  return (player.name ?? "").toLowerCase().includes(ctx.presenterName.toLowerCase());
}

/** Players counted against `maxPlayers`. */
export function countSeatedPlayers(players: PresenterCandidate[], ctx: PresenterContext): number {
  return players.filter((player) => !isPresenterPlayer(player, ctx)).length;
}

/** A copy of `players` with the presenter moved to the end, otherwise in the same order. */
export function presenterLast<T extends PresenterCandidate>(players: T[], ctx: PresenterContext): T[] {
  const seated = players.filter((player) => !isPresenterPlayer(player, ctx));
  const presenters = players.filter((player) => isPresenterPlayer(player, ctx));
  return [...seated, ...presenters];
}
