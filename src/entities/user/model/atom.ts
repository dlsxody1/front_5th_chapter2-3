import { atom } from "jotai"
import { User } from "./types"

export const selectedUserAtom = atom<User | null>(null)
