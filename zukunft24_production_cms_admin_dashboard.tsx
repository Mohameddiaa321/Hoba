import React, { useState, useEffect, useMemo, useId } from 'react';
import {
  LayoutDashboard,
  FileText,
  Video,
  GraduationCap,
  Stethoscope,
  Clock,
  MessageSquare,
  HelpCircle,
  Users,
  Palette,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  Search,
  Globe,
  Sun,
  Moon,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Building2,
  PhoneCall,
  Mail,
  Eye,
  Save,
  RotateCcw,
  Sparkles,
  Sliders,
  Send,
  Filter,
  CheckCheck,
  Copy,
  Lock,
  UserCheck,
  MessageCircle,
  Menu,
  Briefcase
} from 'lucide-react';

type Role = 'Super Admin' | 'Content Manager' | 'Recruitment Manager' | 'Support Manager';
type AdminLang = 'en' | 'de' | 'ar';
type AdminTheme = 'light' | 'dark';

interface UserSession {
  email: string;
  name: string;
  role: Role;
  avatar: string;
}

interface MultilingualString {
  en: string;
  de: string;
  ar: string;
}

interface ServiceItem {
  id: string;
  tag: MultilingualString;
  title: MultilingualString;
  desc: MultilingualString;
  features: { en: string[]; de: string[]; ar: string[] };
  ctaText: MultilingualString;
  ctaUrl: string;
  iconName: string;
  published: boolean;
}

interface CourseItem {
  id: string;
  level: string; // A1, A2, B1, B2, B1/B2 Pflege
  title: MultilingualString;
  duration: MultilingualString;
  format: MultilingualString;
  desc: MultilingualString;
  price: string;
  published: boolean;
}

interface PipelineStage {
  id: string;
  number: string;
  title: MultilingualString;
  desc: MultilingualString;
  icon: string;
}

interface TestimonialItem {
  id: string;
  author: string;
  role: MultilingualString;
  location: string;
  quote: MultilingualString;
  isPlaceholder: boolean;
  rating: number;
  published: boolean;
}

interface FAQItem {
  id: string;
  category: string;
  q: MultilingualString;
  a: MultilingualString;
  published: boolean;
}

interface LeadRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Archived';
  date: string;
  adminNotes: string;
}

interface CommentItem {
  id: string;
  author: string;
  email: string;
  content: string;
  article: string;
  status: 'Pending' | 'Approved' | 'Hidden';
  date: string;
}

interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string;
  size: string;
  uploadedAt: string;
}

interface ActivityLog {
  id: string;
  adminUser: string;
  action: string;
  entity: string;
  timestamp: string;
}

interface BrandColors {
  primaryNavy: string;
  germanRed: string;
  surfaceLight: string;
  bgLight: string;
  bgDark: string;
  textLight: string;
  textDark: string;
}

const INITIAL_COLORS: BrandColors = {
  primaryNavy: '#0F172A',
  germanRed: '#DC2626',
  surfaceLight: '#FFFFFF',
  bgLight: '#FAFAFA',
  bgDark: '#0B1120',
  textLight: '#0F172A',
  textDark: '#F8FAFC'
};

const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    tag: { en: 'Service 01', de: 'Fachbereich 01', ar: 'الخدمة الأولى' },
    title: {
      en: 'Zentrum für Deutsch',
      de: 'Zentrum für Deutsch',
      ar: 'مركز اللغة الألمانية (Zentrum für Deutsch)'
    },
    desc: {
      en: 'Comprehensive German language education focused on linguistic fluency, exam success, and clinical terminology.',
      de: 'Strukturierte Sprachausbildung mit Fokus auf Alltagssicherheit, Prüfungen und Fachsprache für Pflegekräfte.',
      ar: 'تعليم لغوي منظم وشامل يركز على إتقان التحدث، والنجاح في الامتحانات الرسمية، ومصطلحات التمريض التخصصية.'
    },
    features: {
      en: ['CEFR Intensive courses (A1 to C1)', 'Specialized Pflegedeutsch', 'Goethe & telc preparation', 'Cultural onboarding'],
      de: ['GER Intensivkurse (A1 bis C1)', 'Spezifisches Pflegedeutsch', 'Vorbereitung telc & Goethe', 'Interkulturelles Coaching'],
      ar: ['دورات مكثفة (A1 حتى C1)', 'ألماني طبي وتمريضي متخصص', 'تأهيل لامتحانات جوته و telc', 'تدريب على الاندماج الثقافي']
    },
    ctaText: { en: 'Explore Courses', de: 'Kurse entdecken', ar: 'استكشف الدورات' },
    ctaUrl: '#courses',
    iconName: 'GraduationCap',
    published: true
  },
  {
    id: 'srv-2',
    tag: { en: 'Service 02', de: 'Fachbereich 02', ar: 'الخدمة الثانية' },
    title: {
      en: 'Personalvermittlung',
      de: 'Personalvermittlung',
      ar: 'التوظيف المهني للكوادر الصحية'
    },
    desc: {
      en: 'Connecting qualified Egyptian nurses and healthcare specialists with accredited German hospitals and care facilities.',
      de: 'Vermittlung qualifizierter Pflegefachkräfte an renommierte deutsche Kliniken, Krankenhäuser und Pflegeeinrichtungen.',
      ar: 'ربط الممرضين والممرضات والكوادر الصحية المؤهلة بالمستشفيات والمراكز الطبية المعتمدة في ألمانيا.'
    },
    features: {
      en: ['Credential evaluation & sworn translations', 'Defizitbescheid process guidance', 'Direct employer interview matching', 'Embassy visa filing & airport onboarding'],
      de: ['Unterlagenprüfung & Fachübersetzungen', 'Begleitung im Anerkennungsverfahren', 'Arbeitgeber-Interviews mit Kliniken', 'Visumsantrag & Ankunftsbegleitung'],
      ar: ['تقييم الشهادات والترجمة المحلفة', 'متابعة ملف تعديل المؤهل (Anerkennung)', 'مواءمة مباشرة مع مستشفيات ألمانية', 'دعم ملف التأشيرة والاستقبال بألمانيا']
    },
    ctaText: { en: 'Explore Recruitment', de: 'Vermittlung entdecken', ar: 'استكشف التوظيف' },
    ctaUrl: '#nurses',
    iconName: 'Stethoscope',
    published: true
  }
];

const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'crs-1',
    level: 'A1 - A2',
    title: { en: 'Grundstufe Deutsch (Beginner)', de: 'Grundstufe Deutsch (A1-A2)', ar: 'المستوى التأسيسي للغة الألمانية' },
    duration: { en: '10 Weeks (Intensive)', de: '10 Wochen (Intensiv)', ar: '10 أسابيع (مكثف)' },
    format: { en: 'In-Person (Cairo) or Live Online', de: 'Präsenz (Kairo) oder Online', ar: 'حضوري بالقاهرة أو عبر الإنترنت' },
    desc: {
      en: 'Foundational grammar, everyday phonetics, speaking confidence, and vital vocabulary for daily communication.',
      de: 'Grundlegende Grammatik, Aussprache, sicheres Sprechen und Vokabelaufbau für den Alltag.',
      ar: 'القواعد الأساسية، النطق الصوتي الصحيح، وتدريب التحدث المستمر لبناء الثقة اللغوية.'
    },
    price: 'EGP 6,500',
    published: true
  },
  {
    id: 'crs-2',
    level: 'B1 - B2',
    title: { en: 'Mittelstufe & telc Preparation', de: 'Mittelstufe & telc Vorbereitung', ar: 'المستوى المتوسط والتحضير لـ telc B2' },
    duration: { en: '14 Weeks (Intensive)', de: '14 Wochen (Intensiv)', ar: '14 أسبوعاً (مكثف)' },
    format: { en: 'Interactive Clinic Simulation Lab', de: 'Interaktive Übungsgruppen', ar: 'مجموعات تدريب تفاعلية' },
    desc: {
      en: 'Rigorous preparation for official B2 certification required by German healthcare licensing authorities.',
      de: 'Gezielte Vorbereitung auf die offizielle telc B2 Prüfung zur Vorlage bei deutschen Landesbehörden.',
      ar: 'إعداد صارم ومكثف لاجتياز امتحان شهادة B2 الرسمية المطلوبة لترخيص مزاولة المهنة في ألمانيا.'
    },
    price: 'EGP 8,900',
    published: true
  },
  {
    id: 'crs-3',
    level: 'Fachsprache Pflege',
    title: { en: 'Medical German for Nurses', de: 'Fachsprache Deutsch Pflege B2', ar: 'الألماني التخصصي للتمريض (Pflegedeutsch)' },
    duration: { en: '6 Weeks (Targeted)', de: '6 Wochen (Spezifisch)', ar: '6 أسابيع (تخصصي)' },
    format: { en: 'Clinical Handover Simulations', de: 'Stationsbezogene Simulationen', ar: 'محاكاة سريرية لتسليم الحالات والتقارير' },
    desc: {
      en: 'Vital medical documentation, patient interactions, emergency room phrasing, and clinical case handover protocols.',
      de: 'Pflegedokumentation, Patientengespräche, Notfallvokabular und strukturierte Schichtübergaben.',
      ar: 'كتابة التقارير التمريضية، التواصل مع الأطباء والمرضى، ومصطلحات تسليم الورديات في المشافي الألمانية.'
    },
    price: 'EGP 5,200',
    published: true
  }
];

