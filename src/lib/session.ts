export type Session = {
  name: string;
  email: string;
  role: string;
  company: string;
  companyCode: string;
};

const KEY = "sentinelqhse.session";

export const DEMO_SESSION: Session = {
  name: "Adaeze Okonkwo",
  email: "adaeze.okonkwo@northgateenergy.com",
  role: "QHSE Manager",
  company: "Northgate Energy Plc",
  companyCode: "NGE-001",
};

export function signIn(partial?: Partial<Session>): Session {
  const session = { ...DEMO_SESSION, ...partial };
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function signOut() {
  if (typeof window !== "undefined") window.localStorage.removeItem(KEY);
}

export function readSession(): Session {
  if (typeof window === "undefined") return DEMO_SESSION;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : DEMO_SESSION;
  } catch {
    return DEMO_SESSION;
  }
}
