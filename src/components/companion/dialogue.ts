export const dialogue = {
  idle: [
    "hi lol",
    "how are you",
    "wassup. name's mr. penguin. come here often?",
    "supposedly penguins can fly. might be a myth. i dunno.",
  ],
  clicked: ["oo that tickles", "heheh"],
  lifted: ["AAAAAAHH!!"],
  thrown: [
    "STOP!! PENGUIN’S CAN’T FLY!!!",
    "I’M TELLING BRYAN ABOUT THIS",
    "OH YOU’RE IN BIG TROUBLE",
    "PUT ME DOWN!!!",
    "HELPPP!!!",
  ],
  parachute: ["wait i kind of like this", "HELPPP!!!"],
  landing: [
    "that actually wasn’t that bad lol",
    "i apologize for being dramatic. that was fun",
  ],
} as const;

export type SpeechKind = keyof typeof dialogue;
export type Speech = { text: string; kind: SpeechKind; id: number };

export function chooseLine(kind: SpeechKind, previous?: string) {
  const choices = dialogue[kind].filter((line) => line !== previous);
  const pool = choices.length ? choices : dialogue[kind];
  return pool[Math.floor(Math.random() * pool.length)];
}
