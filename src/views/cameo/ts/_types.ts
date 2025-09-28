/**
 * Represents a round in a gimmick game, containing information about the round's name, 
 * description, and the queue of celebrities involved.
 *
 * @property name - The name of the celeb, as they appear on Cameo.
 * @property desc - What would you know them from?
 * @property slug - Their Cameo slug (for linking).
 * @property value - Thier cost, in dollars.

 */
export interface Celeb {
  name: string;
  desc: string;
  slug: string;
  value: number;
}

/**
 * Represents a round in a gimmick game, containing information about the round's name,
 * description, and the queue of celebrities involved.
 *
 * @property name - The name of the gimmick round.
 * @property desc - A description of the gimmick round.
 * @property queue - An array of celebrities participating in this round.
 * @property reuseQueueForFinal - (Optional) If true, the same queue is reused for the final round.
 * @property finalRoundQueue - (Optional) An array of celebrities specifically for the final round.
 */
export interface GimmickRound {
  name: string;
  desc: string;
  queue: Celeb[];
  reuseQueueForFinal?: boolean;
  finalRoundQueue?: Celeb[];
}
