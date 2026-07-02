import type { Firestore } from "firebase/firestore";
import { useFirestore } from "vuefire";

/**
 * Client-only Firestore helper.
 *
 * Firebase/VueFire is client-only: during prerender/SSR there is no VueFire
 * app, so `useFirestore()` would have nothing to bind to. Return `null` on the
 * server; callers already guard against a null db (e.g. `db ? doc(db, ...)`).
 *
 * This replaces the guard that was copy-pasted into each game:
 *   const db = import.meta.client ? useFirestore() : null;
 */
export function useClientFirestore(): Firestore | null {
  return import.meta.client ? useFirestore() : null;
}
