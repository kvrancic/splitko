import type { Character } from "@/lib/dicebear";

export type VoiceLine = {
  speaker: "caller" | "splitko" | "reception";
  text: string;
  /** ms duration of this line's animated voicing */
  durationMs: number;
};

export type VoiceScript = {
  id: "povrat-poreza" | "nadogradnja";
  title: string;
  blurb: string;
  /** Display name of the caller (shown on the call screen + script picker). */
  callerName: string;
  /** Where they call from. */
  callerWhere: string;
  /** DiceBear persona character used for the caller portrait. */
  callerCharacter: Character;
  lines: VoiceLine[];
};

export const VOICE_SCRIPTS: VoiceScript[] = [
  {
    id: "povrat-poreza",
    title: "Povrat poreza",
    blurb: "“Kako provjerim povrat na e-Građani?”",
    callerName: "Marina K.",
    callerWhere: "Lučac",
    callerCharacter: "marina",
    lines: [
      {
        speaker: "splitko",
        text: "Dobar dan, Splitko ovdje. Kako vam mogu pomoći?",
        durationMs: 2400,
      },
      {
        speaker: "caller",
        text: "Splitko, kako provjerim povrat poreza na e-Građani?",
        durationMs: 3000,
      },
      {
        speaker: "splitko",
        text: "Otvorite aplikaciju e-Građani na mobitelu i prijavite se s vjerodajnicom — najlakše preko mToken-a iz banke ili lica.",
        durationMs: 4800,
      },
      {
        speaker: "caller",
        text: "Aha, dobro, ulogirana sam, što sad?",
        durationMs: 2400,
      },
      {
        speaker: "splitko",
        text: "Tražite uslugu “Porezna uprava — pregled rješenja godišnjeg poreza”. Tu ćete vidjeti iznos povrata i status isplate.",
        durationMs: 5400,
      },
      {
        speaker: "caller",
        text: "Vidim, piše “rješenje izdano”, ali ne vidim datum isplate.",
        durationMs: 3400,
      },
      {
        speaker: "splitko",
        text: "Isplata ide automatski 30 dana nakon rješenja. Vaše je izdano prošli tjedan, dakle do 14. lipnja. Hoćete da vas podsjetim taj dan?",
        durationMs: 6000,
      },
      {
        speaker: "caller",
        text: "Može, hvala lijepa.",
        durationMs: 1600,
      },
      {
        speaker: "splitko",
        text: "Postavljeno. 14. lipnja ujutro provjerim za vas i javim WhatsApp poruku.",
        durationMs: 3600,
      },
    ],
  },
  {
    id: "nadogradnja",
    title: "Nadogradnja prizemlja",
    blurb: "“Smim li nadogradit prizemlje u Lučcu?”",
    callerName: "Frane M.",
    callerWhere: "Lučac, parcela 4421/23",
    callerCharacter: "luka",
    lines: [
      {
        speaker: "splitko",
        text: "Dobar dan, Splitko. Slušam vas.",
        durationMs: 2200,
      },
      {
        speaker: "caller",
        text: "Alo, smin li nadogradit prizemlje u Lučcu?",
        durationMs: 2800,
      },
      {
        speaker: "splitko",
        text: "Da, do 50 m² bez dozvole, do 400 m² s prijavom. Tvoja parcela 4421/23 je u zoni M1 (mješovita). Treba: tri dokumenta + arhitekt.",
        durationMs: 7600,
      },
      {
        speaker: "caller",
        text: "Koja tri dokumenta?",
        durationMs: 1600,
      },
      {
        speaker: "splitko",
        text: "Idejni projekt, dokaz vlasništva i glavni projekt s ovjerom. Sve to radi arhitekt, ti samo potpišeš.",
        durationMs: 5400,
      },
      {
        speaker: "caller",
        text: "A koliko to traje, otprilike?",
        durationMs: 1900,
      },
      {
        speaker: "splitko",
        text: "Za prijavu radova do 400 m² — od dva do četiri tjedna, ovisno o brzini arhitekta. Imam ti preporučenog u Lučcu, šaljem ti kontakt na WhatsApp.",
        durationMs: 6800,
      },
      {
        speaker: "caller",
        text: "Super, hvala ti.",
        durationMs: 1400,
      },
      {
        speaker: "splitko",
        text: "Poslano. Ako se odlučiš, Splitko ti može pratiti rokove i prijavu napraviti za tebe.",
        durationMs: 4400,
      },
    ],
  },
];
