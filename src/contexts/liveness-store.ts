import { create } from "zustand"

export type LivenessPhase =
  | "idle"
  | "camera-init"
  | "commands"
  | "liveness-complete"
  | "verifying-id"
  | "complete"
  | "error"

export type Command = "Smile" | "Blink" | "Turn your head to the left"

interface LivenessStore {
  phase: LivenessPhase
  currentCommandIndex: number
  commands: Command[]
  stream: MediaStream | null
  error: string | null

  setPhase: (phase: LivenessPhase) => void
  nextCommand: () => void
  setStream: (stream: MediaStream | null) => void
  setError: (error: string) => void
  reset: () => void
}

export const useLivenessStore = create<LivenessStore>((set, get) => ({
  phase: "idle",
  currentCommandIndex: 0,
  commands: ["Smile", "Blink", "Turn your head to the left"],
  stream: null,
  error: null,

  setPhase: (phase) => set({ phase }),

  nextCommand: () => {
    const { currentCommandIndex, commands } = get()
    if (currentCommandIndex < commands.length - 1) {
      set({ currentCommandIndex: currentCommandIndex + 1 })
    }
  },

  setStream: (stream) => set({ stream }),

  setError: (error) => set({ error, phase: "error" }),

  reset: () =>
    set({
      phase: "idle",
      currentCommandIndex: 0,
      stream: null,
      error: null,
    }),
}))
