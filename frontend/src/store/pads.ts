import { StateCreator } from "zustand";
import { GroupNum } from "./lastGroup";
import { combine } from "zustand/middleware";

export const keys = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
] as const;
export const keyMap: Record<(typeof keys)[number], number> = {
  C: 0,
  "C#": 1,
  D: 2,
  "D#": 3,
  E: 4,
  F: 5,
  "F#": 6,
  G: 7,
  "G#": 8,
  A: 9,
  "A#": 10,
  B: 11,
};
export const octaves = [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8] as const;

export type Note = {
  key: (typeof keys)[number];
  octave: (typeof octaves)[number];
};

export type PadData = {
  // id: number;
  label: string;
  note: Note;
  midi_number: () => number;
  // mode: "trigger" | "button";
};

export type PadGroup = Record<number /* id of `PadData`*/, PadData>;
export type PadGroups = Record<GroupNum, PadGroup>;
export type PadUpdateProps = {
  group: GroupNum;
  id: number;
  data: Partial<PadData>;
};

function note_to_midi(note: Note) {
  const index = keyMap[note.key];
  const midiNoteNumber = (note.octave + 1) * 12 + index;
  return midiNoteNumber;
}

function generate_note(index: number): Note {
  const base_index = 2;
  const note_index = (index + base_index) % 12;
  const octave = (Math.floor((index + base_index) / 12) + 1) as Note["octave"];
  const key = keys[note_index];
  return { key, octave };
}

function createInitPadGroup(start_id: number): PadGroup {
  const group: PadGroup = {};

  for (let id = start_id; id < start_id + 6; id++) {
    const label = `Pad #${id}`;
    const note: Note = generate_note(id);
    const midi_number = () => note_to_midi(note);
    group[id] = { label, note, midi_number };
  }

  return group;
}

export const createPadSlice = combine(
  {
    pad_groups: {
      1: createInitPadGroup(1),
      2: createInitPadGroup(7),
      3: createInitPadGroup(13),
      4: createInitPadGroup(19),
    } as PadGroups,
  },
  (set) => ({
    updatePad: ({ group, id, data }: PadUpdateProps) => {
      set((state) => {
        const updated = { ...state };
        updated.pad_groups[group][id] = {
          ...updated.pad_groups[group][id],
          ...data,
        };
        return updated;
      });
    },
  }),
);

export type PadSlice = ReturnType<typeof createPadSlice>;
