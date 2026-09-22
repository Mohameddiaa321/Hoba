import React, { useState, useEffect, useMemo } from 'react';
import {
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Stethoscope,
  Compass,
  Briefcase,
  ShieldCheck,
  FileCheck,
  Building2,
  Users,
  Award,
  HelpCircle,
  Send,
  PhoneCall,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  BookOpen,
  Sparkles,
  Plane,
  Clock,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

type Language = 'en' | 'de' | 'ar';
type Theme = 'light' | 'dark';

interface TranslationContent {
  meta: {
    dir: 'ltr' | 'rtl';
    brandName: string;
    brandTagline: string;
  };
  nav: {
    home: string;
    about: string;
    courses: string;
    recruitment: string;
    nurses: string;
    germany: string;
    faq: string;
    contact: string;
    consultationCTA: string;
  };
  hero: {
    pill: string;
    line1: string;
    line2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    trustStatement: string;
  };
  about: {
    badge: string;
    title: string;
    desc1: string;
    desc2: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    stat4Number: string;
    stat4Label: string;
  };
  services: {
    badge: string;
    title: string;
    subtitle: string;
    service1: {
      tag: string;
      title: string;
      desc: string;
      features: string[];
      cta: string;
    };
    service2: {
      tag: string;
      title: string;
      desc: string;
      features: string[];
      cta: string;
    };
  };
  nurses: {
    badge: string;
    title: string;
    subtitle: string;
    steps: { number: string; title: string; desc: string }[];
  };
  whyGermany: {
    badge: string;
    title: string;
    subtitle: string;
    reasons: { title: string; desc: string }[];
    cairoBridgeTitle: string;
    cairoBridgeDesc: string;
    cairoBridgeCta: string;
  };
  timeline: {
    badge: string;
    title: string;
    subtitle: string;
    steps: { step: string; title: string; desc: string }[];
  };
  benefits: {
    badge: string;
    title: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    disclaimer: string;
    items: { quote: string; author: string; role: string; location: string }[];
  };
  faq: {
    badge: string;
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    cairoOffice: string;
    cairoAddress: string;
    germanyOffice: string;
    germanyAddress: string;
    phoneLabel: string;
    emailLabel: string;
    whatsappCardTitle: string;
    whatsappCardDesc: string;
    whatsappCardBtn: string;
    form: {
      name: string;
      phone: string;
      email: string;
      service: string;
      message: string;
      submit: string;
      sending: string;
      successTitle: string;
      successMsg: string;
      options: {
        courses: string;
        nursing: string;
        generalRecruitment: string;
        general: string;
      };
    };
  };
  footer: {
    desc: string;
    navigationHeader: string;
    servicesHeader: string;
    contactHeader: string;
    rights: string;
    privacy: string;
    imprint: string;
    terms: string;
  };
}

const content: Record<Language, TranslationContent> = {
  en: {
    meta: {
      dir: 'ltr',
      brandName: 'Zukunft24',
      brandTagline: 'Zentrum für Deutsch · Personalvermittlung'
    },
    nav: {
      home: 'Home',
      about: 'About',
      courses: 'German Courses',
      recruitment: 'Recruitment',
      nurses: 'For Nurses',
      germany: 'Why Germany',
      faq: 'FAQ',
      contact: 'Contact',
      consultationCTA: 'Apply Now'
    },
    hero: {
      pill: 'GERMANY · LANGUAGE · CAREER',
      line1: 'Your Future.',
      line2: 'Starts in Germany.',
      subtitle:
        'German language education and professional recruitment connecting ambitious healthcare professionals and learners from Cairo directly with German opportunities.',
      primaryCta: 'Start Your Journey',
      secondaryCta: 'Explore Our Services',
      trustStatement: 'From Cairo to Germany — supporting your next professional step.'
    },
    about: {
      badge: 'About Zukunft24',
      title: 'Building Bridges Between Egypt and Germany',
      desc1:
        'Zukunft24 is a specialized bridge between Cairo and the German labor market. We combine rigorous German language training with ethical healthcare placement to build sustainable careers.',
      desc2:
        'Our experienced team accompanies candidates step-by-step: from mastering linguistic nuances to document certification, official recognition (Anerkennung), interview coaching, and relocation integration.',
      stat1Number: '2',
      stat1Label: 'Operational Hubs (Cairo & Germany)',
      stat2Number: 'A1–B2/C1',
      stat2Label: 'Targeted Language Pathways',
      stat3Number: '1-on-1',
      stat3Label: 'Personal Career Mentorship',
      stat4Number: '100%',
      stat4Label: 'Transparent German Standards'
    },
    services: {
      badge: 'Our Core Expertise',
      title: 'Two Pillars of Professional Relocation',
      subtitle:
        'We merge academic German language training with bespoke professional recruitment.',
      service1: {
        tag: 'Service 01',
        title: 'Zentrum für Deutsch',
        desc: 'Comprehensive German language education focused on linguistic fluency, official exam success, and specialized terminology for medical personnel.',
        features: [
          'CEFR-aligned intensive courses (A1, A2, B1, B2, C1)',
          'Specialized Medical German (Fachsprache Medizin & Pflege)',
          'Direct Goethe-Institut & telc exam preparation strategies',
          'Intercultural coaching for daily life and work in Germany'
        ],
        cta: 'Explore German Courses'
      },
      service2: {
        tag: 'Service 02',
        title: 'Personalvermittlung',
        desc: 'Professional recruitment connecting qualified Egyptian nurses and medical practitioners with accredited German clinics, hospitals, and care providers.',
        features: [
          'Candidate credentials assessment & translation coordination',
          'Guidance through the official recognition process (Defizitbescheid)',
          'Matching with vetted German healthcare institutions',
          'Complete visa dossier support and post-arrival onboarding'
        ],
        cta: 'Explore Recruitment'
      }
    },
    nurses: {
      badge: 'Dedicated Pathway',
      title: 'A Clearer Path for Your Nursing Career in Germany',
      subtitle:
        'An organized, dependable 8-stage transition designed specifically for qualified registered nurses.',
      steps: [
        {
          number: '01',
          title: 'Profile Assessment',
          desc: 'Comprehensive evaluation of your nursing degree, clinical experience, and relocation readiness.'
        },
        {
          number: '02',
          title: 'Document Review',
          desc: 'Verification, certified translation, and organization of diplomas and clinical syllabi according to German standards.'
        },
        {
          number: '03',
          title: 'German Preparation',
          desc: 'Intensive courses reaching general B2 level alongside specialized nursing communication (Pflegedeutsch).'
        },
        {
          number: '04',
          title: 'Recognition Process',
          desc: 'Submission to the relevant German state authority (Landesprüfungsamt) to obtain the recognition decision (Bescheid).'
        },
        {
          number: '05',
          title: 'Employer Matching',
          desc: 'Presenting your verified profile to reputable hospitals, university clinics, and healthcare centers in Germany.'
        },
        {
          number: '06',
          title: 'Interview Preparation',
          desc: 'Interactive mock interviews, cultural readiness, and direct coordination with prospective German employers.'
        },
        {
          number: '07',
          title: 'Visa Application',
          desc: 'Preparation of the employment contract, federal agency approval (ZAV), and German embassy visa interview.'
        },
        {
          number: '08',
          title: 'Relocation & Onboarding',
          desc: 'Arrival assistance, accommodation coordination, local registration (Anmeldung), and adaptation training.'
        }
      ]
    },
    whyGermany: {
      badge: 'The Destination',
      title: 'Why Pursue Your Career in Germany?',
      subtitle:
        'Germany offers one of the world’s most advanced and organized healthcare environments with long-term stability.',
      reasons: [
        {
          title: 'World-Class Healthcare Standards',
          desc: 'Work with modern medical equipment, evidence-based practices, and interdisciplinary clinical teams.'
        },
        {
          title: 'Structured Professional Growth',
          desc: 'Clear frameworks for continuing education, clinical specialization, and academic progression.'
        },
        {
          title: 'Strong Social Security & Stability',
          desc: 'Comprehensive health coverage, protected working hours, pension security, and family benefits.'
        },
        {
          title: 'Long-Term Residency Pathways',
          desc: 'Transparent immigration laws and EU Blue Card / Skilled Worker regulations facilitating permanent residency.'
        }
      ],
      cairoBridgeTitle: 'From Cairo to Germany',
      cairoBridgeDesc:
        'A new language. A new environment. A new professional chapter. Our bilingual team in Cairo and Germany ensures smooth transitions without uncertainty.',
      cairoBridgeCta: 'Connect with an Advisor'
    },
    timeline: {
      badge: 'Step-by-Step Pathway',
      title: 'Your Journey With Zukunft24',
      subtitle:
        'Transparency at every stage. We guide you through each milestone with German precision.',
      steps: [
        { step: '01', title: 'Initial Consultation', desc: 'Understanding your background, goals, and providing realistic orientation.' },
        { step: '02', title: 'Candidate Assessment', desc: 'Detailed review of transcripts, clinical hours, and language prerequisites.' },
        { step: '03', title: 'Language Training', desc: 'Structured learning modules with our native-level German instructors.' },
        { step: '04', title: 'Document Legalization', desc: 'Certified German translations and embassy apostille verification guidance.' },
        { step: '05', title: 'Recognition Submission', desc: 'Filing for the official deficit letter (Defizitbescheid) in Germany.' },
        { step: '06', title: 'Employer Selection', desc: 'Presenting suitable clinical roles aligned with your career goals.' },
        { step: '07', title: 'Contract & Interviews', desc: 'Securing fair employment terms under collective bargaining agreements (TVöD).' },
        { step: '08', title: 'Visa Filing Support', desc: 'Gathering all mandatory documents for the German Embassy in Cairo.' },
        { step: '09', title: 'Arrival & Integration', desc: 'Welcome in Germany, housing assistance, and continuous local backing.' }
      ]
    },
    benefits: {
      badge: 'Why Zukunft24',
      title: 'Precision, Ethics, and Dedicated Care',
      subtitle:
        'We do not offer quick shortcuts; we build genuine, verifiable pathways grounded in reality.',
      items: [
        {
          title: 'Personal Guidance',
          desc: 'Direct consultation tailored to your individual academic and professional background.'
        },
        {
          title: 'German Language Focus',
          desc: 'Linguistic preparation designed specifically around everyday and hospital communication in Germany.'
        },
        {
          title: 'Career-Oriented Approach',
          desc: 'Focus on long-term professional development rather than mere temporary relocation.'
        },
        {
          title: 'Structured Process',
          desc: 'Clear chronological stages with verifiable requirements from your first meeting to departure.'
        },
        {
          title: 'International Perspective',
          desc: 'A physical presence in both Cairo and Germany to resolve logistics on both ends seamlessly.'
        },
        {
          title: 'Dedicated Support',
          desc: 'Reliable, accessible communication channels including direct WhatsApp and phone assistance.'
        }
      ]
    },
    testimonials: {
      badge: 'Candidate Experiences',
      title: 'Reflections from Our Candidates',
      subtitle:
        'Candidate profiles reflecting the realistic experience of preparing for and relocating to Germany.',
      disclaimer: 'Representative candidate experiences. Actual results depend on personal dedication, language exams, and official authority reviews.',
      items: [
        {
          quote:
            'The medical terminology course made a significant difference. Entering German clinic interviews knowing the exact nursing protocols gave me confidence.',
          author: 'S. Mansour',
          role: 'Registered ICU Nurse',
          location: 'Bonn, Germany'
        },
        {
          quote:
            'Zukunft24 walked me through the complex Anerkennung paperwork without false promises. The timeline was realistic, and today I work in a university hospital.',
          author: 'A. El-Sayed',
          role: 'Operating Room Nurse',
          location: 'Frankfurt am Main'
        },
        {
          quote:
            'Learning German from A1 to B2 required consistent effort, but the instructors in Cairo kept us disciplined and focused on the telc exam format.',
          author: 'M. Farouk',
          role: 'General Care Nurse',
          location: 'Düsseldorf, Germany'
        }
      ]
    },
    faq: {
      badge: 'Common Questions',
      title: 'Frequently Asked Questions',
      subtitle: 'Clear, direct answers regarding language courses, requirements, and relocation procedures.',
      items: [
        {
          q: 'Who can apply for recruitment opportunities?',
          a: 'Our primary focus is on qualified registered nurses holding a university degree (BSc) or recognized higher diploma in nursing. Healthcare specialists with clinical experience and a commitment to learning German are eligible.'
        },
        {
          q: 'What German language level do I need?',
          a: 'For recruitment to Germany, nurses generally require a certified B2 level (telc or Goethe-Zertifikat) in general German or specialized B1/B2 Pflege. Beginners can start with our A1 course at the Zentrum für Deutsch.'
        },
        {
          q: 'Do I need previous work experience?',
          a: 'Recent graduates as well as experienced healthcare staff can qualify. However, having 1–2 years of clinical hospital experience strengthens your recognition profile with German state licensing bodies.'
        },
        {
          q: 'How does the qualification recognition (Anerkennung) work?',
          a: 'Your academic hours, practical training curriculum, and diploma are compared with the German nursing standard. The German authority then issues a recognition notice (Defizitbescheid) specifying any adaptation training or exams needed.'
        },
        {
          q: 'Can you help with document translation and legalization?',
          a: 'Yes, we provide step-by-step guidance on certifying documents at the Egyptian Ministry of Foreign Affairs, authenticating them with certified German sworn translators, and fulfilling embassy guidelines.'
        },
        {
          q: 'Do you guarantee jobs and visas?',
          a: 'No ethical agency can guarantee a visa or job. Visas are granted exclusively by the German Embassy following legal evaluations, and employment depends on employer interviews and official qualification approval.'
        },
        {
          q: 'How does the employer matching process work?',
          a: 'Once your language proficiency reaches intermediate milestones and your documentation is verified, we arrange online interviews with vetted German healthcare providers matching your clinical background.'
        },
        {
          q: 'Do you assist with finding accommodation and settling in?',
          a: 'Yes, our partner healthcare providers in Germany routinely assist with staff housing or initial furnished accommodation, and we support you during your initial bureaucratic registrations (Anmeldung, tax ID).'
        },
        {
          q: 'How can I contact Zukunft24 directly?',
          a: 'You can reach us through our official WhatsApp hotline (+201005747953), submit the online contact form on this page, or visit our Cairo office by prior appointment.'
        }
      ]
    },
    contact: {
      badge: 'Get in Touch',
      title: 'Start Your Journey',
      subtitle: 'Schedule your initial assessment or join an upcoming German language cohort.',
      cairoOffice: 'Cairo Office',
      cairoAddress: 'Nasr City / New Cairo, Cairo Governorate, Egypt',
      germanyOffice: 'Germany Network',
      germanyAddress: 'Connecting with clinics across North Rhine-Westphalia, Hesse & Bavaria',
      phoneLabel: 'Phone & WhatsApp',
      emailLabel: 'Official Email',
      whatsappCardTitle: 'Direct WhatsApp Line',
      whatsappCardDesc: 'Chat directly with our student & candidate advisory team in Cairo.',
      whatsappCardBtn: 'Chat on WhatsApp',
      form: {
        name: 'Full Name',
        phone: 'Phone / WhatsApp Number',
        email: 'Email Address',
        service: 'Interested Service',
        message: 'Your Background & Questions',
        submit: 'Send Request',
        sending: 'Processing Request...',
        successTitle: 'Thank you for reaching out!',
        successMsg: 'Our advisory team has received your message and will contact you via WhatsApp or Email shortly.',
        options: {
          courses: 'Zentrum für Deutsch (Language Courses)',
          nursing: 'Nursing Recruitment to Germany',
          generalRecruitment: 'Healthcare & Medical Placement',
          general: 'General Information & Inquiries'
        }
      }
    },
    footer: {
      desc: 'Zukunft24 unites specialized German language training with professional healthcare recruitment, guiding Egyptian professionals on reliable career pathways to Germany.',
      navigationHeader: 'Navigation',
      servicesHeader: 'Specialties',
      contactHeader: 'Get in Touch',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      imprint: 'Imprint',
      terms: 'Terms of Service'
    }
  },
  de: {
    meta: {
      dir: 'ltr',
      brandName: 'Zukunft24',
      brandTagline: 'Zentrum für Deutsch · Personalvermittlung'
    },
    nav: {
      home: 'Startseite',
      about: 'Über uns',
      courses: 'Deutschkurse',
      recruitment: 'Vermittlung',
      nurses: 'Für Pflegekräfte',
      germany: 'Deutschland',
      faq: 'FAQ',
      contact: 'Kontakt',
      consultationCTA: 'Jetzt bewerben'
    },
    hero: {
      pill: 'DEUTSCHLAND · SPRACHE · KARRIERE',
      line1: 'Ihre Zukunft.',
      line2: 'Beginnt in Deutschland.',
      subtitle:
        'Deutsche Sprachausbildung und qualifizierte Personalvermittlung – wir verbinden Fachkräfte des Gesundheitswesens aus Kairo mit langfristigen Perspektiven in Deutschland.',
      primaryCta: 'Weg starten',
      secondaryCta: 'Leistungen entdecken',
      trustStatement: 'Von Kairo nach Deutschland — Ihr verlässlicher Begleiter für den nächsten Karriereschritt.'
    },
    about: {
      badge: 'Über Zukunft24',
      title: 'Brücken schlagen zwischen Ägypten und Deutschland',
      desc1:
        'Zukunft24 ist die professionelle Brücke zwischen Kairo und dem deutschen Gesundheitssektor. Wir verbinden fundierten Deutschunterricht mit transparenter, ethischer Personalvermittlung.',
      desc2:
        'Unser zweisprachiges Team begleitet Kandidatinnen und Kandidaten Schritt für Schritt: vom Spracherwerb über Beglaubigungen und das Anerkennungsverfahren bis hin zur Vorbereitung auf Vorstellungsgespräche und die Visa-Erteilung.',
      stat1Number: '2',
      stat1Label: 'Standorte (Kairo & Deutschland)',
      stat2Number: 'A1–B2/C1',
      stat2Label: 'Zielorientierte Sprachausbildung',
      stat3Number: '1-zu-1',
      stat3Label: 'Persönliche Karriereberatung',
      stat4Number: '100%',
      stat4Label: 'Deutsche Qualitätsstandards'
    },
    services: {
      badge: 'Unsere Fachbereiche',
      title: 'Zwei Säulen für Ihren beruflichen Erfolg',
      subtitle:
        'Verbindung von zertifizierter Sprachqualifikation mit professioneller Personalgewinnung.',
      service1: {
        tag: 'Fachbereich 01',
        title: 'Zentrum für Deutsch',
        desc: 'Strukturierte Sprachausbildung mit Fokus auf Alltagssicherheit, anerkannte Prüfungen und Fachsprache für medizinische Fachkräfte.',
        features: [
          'Intensivkurse nach GER-Standard (A1 bis C1)',
          'Spezifisches Pflegedeutsch und medizinische Terminologie',
          'Gezielte Prüfungsvorbereitung (telc, Goethe-Zertifikat)',
          'Interkulturelles Training für Leben und Arbeiten in Deutschland'
        ],
        cta: 'Deutschkurse entdecken'
      },
      service2: {
        tag: 'Fachbereich 02',
        title: 'Personalvermittlung',
        desc: 'Vermittlung qualifizierter Pflegefachkräfte und medizinischer Angestellter an renommierte deutsche Kliniken, Krankenhäuser und Pflegeeinrichtungen.',
        features: [
          'Prüfung der Unterlagen und Koordination von Fachübersetzungen',
          'Begleitung im Anerkennungsverfahren (Defizitbescheid)',
          'Matching mit geprüften deutschen Arbeitgebern',
          'Vorbereitung auf Visaantrag und Ankunftsintegration'
        ],
        cta: 'Personalvermittlung entdecken'
      }
    },
    nurses: {
      badge: 'Pflegefachkräfte',
      title: 'Ein klarer Weg für Ihre Pflegekarriere in Deutschland',
      subtitle:
        'Ein strukturierter, transparenter 8-Stufen-Prozess, speziell konzipiert für examinierte Pflegekräfte.',
      steps: [
        {
          number: '01',
          title: 'Profil-Evaluierung',
          desc: 'Erste Prüfung Ihres Studienabschlusses, Ihrer klinischen Berufserfahrung und Ihrer Zielvorstellungen.'
        },
        {
          number: '02',
          title: 'Unterlagenprüfung',
          desc: 'Systematisierung und amtliche Übersetzung aller Zeugnisse, Diplome und Fächerübersichten.'
        },
        {
          number: '03',
          title: 'Sprachvorbereitung',
          desc: 'Fundierter Erwerb des B2-Niveaus sowie Training berufsbezogener Fachsprache für den Klinikalltag.'
        },
        {
          number: '04',
          title: 'Anerkennungsverfahren',
          desc: 'Einreichung bei der zuständigen Landesbehörde zur Ausstellung des Bescheids (Gleichwertigkeitsprüfung).'
        },
        {
          number: '05',
          title: 'Arbeitgeber-Matching',
          desc: 'Vorstellung Ihres Profils bei renommierten Kliniken und Spitälern mit fairen Arbeitsbedingungen.'
        },
        {
          number: '06',
          title: 'Interview-Coaching',
          desc: 'Simulation von Bewerbungsgesprächen und Vermittlung von Einblicken in deutsche Klinikstrukturen.'
        },
        {
          number: '07',
          title: 'Visumsvorbereitung',
          desc: 'Zusammenstellung aller vertraglichen und behördlichen Dokumente (ZAV) für die Deutsche Botschaft Kairo.'
        },
        {
          number: '08',
          title: 'Umzug & Start',
          desc: 'Unterstützung bei Einreise, Wohnungsvermittlung, behördlicher Anmeldung und betrieblicher Einarbeitung.'
        }
      ]
    },
    whyGermany: {
      badge: 'Standort Deutschland',
      title: 'Warum Deutschland als Karriereziel?',
      subtitle:
        'Deutschland verfügt über eines der fortschrittlichsten Gesundheitssysteme weltweit mit verlässlichen Arbeitsbedingungen.',
      reasons: [
        {
          title: 'Hohe medizinische Standards',
          desc: 'Modernste technische Ausstattung, interdisziplinäre Teamarbeit und strukturierte Arbeitsabläufe.'
        },
        {
          title: 'Fort- und Weiterbildung',
          desc: 'Garantierte Möglichkeiten zur Fachweiterbildung (z.B. Anästhesie, Intensivpflege, OP).'
        },
        {
          title: 'Umfassende soziale Absicherung',
          desc: 'Gesetzliche Kranken-, Renten- und Arbeitslosenversicherung sowie Schutz durch Tarifverträge (TVöD).'
        },
        {
          title: 'Dauerhafte Lebensperspektive',
          desc: 'Rechtssichere Zuwanderungsgesetze für Fachkräfte und die Möglichkeit zur Niederlassungserlaubnis.'
        }
      ],
      cairoBridgeTitle: 'Von Kairo nach Deutschland',
      cairoBridgeDesc:
        'Eine neue Sprache. Ein neues Arbeitsumfeld. Ein neues Kapitel. Unser Team in Ägypten und Deutschland sorgt für Verlässlichkeit an jedem Punkt.',
      cairoBridgeCta: 'Beratungstermin vereinbaren'
    },
    timeline: {
      badge: 'Verlässlicher Ablauf',
      title: 'Ihr Ablauf mit Zukunft24',
      subtitle:
        'Schrittweise und planbar von der ersten Beratung bis zur Arbeitsaufnahme in Deutschland.',
      steps: [
        { step: '01', title: 'Erstberatung', desc: 'Orientierungsgespräch zu Voraussetzungen, Ablauf und Zeitplan.' },
        { step: '02', title: 'Profilanalyse', desc: 'Detaillierte Einsicht in Zeugnisse, Sprachkenntnisse und Praxiserfahrung.' },
        { step: '03', title: 'Sprachausbildung', desc: 'Deutschunterricht im Zentrum für Deutsch in Kairo.' },
        { step: '04', title: 'Beglaubigungen', desc: 'Legalisierung von Dokumenten und Vorbereitung beglaubigter Übersetzungen.' },
        { step: '05', title: 'Behördenantrag', desc: 'Beantragung des Anerkennungsbescheids in Deutschland.' },
        { step: '06', title: 'Klinikauswahl', desc: 'Abstimmung passender Stellenangebote im bundesweiten Netzwerk.' },
        { step: '07', title: 'Bewerbungsgespräche', desc: 'Online-Interviews mit deutschen Arbeitgebern und Vertragsschluss.' },
        { step: '08', title: 'Visumsantrag', desc: 'Unterlagenpaket für die Botschaft bis zur Erteilung des Arbeitsvisums.' },
        { step: '09', title: 'Integration vor Ort', desc: 'Ankunft in Deutschland, behördliche Schritte und Arbeitsstart.' }
      ]
    },
    benefits: {
      badge: 'Vorteile',
      title: 'Präzision, Verlässlichkeit und Partnerschaft',
      subtitle:
        'Wir schaffen nachhaltige Berufswege ohne leere Versprechungen, fundiert und professionell.',
      items: [
        {
          title: 'Individuelle Betreuung',
          desc: 'Persönliche Begleitung abgestimmt auf Ihre Qualifikation und Karrierewünsche.'
        },
        {
          title: 'Fokus auf Fachdeutsch',
          desc: 'Sprachvermittlung, die exakt den Anforderungen im Stations- und Klinikalltag entspricht.'
        },
        {
          title: 'Langfristige Perspektive',
          desc: 'Gezielte Platzierung in festen Arbeitsverhältnissen mit Tarifbindung und Entwicklungschancen.'
        },
        {
          title: 'Transparenter Prozess',
          desc: 'Klar definierte Phasen und ehrliche Einschätzung behördlicher Bearbeitungszeiten.'
        },
        {
          title: 'Präsenz an zwei Standorten',
          desc: 'Verlässliche Ansprechpartner vor Ort in Kairo sowie im deutschen Gesundheitsnetzwerk.'
        },
        {
          title: 'Erreichbarkeit',
          desc: 'Schnelle Kommunikation per WhatsApp, Telefon und im persönlichen Gespräch.'
        }
      ]
    },
    testimonials: {
      badge: 'Erfahrungsberichte',
      title: 'Stimmen unserer Fachkräfte',
      subtitle:
        'Einblicke in den realistischen Weg der Vorbereitung und Eingliederung.',
      disclaimer: 'Ausgewählte Erfahrungsberichte. Der persönliche Erfolg hängt von individuellem Lerneinsatz und behördlichen Prüfungen ab.',
      items: [
        {
          quote:
            'Die Vorbereitung auf das Fachdeutsch hat mir im Alltag auf Station in Bonn enorm geholfen. Ich wusste von Tag eins an, worum es bei der Übergabe geht.',
          author: 'S. Mansour',
          role: 'Gesundheits- & Krankenpflegerin',
          location: 'Bonn'
        },
        {
          quote:
            'Zukunft24 hat mich ehrlich über das Anerkennungsverfahren informiert. Die Begleitung bei den Dokumenten war präzise und zuverlässig.',
          author: 'A. El-Sayed',
          role: 'Fachkrankenpfleger OP',
          location: 'Frankfurt am Main'
        },
        {
          quote:
            'Der Deutschunterricht von A1 bis B2 verlangte Disziplin, aber die Dozenten in Kairo haben uns optimal auf das telc B2-Zertifikat vorbereitet.',
          author: 'M. Farouk',
          role: 'Pflegefachkraft',
          location: 'Düsseldorf'
        }
      ]
    },
    faq: {
      badge: 'Häufige Fragen',
      title: 'Fragen und Antworten',
      subtitle: 'Wichtige Informationen zu Sprachkursen, Voraussetzungen und dem Ablauf.',
      items: [
        {
          q: 'Wer kann sich für das Vermittlungsprogramm bewerben?',
          a: 'Das Programm richtet sich vor allem an examinierte Pflegefachkräfte mit einem staatlich anerkannten Hochschulabschluss (Bachelor of Science in Nursing) oder äquivalentem Diplom und der Bereitschaft, Deutsch zu lernen.'
        },
        {
          q: 'Welches Deutschniveau wird benötigt?',
          a: 'Für die Arbeitsaufnahme und Anerkennung als Pflegefachkraft in Deutschland ist in der Regel das Sprachzertifikat B2 (telc oder Goethe) erforderlich. Im Zentrum für Deutsch bilden wir von A1 an zielgerichtet aus.'
        },
        {
          q: 'Ist vorherige Berufserfahrung erforderlich?',
          a: 'Sowohl Berufseinsteiger als auch erfahrene Pflegekräfte können teilnehmen. Praktische Klinikerfahrung (z.B. 1–2 Jahre) erleichtert jedoch die Anerkennung und Vermittlung deutlich.'
        },
        {
          q: 'Wie läuft die Anerkennung (Defizitbescheid) ab?',
          a: 'Die zuständige Behörde in dem jeweiligen Bundesland gleicht den ägyptischen Studienplan mit der deutschen Pflegeausbildung ab. Bei festgestellten Differenzen legt der Bescheid die erforderlichen Anpassungsmaßnahmen fest.'
        },
        {
          q: 'Unterstützt Zukunft24 bei Übersetzungen und Beglaubigungen?',
          a: 'Ja, wir geben genaue Anweisungen zur Vorbeglaubigung in Ägypten, organisieren vereidigte deutsche Übersetzungen und stellen die vollständige Akte zusammen.'
        },
        {
          q: 'Gibt es eine Job- oder Visagarantie?',
          a: 'Nein, eine Garantie für Visa oder Arbeitsplätze wäre unredlich. Über Visa entscheidet allein die Deutsche Botschaft, und Arbeitsverträge basieren auf erfolgreichen Vorstellungsgesprächen.'
        },
        {
          q: 'Wie funktioniert die Vermittlung an deutsche Kliniken?',
          a: 'Nach Erreichen der erforderlichen Sprachstufe organisieren wir strukturierte Online-Interviews mit geprüften Kliniken, die Ihren Fachinteressen entsprechen.'
        },
        {
          q: 'Wird bei der Wohnungssuche und Einreise geholfen?',
          a: 'Unsere Partnerarbeitgeber stellen häufig bezahlbaren Wohnraum oder Personalwohnheime zur Verfügung. Wir unterstützen zudem bei Behördengängen nach der Ankunft.'
        },
        {
          q: 'Wie kann ich Zukunft24 kontaktieren?',
          a: 'Über unsere offizielle WhatsApp-Nummer (+201005747953), über das Online-Formular auf dieser Seite oder nach vorheriger Terminabsprache in unserem Büro in Kairo.'
        }
      ]
    },
    contact: {
      badge: 'Kontakt',
      title: 'Starten Sie Ihre Reise',
      subtitle: 'Vereinbaren Sie ein unverbindliches Beratungsgespräch oder melden Sie sich zu den Kursen an.',
      cairoOffice: 'Büro Kairo',
      cairoAddress: 'Nasr City / New Cairo, Gouvernement Kairo, Ägypten',
      germanyOffice: 'Netzwerk Deutschland',
      germanyAddress: 'Kooperationen mit Kliniken in NRW, Hessen und Bayern',
      phoneLabel: 'Telefon & WhatsApp',
      emailLabel: 'E-Mail',
      whatsappCardTitle: 'Direkter WhatsApp-Kontakt',
      whatsappCardDesc: 'Sprechen Sie direkt mit unserem Beratungsteam in Kairo.',
      whatsappCardBtn: 'Auf WhatsApp schreiben',
      form: {
        name: 'Vollständiger Name',
        phone: 'Telefon- / WhatsApp-Nummer',
        email: 'E-Mail-Adresse',
        service: 'Gewünschter Bereich',
        message: 'Ihre Qualifikation / Nachricht',
        submit: 'Anfrage absenden',
        sending: 'Wird gesendet...',
        successTitle: 'Vielen Dank für Ihre Anfrage!',
        successMsg: 'Unser Beratungsteam hat Ihre Nachricht erhalten und wird sich zeitnah bei Ihnen melden.',
        options: {
          courses: 'Zentrum für Deutsch (Sprachkurse)',
          nursing: 'Pflegekräfte-Vermittlung nach Deutschland',
          generalRecruitment: 'Medizinische Fachkräftevermittlung',
          general: 'Allgemeine Auskunft'
        }
      }
    },
    footer: {
      desc: 'Zukunft24 verbindet zielgerichtete deutsche Sprachausbildung mit professioneller Vermittlung von Pflegefachkräften auf verlässlichen Wegen nach Deutschland.',
      navigationHeader: 'Navigation',
      servicesHeader: 'Fachbereiche',
      contactHeader: 'Kontakt',
      rights: 'Alle Rechte vorbehalten.',
      privacy: 'Datenschutz',
      imprint: 'Impressum',
      terms: 'AGB'
    }
  },
  ar: {
    meta: {
      dir: 'rtl',
      brandName: 'Zukunft24',
      brandTagline: 'مركز اللغة الألمانية · التوظيف المهني للكوادر الصحية'
    },
    nav: {
      home: 'الرئيسية',
      about: 'عن الشركة',
      courses: 'دورات اللغة الألمانية',
      recruitment: 'التوظيف المهني',
      nurses: 'للتمريض',
      germany: 'لماذا ألمانيا؟',
      faq: 'الأسئلة الشائعة',
      contact: 'تواصل معنا',
      consultationCTA: 'قدّم الآن'
    },
    hero: {
      pill: 'ألمانيا · اللغة · المستقبل المهني',
      line1: 'مستقبلك.',
      line2: 'يبدأ في ألمانيا.',
      subtitle:
        'تعليم احترافي للغة الألمانية وتوظيف مهني موثوق يربط الكفاءات الطبية والتمريضية في مصر بفرص العمل المستدامة في ألمانيا.',
      primaryCta: 'ابدأ رحلتك معنا',
      secondaryCta: 'استكشف خدماتنا',
      trustStatement: 'من القاهرة إلى ألمانيا — شريكك الموثوق في كل خطوة نحو مستقبلك المهني.'
    },
    about: {
      badge: 'نبذة عن Zukunft24',
      title: 'بناء جسور مهنية موثوقة بين مصر وألمانيا',
      desc1:
        'تعد Zukunft24 حلقة وصل احترافية بين القاهرة وألمانيا، حيث نجمع بين الإعداد اللغوي التخصصي وفق أعلى المعايير الألمانية وبين التوظيف المهني الأخلاقي للكوادر التمريضية والطبية.',
      desc2:
        'يرافقك فريقنا المتخصص في كل مرحلة: من إتقان اللغة الألمانية، وتجهيز وتوثيق المستندات والشهادات، مروراً بإجراءات معادلة المؤهل الرسمي (Anerkennung)، والتحضير للمقابلات الشخصية وحتى الحصول على التأشيرة والاستقرار في ألمانيا.',
      stat1Number: '2',
      stat1Label: 'مقران للعمل (القاهرة وألمانيا)',
      stat2Number: 'A1–B2/C1',
      stat2Label: 'مسارات لغوية متكاملة ومعتمدة',
      stat3Number: '1-على-1',
      stat3Label: 'إرشاد مهني شخصي ومستمر',
      stat4Number: '100%',
      stat4Label: 'التزام كامل بالمعايير الألمانية'
    },
    services: {
      badge: 'مجالات تخصصنا',
      title: 'ركيزتان أساسيتان لتحقيق طموحك المهني',
      subtitle: 'نجمع بين التأهيل الأكاديمي اللغوي والتوظيف الاحترافي المباشر في ألمانيا.',
      service1: {
        tag: 'الخدمة الأولى',
        title: 'Zentrum für Deutsch (مركز اللغة الألمانية)',
        desc: 'تعليم لغوي منظم وشامل يركز على إتقان التحدث، والنجاح في الامتحانات الرسمية المعتمدة، وإتقان المصطلحات الطبية المتخصصة للكوادر الصحية.',
        features: [
          'دورات مكثفة وفق الإطار الأوروبي المشترك (A1 وحتى C1)',
          'ألماني تخصصي للقطاع الطبي والتمريضي (Pflegedeutsch)',
          'تحضير مباشر لامتحانات telc ومعهد جوته (Goethe)',
          'تدريب على الاندماج الثقافي وأسلوب الحياة في ألمانيا'
        ],
        cta: 'استكشف دورات اللغة'
      },
      service2: {
        tag: 'الخدمة الثانية',
        title: 'Personalvermittlung (التوظيف المهني)',
        desc: 'ربط الممرضين والممرضات والكوادر الصحية المؤهلة بالمستشفيات والمراكز الطبية والمؤسسات الصحية المعتمدة في ألمانيا وفق عقود عمل رسمية.',
        features: [
          'تقييم الشهادات والخبرات وتنسيق الترجمة المعتمدة',
          'متابعة شاملة لإجراءات تعديل المؤهل الطبي (Defizitbescheid)',
          'المواءمة مع مستشفيات ألمانية موثوقة ذات بيئة عمل احترافية',
          'دعم كامل لملف التأشيرة في السفارة الألمانية والاستقبال هناك'
        ],
        cta: 'استكشف خدمات التوظيف'
      }
    },
    nurses: {
      badge: 'مسار التمريض المخصص',
      title: 'مسار واضح ومدروس لمهنتك التمريضية في ألمانيا',
      subtitle:
        'خطة عمل شفافة مكونة من 8 مراحل مصممة خصيصاً لأخصائيي وأخصائيات التمريض.',
      steps: [
        {
          number: '01',
          title: 'تقييم الملف الأولي',
          desc: 'دراسة شاملة لشهادة البكالوريوس في التمريض وسنوات الخبرة العملية لتحديد المسار الأنسب.'
        },
        {
          number: '02',
          title: 'مراجعة وتجهيز الوثائق',
          desc: 'تدقيق الشهادات، وبيان الدرجات، وساعات التدريب السريري، وترجمتها رسمياً للألمانية.'
        },
        {
          number: '03',
          title: 'الإعداد اللغوي التخصصي',
          desc: 'دراسة مكثفة للغة الألمانية حتى مستوى B2 مع التركيز على لغة التمريض اليومية ومصطلحات المستشفى.'
        },
        {
          number: '04',
          title: 'إجراءات تعديل الشهادة',
          desc: 'تقديم الملف للسلطات الصحية الرسمية في الولاية الألمانية لإصدار إشعار المعادلة (Bescheid).'
        },
        {
          number: '05',
          title: 'مطابقة جهة العمل',
          desc: 'عرض ملفك المهني على مستشفيات ومراكز طبية ألمانية مرموقة تبحث عن كفاءات تمريضية مؤهلة.'
        },
        {
          number: '06',
          title: 'التحضير للمقابلات',
          desc: 'تدريب عملي ومحاكاة لمقابلات العمل عبر الإنترنت مع مديري التمريض في المستشفيات الألمانية.'
        },
        {
          number: '07',
          title: 'إعداد ملف التأشيرة',
          desc: 'تجهيز عقد العمل الرسمي، وموافقة وكالة العمل الاتحادية (ZAV)، والمستندات للسفارة الألمانية بالقاهرة.'
        },
        {
          number: '08',
          title: 'السفر والاندماج بألمانيا',
          desc: 'المساعدة في ترتيبات السكن، وإجراءات التسجيل الرسمية في البلدية، وبدء التدريب التوجيهي.'
        }
      ]
    },
    whyGermany: {
      badge: 'وجهتك القادمة',
      title: 'لماذا تبني مستقبلك المهني في ألمانيا؟',
      subtitle:
        'توفر ألمانيا أحد أفضل وأكثر أنظمة الرعاية الصحية تطوراً وتنظيماً في العالم مع استقرار مهني طويل الأمد.',
      reasons: [
        {
          title: 'منظومة رعاية صحية عالمية',
          desc: 'العمل بأحدث التقنيات الطبية والمعدات المتطورة وسط فرق عمل طبية متعددة التخصصات.'
        },
        {
          title: 'تطوير وتدريب مهني مستمر',
          desc: 'فرص حقيقية ودورات تخصصية معتمدة للترقي في مجالات الرعاية المركزة، والعمليات، وإدارة التمريض.'
        },
        {
          title: 'حماية اجتماعية ورواتب عادلة',
          desc: 'ساعات عمل محددة بدقة، وتأمين صحي واجتماعي شامل، وخضوع للأجور النقابية المنظمة (TVöD).'
        },
        {
          title: 'مسار إقامة واستقرار مستدام',
          desc: 'قوانين هجرة كفاءات مرنة ومحددة تتيح لك الحصول على الإقامة الدائمة والجنسية على المدى الطويل.'
        }
      ],
      cairoBridgeTitle: 'من القاهرة إلى ألمانيا',
      cairoBridgeDesc:
        'لغة جديدة. بيئة جديدة. فصل مهني مميز. فريقنا الثنائي في القاهرة وألمانيا يضمن لك وضوح كل خطوة بدون غموض أو وعود وهمية.',
      cairoBridgeCta: 'تحدث مع مستشارنا الآن'
    },
    timeline: {
      badge: 'مراحل الرحلة',
      title: 'رحلتك خطوة بخطوة مع Zukunft24',
      subtitle:
        'وضوح تام في كل مرحلة، بدقة والتزام ألمانيين من الاستشارة الأولى وحتى وصولك واستقرارك.',
      steps: [
        { step: '01', title: 'الاستشارة المبدئية', desc: 'جلسة توجيهية لفهم مؤهلاتك وتطلعاتك وشرح الشروط والمتطلبات بموضوعية.' },
        { step: '02', title: 'تقييم الشهادات', desc: 'فحص تفصيلي للمقررات وساعات التدريب السريري ومستوى اللغة الحالي.' },
        { step: '03', title: 'دراسة اللغة الألمانية', desc: 'الانضمام لكورسات مركز Zentrum für Deutsch في القاهرة بإشراف نخبة من المعلمين.' },
        { step: '04', title: 'توثيق وترجمة الأوراق', desc: 'إرشاد دقيق لتوثيق الأوراق من الخارجية وتصديقها وترجمتها ترجمة محلفة.' },
        { step: '05', title: 'تقديم طلب المعادلة', desc: 'إرسال الملف رسمياً للولاية الألمانية المعنية للحصول على إشعار المعادلة.' },
        { step: '06', title: 'المواءمة مع المستشفيات', desc: 'تحديد فرص التوظيف المناسبة في شبكة المستشفيات والمراكز الصحية الشريكة.' },
        { step: '07', title: 'المقابلات وعقد العمل', desc: 'إجراء المقابلة وتوقيع عقد عمل قانوني خاضع لقوانين العمل الألمانية.' },
        { step: '08', title: 'ملف السفارة والتأشيرة', desc: 'استيفاء اشتراطات السفارة الألمانية بالقاهرة ومتابعة استخراج التأشيرة.' },
        { step: '09', title: 'الوصول وبدء العمل', desc: 'الاستقبال وتنسيق السكن وبدء مسيرتك المهنية بثقة واستقرار.' }
      ]
    },
    benefits: {
      badge: 'لماذا Zukunft24؟',
      title: 'الدقة، والشفافية، والالتزام المهني',
      subtitle:
        'لا نبيع وعوداً سريعة، بل نبني مساراً مهنياً حقيقياً قائماً على أسس نظامية وواقعية.',
      items: [
        {
          title: 'إرشاد شخصي ومستمر',
          desc: 'دعم فردي مخصص لكل متقدم يناسب مؤهلاته الجامعية وتاريخه المهني.'
        },
        {
          title: 'تركيز لغوي متخصص',
          desc: 'إعداد لغوي عملي مصمم لتسهيل التواصل اليومي داخل المستشفيات والمؤسسات الطبية الألمانية.'
        },
        {
          title: 'رؤية مهنية طويلة الأمد',
          desc: 'هدفنا استقرارك وتطورك المهني في ألمانيا وليس مجرد السفر المؤقت.'
        },
        {
          title: 'مسار منظم ومحدد',
          desc: 'مراحل واضحة تتبع جدولاً زمنياً منطقياً وشفافاً بعيداً عن الغموض.'
        },
        {
          title: 'حضور بين مصر وألمانيا',
          desc: 'فريق عمل متواجد بين القاهرة وألمانيا لتذليل العقبات وتسهيل الإجراءات في الجانبين.'
        },
        {
          title: 'تواصل دائم وسريع',
          desc: 'قنوات اتصال مباشرة عبر واتساب والمكالمات الهاتفية للإجابة على استفساراتك باستمرار.'
        }
      ]
    },
    testimonials: {
      badge: 'قصص نجاح واقعية',
      title: 'تجارب كوادر بدأت رحلتها معنا',
      subtitle:
        'نماذج حقيقية تعكس واقع التحضير والسفر والعمل في المستشفيات الألمانية.',
      disclaimer: 'تجارب تمثل نماذج للمسار المهني. نجاح أي مرشح يعتمد بالأساس على جديته في تعلم اللغة واجتياز المتطلبات القانونية للجهات الرسمية.',
      items: [
        {
          quote:
            'التدريب على مصطلحات التمريض الألمانية فارق جداً في عملي الحالي في بون. كنت على دراية تامة بكيفية كتابة التقارير وتسليم الحالات من اليوم الأول.',
          author: 'سارة منصور',
          role: 'أخصائية تمريض عناية مركزة',
          location: 'بون، ألمانيا'
        },
        {
          quote:
            'تعاملت مع Zukunft24 بعد تجارب مع مكاتب أعطتني وعوداً غير دقيقة. هنا شرحوا لي خطوات المعادلة بكل أمانة، وحالياً أعمل في مستشفى جامعي بفرانكفورت.',
          author: 'أحمد السيد',
          role: 'ممرض عمليات متخصص',
          location: 'فرانكفورت، ألمانيا'
        },
        {
          quote:
            'تعلم اللغة من البداية وحتى مستوى B2 تطلب جهداً والتزاماً، لكن أساتذة مركز اللغة بالقاهرة أهلونا بشكل متميز لاجتياز امتحان telc بنجاح.',
          author: 'محمود فاروق',
          role: 'أخصائي تمريض عام',
          location: 'دوسلدورف، ألمانيا'
        }
      ]
    },
    faq: {
      badge: 'الأسئلة المتكررة',
      title: 'إجابات واضحة لجميع تساؤلاتك',
      subtitle: 'إجابات مباشرة ودقيقة حول متطلبات اللغة، إجراءات المعادلة، وشروط التوظيف في ألمانيا.',
      items: [
        {
          q: 'من هم المؤهلون للتقديم على برنامج التوظيف؟',
          a: 'نركز بشكل رئيسي على خريجي كليات التمريض (بكالوريوس تمريض) والكوادر الصحية المؤهلة التي تمتلك الرغبة الجادة والالتزام الكامل بتعلم اللغة الألمانية حتى المستوى المطلوب.'
        },
        {
          q: 'ما هو مستوى اللغة الألمانية المطلوب للعمل كتمريض؟',
          a: 'يشترط للحصول على ترخيص مزاولة المهنة والعمل في ألمانيا الحصول على شهادة B2 معتمدة (مثل telc B2 Pflege أو Goethe B2). يبدأ مركزنا بتدريبك من مستوى الصفر A1 وحتى المستويات المتقدمة.'
        },
        {
          q: 'هل يشترط وجود سنوات خبرة سابقة؟',
          a: 'يمكن للخريجين الجدد التقديم، ولكن توفر خبرة سريرية في مستشفى لمدة سنة أو سنتين يمنح الملف قوة وسرعة في استكمال إجراءات المعادلة من قبل اللجان الطبية في ألمانيا.'
        },
        {
          q: 'كيف تتم عملية معادلة الشهادة (Anerkennung)؟',
          a: 'يتم فحص عدد الساعات الدراسية والتدريبية للبكالوريوس ومقارنتها بالمنهج الألماني، وتصدر وزارة الصحة في الولاية الألمانية إشعار المعادلة (Defizitbescheid) موضحاً به المطابقة أو متطلبات استكمال التعديل.'
        },
        {
          q: 'هل تقدمون المساعدة في ترجمة وتوثيق الأوراق؟',
          a: 'نعم، نوجهك تفصيلياً لكيفية توثيق الشهادات من وزارة الخارجية المصرية، ونتعاون مع مترجمين محلفين ومعتمدين لدى السلطات الألمانية لضمان قبول الأوراق دون أي نقص.'
        },
        {
          q: 'هل تقدم الشركة ضماناً للحصول على الوظيفة أو التأشيرة؟',
          a: 'لا توجد جهة محترمة وقانونية تضمن التأشيرة؛ لأن منح التأشيرة حق سيادي حصري للسفارة الألمانية بالقاهرة، والتوظيف يعتمد على اجتياز المقابلة واكتمال شروطك. دورنا هو إعدادك وتأهيلك وتوفير الفرص والشروط الصحيحة بنسبة 100%.'
        },
        {
          q: 'كيف تتم المواءمة مع المستشفيات الألمانية؟',
          a: 'بعد وصولك لمستوى لغوي مناسب وتجهيز ملفك، نقوم بتنسيق مقابلات مباشرة عبر الإنترنت مع إدارات التمريض في مستشفيات ومراكز صحية ذات بيئة داعمة وسمعة ممتازة.'
        },
        {
          q: 'هل تقدمون الدعم في إيجاد السكن في ألمانيا؟',
          a: 'نعم، توفر المستشفيات الشريكة في الغالب سكناً مخصصاً للأطقم التمريضية أو شققاً مجهزة بأسعار مناسبة، كما نتابع معك إجراءات تسجيل السكن (Anmeldung) والتأمين الصحي هناك.'
        },
        {
          q: 'كيف يمكنني التواصل المباشر مع Zukunft24؟',
          a: 'يمكنك التواصل معنا فوراً عبر رقم الواتساب الرسمي المباشر (01005747953 أو +201005747953)، أو ملء استمارة الموقع، أو زيارة مقرنا بالقاهرة بعد حجز موعد استشاري.'
        }
      ]
    },
    contact: {
      badge: 'تواصل معنا',
      title: 'ابدأ خطوتك الأولى اليوم',
      subtitle: 'احجز جلستك الاستشارية أو سجل في الدفعة القادمة من دورات اللغة الألمانية.',
      cairoOffice: 'مقر القاهرة',
      cairoAddress: 'مدينة نصر / القاهرة الجديدة، محافظة القاهرة، جمهورية مصر العربية',
      germanyOffice: 'شبكتنا في ألمانيا',
      germanyAddress: 'شراكات مع مستشفيات ومراكز رعاية في شمال الراين، هسن، وبافاريا',
      phoneLabel: 'الهاتف والواتساب',
      emailLabel: 'البريد الإلكتروني الرسمي',
      whatsappCardTitle: 'خط واتساب المباشر',
      whatsappCardDesc: 'تحدث فوراً وبشكل مباشر مع فريق الإرشاد الأكاديمي والتوظيف في القاهرة.',
      whatsappCardBtn: 'محادثة عبر واتساب',
      form: {
        name: 'الاسم بالكامل',
        phone: 'رقم الهاتف / الواتساب',
        email: 'البريد الإلكتروني',
        service: 'الخدمة المطلوبة',
        message: 'مؤهلك وسنوات الخبرة أو أي استفسار',
        submit: 'إرسال الطلب',
        sending: 'جاري الإرسال...',
        successTitle: 'تم استلام طلبك بنجاح!',
        successMsg: 'شكراً لاهتمامك. سيقوم فريق Zukunft24 بمراجعة بياناتك والتواصل معك عبر الواتساب أو الهاتف في أقرب وقت.',
        options: {
          courses: 'دورات مركز اللغة الألمانية (Zentrum für Deutsch)',
          nursing: 'برنامج توظيف التمريض في ألمانيا',
          generalRecruitment: 'توظيف الكوادر الطبية المتخصصة',
          general: 'استفسارات ومعلومات عامة'
        }
      }
    },
    footer: {
      desc: 'تجمع Zukunft24 بين التدريب الاحترافي المتخصص في اللغة الألمانية وبين توظيف الكوادر التمريضية وفق مسارات قانونية ومستدامة من القاهرة إلى ألمانيا.',
      navigationHeader: 'روابط سريعة',
      servicesHeader: 'خدماتنا',
      contactHeader: 'بيانات التواصل',
      rights: 'جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      imprint: 'بيانات النشر (Impressum)',
      terms: 'الشروط والأحكام'
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('zk_lang') as Language;
      if (savedLang && ['en', 'de', 'ar'].includes(savedLang)) {
        return savedLang;
      }
    }
    return 'en';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('zk_theme') as Theme;
      if (savedTheme && ['light', 'dark'].includes(savedTheme)) {
        return savedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'nursing',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sync language with localStorage & document attributes
  useEffect(() => {
    localStorage.setItem('zk_lang', lang);
    const dir = content[lang].meta.dir;
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang]);

  // Sync theme with localStorage & document class
  useEffect(() => {
    localStorage.setItem('zk_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Navbar scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = useMemo(() => content[lang], [lang]);
  const isRtl = t.meta.dir === 'rtl';

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    setMobileMenuOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate professional API payload handling
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'nursing',
        message: ''
      });
    }, 1000);
  };

  // WhatsApp click handler
  const openWhatsApp = (customMsg?: string) => {
    const message = customMsg
      ? encodeURIComponent(customMsg)
      : encodeURIComponent(
          lang === 'ar'
            ? 'مرحباً، أود الاستفسار عن برامج Zukunft24 لدراسة اللغة الألمانية وفرص توظيف التمريض.'
            : lang === 'de'
            ? 'Guten Tag, ich interessiere mich für die Deutschkurse und Pflegekräfte-Vermittlung von Zukunft24.'
            : 'Hello, I would like to inquire about Zukunft24 German language courses and healthcare recruitment.'
        );
    window.open(`https://wa.me/201005747953?text=${message}`, '_blank');
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#0b1120] text-slate-100'
          : 'bg-[#fafafa] text-slate-900'
      }`}
      dir={t.meta.dir}
    >
      {/* Top Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? theme === 'dark'
              ? 'bg-[#0f172a]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-slate-800'
              : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          {/* Brand Logo & Subtitle */}
          <a
            href="#home"
            className="flex flex-col group focus:outline-none"
            aria-label="Zukunft24 Home"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-extrabold tracking-tight font-sans">
                Zukunft<span className="text-red-600">24</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block mb-1 group-hover:scale-125 transition-transform" />
            </div>
            <span
              className={`text-[10px] md:text-xs tracking-wider uppercase font-medium transition-colors ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {t.meta.brandTagline}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 rtl:space-x-reverse text-sm font-medium">
            <a
              href="#about"
              className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              {t.nav.about}
            </a>
            <a
              href="#services"
              className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              {t.nav.courses}
            </a>
            <a
              href="#nurses"
              className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              {t.nav.nurses}
            </a>
            <a
              href="#why-germany"
              className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              {t.nav.germany}
            </a>
            <a
              href="#timeline"
              className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              {t.nav.recruitment}
            </a>
            <a
              href="#faq"
              className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              {t.nav.faq}
            </a>
            <a
              href="#contact"
              className="text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Controls: Language Pills, Theme Toggle, CTA */}
          <div className="hidden sm:flex items-center space-x-3 rtl:space-x-reverse">
            {/* Language Selector Pills */}
            <div
              className={`p-1 rounded-full flex items-center text-xs font-semibold border ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-700/80'
                  : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'en'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('de')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'de'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="Switch to German"
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => handleLanguageChange('ar')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  lang === 'ar'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                aria-label="التبديل إلى العربية"
              >
                عربي
              </button>
            </div>

            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              aria-label={
                theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            {/* Quick Consultation CTA */}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white shadow-sm transition-all"
            >
              <span>{t.nav.consultationCTA}</span>
              {isRtl ? (
                <ArrowLeft className="w-3.5 h-3.5" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center space-x-2 rtl:space-x-reverse">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Theme toggle"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            className={`lg:hidden px-4 pt-3 pb-6 border-b transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-950/95 border-slate-800 backdrop-blur-md'
                : 'bg-white/95 border-slate-200 backdrop-blur-md'
            }`}
          >
            <div className="flex flex-col space-y-3 font-medium text-sm">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                {t.nav.about}
              </a>
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                {t.nav.courses}
              </a>
              <a
                href="#nurses"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                {t.nav.nurses}
              </a>
              <a
                href="#why-germany"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                {t.nav.germany}
              </a>
              <a
                href="#timeline"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                {t.nav.recruitment}
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                {t.nav.faq}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60"
              >
                {t.nav.contact}
              </a>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">
                  Language / Sprache / اللغة
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleLanguageChange('en')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lang === 'en'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageChange('de')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lang === 'de'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    DE
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageChange('ar')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      lang === 'ar'
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    عربي
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openWhatsApp();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp: 01005747953</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {}
      <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle overlay gradient: guaranteed contrast without obscuring */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-b from-[#0b1120]/80 via-[#0b1120]/70 to-[#0b1120]'
                : 'bg-gradient-to-b from-white/80 via-white/65 to-[#fafafa]'
            }`}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Pill Label */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 shadow-sm border backdrop-blur-md ${
              theme === 'dark'
                ? 'bg-slate-900/80 border-slate-700/60 text-slate-300'
                : 'bg-white/85 border-slate-200/90 text-slate-800'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>{t.hero.pill}</span>
          </div>

          {/* Overlapping Editorial Typography */}
          <div className="flex flex-col items-center select-none">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-none text-slate-900 dark:text-white">
              {t.hero.line1}
            </h1>
            <h2 className="-mt-2 sm:-mt-3 md:-mt-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-red-600 dark:text-red-500">
              {t.hero.line2}
            </h2>
          </div>

          {/* Subtitle */}
          <p
            className={`mt-6 text-base sm:text-lg md:text-xl max-w-2xl font-normal leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            {t.hero.subtitle}
          </p>

          {/* Dual CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-3.5 rounded-full text-sm font-semibold bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 shadow-lg shadow-black/10 transition-transform active:scale-95 flex items-center gap-2"
            >
              <span>{t.hero.primaryCta}</span>
              {isRtl ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </a>

            <a
              href="#services"
              className={`px-7 py-3.5 rounded-full text-sm font-semibold border backdrop-blur-sm transition-all ${
                theme === 'dark'
                  ? 'bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'bg-white/80 border-slate-300 text-slate-800 hover:bg-white shadow-sm'
              }`}
            >
              {t.hero.secondaryCta}
            </a>
          </div>

          {/* Subtly Framed Trust Statement */}
          <div className="mt-10 flex items-center justify-center gap-2 text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">
            <span className="w-8 h-px bg-slate-300 dark:bg-slate-700" />
            <span>{t.hero.trustStatement}</span>
            <span className="w-8 h-px bg-slate-300 dark:bg-slate-700" />
          </div>
        </div>
      </section>

      {}
      <section
        id="about"
        className={`py-24 border-t ${
          theme === 'dark'
            ? 'bg-[#0f172a]/50 border-slate-800/80'
            : 'bg-white border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-red-600 dark:text-red-400 uppercase">
                <Compass className="w-4 h-4" />
                <span>{t.about.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {t.about.title}
              </h2>
              <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {t.about.desc1}
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {t.about.desc2}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  type="button"
                  onClick={() => openWhatsApp()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{t.contact.whatsappCardBtn}</span>
                </button>
                <a
                  href="#why-germany"
                  className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>{t.whyGermany.badge}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-3 h-3" />
                  ) : (
                    <ArrowRight className="w-3 h-3" />
                  )}
                </a>
              </div>
            </div>

            {/* Right Metrics Grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="text-4xl font-extrabold text-red-600 dark:text-red-500 mb-1">
                  {t.about.stat1Number}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t.about.stat1Label}
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-1">
                  {t.about.stat2Number}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t.about.stat2Label}
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="text-4xl font-extrabold text-slate-900 dark:text-white mb-1">
                  {t.about.stat3Number}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t.about.stat3Label}
                </div>
              </div>

              <div
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="text-4xl font-extrabold text-red-600 dark:text-red-500 mb-1">
                  {t.about.stat4Number}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t.about.stat4Label}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
              {t.services.badge}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.services.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Service 01: Zentrum für Deutsch */}
            <div
              className={`p-8 lg:p-10 rounded-3xl border flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider bg-red-600/10 text-red-600 dark:text-red-400 dark:bg-red-500/10">
                    {t.services.service1.tag}
                  </span>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {t.services.service1.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.services.service1.desc}
                </p>

                <div className="mt-6 space-y-3">
                  {t.services.service1.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="#contact"
                  className="w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-900 text-white dark:bg-slate-800 dark:hover:bg-slate-700 hover:bg-slate-800 flex items-center justify-center gap-2 transition-colors"
                >
                  <span>{t.services.service1.cta}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </a>
              </div>
            </div>

            {/* Service 02: Personalvermittlung */}
            <div
              className={`p-8 lg:p-10 rounded-3xl border flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl ${
                theme === 'dark'
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider bg-blue-600/10 text-blue-600 dark:text-blue-400 dark:bg-blue-500/10">
                    {t.services.service2.tag}
                  </span>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {t.services.service2.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t.services.service2.desc}
                </p>

                <div className="mt-6 space-y-3">
                  {t.services.service2.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="#nurses"
                  className="w-full py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>{t.services.service2.cta}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section
        id="nurses"
        className={`py-24 border-y ${
          theme === 'dark'
            ? 'bg-[#0f172a]/60 border-slate-800'
            : 'bg-slate-50 border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
              {t.nurses.badge}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.nurses.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              {t.nurses.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.nurses.steps.map((step, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-sm hover:shadow-md ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-slate-300 dark:text-slate-700 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {step.number}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-red-600 transition-colors" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <span>Zukunft24 Protocol</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 transition-colors" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() =>
                openWhatsApp(
                  lang === 'ar'
                    ? 'مرحباً، أنا أخصائي تمريض وأرغب في تقييم ملفي المهني وفرص العمل في ألمانيا.'
                    : lang === 'de'
                    ? 'Guten Tag, ich bin Pflegefachkraft und möchte mein Profil für Deutschland prüfen lassen.'
                    : 'Hello, I am a qualified nurse seeking profile assessment for employment in Germany.'
                )
              }
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.contact.whatsappCardBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {}
      <section id="why-germany" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
              {t.whyGermany.badge}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.whyGermany.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              {t.whyGermany.subtitle}
            </p>
          </div>

          {/* 4 Reasons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {t.whyGermany.reasons.map((reason, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-600 dark:bg-red-500/10 dark:text-red-400 flex items-center justify-center font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {reason.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Cairo to Germany Editorial Banner */}
          <div
            className={`relative rounded-3xl p-8 sm:p-12 overflow-hidden border ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border-slate-800'
                : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-slate-900'
            }`}
          >
            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400">
                <Plane className="w-4 h-4" />
                <span>Cairo · Deutschland</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {t.whyGermany.cairoBridgeTitle}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {t.whyGermany.cairoBridgeDesc}
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-white text-slate-900 hover:bg-slate-100 transition-all shadow"
                >
                  <span>{t.whyGermany.cairoBridgeCta}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section
        id="timeline"
        className={`py-24 border-y ${
          theme === 'dark'
            ? 'bg-[#0f172a]/70 border-slate-800'
            : 'bg-slate-50 border-slate-200/90'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
              {t.timeline.badge}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.timeline.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              {t.timeline.subtitle}
            </p>
          </div>

          <div className="relative">
            {/* Steps Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.timeline.steps.map((st, idx) => {
                const isActive = activeTimelineStep === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveTimelineStep(idx)}
                    className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                      isActive
                        ? theme === 'dark'
                          ? 'bg-slate-800 border-red-500/80 shadow-lg shadow-red-950/20'
                          : 'bg-white border-red-500 shadow-md ring-2 ring-red-500/20'
                        : theme === 'dark'
                        ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                          isActive
                            ? 'bg-red-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        Step {st.step}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? 'bg-red-600' : 'bg-transparent'
                        }`}
                      />
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">
                      {st.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
              {t.benefits.badge}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.benefits.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              {t.benefits.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.benefits.items.map((benefit, idx) => {
              const icons = [
                <Users className="w-6 h-6 text-red-600" />,
                <BookOpen className="w-6 h-6 text-red-600" />,
                <Briefcase className="w-6 h-6 text-red-600" />,
                <ShieldCheck className="w-6 h-6 text-red-600" />,
                <Globe className="w-6 h-6 text-red-600" />,
                <HeartHandshake className="w-6 h-6 text-red-600" />
              ];
              return (
                <div
                  key={idx}
                  className={`p-8 rounded-2xl border transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                    {icons[idx % icons.length]}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section
        className={`py-24 border-t ${
          theme === 'dark'
            ? 'bg-[#0f172a]/50 border-slate-800'
            : 'bg-slate-50/80 border-slate-200/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
              {t.testimonials.badge}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.testimonials.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {t.testimonials.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.testimonials.items.map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-3xl border flex flex-col justify-between transition-all ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  <div className="text-4xl text-red-600 font-serif mb-4 leading-none">
                    “
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 italic leading-relaxed">
                    {item.quote}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.author}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.role}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500 max-w-2xl mx-auto">
            {t.testimonials.disclaimer}
          </p>
        </div>
      </section>

      {}
      <section id="faq" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
              {t.faq.badge}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.faq.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              {t.faq.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {t.faq.items.map((item, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? theme === 'dark'
                        ? 'bg-slate-900/90 border-slate-700 shadow-md'
                        : 'bg-white border-slate-300 shadow-sm'
                      : theme === 'dark'
                      ? 'bg-slate-900/40 border-slate-800'
                      : 'bg-white/70 border-slate-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left rtl:text-right flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {item.q}
                    </span>
                    <div
                      className={`p-1.5 rounded-full shrink-0 ${
                        isOpen
                          ? 'bg-red-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section
        id="contact"
        className={`py-24 border-t ${
          theme === 'dark'
            ? 'bg-[#0f172a]/80 border-slate-800'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
              {t.contact.badge}
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {t.contact.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Details & WhatsApp Card (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* WhatsApp Highlight Box */}
              <div
                className={`p-8 rounded-3xl border transition-all ${
                  theme === 'dark'
                    ? 'bg-emerald-950/20 border-emerald-800/60'
                    : 'bg-emerald-50/80 border-emerald-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {t.contact.whatsappCardTitle}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      01005747953 · +201005747953
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6">
                  {t.contact.whatsappCardDesc}
                </p>
                <button
                  type="button"
                  onClick={() => openWhatsApp()}
                  className="w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.contact.whatsappCardBtn}</span>
                </button>
              </div>

              {/* Office Locations */}
              <div
                className={`p-8 rounded-3xl border ${
                  theme === 'dark'
                    ? 'bg-slate-900/60 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <h4 className="text-base font-bold text-slate-900 dark:text-white mb-6">
                  Zukunft24 Network
                </h4>

                <div className="space-y-6 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {t.contact.cairoOffice}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs">
                        {t.contact.cairoAddress}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {t.contact.germanyOffice}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs">
                        {t.contact.germanyAddress}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <PhoneCall className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {t.contact.phoneLabel}
                      </span>
                      <a
                        href="tel:+201005747953"
                        className="text-slate-500 dark:text-slate-400 text-xs hover:text-red-600"
                      >
                        01005747953 (+201005747953)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {t.contact.emailLabel}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 text-xs">
                        info@zukunft24.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Contact Form (7 cols) */}
            <div className="lg:col-span-7">
              <div
                className={`p-8 sm:p-10 rounded-3xl border ${
                  theme === 'dark'
                    ? 'bg-slate-900/90 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                {formSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-600/10 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {t.contact.form.successTitle}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                      {t.contact.form.successMsg}
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 px-6 py-2.5 rounded-full text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.contact.form.name} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder={
                          lang === 'ar'
                            ? 'أحمد محمد'
                            : lang === 'de'
                            ? 'Max Mustermann'
                            : 'John Doe'
                        }
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-800/80 border-slate-700 text-white focus:border-red-500'
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-red-500'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          {t.contact.form.phone} *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={e =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="01005747953"
                          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                            theme === 'dark'
                              ? 'bg-slate-800/80 border-slate-700 text-white focus:border-red-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-red-500'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                          {t.contact.form.email} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="name@example.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                            theme === 'dark'
                              ? 'bg-slate-800/80 border-slate-700 text-white focus:border-red-500'
                              : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-red-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.contact.form.service} *
                      </label>
                      <select
                        value={formData.service}
                        onChange={e =>
                          setFormData({ ...formData, service: e.target.value })
                        }
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-800/80 border-slate-700 text-white focus:border-red-500'
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-red-500'
                        }`}
                      >
                        <option value="courses">
                          {t.contact.form.options.courses}
                        </option>
                        <option value="nursing">
                          {t.contact.form.options.nursing}
                        </option>
                        <option value="generalRecruitment">
                          {t.contact.form.options.generalRecruitment}
                        </option>
                        <option value="general">
                          {t.contact.form.options.general}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        {t.contact.form.message}
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={e =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder={
                          lang === 'ar'
                            ? 'اكتب نبذة عن مؤهلك وسنوات خبرتك وأي استفسار ترغب في توضيحه...'
                            : lang === 'de'
                            ? 'Beschreiben Sie Ihren beruflichen Hintergrund oder Ihre Fragen...'
                            : 'Share your background, nursing experience, or specific questions...'
                        }
                        className={`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
                          theme === 'dark'
                            ? 'bg-slate-800/80 border-slate-700 text-white focus:border-red-500'
                            : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-red-500'
                        }`}
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        <span>
                          {isSubmitting
                            ? t.contact.form.sending
                            : t.contact.form.submit}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openWhatsApp()}
                        className="py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm border border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer
        className={`border-t pt-16 pb-12 transition-colors ${
          theme === 'dark'
            ? 'bg-slate-950 border-slate-800 text-slate-400'
            : 'bg-white border-slate-200 text-slate-600'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Col 1 & 2: Branding */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Zukunft<span className="text-red-600">24</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block mb-1" />
              </div>
              <p className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                {t.meta.brandTagline}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed max-w-sm">
                {t.footer.desc}
              </p>
            </div>

            {/* Col 3: Navigation */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                {t.footer.navigationHeader}
              </h5>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a href="#home" className="hover:text-red-600 transition-colors">
                    {t.nav.home}
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-red-600 transition-colors">
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a href="#nurses" className="hover:text-red-600 transition-colors">
                    {t.nav.nurses}
                  </a>
                </li>
                <li>
                  <a href="#why-germany" className="hover:text-red-600 transition-colors">
                    {t.nav.germany}
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-red-600 transition-colors">
                    {t.nav.faq}
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 4: Services */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                {t.footer.servicesHeader}
              </h5>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a href="#services" className="hover:text-red-600 transition-colors">
                    Zentrum für Deutsch
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-red-600 transition-colors">
                    Personalvermittlung
                  </a>
                </li>
                <li>
                  <a href="#nurses" className="hover:text-red-600 transition-colors">
                    Pflegedeutsch B1 / B2
                  </a>
                </li>
                <li>
                  <a href="#timeline" className="hover:text-red-600 transition-colors">
                    Anerkennungsverfahren
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 5: Contact summary */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
                {t.footer.contactHeader}
              </h5>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-red-600" />
                  <span>01005747953</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>Cairo & Germany</span>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => openWhatsApp()}
                    className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold text-xs hover:underline mt-1"
                  >
                    <span>WhatsApp Direct (+201005747953)</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Legal */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
            <div>
              © 2026 Zukunft24. {t.footer.rights}
            </div>
            <div className="flex items-center space-x-6 rtl:space-x-reverse text-slate-500">
              <a href="#contact" className="hover:underline">
                {t.footer.privacy}
              </a>
              <a href="#contact" className="hover:underline">
                {t.footer.imprint}
              </a>
              <a href="#contact" className="hover:underline">
                {t.footer.terms}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {}
      <aside
        className={`fixed bottom-6 ${
          isRtl ? 'left-6' : 'right-6'
        } z-50 flex items-center gap-3`}
      >
        <button
          type="button"
          onClick={() => openWhatsApp()}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 text-white shadow-xl hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
          aria-label="Direct WhatsApp Contact (+201005747953)"
        >
          {/* Subtle pulse effect */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping opacity-75 pointer-events-none" />
          <MessageSquare className="w-7 h-7 relative z-10" />

          {/* Hover Tooltip */}
          <span
            className={`absolute ${
              isRtl ? 'left-16' : 'right-16'
            } hidden sm:group-hover:inline-block px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap shadow-lg pointer-events-none transition-opacity`}
          >
            01005747953 · WhatsApp
          </span>
        </button>
      </aside>
    </div>
  );
}