const INITIAL_NURSE_STAGES: PipelineStage[] = [
  { id: 'nstg-1', number: '01', title: { en: 'Profile Assessment', de: 'Profil-Evaluierung', ar: 'تقييم الملف الأولي' }, desc: { en: 'Evaluation of nursing bachelor degree and hospital experience.', de: 'Prüfung des Pflegeabschlusses und der Praxiserfahrung.', ar: 'دراسة شهادة البكالوريوس في التمريض وسنوات الخبرة السريرية.' }, icon: 'Users' },
  { id: 'nstg-2', number: '02', title: { en: 'Document Legalization', de: 'Unterlagenprüfung', ar: 'توثيق وترجمة الوثائق' }, desc: { en: 'Certified translation and foreign ministry authentication.', de: 'Beglaubigte Übersetzung und Legalisierung aller Zeugnisse.', ar: 'توثيق الشهادات من الخارجية وترجمتها عبر مترجمين محلفين.' }, icon: 'FileText' },
  { id: 'nstg-3', number: '03', title: { en: 'German Preparation (B2)', de: 'Sprachausbildung (B2)', ar: 'التأهيل اللغوي المكثف (B2)' }, desc: { en: 'Mastering general B2 and nursing communication protocols.', de: 'Spracherwerb bis B2 inklusive Fachsprache Pflege.', ar: 'دراسة الألمانية حتى مستوى B2 مع مصطلحات التمريض.' }, icon: 'GraduationCap' },
  { id: 'nstg-4', number: '04', title: { en: 'Recognition Filing (Bescheid)', de: 'Anerkennungsverfahren', ar: 'تقديم ملف المعادلة الرسمية' }, desc: { en: 'Submitting dossiers to the respective German state health authority.', de: 'Einreichung bei der zuständigen Landesprüfungsbehörde.', ar: 'إرسال الملف للسلطات الصحية الرسمية في الولاية الألمانية.' }, icon: 'Building2' },
  { id: 'nstg-5', number: '05', title: { en: 'Employer Matching', de: 'Arbeitgeber-Matching', ar: 'المواءمة مع المستشفيات' }, desc: { en: 'Matching with accredited university clinics and public hospitals.', de: 'Vorstellung bei Kliniken mit fairen TVöD-Bedingungen.', ar: 'عرض ملفك المهني على مستشفيات ومراكز طبية موثوقة.' }, icon: 'Briefcase' },
  { id: 'nstg-6', number: '06', title: { en: 'Interview Coaching', de: 'Interview-Coaching', ar: 'التحضير للمقابلات الشخصية' }, desc: { en: 'Interactive online interview simulations with German directors.', de: 'Simulation von Vorstellungsgesprächen via Video.', ar: 'تدريب ومحاكاة عملية للمقابلات عبر الإنترنت مع إدارات التمريض.' }, icon: 'MessageCircle' },
  { id: 'nstg-7', number: '07', title: { en: 'Visa Dossier (ZAV)', de: 'Visumsvorbereitung', ar: 'تجهيز ملف التأشيرة بالسفارة' }, desc: { en: 'Compiling federal employment agency approval and embassy papers.', de: 'Unterlagenpaket für die Deutsche Botschaft Kairo.', ar: 'استيفاء موافقة وكالة العمل الاتحادية وعقد العمل لتقديمه للسفارة.' }, icon: 'ShieldCheck' },
  { id: 'nstg-8', number: '08', title: { en: 'Relocation & Onboarding', de: 'Umzug & Start vor Ort', ar: 'السفر والاستقرار بألمانيا' }, desc: { en: 'Arrival welcome, furnished accommodation coordination, and registration.', de: 'Begleitung bei Einreise, Wohnen und behördlicher Anmeldung.', ar: 'المساعدة في حجز السكن وإجراءات التسجيل البلدية وبدء العمل.' }, icon: 'Clock' }
];

const INITIAL_TIMELINE_STEPS: PipelineStage[] = [
  { id: 'tstep-1', number: '01', title: { en: 'Initial Consultation', de: 'Erstberatung', ar: 'الاستشارة المبدئية' }, desc: { en: 'Individual evaluation of career goals and timeline expectations.', de: 'Orientierungsgespräch zu Voraussetzungen und realistischem Zeitplan.', ar: 'جلسة توجيهية لفهم أهدافك وشرح الشروط والمتطلبات بشفافية.' }, icon: 'MessageSquare' },
  { id: 'tstep-2', number: '02', title: { en: 'Candidate Assessment', de: 'Profilanalyse', ar: 'فحص المؤهلات والخبرات' }, desc: { en: 'Detailed audit of hours, clinical training, and prerequisites.', de: 'Prüfung von Zeugnissen, Stundentafeln und Vorbildung.', ar: 'تدقيق تفصيلي لساعات التدريب السريري والمقررات الدراسية.' }, icon: 'FileText' },
  { id: 'tstep-3', number: '03', title: { en: 'Language Training', de: 'Sprachausbildung', ar: 'الانضمام لدورات اللغة' }, desc: { en: 'Daily immersion with German instructors at Zentrum für Deutsch.', de: 'Unterricht mit Fachdozenten im Zentrum für Deutsch.', ar: 'دراسة مكثفة بمركز اللغة الألمانية تحت إشراف معلمين متخصصين.' }, icon: 'GraduationCap' },
  { id: 'tstep-4', number: '04', title: { en: 'Document Legalization', de: 'Beglaubigungen', ar: 'التصديق والترجمة المحلفة' }, desc: { en: 'Apostille certification and certified German translation.', de: 'Legalisierung von Dokumenten und Vorbereitung beglaubigter Übersetzungen.', ar: 'توثيق الشهادات واعتماد الترجمات رسمياً لدى السلطات المختصة.' }, icon: 'ShieldCheck' },
  { id: 'tstep-5', number: '05', title: { en: 'Recognition Submission', de: 'Anerkennungsantrag', ar: 'إرسال طلب إشعار المعادلة' }, desc: { en: 'Filing for official Defizitbescheid in Germany.', de: 'Beantragung des Bescheids bei der Landesbehörde in Deutschland.', ar: 'التقديم الرسمي لإصدار قرار المعادلة من وزارة الصحة الألمانية.' }, icon: 'Building2' },
  { id: 'tstep-6', number: '06', title: { en: 'Employer Matching', de: 'Klinikvorstellung', ar: 'تنسيق المقابلات مع المشافي' }, desc: { en: 'Selecting prospective healthcare employers across Germany.', de: 'Abstimmung passender Stellen im bundesweiten Kliniknetzwerk.', ar: 'عرض الفرص الوظيفية بالمستشفيات الشريكة في الولايات المختلفة.' }, icon: 'Briefcase' },
  { id: 'tstep-7', number: '07', title: { en: 'Contract & Interviews', de: 'Vorstellungsgespräche', ar: 'المقابلات وتوقيع العقد' }, desc: { en: 'Securing legitimate German employment contracts under TVöD.', de: 'Online-Interviews und Erhalt des tarifgebundenen Arbeitsvertrags.', ar: 'إجراء المقابلات وتوقيع عقد عمل رسمي خاضع للأجور النقابية.' }, icon: 'UserCheck' },
  { id: 'tstep-8', number: '08', title: { en: 'Visa Filing Support', de: 'Visumsantrag', ar: 'حجز الموعد واستخراج الفيزا' }, desc: { en: 'Finalizing embassy appointment and verified file package.', de: 'Zusammenstellung des Visumsantrags für die Botschaft Kairo.', ar: 'استيفاء كافة أوراق السفارة الألمانية بالقاهرة واستلام التأشيرة.' }, icon: 'Clock' },
  { id: 'tstep-9', number: '09', title: { en: 'Arrival & Integration', de: 'Ankunft & Integration', ar: 'الوصول وبدء الحياة المهنية' }, desc: { en: 'Airport reception, housing check-in, and residency registration.', de: 'Empfang vor Ort, Anmeldung, Bankkonto und Beginn der Tätigkeit.', ar: 'الاستقبال وتنسيق السكن وبدء مسيرتك المهنية بثقة واستقرار.' }, icon: 'CheckCheck' }
];

const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'tst-1',
    author: 'Sarah Mansour',
    role: { en: 'Registered ICU Nurse', de: 'Gesundheits- & Krankenpflegerin', ar: 'أخصائية تمريض عناية مركزة' },
    location: 'Bonn, Germany',
    quote: {
      en: 'The specialized medical terminology training gave me genuine confidence. Knowing German handover protocol made clinical integration seamless.',
      de: 'Die Vorbereitung auf das Fachdeutsch hat mir im Alltag auf Station in Bonn enorm geholfen. Ich wusste sofort, worauf es ankommt.',
      ar: 'التدريب على المصطلحات التمريضية الألمانية كان نقطة التحول؛ دخلت المستشفى في بون وأنا على دراية كاملة ببروتوكولات تسليم الحالات.'
    },
    isPlaceholder: false,
    rating: 5,
    published: true
  },
  {
    id: 'tst-2',
    author: 'Ahmed El-Sayed',
    role: { en: 'Operating Room Nurse', de: 'Fachkrankenpfleger OP', ar: 'أخصائي تمريض غرف العمليات' },
    location: 'Frankfurt am Main',
    quote: {
      en: 'Zukunft24 handled my Anerkennung paperwork honestly without false promises. The timeline was realistic, and today I work in a university clinic.',
      de: 'Zukunft24 hat mich ehrlich über das Anerkennungsverfahren informiert. Die Begleitung bei den Dokumenten war absolut verlässlich.',
      ar: 'تعاملت مع Zukunft24 بعد تجارب مع مكاتب أعطتني وعوداً غير حقيقية. هنا شرحوا لي إجراءات المعادلة بصدق تام وحالياً أعمل بمستشفى جامعي.'
    },
    isPlaceholder: false,
    rating: 5,
    published: true
  },
  {
    id: 'tst-3',
    author: 'Mahmoud Farouk',
    role: { en: 'General Care Nurse', de: 'Pflegefachkraft', ar: 'أخصائي تمريض عام' },
    location: 'Düsseldorf, Germany',
    quote: {
      en: 'Learning German from A1 to B2 was intensive, but the instructors in Cairo prepared us thoroughly for the telc examination.',
      de: 'Der Deutschunterricht von A1 bis B2 verlangte Disziplin, aber die Dozenten in Kairo haben uns optimal auf das telc B2-Zertifikat vorbereitet.',
      ar: 'دراسة اللغة من الصفر وحتى B2 تطلبت جهداً مستمراً، لكن أساتذة مركز اللغة بالقاهرة أهلونا باقتدار لاجتياز امتحان telc بنجاح.'
    },
    isPlaceholder: false,
    rating: 5,
    published: true
  }
];

