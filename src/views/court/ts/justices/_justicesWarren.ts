import { Justice } from "../_types";
import { PRES_FDR, PRES_EISENHOWER, PRES_LBJ, PRES_NIXON } from "../_presidents";
export const warrenJustices: Justice[] = [
  {
    id: 60,
    name: "William O. Douglas",
    image: "william_douglas.webp",
    description:
      "The longest-serving justice in history and possibly the most unmanageable. Hiked the Pacific Crest Trail, got married four times, and wrote opinions so sweeping they occasionally encompassed entire ecosystems. Believed freedom of speech meant all speech, the outdoors meant the outdoors, and the CIA was definitely doing something.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1898,
    nominatedBy: PRES_FDR,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 9,
      charisma: 8,
      empathy: 8,

      succeptibility: 3,
      partyLoyalty: 5,
    },
    weaknesses: { flattery: 5, bribery: 2, blackmail: 4, threats: 2 },
    stances: [
      {
        topic: "FreeSpeech",
        position: "For",
        note: "Believed the First Amendment was absolute; wrote sweeping opinions protecting political dissent, obscenity, and individual expression across 36 years on the Court.",
      },
      {
        topic: "Privacy",
        position: "For",
        note: "Authored Griswold v. Connecticut (1965), inventing the constitutional right to privacy in the 'penumbras' of the Bill of Rights — the foundation for Roe, Lawrence, and Obergefell.",
      },
      {
        topic: "NativeSovereignty",
        position: "For",
        note: "A fierce advocate for Native American treaty rights and tribal sovereignty, authored multiple opinions protecting indigenous lands and self-governance.",
      },
      {
        topic: "EnvironmentalProtection",
        position: "For",
        note: "Famously argued in Sierra Club v. Morton (1972) that trees and rivers should have legal standing to sue for their own protection.",
      },
    ],
  },
  {
    id: 61,
    name: "John Marshall Harlan II",
    image: "harlan_2.webp",
    description:
      "Grandson of the original Great Dissenter, and like his grandfather, frequently the most interesting voice in the room — except this time from the conservative side. Believed in federalism, restraint, and the process mattering as much as the outcome. The Court's intellectual conscience during the Warren era, which is a thankless job.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1899,
    nominatedBy: PRES_EISENHOWER,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 10,
      charisma: 6,
      empathy: 5,

      succeptibility: 2,
      partyLoyalty: 5,
    },
    weaknesses: { flattery: 4, bribery: 1, blackmail: 2, threats: 2 },
    stances: [
      {
        topic: "StatesRights",
        position: "For",
        note: "Consistent champion of federalism and state autonomy; frequently dissented from Warren Court expansions of federal power over state criminal procedure.",
      },
      {
        topic: "JudicialActivism",
        position: "Against",
        note: "Believed the Court's role was to interpret law, not drive social policy — and wrote lengthy, principled dissents when the majority overstepped.",
      },
      {
        topic: "Privacy",
        position: "For",
        note: "Authored the famous Poe v. Ullman dissent (1961), articulating a vision of substantive privacy rights grounded in tradition and lived experience — a foundation Griswold relied on.",
      },
    ],
  },
  {
    id: 62,
    name: "William J. Brennan Jr.",
    image: "brennan.webp",
    description:
      "Eisenhower's second-greatest mistake (after Warren, according to Eisenhower). Quietly became the intellectual engine of the liberal Warren Court. Brilliant coalition builder who made constitutional rights expand through sheer force of legal persuasion and an almost supernatural ability to count to five.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1906,
    nominatedBy: PRES_EISENHOWER,
    religion: "Catholic",
    ethnicity: "White",
    stats: {
      logic: 10,
      charisma: 8,
      empathy: 8,

      succeptibility: 3,
      partyLoyalty: 5,
    },
    weaknesses: { flattery: 5, bribery: 2, blackmail: 2, threats: 3 },
    stances: [
      {
        topic: "FreeSpeech",
        position: "For",
        note: "Authored New York Times v. Sullivan (1964), establishing that public officials cannot sue for defamation without proving 'actual malice' — the bedrock of American press freedom.",
      },
      {
        topic: "RacialEquity",
        position: "For",
        note: "Intellectual architect of the Warren Court's civil rights jurisprudence; built the legal coalitions behind Brown's remedies and the expansion of equal protection.",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "Authored critical opinions expanding the rights of criminal defendants under the Fourth, Fifth, and Sixth Amendments throughout the Warren and Burger Court eras.",
      },
      {
        topic: "CourtAuthority",
        position: "For",
        note: "Believed the Court had an affirmative responsibility to protect individual dignity and expand constitutional rights — not merely to referee disputes.",
      },
    ],
  },
  {
    id: 63,
    name: "Potter Stewart",
    image: "potter_stewart.webp",
    description:
      "A genuine moderate at a time when that was still a category. Best known for admitting he couldn't define obscenity but he knew it when he saw it — possibly the most honest thing anyone has ever said from the Supreme Court bench. Voted with whoever seemed least wrong. Often succeeded.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1915,
    nominatedBy: PRES_EISENHOWER,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 8,
      charisma: 6,
      empathy: 6,

      succeptibility: 6,
      partyLoyalty: 4,
    },
    weaknesses: { flattery: 5, bribery: 3, blackmail: 3, threats: 3 },
    stances: [
      {
        topic: "FreeSpeech",
        position: "For",
        note: "Famously admitted he couldn't define obscenity but 'knows it when he sees it' — possibly the most honest thing ever said from the bench, and more protective than it sounds.",
      },
      {
        topic: "Privacy",
        position: "Against",
        note: "Dissented in Griswold v. Connecticut (1965), arguing that a right to privacy didn't appear in the Constitution's text regardless of whether the law itself was 'silly.'",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "Voted with the majority in Katz v. United States (1967), establishing that the Fourth Amendment protects people, not places — the foundation of modern wiretapping law.",
      },
    ],
  },
  {
    id: 64,
    name: "Abe Fortas",
    image: "fortas.webp",
    description:
      "LBJ's personal lawyer before becoming his Supreme Court appointment. Brilliant, ambitious, and ultimately doomed by his own financial entanglements. First sitting justice forced to resign under scandal. In a court full of interesting characters, managed to be both the most talented and the most self-destructive.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1910,
    nominatedBy: PRES_LBJ,
    religion: "Jewish",
    ethnicity: "Jewish",
    stats: {
      logic: 9,
      charisma: 8,
      empathy: 6,

      succeptibility: 5,
      partyLoyalty: 8,
    },
    weaknesses: { flattery: 7, bribery: 8, blackmail: 9, threats: 4 },
    stances: [
      {
        topic: "AccusedRights",
        position: "For",
        note: "Authored In re Gault (1967), extending due process rights to juvenile court proceedings — a landmark in expanding constitutional protections to minors.",
      },
      {
        topic: "FreeSpeech",
        position: "For",
        note: "Authored Tinker v. Des Moines (1969) shortly before resigning, holding that students don't shed First Amendment rights at the schoolhouse gate.",
      },
      {
        topic: "CivilLiberties",
        position: "For",
        note: "Consistent Warren Court liberal; voted to expand individual rights across the board until financial scandal forced the most talented Justice of his era off the bench.",
      },
    ],
  },
  {
    id: 72,
    name: "Harry Blackmun",
    image: "blackmun.webp",
    description:
      "Nixon's most spectacular miscalculation. Appointed as a reliable conservative, he wrote Roe v. Wade, became the Court's most outspoken liberal by his final years, and left Nixon convinced he had been 'brainwashed by those damn doctors at Harvard.' Once referred to as 'hip pocket Harry' for his closeness to Chief Justice Burger — his childhood best friend. The friendship did not survive their divergence on abortion.",
    justiceType: "historical",
    gender: "M",
    birthYear: 1908,
    nominatedBy: PRES_NIXON,
    religion: "Protestant",
    ethnicity: "White",
    stats: {
      logic: 9,
      charisma: 6,
      empathy: 9,

      succeptibility: 4,
      partyLoyalty: -2,
    },
    weaknesses: { flattery: 3, bribery: 2, blackmail: 3, threats: 2 },
    stances: [
      {
        topic: "ReproductiveRights",
        position: "For",
        note: "Authored Roe v. Wade (1973), one of the most consequential — and contested — opinions in Supreme Court history. The draft was reportedly influenced by his years as legal counsel to the Mayo Clinic.",
      },
      {
        topic: "Privacy",
        position: "For",
        note: "Built Roe on the constitutional right to privacy first articulated in Griswold; later extended to other domains of personal autonomy throughout his tenure.",
      },
      {
        topic: "AccusedRights",
        position: "For",
        note: "Evolved from a moderate stance to a vigorous defender of criminal defendants; wrote a famous dissent in Callins v. Collins (1994) declaring that the death penalty could not be administered fairly.",
      },
      {
        topic: "WomensRights",
        position: "For",
        note: "Roe v. Wade remains the defining legacy. Blackmun received hate mail for decades and lived under security protection, never once backing away from the opinion.",
      },
    ],
  },
];
