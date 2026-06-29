import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { MissionState } from "./types";

const COLLECTION = "users";
const DOC_NAME = "mission";

export async function loadStateFromFirestore(userId: string): Promise<Partial<MissionState> | null> {
  try {
    const ref = doc(db, COLLECTION, userId, "state", DOC_NAME);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as Partial<MissionState>;
    }
    return null;
  } catch (e) {
    console.error("Failed to load state from Firestore:", e);
    return null;
  }
}

export async function saveStateToFirestore(userId: string, state: MissionState): Promise<void> {
  try {
    const ref = doc(db, COLLECTION, userId, "state", DOC_NAME);
    await setDoc(ref, JSON.parse(JSON.stringify(state)));
  } catch (e) {
    console.error("Failed to save state to Firestore:", e);
  }
}