const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Recruitment',
    q: {
      en: 'Who can apply for recruitment opportunities?',
      de: 'Wer kann sich für das Vermittlungsprogramm bewerben?',
      ar: 'من هم المؤهلون للتقديم على برنامج التوظيف؟'
    },
    a: {
      en: 'Qualified registered nurses holding a university degree (BSc in Nursing) or recognized higher diploma, with dedication to learn German to B2 level.',
      de: 'Examinierte Pflegefachkräfte mit einem anerkannten Hochschulabschluss (Bachelor of Science) und der Bereitschaft, Deutsch bis B2 zu erlernen.',
      ar: 'خريجو وخريجات كليات التمريض (بكالوريوس تمريض) والكوادر الصحية المؤهلة التي تمتلك الجدية والالتزام بتعلم اللغة الألمانية حتى المستوى المطلوب.'
    },
    published: true
  },
  {
    id: 'faq-2',
    category: 'Language',
    q: {
      en: 'What German language level is mandatory?',
      de: 'Welches Deutschniveau wird zwingend benötigt?',
      ar: 'ما هو مستوى اللغة الألمانية المطلوب للعمل في ألمانيا؟'
    },
    a: {
      en: 'For nursing registration in Germany, a certified B2 certificate (telc or Goethe) is mandatory. We provide structured training from A1 up to B2.',
      de: 'Für die Berufserlaubnis ist in der Regel das Sprachzertifikat B2 erforderlich. Wir bilden im Zentrum für Deutsch von A1 an zielgerichtet aus.',
      ar: 'يشترط للحصول على ترخيص مزاولة المهنة شهادة B2 معتمدة (مثل telc B2 أو Goethe). يبدأ مركزنا بتدريبك من مستوى الصفر A1 وحتى B2.'
    },
    published: true
  },
  {
    id: 'faq-3',
    category: 'Legal',
    q: {
      en: 'Does Zukunft24 guarantee visas or employment?',
      de: 'Gibt es eine Garantie für Visa oder Arbeitsplätze?',
      ar: 'هل تقدم Zukunft24 ضماناً للحصول على التأشيرة أو الوظيفة؟'
    },
    a: {
      en: 'No legitimate agency guarantees visas or jobs. Visas are granted exclusively by the German Embassy, and jobs depend on interview performance and qualification equivalence.',
      de: 'Nein, eine Garantie für Visa oder Arbeitsplätze wäre unredlich. Über Visa entscheidet allein die Botschaft, Arbeitsverträge basieren auf Vorstellungsgesprächen.',
      ar: 'لا توجد جهة قانونية تضمن التأشيرة؛ لأن منحها اختصاص سيادي حصري للسفارة الألمانية بالقاهرة، والتوظيف يعتمد على اجتياز المقابلة وتعديل المؤهل.'
    },
    published: true
  }
];

const INITIAL_LEADS: LeadRequest[] = [
  {
    id: 'ld-101',
    name: 'Mohamed Ibrahim',
    phone: '01005747953',
    email: 'mohamed.ibrahim@example.com',
    service: 'Nursing Recruitment',
    message: 'Graduated from Cairo University Faculty of Nursing with 2 years of ICU experience. Want to know next German B1 cohort date.',
    status: 'New',
    date: '2026-09-21 14:30',
    adminNotes: 'Candidate holds 2 years ICU experience at Qasr El Aini. Scheduled intro WhatsApp call.'
  },
  {
    id: 'ld-102',
    name: 'Nouran Mostafa',
    phone: '01098765432',
    email: 'nouran.nursing@example.com',
    service: 'German Courses',
    message: 'Inquiring about weekend intensive A1 courses at the Zentrum für Deutsch in Cairo.',
    status: 'In Progress',
    date: '2026-09-20 18:10',
    adminNotes: 'Prefers weekend classes in Nasr City center. Sent course syllabus.'
  },
  {
    id: 'ld-103',
    name: 'Karim Adel',
    phone: '01223344556',
    email: 'karim.or@example.com',
    service: 'Nursing Recruitment',
    message: 'Already have B1 certificate from Goethe Cairo. Looking for hospital matching in NRW or Bavaria.',
    status: 'Contacted',
    date: '2026-09-19 11:20',
    adminNotes: 'Verified B1 Goethe certificate. Arranging B2 medical course and Defizitbescheid consultation.'
  },
  {
    id: 'ld-104',
    name: 'Youssef Gamal',
    phone: '01122334455',
    email: 'youssef.g@example.com',
    service: 'Healthcare Placement',
    message: 'Physical therapy graduate inquiring if there are placement programs available.',
    status: 'Completed',
    date: '2026-09-18 16:45',
    adminNotes: 'Explained current regulatory focus on registered nurses. Advised on standard recognition pathway.'
  },
  {
    id: 'ld-105',
    name: 'Dina Tarek',
    phone: '01011223344',
    email: 'dina.t@example.com',
    service: 'Nursing Recruitment',
    message: 'Registered nurse with 3 years pediatrics experience. Interested in full package.',
    status: 'New',
    date: '2026-09-21 19:40',
    adminNotes: 'Needs follow-up via WhatsApp.'
  }
];

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'cmt-1',
    author: 'Ramy H.',
    email: 'ramy@gmail.com',
    content: 'Very clear breakdown of the Anerkennung process for Egyptian degrees. Thank you!',
    article: 'Anerkennung Guide for Egyptian Nurses',
    status: 'Approved',
    date: '2026-09-19'
  },
  {
    id: 'cmt-2',
    author: 'Mona S.',
    email: 'mona.s@yahoo.com',
    content: 'Is B2 required before submitting the documents to Germany or can I submit at B1?',
    article: 'Anerkennung Guide for Egyptian Nurses',
    status: 'Pending',
    date: '2026-09-21'
  }
];

const INITIAL_MEDIA: MediaAsset[] = [
  {
    id: 'med-1',
    name: 'hero_cinematic_relocation.mp4',
    type: 'video',
    url: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4',
    size: '14.2 MB',
    uploadedAt: '2026-09-15'
  },
  {
    id: 'med-2',
    name: 'cairo_office_seminar.webp',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80',
    size: '420 KB',
    uploadedAt: '2026-09-16'
  },
  {
    id: 'med-3',
    name: 'german_hospital_icu.webp',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    size: '560 KB',
    uploadedAt: '2026-09-17'
  },
  {
    id: 'med-4',
    name: 'telc_exam_preparation_classroom.webp',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80',
    size: '390 KB',
    uploadedAt: '2026-09-18'
  }
];

const INITIAL_LOGS: ActivityLog[] = [
  { id: 'log-1', adminUser: 'Super Admin', action: 'Updated Hero Subtitle', entity: 'Hero CMS', timestamp: '2026-09-21 21:05' },
  { id: 'log-2', adminUser: 'Recruitment Manager', action: 'Updated Status to In Progress', entity: 'Lead #ld-102', timestamp: '2026-09-21 20:30' },
  { id: 'log-3', adminUser: 'Content Manager', action: 'Published New FAQ Item', entity: 'FAQ CMS', timestamp: '2026-09-21 17:15' },
  { id: 'log-4', adminUser: 'Super Admin', action: 'Verified Brand Red Accent #DC2626', entity: 'Branding Studio', timestamp: '2026-09-20 14:10' }
];

