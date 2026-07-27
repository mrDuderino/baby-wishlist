import type { Setting } from "@/types/database";

export type HeroContent = {
  title: string;
  subtitle: string;
  thankYouText: string;
};

export type AboutContent = {
  title: string;
  paragraphs: string[];
};

export type FooterContent = {
  text: string;
  thankYouText: string;
};

export type SocialLinks = {
  telegram?: string;
  whatsapp?: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type LandingContent = {
  hero: HeroContent;
  about: AboutContent;
  footer: FooterContent;
  countdownDate: string;
  social: SocialLinks;
  faq: FaqItem[];
};

export const landingDefaults: LandingContent = {
  hero: {
    title: "Совсем скоро в нашей семье появится маленькое чудо 🤍",
    subtitle:
      "Мы подготовили небольшой вишлист, чтобы друзьям и близким было проще выбрать подарок нашей малышке.",
    thankYouText: "Спасибо, что разделяете этот важный момент вместе с нами ❤️",
  },
  about: {
    title: "Немного о нас",
    paragraphs: [
      "До встречи с нашей дочкой осталось совсем немного.",
      "Мы уже готовим её комнату, выбираем первую коляску и постепенно собираем всё необходимое.",
      "Этот список создан только для того, чтобы избежать одинаковых подарков и помочь тем, кто спрашивал, что действительно пригодится.",
      "Спасибо, что вы разделяете этот момент вместе с нами ❤️",
    ],
  },
  footer: {
    text: "Самый ценный подарок — это люди, которые будут рядом с нашей дочкой с первых дней жизни.",
    thankYouText: "Спасибо, что вы с нами ❤️",
  },
  countdownDate: "2026-09-01T00:00:00+03:00",
  social: {},
  faq: [
    {
      question: "Почему некоторые подарки недоступны?",
      answer: "Потому что их уже забронировали.",
    },
    {
      question: "Можно подарить что-то другое?",
      answer: "Конечно ❤️",
    },
    {
      question: "Можно объединиться для дорогого подарка?",
      answer: "Да. Свяжитесь с нами.",
    },
    {
      question: "Нужно ли покупать именно по указанной ссылке?",
      answer: "Нет. Можно приобрести в любом магазине.",
    },
  ],
};

function readSetting<T>(settings: Setting[], key: string): T | null {
  const setting = settings.find((item) => item.key === key);
  if (!setting?.value || typeof setting.value !== "object") {
    return null;
  }

  return setting.value as T;
}

export function parseLandingContent(settings: Setting[]): LandingContent {
  const hero = readSetting<Partial<HeroContent>>(settings, "hero");
  const about = readSetting<{ text?: string; title?: string }>(
    settings,
    "about",
  );
  const footer = readSetting<Partial<FooterContent>>(settings, "footer");
  const countdown = readSetting<{ date?: string }>(settings, "countdown");
  const social = readSetting<SocialLinks>(settings, "social");

  return {
    hero: {
      title: hero?.title ?? landingDefaults.hero.title,
      subtitle: hero?.subtitle ?? landingDefaults.hero.subtitle,
      thankYouText: hero?.thankYouText ?? landingDefaults.hero.thankYouText,
    },
    about: {
      title: about?.title ?? landingDefaults.about.title,
      paragraphs: about?.text?.includes("\n\n")
        ? about.text.split("\n\n").filter(Boolean)
        : landingDefaults.about.paragraphs,
    },
    footer: {
      text: footer?.text ?? landingDefaults.footer.text,
      thankYouText: footer?.thankYouText ?? landingDefaults.footer.thankYouText,
    },
    countdownDate: countdown?.date ?? landingDefaults.countdownDate,
    social: {
      telegram: social?.telegram || undefined,
      whatsapp: social?.whatsapp || undefined,
    },
    faq: landingDefaults.faq,
  };
}

export const landingImages = {
  hero: "/images/landing/hero.jpg",
  about: "/images/landing/about.jpg",
} as const;

export const navigationItems = [
  { href: "#home", label: "Главная" },
  { href: "#wishlist", label: "Вишлист" },
  { href: "#about", label: "О нас" },
  { href: "#faq", label: "FAQ" },
] as const;