export default function App() {
  /* Authentication State */
  const [session, setSession] = useState<UserSession | null>({
    email: 'admin@zukunft24.com',
    name: 'Alexander Weber & Tariq El-Masry',
    role: 'Super Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80'
  });
  const [loginEmail, setLoginEmail] = useState('admin@zukunft24.com');
  const [loginPassword, setLoginPassword] = useState('admin2026');
  const [selectedRole, setSelectedRole] = useState<Role>('Super Admin');

  /* UI & Localization */
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [adminLang, setAdminLang] = useState<AdminLang>('en');
  const [theme, setTheme] = useState<AdminTheme>('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  /* CMS Data States */
  const [colors, setColors] = useState<BrandColors>(INITIAL_COLORS);
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES);
  const [nurseStages, setNurseStages] = useState<PipelineStage[]>(INITIAL_NURSE_STAGES);
  const [timelineSteps, setTimelineSteps] = useState<PipelineStage[]>(INITIAL_TIMELINE_STEPS);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(INITIAL_TESTIMONIALS);
  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [leads, setLeads] = useState<LeadRequest[]>(INITIAL_LEADS);
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [media, setMedia] = useState<MediaAsset[]>(INITIAL_MEDIA);
  const [logs, setLogs] = useState<ActivityLog[]>(INITIAL_LOGS);

  /* Hero CMS State */
  const [heroState, setHeroState] = useState({
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_091828_e240eb17-6edc-4129-ad9d-98678e3fd238.mp4',
    fallbackImg: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    overlayOpacity: 70,
    videoEnabled: true,
    pill: { en: 'GERMANY · LANGUAGE · CAREER', de: 'DEUTSCHLAND · SPRACHE · KARRIERE', ar: 'ألمانيا · اللغة · المستقبل المهني' },
    line1: { en: 'Your Future.', de: 'Ihre Zukunft.', ar: 'مستقبلك.' },
    line2: { en: 'Starts in Germany.', de: 'Beginnt in Deutschland.', ar: 'يبدأ في ألمانيا.' },
    subtitle: {
      en: 'German language education and professional recruitment connecting ambitious healthcare professionals from Cairo directly with German opportunities.',
      de: 'Deutsche Sprachausbildung und qualifizierte Personalvermittlung für Gesundheitsfachkräfte von Kairo nach Deutschland.',
      ar: 'تعليم احترافي للغة الألمانية وتوظيف مهني موثوق يربط الكفاءات الطبية والتمريضية في مصر بفرص العمل المستدامة في ألمانيا.'
    },
    primaryCta: { en: 'Start Your Journey', de: 'Weg starten', ar: 'ابدأ رحلتك معنا' },
    secondaryCta: { en: 'Explore Our Services', de: 'Leistungen entdecken', ar: 'استكشف خدماتنا' },
    trustStatement: {
      en: 'From Cairo to Germany — supporting your next professional step.',
      de: 'Von Kairo nach Deutschland — Ihr verlässlicher Begleiter für den nächsten Karriereschritt.',
      ar: 'من القاهرة إلى ألمانيا — شريكك الموثوق في كل خطوة نحو مستقبلك المهني.'
    }
  });

  /* Global Settings State */
  const [siteSettings, setSiteSettings] = useState({
    companyName: 'Zukunft24',
    tagline: 'Zentrum für Deutsch · Personalvermittlung',
    whatsappNumber: '+201005747953',
    whatsappDisplay: '01005747953',
    email: 'info@zukunft24.com',
    cairoAddress: 'Nasr City / New Cairo, Cairo Governorate, Egypt',
    germanyAddress: 'Healthcare Network: NRW, Hesse, and Bavaria',
    maintenanceMode: false,
    maintenanceMsg: 'Zukunft24 platform is undergoing scheduled security updates. For inquiries please contact WhatsApp 01005747953.'
  });

  /* Interactive Modals & Drawers */
  const [previewWebsiteModal, setPreviewWebsiteModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadRequest | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [activeLangTab, setActiveLangTab] = useState<AdminLang>('en');

  /* Trigger Toast Notification */
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  /* Audit Log Appender */
  const recordLog = (action: string, entity: string) => {
    const newLog: ActivityLog = {
      id: `log-${Date.now()}`,
      adminUser: session?.role || 'Admin',
      action,
      entity,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setLogs(prev => [newLog, ...prev]);
  };

  /* Sync RTL and Theme for Admin layout */
  const isRtl = adminLang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
  }, [isRtl]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setSession({
      email: loginEmail,
      name: loginEmail.split('@')[0].toUpperCase(),
      role: selectedRole,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80'
    });
    recordLog('User Logged In', `Session: ${selectedRole}`);
    showToast(`Welcome back, ${selectedRole}!`);
  };

  const handleLogout = () => {
    recordLog('User Logged Out', session?.role || 'Admin');
    setSession(null);
    showToast('Logged out securely.', 'info');
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-4 font-sans relative overflow-hidden">
        {/* Subtle German red & navy background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 justify-center mb-2">
              <span className="text-3xl font-extrabold tracking-tight">
                Zukunft<span className="text-red-500">24</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-red-500 mb-1" />
            </div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
              Admin & CMS Control Center
            </p>
            <div className="mt-3 text-xs bg-slate-800/80 border border-slate-700/60 text-slate-300 py-1.5 px-3 rounded-full inline-block">
              Official Cairo ↔ Germany Operations
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Email
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Select Security Role
              </label>
              <select
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value as Role)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm outline-none focus:border-red-500 transition-colors"
              >
                <option value="Super Admin">Super Admin (Full Access)</option>
                <option value="Content Manager">Content Manager (CMS & Media)</option>
                <option value="Recruitment Manager">Recruitment Manager (Nurses & CRM)</option>
                <option value="Support Manager">Support Manager (Leads & Comments)</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-red-900/30 transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Enter Admin Console</span>
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <span className="text-[11px] text-slate-500 block">
              Pre-filled demo credentials: admin@zukunft24.com / admin2026
            </span>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Overview' },
    { id: 'hero', label: 'Hero & Video', icon: Video, group: 'Website Content' },
    { id: 'services', label: 'Services (2 Pillars)', icon: Briefcase, group: 'Website Content' },
    { id: 'courses', label: 'German Courses', icon: GraduationCap, group: 'Website Content' },
    { id: 'nurses', label: 'For Nurses (8 Stages)', icon: Stethoscope, group: 'Website Content' },
    { id: 'timeline', label: 'Journey Timeline', icon: Clock, group: 'Website Content' },
    { id: 'testimonials', label: 'Testimonials', icon: Users, group: 'Website Content' },
    { id: 'faq', label: 'FAQs Accordion', icon: HelpCircle, group: 'Website Content' },
    { id: 'leads', label: 'Contact Requests CRM', icon: MessageSquare, badge: leads.filter(l => l.status === 'New').length, group: 'CRM & Engagement' },
    { id: 'comments', label: 'Comments Moderation', icon: MessageCircle, badge: comments.filter(c => c.status === 'Pending').length, group: 'CRM & Engagement' },
    { id: 'appearance', label: 'Colors & Branding Live', icon: Palette, group: 'Design & Media' },
    { id: 'media', label: 'Media Library', icon: ImageIcon, group: 'Design & Media' },
    { id: 'settings', label: 'Global Settings & Info', icon: Settings, group: 'System' },
    { id: 'logs', label: 'Activity Logs', icon: ShieldCheck, group: 'System' }
  ];

  /* Group navigation items */
  const groupedNav = navItems.reduce((acc, item) => {
    acc[item.group] = acc[item.group] || [];
    acc[item.group].push(item);
    return acc;
  }, {} as Record<string, typeof navItems>);

  return (
    <div
      className={`min-h-screen font-sans flex transition-colors duration-200 ${
        theme === 'dark' ? 'bg-[#0b1120] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
      }`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 ${
            isRtl ? 'left-6' : 'right-6'
          } z-50 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold transition-all duration-300 border ${
            toast.type === 'success'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-950/20'
              : toast.type === 'error'
              ? 'bg-red-600 text-white border-red-500 shadow-red-950/20'
              : 'bg-slate-800 text-white border-slate-700'
          }`}
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-72 z-40 flex flex-col border-r transition-all duration-300 ${
          isRtl ? 'border-l border-r-0' : 'border-r'
        } ${
          sidebarOpen ? 'translate-x-0' : isRtl ? 'translate-x-full lg:translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-inherit flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight">
                Zukunft<span className="text-red-600">24</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-red-600/10 text-red-600">
                CMS
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
              Zentrum für Deutsch · Vermittlung
            </span>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items Grouped */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {Object.entries(groupedNav).map(([groupTitle, items]) => (
            <div key={groupTitle}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2 block">
                {groupTitle}
              </span>
              <div className="space-y-1">
                {items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? theme === 'dark'
                            ? 'bg-red-600/10 text-red-400 border border-red-500/30'
                            : 'bg-red-50 text-red-600 border border-red-200'
                          : theme === 'dark'
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {typeof item.badge === 'number' && item.badge > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-inherit flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <img
              src={session.avatar}
              alt="Admin"
              className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-700"
            />
            <div className="overflow-hidden">
              <span className="text-xs font-bold block truncate">{session.name}</span>
              <span className="text-[10px] text-red-600 dark:text-red-400 font-semibold block truncate">
                {session.role}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Log Out"
            className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Administrative Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Sticky Header */}
        <header
          className={`sticky top-0 z-20 px-4 sm:px-8 py-3.5 border-b backdrop-blur-md flex items-center justify-between transition-colors ${
            theme === 'dark' ? 'bg-[#0f172a]/90 border-slate-800' : 'bg-white/90 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex flex-col">
              <h1 className="text-base sm:text-lg font-extrabold capitalize tracking-tight">
                {navItems.find(n => n.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <span className="text-[11px] text-slate-400 hidden sm:block">
                Production-Ready Multilingual CMS for Zukunft24
              </span>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Website Preview Button */}
            <button
              type="button"
              onClick={() => setPreviewWebsiteModal(true)}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline">Preview Live Website</span>
              <span className="sm:hidden">Preview</span>
            </button>

            {/* Admin Language Switcher */}
            <div
              className={`p-1 rounded-full flex items-center text-xs font-semibold border ${
                theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={() => setAdminLang('en')}
                className={`px-2 py-0.5 rounded-full text-[11px] ${
                  adminLang === 'en' ? 'bg-red-600 text-white' : 'text-slate-400'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setAdminLang('de')}
                className={`px-2 py-0.5 rounded-full text-[11px] ${
                  adminLang === 'de' ? 'bg-red-600 text-white' : 'text-slate-400'
                }`}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setAdminLang('ar')}
                className={`px-2 py-0.5 rounded-full text-[11px] ${
                  adminLang === 'ar' ? 'bg-red-600 text-white' : 'text-slate-400'
                }`}
              >
                عربي
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme(prev => (prev === 'light' ? 'dark' : 'light'))}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </header>

        {/* Content Body Rendering By Active Tab */}
        <div className="p-4 sm:p-8 space-y-8 flex-1">
          {activeTab === 'dashboard' && (
            <DashboardOverviewView
              leads={leads}
              courses={courses}
              testimonials={testimonials}
              logs={logs}
              theme={theme}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'hero' && (
            <HeroSectionCMSView
              heroState={heroState}
              setHeroState={setHeroState}
              activeLangTab={activeLangTab}
              setActiveLangTab={setActiveLangTab}
              theme={theme}
              onSave={() => {
                recordLog('Updated Hero Configuration', 'Hero Section');
                showToast('Hero section published to public website!');
              }}
            />
          )}

          {activeTab === 'services' && (
            <ServicesCMSView
              services={services}
              setServices={setServices}
              theme={theme}
              activeLangTab={activeLangTab}
              setActiveLangTab={setActiveLangTab}
              recordLog={recordLog}
              showToast={showToast}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesCMSView
              courses={courses}
              setCourses={setCourses}
              theme={theme}
              activeLangTab={activeLangTab}
              setActiveLangTab={setActiveLangTab}
              recordLog={recordLog}
              showToast={showToast}
            />
          )}

          {activeTab === 'nurses' && (
            <NursePipelineCMSView
              stages={nurseStages}
              setStages={setNurseStages}
              theme={theme}
              activeLangTab={activeLangTab}
              setActiveLangTab={setActiveLangTab}
              recordLog={recordLog}
              showToast={showToast}
            />
          )}

          {activeTab === 'timeline' && (
            <TimelineCMSView
              steps={timelineSteps}
              setSteps={setTimelineSteps}
              theme={theme}
              activeLangTab={activeLangTab}
              setActiveLangTab={setActiveLangTab}
              recordLog={recordLog}
              showToast={showToast}
            />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsCMSView
              testimonials={testimonials}
              setTestimonials={setTestimonials}
              theme={theme}
              activeLangTab={activeLangTab}
              setActiveLangTab={setActiveLangTab}
              recordLog={recordLog}
              showToast={showToast}
            />
          )}

          {activeTab === 'faq' && (
            <FAQsCMSView
              faqs={faqs}
              setFaqs={setFaqs}
              theme={theme}
              activeLangTab={activeLangTab}
              setActiveLangTab={setActiveLangTab}
              recordLog={recordLog}
              showToast={showToast}
            />
          )}

          {activeTab === 'leads' && (
            <LeadsCRMView
              leads={leads}
              setLeads={setLeads}
              selectedLead={selectedLead}
              setSelectedLead={setSelectedLead}
              theme={theme}
              recordLog={recordLog}
              showToast={showToast}
            />
          )}

          {activeTab === 'comments' && (
            <CommentsModerationView
              comments={comments}
              setComments={setComments}
              theme={theme}
              recordLog={recordLog}
              showToast={showToast}
            />
          )}

          {activeTab === 'appearance' && (
            <AppearanceStudioView
              colors={colors}
              setColors={setColors}
              theme={theme}
              recordLog={recordLog}
              showToast={showToast}
            />
          )}

          {activeTab === 'media' && (
            <MediaLibraryView
              media={media}
              setMedia={setMedia}
              theme={theme}
              recordLog={recordLog}
              showToast={showToast}
            />
          )}

          {activeTab === 'settings' && (
            <GlobalSettingsView
              settings={siteSettings}
              setSettings={setSiteSettings}
              theme={theme}
              recordLog={recordLog}
              showToast={showToast}
            />
          )}

          {activeTab === 'logs' && (
            <ActivityLogsView logs={logs} theme={theme} />
          )}
        </div>
      </main>

      {}
      {previewWebsiteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
          <div
            className={`w-full max-w-6xl max-h-[92vh] rounded-3xl overflow-hidden flex flex-col border shadow-2xl ${
              theme === 'dark' ? 'bg-[#0b1120] border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            {/* Modal Top Bar */}
            <div className="px-6 py-4 border-b flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs font-mono text-slate-300 ml-2">
                  https://zukunft24.com (Live CMS State Preview)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewWebsiteModal(false)}
                  className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
                >
                  Close Preview
                </button>
              </div>
            </div>

            {/* Simulated Public Website View */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12">
              {/* Simulated Hero */}
              <div
                className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-center justify-center p-8 text-center"
                style={{ backgroundColor: colors.primaryNavy }}
              >
                {heroState.videoEnabled && (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    src={heroState.videoUrl}
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: colors.primaryNavy,
                    opacity: heroState.overlayOpacity / 100
                  }}
                />
                <div className="relative z-10 max-w-3xl space-y-4 text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md uppercase">
                    <span>{heroState.pill[adminLang]}</span>
                  </div>
                  <h2 className="text-4xl sm:text-6xl font-black tracking-tight">
                    {heroState.line1[adminLang]}{' '}
                    <span style={{ color: colors.germanRed }}>
                      {heroState.line2[adminLang]}
                    </span>
                  </h2>
                  <p className="text-sm sm:text-base text-slate-200 max-w-xl mx-auto">
                    {heroState.subtitle[adminLang]}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      style={{ backgroundColor: colors.germanRed }}
                      className="px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-lg"
                    >
                      {heroState.primaryCta[adminLang]}
                    </button>
                    <button
                      type="button"
                      className="px-6 py-2.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm"
                    >
                      {heroState.secondaryCta[adminLang]}
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 pt-2 font-medium">
                    {heroState.trustStatement[adminLang]}
                  </p>
                </div>
              </div>

              {/* Simulated Services */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Live Published Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.filter(s => s.published).map(srv => (
                    <div
                      key={srv.id}
                      className="p-6 rounded-2xl border shadow-sm space-y-4"
                      style={{ borderColor: colors.primaryNavy + '20' }}
                    >
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: colors.germanRed + '15', color: colors.germanRed }}
                      >
                        {srv.tag[adminLang]}
                      </span>
                      <h4 className="text-xl font-bold">{srv.title[adminLang]}</h4>
                      <p className="text-xs text-slate-500">{srv.desc[adminLang]}</p>
                      <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                        {srv.features[adminLang].map((feat, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated WhatsApp Banner */}
              <div
                className="p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-white"
                style={{ backgroundColor: colors.primaryNavy }}
              >
                <div>
                  <h4 className="text-base font-bold">Have questions regarding German recognition?</h4>
                  <p className="text-xs text-slate-300">
                    Official WhatsApp: {siteSettings.whatsappDisplay} ({siteSettings.whatsappNumber})
                  </p>
                </div>
                <a
                  href={`https://wa.me/${siteSettings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardOverviewView({
  leads,
  courses,
  testimonials,
  logs,
  theme,
  onNavigate
}: {
  leads: LeadRequest[];
  courses: CourseItem[];
  testimonials: TestimonialItem[];
  logs: ActivityLog[];
  theme: AdminTheme;
  onNavigate: (tab: string) => void;
}) {
  const newLeads = leads.filter(l => l.status === 'New').length;
  const inProgressLeads = leads.filter(l => l.status === 'In Progress').length;
  const publishedCourses = courses.filter(c => c.published).length;
  const verifiedTestimonials = testimonials.filter(t => !t.isPlaceholder).length;

  return (
    <div className="space-y-8">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          onClick={() => onNavigate('leads')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] shadow-sm ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Contact Requests</span>
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <MessageSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black tracking-tight">{leads.length}</div>
          <div className="mt-2 text-xs font-semibold text-emerald-500 flex items-center gap-1">
            <span>+{newLeads} new leads waiting</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('courses')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] shadow-sm ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Active Courses</span>
            <span className="p-2 rounded-xl bg-red-500/10 text-red-500">
              <GraduationCap className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black tracking-tight">{courses.length}</div>
          <div className="mt-2 text-xs font-semibold text-slate-400">
            <span>{publishedCourses} published cohorts</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('testimonials')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] shadow-sm ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Candidate Stories</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black tracking-tight">{testimonials.length}</div>
          <div className="mt-2 text-xs font-semibold text-amber-500">
            <span>{verifiedTestimonials} verified alumni in Germany</span>
          </div>
        </div>

        <div
          onClick={() => onNavigate('nurses')}
          className={`p-6 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] shadow-sm ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-400 uppercase">Pipeline Status</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Stethoscope className="w-4 h-4" />
            </span>
          </div>
          <div className="text-3xl font-black tracking-tight">8 Stages</div>
          <div className="mt-2 text-xs font-semibold text-slate-400">
            <span>Cairo ↔ Germany Anerkennung</span>
          </div>
        </div>
      </div>

      {/* Interactive Quick Actions Bar */}
      <div
        className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
          Quick Management Shortcuts
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onNavigate('hero')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <Video className="w-4 h-4 text-red-500" />
            <span>Update Hero Video URL</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('courses')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-emerald-500" />
            <span>Add German Language Course</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('leads')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-blue-500" />
            <span>Review New Lead Inquiries ({newLeads})</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('appearance')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
          >
            <Palette className="w-4 h-4 text-amber-500" />
            <span>Tune German Red & Navy Studio</span>
          </button>
        </div>
      </div>

      {/* Pipeline Analytics & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Visual Pipeline Distribution */}
        <div
          className={`lg:col-span-7 p-6 rounded-2xl border ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <h3 className="text-base font-bold mb-4">Recruitment & Inquiry Pipeline</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>New Candidate Submissions</span>
                <span className="text-red-500">{newLeads} leads</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-red-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (newLeads / Math.max(1, leads.length)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>In Progress (Document Evaluation & Telc B2)</span>
                <span className="text-blue-500">{inProgressLeads} candidates</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (inProgressLeads / Math.max(1, leads.length)) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>Completed Placements & Onboarded</span>
                <span className="text-emerald-500">
                  {leads.filter(l => l.status === 'Completed').length} nurses
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      (leads.filter(l => l.status === 'Completed').length / Math.max(1, leads.length)) * 100
                    )}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Audit Activity Feed */}
        <div
          className={`lg:col-span-5 p-6 rounded-2xl border ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold">Recent CMS Actions</h3>
            <button
              type="button"
              onClick={() => onNavigate('logs')}
              className="text-xs text-red-500 hover:underline font-semibold"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {logs.slice(0, 5).map(log => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                  <span>{log.action}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{log.timestamp.split(' ')[1]}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {log.entity} · by {log.adminUser}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSectionCMSView({
  heroState,
  setHeroState,
  activeLangTab,
  setActiveLangTab,
  theme,
  onSave
}: {
  heroState: any;
  setHeroState: React.Dispatch<React.SetStateAction<any>>;
  activeLangTab: AdminLang;
  setActiveLangTab: (l: AdminLang) => void;
  theme: AdminTheme;
  onSave: () => void;
}) {
  return (
    <div className="space-y-8">
      {/* Top Controls & Language Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Hero Section & Video CMS</h2>
          <p className="text-xs text-slate-400">
            Control headlines, background cinematic video, overlay opacity, and CTA button destinations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher for Fields */}
          <div
            className={`p-1 rounded-full flex border ${
              theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}
          >
            {(['en', 'de', 'ar'] as AdminLang[]).map(l => (
              <button
                key={l}
                type="button"
                onClick={() => setActiveLangTab(l)}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${
                  activeLangTab === l ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onSave}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Changes</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Editor */}
        <div
          className={`lg:col-span-7 p-6 rounded-2xl border space-y-4 ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-inherit">
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">
              Editing: {activeLangTab.toUpperCase()} Language
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Small Top Pill Label</label>
            <input
              type="text"
              value={heroState.pill[activeLangTab]}
              onChange={e =>
                setHeroState({
                  ...heroState,
                  pill: { ...heroState.pill, [activeLangTab]: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Line 1 (Editorial)</label>
              <input
                type="text"
                value={heroState.line1[activeLangTab]}
                onChange={e =>
                  setHeroState({
                    ...heroState,
                    line1: { ...heroState.line1, [activeLangTab]: e.target.value }
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Line 2 (German Accent)</label>
              <input
                type="text"
                value={heroState.line2[activeLangTab]}
                onChange={e =>
                  setHeroState({
                    ...heroState,
                    line2: { ...heroState.line2, [activeLangTab]: e.target.value }
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Hero Subtitle</label>
            <textarea
              rows={3}
              value={heroState.subtitle[activeLangTab]}
              onChange={e =>
                setHeroState({
                  ...heroState,
                  subtitle: { ...heroState.subtitle, [activeLangTab]: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none focus:border-red-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Primary CTA Button</label>
              <input
                type="text"
                value={heroState.primaryCta[activeLangTab]}
                onChange={e =>
                  setHeroState({
                    ...heroState,
                    primaryCta: { ...heroState.primaryCta, [activeLangTab]: e.target.value }
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Secondary CTA Button</label>
              <input
                type="text"
                value={heroState.secondaryCta[activeLangTab]}
                onChange={e =>
                  setHeroState({
                    ...heroState,
                    secondaryCta: { ...heroState.secondaryCta, [activeLangTab]: e.target.value }
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Trust Statement Footer</label>
            <input
              type="text"
              value={heroState.trustStatement[activeLangTab]}
              onChange={e =>
                setHeroState({
                  ...heroState,
                  trustStatement: { ...heroState.trustStatement, [activeLangTab]: e.target.value }
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border text-sm bg-transparent outline-none focus:border-red-500"
            />
          </div>
        </div>

        {/* Right Video & Overlay Controls */}
        <div
          className={`lg:col-span-5 p-6 rounded-2xl border space-y-5 ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Video & Overlay Engine
            </span>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
              <span>Enable Video</span>
              <input
                type="checkbox"
                checked={heroState.videoEnabled}
                onChange={e => setHeroState({ ...heroState, videoEnabled: e.target.checked })}
                className="rounded accent-red-600"
              />
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Cinematic Video URL</label>
            <input
              type="text"
              value={heroState.videoUrl}
              onChange={e => setHeroState({ ...heroState, videoUrl: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border text-xs bg-transparent outline-none focus:border-red-500 font-mono"
            />
          </div>

          {/* Overlay Opacity Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-slate-400">Overlay Opacity (Contrast Guarantee)</span>
              <span className="text-red-500">{heroState.overlayOpacity}%</span>
            </div>
            <input
              type="range"
              min={20}
              max={95}
              value={heroState.overlayOpacity}
              onChange={e => setHeroState({ ...heroState, overlayOpacity: Number(e.target.value) })}
              className="w-full accent-red-600 cursor-pointer"
            />
          </div>

          {/* Live Mini Video Preview */}
          <div className="rounded-xl overflow-hidden relative border border-slate-700 h-48 bg-black flex items-center justify-center">
            {heroState.videoEnabled ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                src={heroState.videoUrl}
              />
            ) : (
              <div className="text-xs text-slate-500">Video background is disabled.</div>
            )}
            <div
              className="absolute inset-0 bg-slate-950 transition-opacity pointer-events-none"
              style={{ opacity: heroState.overlayOpacity / 100 }}
            />
            <div className="absolute z-10 text-center text-white px-4">
              <span className="text-[10px] tracking-widest uppercase block text-slate-300">
                {heroState.pill[activeLangTab]}
              </span>
              <span className="text-base font-black">
                {heroState.line1[activeLangTab]} {heroState.line2[activeLangTab]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesCMSView({
  services,
  setServices,
  theme,
  activeLangTab,
  setActiveLangTab,
  recordLog,
  showToast
}: {
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  theme: AdminTheme;
  activeLangTab: AdminLang;
  setActiveLangTab: (l: AdminLang) => void;
  recordLog: (action: string, entity: string) => void;
  showToast: (msg: string) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const togglePublish = (id: string) => {
    setServices(prev =>
      prev.map(s => {
        if (s.id === id) {
          const updated = !s.published;
          recordLog(`Toggled Service Status to ${updated ? 'Published' : 'Draft'}`, s.title.en);
          return { ...s, published: updated };
        }
        return s;
      })
    );
    showToast('Service published status updated!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Two Pillars of Zukunft24 (Services CMS)</h2>
          <p className="text-xs text-slate-400">
            Manage Zentrum für Deutsch (Language Education) & Personalvermittlung (Healthcare Recruitment).
          </p>
        </div>

        {/* Language Tabs */}
        <div
          className={`p-1 rounded-full flex border ${
            theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {(['en', 'de', 'ar'] as AdminLang[]).map(l => (
            <button
              key={l}
              type="button"
              onClick={() => setActiveLangTab(l)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${
                activeLangTab === l ? 'bg-red-600 text-white' : 'text-slate-400'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map(srv => {
          const isEditing = editingId === srv.id;
          return (
            <div
              key={srv.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500">
                    {srv.tag[activeLangTab]}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => togglePublish(srv.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        srv.published ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {srv.published ? 'Published' : 'Draft'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(isEditing ? null : srv.id)}
                      className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">
                        Title ({activeLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={srv.title[activeLangTab]}
                        onChange={e =>
                          setServices(prev =>
                            prev.map(s =>
                              s.id === srv.id
                                ? { ...s, title: { ...s.title, [activeLangTab]: e.target.value } }
                                : s
                            )
                          )
                        }
                        className="w-full px-3 py-2 rounded-xl border text-xs bg-transparent outline-none focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">
                        Description ({activeLangTab.toUpperCase()})
                      </label>
                      <textarea
                        rows={2}
                        value={srv.desc[activeLangTab]}
                        onChange={e =>
                          setServices(prev =>
                            prev.map(s =>
                              s.id === srv.id
                                ? { ...s, desc: { ...s.desc, [activeLangTab]: e.target.value } }
                                : s
                            )
                          )
                        }
                        className="w-full px-3 py-2 rounded-xl border text-xs bg-transparent outline-none focus:border-red-500"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        recordLog('Saved Service Edits', srv.title.en);
                        showToast('Service edits saved successfully!');
                      }}
                      className="w-full py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
                    >
                      Save Service Details
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {srv.title[activeLangTab]}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {srv.desc[activeLangTab]}
                    </p>

                    <div className="pt-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        Features Protocol ({activeLangTab.toUpperCase()})
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                        {srv.features[activeLangTab].map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CoursesCMSView({
  courses,
  setCourses,
  theme,
  activeLangTab,
  setActiveLangTab,
  recordLog,
  showToast
}: {
  courses: CourseItem[];
  setCourses: React.Dispatch<React.SetStateAction<CourseItem[]>>;
  theme: AdminTheme;
  activeLangTab: AdminLang;
  setActiveLangTab: (l: AdminLang) => void;
  recordLog: (action: string, entity: string) => void;
  showToast: (msg: string) => void;
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLevel, setNewLevel] = useState('B2 Pflege');
  const [newTitle, setNewTitle] = useState('Pflege B2 Fachsprache Intensive');
  const [newDuration, setNewDuration] = useState('8 Weeks');
  const [newPrice, setNewPrice] = useState('EGP 7,500');

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: CourseItem = {
      id: `crs-${Date.now()}`,
      level: newLevel,
      title: { en: newTitle, de: newTitle, ar: newTitle },
      duration: { en: newDuration, de: newDuration, ar: newDuration },
      format: { en: 'Cairo In-Person & Live Online', de: 'Kairo & Online', ar: 'حضوري بالقاهرة وعبر الإنترنت' },
      desc: {
        en: 'Targeted German hospital terminology and structured exam preparation.',
        de: 'Spezifisches Fachdeutsch für Kliniken und Prüfungsvorbereitung.',
        ar: 'مصطلحات المشافي الألمانية وتأهيل معتمد لاجتياز امتحانات المعادلة.'
      },
      price: newPrice,
      published: true
    };
    setCourses(prev => [newCourse, ...prev]);
    recordLog('Added German Course', newTitle);
    showToast('New German course cohort added successfully!');
    setShowAddModal(false);
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    recordLog('Deleted Course', id);
    showToast('Course removed from catalogue.', 'info');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">German Language Courses (Zentrum für Deutsch)</h2>
          <p className="text-xs text-slate-400">
            Publish courses from beginner levels (A1-A2) to specialized nursing German (Pflegedeutsch B2).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map(crs => (
          <div
            key={crs.id}
            className={`p-6 rounded-2xl border flex flex-col justify-between ${
              theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-red-600 text-white">
                  {crs.level}
                </span>
                <span className="text-xs font-bold text-slate-400">{crs.price}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {crs.title[activeLangTab]}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {crs.desc[activeLangTab]}
              </p>
              <div className="pt-2 text-[11px] font-semibold text-slate-400 space-y-1">
                <div>Duration: {crs.duration[activeLangTab]}</div>
                <div>Format: {crs.format[activeLangTab]}</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-inherit flex items-center justify-between">
              <span
                className={`text-[11px] font-bold ${
                  crs.published ? 'text-emerald-500' : 'text-slate-500'
                }`}
              >
                {crs.published ? '● Live on website' : '○ Draft'}
              </span>
              <button
                type="button"
                onClick={() => deleteCourse(crs.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl ${
              theme === 'dark' ? 'bg-[#0f172a] border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold">Add New German Course</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCourse} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-400 mb-1">CEFR Level / Specialty</label>
                <input
                  type="text"
                  required
                  value={newLevel}
                  onChange={e => setNewLevel(e.target.value)}
                  placeholder="e.g. B2 Pflege"
                  className="w-full px-3 py-2 rounded-xl border bg-transparent"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-400 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-400 mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={newDuration}
                    onChange={e => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-transparent"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-400 mb-1">Tuition / Fee</label>
                  <input
                    type="text"
                    required
                    value={newPrice}
                    onChange={e => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border bg-transparent"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold"
                >
                  Add Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function NursePipelineCMSView({
  stages,
  setStages,
  theme,
  activeLangTab,
  setActiveLangTab,
  recordLog,
  showToast
}: {
  stages: PipelineStage[];
  setStages: React.Dispatch<React.SetStateAction<PipelineStage[]>>;
  theme: AdminTheme;
  activeLangTab: AdminLang;
  setActiveLangTab: (l: AdminLang) => void;
  recordLog: (action: string, entity: string) => void;
  showToast: (msg: string) => void;
}) {
  const moveStage = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === stages.length - 1)
    )
      return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...stages];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    // Update step numbers sequentially
    const updated = reordered.map((stg, i) => ({
      ...stg,
      number: `0${i + 1}`
    }));

    setStages(updated);
    recordLog('Reordered Nurse Pathway Stages', 'For Nurses CMS');
    showToast('Nurse pipeline stage order updated!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">For Nurses: 8-Stage Pathway CMS</h2>
          <p className="text-xs text-slate-400">
            Reorder and customize titles and descriptions for each nurse recruitment stage.
          </p>
        </div>

        {/* Language Tabs */}
        <div
          className={`p-1 rounded-full flex border ${
            theme === 'dark' ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}
        >
          {(['en', 'de', 'ar'] as AdminLang[]).map(l => (
            <button
              key={l}
              type="button"
              onClick={() => setActiveLangTab(l)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${
                activeLangTab === l ? 'bg-red-600 text-white' : 'text-slate-400'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {stages.map((stg, idx) => (
          <div
            key={stg.id}
            className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
              theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-xl font-black font-mono text-red-600">
                {stg.number}
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {stg.title[activeLangTab]}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {stg.desc[activeLangTab]}
                </p>
              </div>
            </div>

            {/* Reorder Buttons */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                disabled={idx === 0}
                onClick={() => moveStage(idx, 'up')}
                className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 disabled:opacity-30"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                disabled={idx === stages.length - 1}
                onClick={() => moveStage(idx, 'down')}
                className="p-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 disabled:opacity-30"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineCMSView({
  steps,
  setSteps,
  theme,
  activeLangTab,
  setActiveLangTab,
  recordLog,
  showToast
}: {
  steps: PipelineStage[];
  setSteps: React.Dispatch<React.SetStateAction<PipelineStage[]>>;
  theme: AdminTheme;
  activeLangTab: AdminLang;
  setActiveLangTab: (l: AdminLang) => void;
  recordLog: (action: string, entity: string) => void;
  showToast: (msg: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Relocation Timeline (9 Steps CMS)</h2>
          <p className="text-xs text-slate-400">
            Control the comprehensive step-by-step Cairo ↔ Germany journey timeline.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map(st => (
          <div
            key={st.id}
            className={`p-5 rounded-2xl border ${
              theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
                Step {st.number}
              </span>
              <span className="w-2 h-2 rounded-full bg-red-600" />
            </div>
            <h4 className="text-sm font-bold mb-1">{st.title[activeLangTab]}</h4>
            <p className="text-xs text-slate-500">{st.desc[activeLangTab]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsCMSView({
  testimonials,
  setTestimonials,
  theme,
  activeLangTab,
  setActiveLangTab,
  recordLog,
  showToast
}: {
  testimonials: TestimonialItem[];
  setTestimonials: React.Dispatch<React.SetStateAction<TestimonialItem[]>>;
  theme: AdminTheme;
  activeLangTab: AdminLang;
  setActiveLangTab: (l: AdminLang) => void;
  recordLog: (action: string, entity: string) => void;
  showToast: (msg: string) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Testimonials & Candidate Profiles CMS</h2>
          <p className="text-xs text-slate-400">
            Explicitly flag placeholder vs real verified candidates. Never fabricate success rates.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map(item => (
          <div
            key={item.id}
            className={`p-6 rounded-2xl border flex flex-col justify-between ${
              theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.isPlaceholder
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  }`}
                >
                  {item.isPlaceholder ? 'Placeholder Example' : 'Verified Candidate'}
                </span>
                <span className="text-xs text-amber-400">★ {item.rating}.0</span>
              </div>
              <p className="text-xs italic text-slate-600 dark:text-slate-300">
                “{item.quote[activeLangTab]}”
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-inherit">
              <div className="text-sm font-bold">{item.author}</div>
              <div className="text-xs text-slate-400">{item.role[activeLangTab]}</div>
              <div className="text-[11px] text-red-500 font-semibold">{item.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQsCMSView({
  faqs,
  setFaqs,
  theme,
  activeLangTab,
  setActiveLangTab,
  recordLog,
  showToast
}: {
  faqs: FAQItem[];
  setFaqs: React.Dispatch<React.SetStateAction<FAQItem[]>>;
  theme: AdminTheme;
  activeLangTab: AdminLang;
  setActiveLangTab: (l: AdminLang) => void;
  recordLog: (action: string, entity: string) => void;
  showToast: (msg: string) => void;
}) {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCat, setNewCat] = useState('Recruitment');
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');

  const filteredFaqs =
    selectedCat === 'All' ? faqs : faqs.filter(f => f.category === selectedCat);

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ || !newA) return;
    const newFaqItem: FAQItem = {
      id: `faq-${Date.now()}`,
      category: newCat,
      q: { en: newQ, de: newQ, ar: newQ },
      a: { en: newA, de: newA, ar: newA },
      published: true
    };
    setFaqs(prev => [newFaqItem, ...prev]);
    recordLog('Added FAQ Item', newQ);
    showToast('FAQ successfully created!');
    setShowAddModal(false);
    setNewQ('');
    setNewA('');
  };

  const deleteFaq = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    recordLog('Deleted FAQ Item', id);
    showToast('FAQ deleted.');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Frequently Asked Questions CMS</h2>
          <p className="text-xs text-slate-400">
            Manage multilingual answers regarding Anerkennung, B2 certificates, and hospital interviews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add FAQ</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2">
        {['All', 'Recruitment', 'Language', 'Legal'].map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCat(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedCat === cat
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredFaqs.map(faq => (
          <div
            key={faq.id}
            className={`p-5 rounded-2xl border flex items-start justify-between gap-4 ${
              theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                {faq.category}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {faq.q[activeLangTab]}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {faq.a[activeLangTab]}
              </p>
            </div>
            <button
              type="button"
              onClick={() => deleteFaq(faq.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add FAQ Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl ${
              theme === 'dark' ? 'bg-[#0f172a] border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold">Add FAQ Question & Answer</h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddFaq} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-400 mb-1">Category</label>
                <select
                  value={newCat}
                  onChange={e => setNewCat(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-transparent"
                >
                  <option value="Recruitment">Recruitment</option>
                  <option value="Language">Language</option>
                  <option value="Legal">Legal</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-400 mb-1">Question (Prompt)</label>
                <input
                  type="text"
                  required
                  value={newQ}
                  onChange={e => setNewQ(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-transparent"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-400 mb-1">Answer (Details)</label>
                <textarea
                  rows={3}
                  required
                  value={newA}
                  onChange={e => setNewA(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border bg-transparent"
                />
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold"
                >
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function LeadsCRMView({
  leads,
  setLeads,
  selectedLead,
  setSelectedLead,
  theme,
  recordLog,
  showToast
}: {
  leads: LeadRequest[];
  setLeads: React.Dispatch<React.SetStateAction<LeadRequest[]>>;
  selectedLead: LeadRequest | null;
  setSelectedLead: (l: LeadRequest | null) => void;
  theme: AdminTheme;
  recordLog: (action: string, entity: string) => void;
  showToast: (msg: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = leads.filter(ld => {
    const matchesSearch =
      ld.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ld.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ld.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || ld.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: LeadRequest['status']) => {
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, status: newStatus } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    recordLog(`Updated Lead Status to ${newStatus}`, id);
    showToast(`Lead status updated to ${newStatus}`);
  };

  const updateNotes = (id: string, notes: string) => {
    setLeads(prev =>
      prev.map(l => (l.id === id ? { ...l, adminNotes: notes } : l))
    );
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead({ ...selectedLead, adminNotes: notes });
    }
    recordLog('Updated Internal Lead Notes', id);
    showToast('Internal note saved!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Contact Requests & Leads CRM</h2>
          <p className="text-xs text-slate-400">
            Track prospective candidates, filter by status, and coordinate WhatsApp direct outreach.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, phone, email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border text-xs bg-transparent outline-none focus:border-red-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {['All', 'New', 'Contacted', 'In Progress', 'Completed'].map(st => (
          <button
            key={st}
            type="button"
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              statusFilter === st
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Data Table */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-bold uppercase tracking-wider border-b border-inherit">
              <tr>
                <th className="p-4">Candidate Name</th>
                <th className="p-4">Phone / WhatsApp</th>
                <th className="p-4">Interested Program</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-inherit">
              {filtered.map(ld => (
                <tr key={ld.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="p-4 font-bold">
                    <div>{ld.name}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{ld.email}</div>
                  </td>
                  <td className="p-4 font-mono">{ld.phone}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                      {ld.service}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{ld.date}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        ld.status === 'New'
                          ? 'bg-red-500/10 text-red-500'
                          : ld.status === 'In Progress'
                          ? 'bg-blue-500/10 text-blue-500'
                          : ld.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : 'bg-slate-500/10 text-slate-400'
                      }`}
                    >
                      {ld.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => setSelectedLead(ld)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 font-bold"
                    >
                      Open Card
                    </button>
                    <a
                      href={`https://wa.me/2${ld.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold inline-flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl ${
              theme === 'dark' ? 'bg-[#0f172a] border-slate-700' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-bold">{selectedLead.name}</h3>
                <span className="text-xs text-slate-400 font-mono">{selectedLead.email} · {selectedLead.phone}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-400 mb-1">Inquiry Message</label>
                <div className="p-3 rounded-xl bg-slate-800 text-slate-200 leading-relaxed">
                  {selectedLead.message}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Lead Workflow Status</label>
                <select
                  value={selectedLead.status}
                  onChange={e => updateStatus(selectedLead.id, e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border bg-transparent font-bold"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress (B2 / Anerkennung)</option>
                  <option value="Completed">Completed (Placed in Germany)</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-400 mb-1">Internal Admin Notes</label>
                <textarea
                  rows={3}
                  value={selectedLead.adminNotes}
                  onChange={e => updateNotes(selectedLead.id, e.target.value)}
                  placeholder="Record credentials review, telc results, interview dates..."
                  className="w-full px-3 py-2 rounded-xl border bg-transparent"
                />
              </div>

              <div className="pt-2 flex justify-between items-center">
                <a
                  href={`https://wa.me/2${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Chat</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-5 py-2 rounded-xl bg-slate-800 text-white font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CommentsModerationView({
  comments,
  setComments,
  theme,
  recordLog,
  showToast
}: {
  comments: CommentItem[];
  setComments: React.Dispatch<React.SetStateAction<CommentItem[]>>;
  theme: AdminTheme;
  recordLog: (action: string, entity: string) => void;
  showToast: (msg: string) => void;
}) {
  const updateStatus = (id: string, status: CommentItem['status']) => {
    setComments(prev => prev.map(c => (c.id === id ? { ...c, status } : c)));
    recordLog(`Updated Comment Moderation to ${status}`, id);
    showToast(`Comment marked as ${status}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Comments Moderation</h2>
          <p className="text-xs text-slate-400">
            Never publish untrusted user comments without administrative review.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {comments.map(c => (
          <div
            key={c.id}
            className={`p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs">{c.author}</span>
                <span className="text-[10px] text-slate-400">({c.email})</span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    c.status === 'Approved'
                      ? 'bg-emerald-500/10 text-emerald-500'
                      : 'bg-amber-500/10 text-amber-500'
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <p className="text-xs text-slate-300">“{c.content}”</p>
              <div className="text-[10px] text-slate-500 font-mono">
                Article: {c.article} · {c.date}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateStatus(c.id, 'Approved')}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => updateStatus(c.id, 'Hidden')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Hide
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppearanceStudioView({
  colors,
  setColors,
  theme,
  recordLog,
  showToast
}: {
  colors: BrandColors;
  setColors: React.Dispatch<React.SetStateAction<BrandColors>>;
  theme: AdminTheme;
  recordLog: (action: string, entity: string) => void;
  showToast: (msg: string) => void;
}) {
  const handleResetDefaults = () => {
    setColors(INITIAL_COLORS);
    recordLog('Reset Brand Colors to Defaults', 'Branding Studio');
    showToast('Reset to German corporate defaults!');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Brand & Colors Live Studio</h2>
          <p className="text-xs text-slate-400">
            Customize Navy `#0F172A`, German Red Accent `#DC2626`, backgrounds, and see real-time preview.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 text-slate-300 hover:bg-slate-800 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={() => {
              recordLog('Published Custom Colors', 'Branding Studio');
              showToast('Brand colors published across the platform!');
            }}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Publish Colors</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Color Controls (5 cols) */}
        <div
          className={`lg:col-span-5 p-6 rounded-2xl border space-y-4 ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-inherit">
            Corporate Palette
          </h3>

          <div>
            <label className="flex items-center justify-between text-xs font-bold mb-1">
              <span>Primary Navy Color</span>
              <span className="font-mono text-slate-400">{colors.primaryNavy}</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.primaryNavy}
                onChange={e => setColors({ ...colors, primaryNavy: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={colors.primaryNavy}
                onChange={e => setColors({ ...colors, primaryNavy: e.target.value })}
                className="flex-1 px-3 py-2 rounded-xl border text-xs bg-transparent font-mono"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-xs font-bold mb-1">
              <span>German Red Accent</span>
              <span className="font-mono text-slate-400">{colors.germanRed}</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.germanRed}
                onChange={e => setColors({ ...colors, germanRed: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={colors.germanRed}
                onChange={e => setColors({ ...colors, germanRed: e.target.value })}
                className="flex-1 px-3 py-2 rounded-xl border text-xs bg-transparent font-mono"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center justify-between text-xs font-bold mb-1">
              <span>Light Surface</span>
              <span className="font-mono text-slate-400">{colors.surfaceLight}</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={colors.surfaceLight}
                onChange={e => setColors({ ...colors, surfaceLight: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={colors.surfaceLight}
                onChange={e => setColors({ ...colors, surfaceLight: e.target.value })}
                className="flex-1 px-3 py-2 rounded-xl border text-xs bg-transparent font-mono"
              />
            </div>
          </div>
        </div>

        {/* Live Interactive Preview Card (7 cols) */}
        <div
          className={`lg:col-span-7 p-8 rounded-2xl border flex flex-col justify-between ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Real-Time Component Preview
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold">
                Live Reactive
              </span>
            </div>

            <div
              className="p-8 rounded-2xl border shadow-lg space-y-4"
              style={{
                backgroundColor: colors.primaryNavy,
                color: '#FFFFFF'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-black">
                  Zukunft<span style={{ color: colors.germanRed }}>24</span>
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ backgroundColor: colors.germanRed }}
                >
                  Healthcare Placement
                </span>
              </div>
              <h4 className="text-2xl font-black">Building Bridges Between Cairo & Germany</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Experience high-precision German healthcare relocation with ethical recruitment and language preparation.
              </p>
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  style={{ backgroundColor: colors.germanRed }}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-white shadow"
                >
                  Apply For Placement
                </button>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-white/20 text-white"
                >
                  Learn German
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MediaLibraryView({
  media,
  setMedia,
  theme,
  recordLog,
  showToast
}: {
  media: MediaAsset[];
  setMedia: React.Dispatch<React.SetStateAction<MediaAsset[]>>;
  theme: AdminTheme;
  recordLog: (action: string, entity: string) => void;
  showToast: (msg: string) => void;
}) {
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video'>('all');

  const filtered = filterType === 'all' ? media : media.filter(m => m.type === filterType);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Asset URL copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">Media Library</h2>
          <p className="text-xs text-slate-400">
            Production assets for hero videos, clinic backgrounds, and orientation guides.
          </p>
        </div>

        <div className="flex gap-2">
          {(['all', 'image', 'video'] as const).map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                filterType === t
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            className={`rounded-2xl border overflow-hidden flex flex-col justify-between ${
              theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="h-36 bg-slate-900 relative overflow-hidden flex items-center justify-center">
              {item.type === 'video' ? (
                <div className="text-center p-4">
                  <Video className="w-8 h-8 text-red-500 mx-auto mb-1" />
                  <span className="text-[10px] text-slate-300 font-mono">Cinematic MP4 Video</span>
                </div>
              ) : (
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-4 space-y-2">
              <div className="font-mono text-xs font-bold truncate" title={item.name}>
                {item.name}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>{item.size}</span>
                <span>{item.uploadedAt}</span>
              </div>
              <button
                type="button"
                onClick={() => copyUrl(item.url)}
                className="w-full py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GlobalSettingsView({
  settings,
  setSettings,
  theme,
  recordLog,
  showToast
}: {
  settings: any;
  setSettings: React.Dispatch<React.SetStateAction<any>>;
  theme: AdminTheme;
  recordLog: (action: string, entity: string) => void;
  showToast: (msg: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Global Website Settings</h2>
          <p className="text-xs text-slate-400">
            Control the official WhatsApp integration (+201005747953), office locations, and maintenance status.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            recordLog('Updated Global Settings', 'System Settings');
            showToast('Global settings successfully saved!');
          }}
          className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white"
        >
          Save Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          className={`p-6 rounded-2xl border space-y-4 ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-2 border-b border-inherit">
            Contact & WhatsApp Integration
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">
              Official WhatsApp Direct Number (URL Target)
            </label>
            <input
              type="text"
              value={settings.whatsappNumber}
              onChange={e => setSettings({ ...settings, whatsappNumber: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border text-xs bg-transparent font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">
              WhatsApp Local Display (Public Website)
            </label>
            <input
              type="text"
              value={settings.whatsappDisplay}
              onChange={e => setSettings({ ...settings, whatsappDisplay: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border text-xs bg-transparent font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Official Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={e => setSettings({ ...settings, email: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border text-xs bg-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Cairo Office Address</label>
            <input
              type="text"
              value={settings.cairoAddress}
              onChange={e => setSettings({ ...settings, cairoAddress: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border text-xs bg-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Germany Partner Network</label>
            <input
              type="text"
              value={settings.germanyAddress}
              onChange={e => setSettings({ ...settings, germanyAddress: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border text-xs bg-transparent"
            />
          </div>
        </div>

        {/* Maintenance Mode & Safety */}
        <div
          className={`p-6 rounded-2xl border space-y-4 ${
            theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-inherit">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-500">
              Maintenance Mode Gate
            </h3>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold">
              <span>{settings.maintenanceMode ? 'Enabled' : 'Disabled'}</span>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={e => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="rounded accent-red-600"
              />
            </label>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            When enabled, regular visitors see a high-end maintenance landing page with WhatsApp emergency contact, while administrators can still access /admin freely.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">
              Public Maintenance Notice
            </label>
            <textarea
              rows={3}
              value={settings.maintenanceMsg}
              onChange={e => setSettings({ ...settings, maintenanceMsg: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border text-xs bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityLogsView({
  logs,
  theme
}: {
  logs: ActivityLog[];
  theme: AdminTheme;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Security & Activity Audit Logs</h2>
        <p className="text-xs text-slate-400">
          Immutable audit trail of content modifications, status updates, and administrative logins.
        </p>
      </div>

      <div
        className={`rounded-2xl border overflow-hidden ${
          theme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-bold uppercase tracking-wider border-b border-inherit">
            <tr>
              <th className="p-4">Admin Role</th>
              <th className="p-4">Action Executed</th>
              <th className="p-4">Target Entity</th>
              <th className="p-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-inherit">
            {logs.map(lg => (
              <tr key={lg.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-4 font-bold text-red-500">{lg.adminUser}</td>
                <td className="p-4">{lg.action}</td>
                <td className="p-4 text-slate-400 font-mono">{lg.entity}</td>
                <td className="p-4 text-right text-slate-500">{lg.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}