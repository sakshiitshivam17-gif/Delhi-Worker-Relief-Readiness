import type { Language } from "@/lib/types";

export type ChatTopicId =
  | "workdays"
  | "grap"
  | "camps"
  | "helplines"
  | "documents";

export interface ChatbotContent {
  title: string;
  subtitle: string;
  greeting: string;
  starters: string[];
  placeholder: string;
  send: string;
  openLabel: string;
  closeLabel: string;
  listenLabel: string;
  stopLabel: string;
  fallback: string;
  answers: Record<ChatTopicId, string>;
}

interface ChatbotCopy extends Omit<ChatbotContent, "answers"> {
  answers: Record<ChatTopicId, string>;
  extraKeywords: Record<ChatTopicId, string[]>;
}

const BASE_KEYWORDS: Record<ChatTopicId, string[]> = {
  workdays: [
    "90",
    "90 day",
    "90 days",
    "ninety",
    "12 month",
    "12 months",
    "workday",
    "workdays",
    "work day",
    "work days",
    "live work certificate",
    "muster roll",
    "attendance",
    "wage slip",
    "salary slip",
    "experience certificate",
    "work certificate",
    "kaam ke din",
    "kaam din",
    "din ka proof",
    "proof",
    "कार्यदिवस",
    "काम के दिन",
    "काम का प्रमाण",
    "90 दिन",
    "प्रमाण",
    "कामाचे दिवस",
    "कामाचा पुरावा",
    "पुरावा",
    "কাজের দিন",
    "কাজের প্রমাণ",
    "প্রমাণ",
    "வேலை நாட்கள்",
    "வேலை ஆதாரம்",
    "ஆதாரம்",
    "ਕੰਮ ਦੇ ਦਿਨ",
    "ਕੰਮ ਦਾ ਸਬੂਤ",
    "ਸਬੂਤ",
    "ਨੱਬੇ",
    "नब्बे",
    "নব্বই",
    "தொண்ணூறு",
  ],
  grap: [
    "grap",
    "stage 3",
    "stage iii",
    "stage 4",
    "stage iv",
    "stage three",
    "stage four",
    "ban",
    "banned",
    "band",
    "construction ban",
    "demolition",
    "pollution",
    "aqi",
    "caqm",
    "odd even",
    "10,000",
    "10000",
    "seasonal relief",
    "relief",
    "ग्रेप",
    "प्रदूषण",
    "बैन",
    "प्रतिबंध",
    "निर्माण कार्य",
    "चरण iii",
    "चरण iv",
    "स्टेज",
    "बंद",
    "बांधकाम बंदी",
    "बांधकाम",
    "टप्पा",
    "दूषण",
    "নিষেধাজ্ঞা",
    "নির্মাণ",
    "পর্যায়",
    "নিষিদ্ধ",
    "மாசு",
    "தடை",
    "கட்டுமான",
    "நிலை",
    "ਪ੍ਰਦੂਸ਼ਣ",
    "ਪਾਬੰਦੀ",
    "ਉਸਾਰੀ",
    "ਸਟੇਜ",
    "ਬੰਦ",
  ],
  camps: [
    "camp",
    "camps",
    "help camp",
    "verified camp",
    "relief camp",
    "anand vihar",
    "okhla",
    "bhalaswa",
    "bhalswa",
    "tikri",
    "kapashera",
    "shivir",
    "शिविर",
    "कैंप",
    "सहायता शिविर",
    "आनंद विहार",
    "ओखला",
    "भलस्वा",
    "तिकरी",
    "कापसहेड़ा",
    "शिबिर",
    "मदत शिबिर",
    "ਮਦਦ ਸ਼ਿਵਿਰ",
    "ਹੈਲਪ ਕੈਂਪ",
    "ਕੈਂਪ",
    "ਮੁਕਾਮ",
    "মுகাম",
    "শিবির",
    "ক্যাম্প",
    "সহায়তা ক্যাম্প",
    "முகாம்",
    "கேம்ப்",
    "உதவி முகாம்",
  ],
  helplines: [
    "helpline",
    "155214",
    "1076",
    "011-23386000",
    "01123386000",
    "23386000",
    "phone number",
    "phone",
    "call",
    "shramik",
    "shramik helpline",
    "हेल्पलाइन",
    "फोन",
    "नंबर",
    "कॉल",
    "श्रमिक हेल्पलाइन",
    "हेल्पलाइन क्रमांक",
    "क्रमांक",
    "ਹੈਲਪਲਾਈਨ",
    "ਫੋਨ",
    "ਨੰਬਰ",
    "கால்",
    "தொலைபேசி",
    "உதவி எண்",
    "எண்",
    "হেল্পলাইন",
    "ফোন",
    "নম্বর",
    "কল",
  ],
  documents: [
    "document",
    "documents",
    "aadhaar",
    "aadhar",
    "adhar",
    "bank",
    "passbook",
    "registration",
    "dbocwwb",
    "certificate",
    "papers",
    "kagaz",
    "कागज़",
    "दस्तावेज",
    "दस्तावेज़",
    "आधार",
    "बैंक",
    "पासबुक",
    "पंजीकरण",
    "रजिस्ट्रेशन",
    "दस्तऐवज",
    "बँक",
    "नोंदणी",
    "कागदपत्रे",
    "নথি",
    "আধার",
    "ব্যাংক",
    "পাসবুক",
    "নিবন্ধন",
    "ஆவண",
    "ஆவணம்",
    "ஆவணங்கள்",
    "ஆவணங்களை",
    "ஆதார்",
    "வங்கி",
    "பாஸ்புக்",
    "பதிவு",
    "ਦਸਤਾਵੇਜ਼",
    "ਆਧਾਰ",
    "ਬੈਂਕ",
    "ਪਾਸਬੁੱਕ",
    "ਰਜਿਸਟ੍ਰੇਸ਼ਨ",
  ],
};

const CHATBOT_COPY: Record<Language, ChatbotCopy> = {
  en: {
    title: "Worker Saathi Sahayak",
    subtitle: "Relief guidance in your language",
    greeting:
      "Namaste! I am Worker Saathi Sahayak. Ask me about the 90-day workday rule, DBOCWWB registration, GRAP bans, verified camps, helplines or documents.",
    starters: [
      "What is the 90-day proof?",
      "What is banned in GRAP Stage III/IV?",
      "Which documents should I carry?",
    ],
    placeholder: "Ask a question…",
    send: "Send",
    openLabel: "Open Worker Saathi Sahayak chat",
    closeLabel: "Close chat",
    listenLabel: "Listen to this answer",
    stopLabel: "Stop reading",
    fallback:
      "I can help with the 90-day workday rule, DBOCWWB registration, GRAP Stage III/IV construction bans, verified camps, helplines and documents. For a personal case, call Shramik Helpline 155214 or visit a help camp. This is guidance, not an official order.",
    answers: {
      workdays:
        "90-day proof: For the ₹10,000 winter relief, keep proof of at least 90 construction workdays in the last 12 months.\n\nUseful proof: DBOCWWB Live Work Certificate, contractor or employer work certificate, muster roll or attendance sheet, wage slips, and dated site photos.\n\nGet the certificate checked at a help camp. This is guidance — final eligibility depends on the official order.",
      grap:
        "GRAP Stage III and IV: Stage III bans most non-essential construction and demolition work, with limited exemptions. Stage IV bans all construction and demolition, including private sites, except emergency and exempted work.\n\n₹10,000 seasonal relief was announced for registered workers affected by the ban. Do not treat it as confirmed until you see the official order and verification. Check the latest CAQM notice.",
      camps:
        "Verified help camps: Anand Vihar, Okhla, Bhalaswa, Tikri and Kapashera.\n\nCarry Aadhaar, bank passbook, DBOCWWB registration and work proof. Confirm timings and location with the Delhi Labour Department before travelling. For help, call 155214.",
      helplines:
        "Helplines:\n• Shramik Helpline 155214 — wage, termination and labour-law help (9:30 AM–6:00 PM, Mon–Sat).\n• DBOCWWB 011-23386000 — registration and welfare schemes.\n• 1076 — Delhi government and GRAP grievance helpline.\n\nAlways confirm details through an official source.",
      documents:
        "Documents to carry:\n1. Aadhaar card\n2. Bank passbook (account in the worker's name)\n3. Live Work Certificate or 90-day work proof\n4. DBOCWWB registration or renewal details\n5. Mobile number linked to Aadhaar\n\nApply for or renew DBOCWWB registration through the official portal or a help camp. Keep photocopies. Never share OTPs or bank PINs.",
    },
    extraKeywords: {
      workdays: [],
      grap: [],
      camps: [],
      helplines: [],
      documents: [],
    },
  },
  hinglish: {
    title: "Worker Saathi Sahayak",
    subtitle: "Aapki bhasha mein relief guidance",
    greeting:
      "Namaste! Main Worker Saathi Sahayak hoon. 90-din workday rule, DBOCWWB registration, GRAP ban, verified camps, helpline ya documents ke bare mein poochho.",
    starters: [
      "90 din ka proof kya hai?",
      "GRAP Stage III/IV mein kya band hai?",
      "Kaunse documents le jaun?",
    ],
    placeholder: "Apna sawal likho…",
    send: "Bhejo",
    openLabel: "Worker Saathi Sahayak chat kholo",
    closeLabel: "Chat band karo",
    listenLabel: "Yeh jawab suno",
    stopLabel: "Padhna roko",
    fallback:
      "Main 90-din workday rule, DBOCWWB registration, GRAP Stage III/IV ban, verified camps, helpline aur documents mein madad kar sakta hoon. Apne case ke liye Shramik Helpline 155214 par call karo ya help camp jao. Yeh guidance hai, official order nahi.",
    answers: {
      workdays:
        "90-din proof: ₹10,000 winter relief ke liye pichhle 12 mahine mein kam se kam 90 construction workdays ka proof rakho.\n\nKaam ka proof: DBOCWWB Live Work Certificate, contractor ya employer ka work certificate, muster roll ya attendance sheet, wage slip, aur date ke saath site photo.\n\nCertificate help camp par check karwao. Yeh guidance hai — final eligibility official order par depend karti hai.",
      grap:
        "GRAP Stage III aur IV: Stage III mein zyadatar non-essential construction aur demolition band hota hai, kuch exemptions ke saath. Stage IV mein sab construction aur demolition band hota hai, private sites bhi, sirf emergency aur exempted kaam chhod kar.\n\nBan se affected registered workers ke liye ₹10,000 seasonal relief announce hua tha. Official order aur verification ke bina ise pakka mat maano. Latest CAQM notice check karo.",
      camps:
        "Verified help camps: Anand Vihar, Okhla, Bhalaswa, Tikri aur Kapashera.\n\nAadhaar, bank passbook, DBOCWWB registration aur work proof saath le jao. Jaane se pehle Delhi Labour Department se timing aur location confirm karo. Madad ke liye 155214 par call karo.",
      helplines:
        "Helplines:\n• Shramik Helpline 155214 — wage, termination aur labour-law help (9:30 AM–6:00 PM, Mon–Sat).\n• DBOCWWB 011-23386000 — registration aur welfare schemes.\n• 1076 — Delhi government aur GRAP grievance helpline.\n\nDetails official source se zaroor confirm karo.",
      documents:
        "Documents saath rakho:\n1. Aadhaar card\n2. Bank passbook (account worker ke naam par)\n3. Live Work Certificate ya 90-din ka work proof\n4. DBOCWWB registration ya renewal details\n5. Aadhaar se linked mobile number\n\nDBOCWWB registration official portal ya help camp se karwao. Photocopy rakho. OTP ya bank PIN kisi ko na do.",
    },
    extraKeywords: {
      workdays: ["band proof", "kaam ka proof", "din proof"],
      grap: ["band", "stage"],
      camps: [],
      helplines: [],
      documents: ["document", "paper"],
    },
  },
  hi: {
    title: "Worker Saathi Sahayak",
    subtitle: "आपकी भाषा में सहायता मार्गदर्शन",
    greeting:
      "नमस्ते! मैं वर्कर साथी सहायक हूँ। 90 दिन के कार्यदिवस नियम, DBOCWWB पंजीकरण, GRAP प्रतिबंध, सत्यापित शिविर, हेल्पलाइन या दस्तावेज़ों के बारे में पूछें।",
    starters: [
      "90 दिन का प्रमाण क्या है?",
      "GRAP चरण III/IV में क्या बंद है?",
      "कौन से दस्तावेज़ ले जाऊँ?",
    ],
    placeholder: "अपना सवाल लिखें…",
    send: "भेजें",
    openLabel: "वर्कर साथी सहायक चैट खोलें",
    closeLabel: "चैट बंद करें",
    listenLabel: "यह जवाब सुनें",
    stopLabel: "पढ़ना रोकें",
    fallback:
      "मैं 90 दिन के कार्यदिवस नियम, DBOCWWB पंजीकरण, GRAP चरण III/IV प्रतिबंध, सत्यापित शिविर, हेल्पलाइन और दस्तावेज़ों में मदद कर सकता हूँ। अपने मामले के लिए श्रमिक हेल्पलाइन 155214 पर कॉल करें या सहायता शिविर जाएँ। यह मार्गदर्शन है, आधिकारिक आदेश नहीं।",
    answers: {
      workdays:
        "90 दिन का प्रमाण: ₹10,000 शीतकालीन सहायता के लिए पिछले 12 महीनों में कम से कम 90 निर्माण कार्यदिवसों का प्रमाण रखें।\n\nउपयोगी प्रमाण: DBOCWWB Live Work Certificate, ठेकेदार या मालिक का कार्य प्रमाण पत्र, मस्टर रोल या उपस्थिति पत्रक, मज़दूरी पर्ची और तारीख़ वाली साइट फोटो।\n\nप्रमाण पत्र सहायता शिविर में जाँचवाएँ। यह मार्गदर्शन है — अंतिम पात्रता आधिकारिक आदेश पर निर्भर है।",
      grap:
        "GRAP चरण III और IV: चरण III में अधिकांश गैर-ज़रूरी निर्माण और ध्वस्तीकरण कार्य प्रतिबंधित होते हैं, कुछ छूट के साथ। चरण IV में सभी निर्माण और ध्वस्तीकरण कार्य बंद होते हैं, निजी साइटें भी, सिर्फ़ आपातकालीन और छूट प्राप्त काम छोड़कर।\n\nप्रतिबंध से प्रभावित पंजीकृत श्रमिकों के लिए ₹10,000 मौसमी सहायता की घोषणा हुई थी। आधिकारिक आदेश और सत्यापन के बिना इसे पक्का न मानें। नवीनतम CAQM सूचना देखें।",
      camps:
        "सत्यापित सहायता शिविर: आनंद विहार, ओखला, भलस्वा, तिकरी और कापसहेड़ा।\n\nआधार, बैंक पासबुक, DBOCWWB पंजीकरण और काम का प्रमाण साथ ले जाएँ। जाने से पहले दिल्ली श्रम विभाग से समय और स्थान की पुष्टि करें। मदद के लिए 155214 पर कॉल करें।",
      helplines:
        "हेल्पलाइन:\n• श्रमिक हेल्पलाइन 155214 — मज़दूरी, नौकरी से निकाले जाने और श्रम कानून सहायता (सोम–शनि, 9:30 AM–6:00 PM)।\n• DBOCWWB 011-23386000 — पंजीकरण और कल्याण योजनाएँ।\n• 1076 — दिल्ली सरकार और GRAP शिकायत हेल्पलाइन।\n\nविवरण आधिकारिक स्रोत से ज़रूर पुष्टि करें।",
      documents:
        "दस्तावेज़ साथ रखें:\n1. आधार कार्ड\n2. बैंक पासबुक (खाता श्रमिक के नाम पर)\n3. Live Work Certificate या 90 दिन का काम प्रमाण\n4. DBOCWWB पंजीकरण या नवीनीकरण विवरण\n5. आधार से जुड़ा मोबाइल नंबर\n\nDBOCWWB पंजीकरण आधिकारिक पोर्टल या सहायता शिविर से कराएँ। फोटोकॉपी रखें। OTP या बैंक PIN किसी को न दें।",
    },
    extraKeywords: {
      workdays: ["90 दिन", "दिन का प्रमाण"],
      grap: [],
      camps: [],
      helplines: [],
      documents: [],
    },
  },
  pa: {
    title: "Worker Saathi Sahayak",
    subtitle: "ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਰਾਹਤ ਮਾਰਗਦਰਸ਼ਨ",
    greeting:
      "ਨਮਸਤੇ! ਮੈਂ ਵਰਕਰ ਸਾਥੀ ਸਹਾਇਕ ਹਾਂ। 90 ਦਿਨਾਂ ਦੇ ਕੰਮ ਨਿਯਮ, DBOCWWB ਰਜਿਸਟ੍ਰੇਸ਼ਨ, GRAP ਪਾਬੰਦੀ, ਪ੍ਰਮਾਣਿਤ ਕੈਂਪ, ਹੈਲਪਲਾਈਨ ਜਾਂ ਦਸਤਾਵੇਜ਼ਾਂ ਬਾਰੇ ਪੁੱਛੋ।",
    starters: [
      "90 ਦਿਨਾਂ ਦਾ ਸਬੂਤ ਕੀ ਹੈ?",
      "GRAP ਸਟੇਜ III/IV ਵਿੱਚ ਕੀ ਬੰਦ ਹੈ?",
      "ਕਿਹੜੇ ਦਸਤਾਵੇਜ਼ ਲੈ ਜਾਵਾਂ?",
    ],
    placeholder: "ਆਪਣਾ ਸਵਾਲ ਲਿਖੋ…",
    send: "ਭੇਜੋ",
    openLabel: "ਵਰਕਰ ਸਾਥੀ ਸਹਾਇਕ ਚੈਟ ਖੋਲ੍ਹੋ",
    closeLabel: "ਚੈਟ ਬੰਦ ਕਰੋ",
    listenLabel: "ਇਹ ਜਵਾਬ ਸੁਣੋ",
    stopLabel: "ਪੜ੍ਹਨਾ ਰੋਕੋ",
    fallback:
      "ਮੈਂ 90 ਦਿਨਾਂ ਦੇ ਕੰਮ ਨਿਯਮ, DBOCWWB ਰਜਿਸਟ੍ਰੇਸ਼ਨ, GRAP ਸਟੇਜ III/IV ਪਾਬੰਦੀ, ਪ੍ਰਮਾਣਿਤ ਕੈਂਪ, ਹੈਲਪਲਾਈਨ ਅਤੇ ਦਸਤਾਵੇਜ਼ਾਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਆਪਣੇ ਮਾਮਲੇ ਲਈ ਸ਼੍ਰਮਿਕ ਹੈਲਪਲਾਈਨ 155214 ’ਤੇ ਕਾਲ ਕਰੋ ਜਾਂ ਹੈਲਪ ਕੈਂਪ ਜਾਓ। ਇਹ ਮਾਰਗਦਰਸ਼ਨ ਹੈ, ਸਰਕਾਰੀ ਹੁਕਮ ਨਹੀਂ।",
    answers: {
      workdays:
        "90 ਦਿਨਾਂ ਦਾ ਸਬੂਤ: ₹10,000 ਸਰਦੀਆਂ ਦੀ ਰਾਹਤ ਲਈ ਪਿਛਲੇ 12 ਮਹੀਨਿਆਂ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ 90 ਉਸਾਰੀ ਕੰਮ ਦੇ ਦਿਨਾਂ ਦਾ ਸਬੂਤ ਰੱਖੋ।\n\nਕੰਮ ਦਾ ਸਬੂਤ: DBOCWWB Live Work Certificate, ਠੇਕੇਦਾਰ ਜਾਂ ਮਾਲਕ ਦਾ ਕੰਮ ਸਰਟੀਫਿਕੇਟ, ਮਸਟਰ ਰੋਲ ਜਾਂ ਹਾਜ਼ਰੀ ਸ਼ੀਟ, ਮਜ਼ਦੂਰੀ ਦੀ ਪਰਚੀ ਅਤੇ ਤਾਰੀਖ਼ ਵਾਲੀ ਸਾਈਟ ਫੋਟੋ।\n\nਸਰਟੀਫਿਕੇਟ ਹੈਲਪ ਕੈਂਪ ਵਿੱਚ ਜਾਂਚਵਾਓ। ਇਹ ਮਾਰਗਦਰਸ਼ਨ ਹੈ — ਅੰਤਿਮ ਯੋਗਤਾ ਸਰਕਾਰੀ ਹੁਕਮ ’ਤੇ ਨਿਰਭਰ ਕਰਦੀ ਹੈ।",
      grap:
        "GRAP ਸਟੇਜ III ਅਤੇ IV: ਸਟੇਜ III ਵਿੱਚ ਜ਼ਿਆਦਾਤਰ ਗੈਰ-ਜ਼ਰੂਰੀ ਉਸਾਰੀ ਅਤੇ ਢਾਹੁਣ ਦਾ ਕੰਮ ਪਾਬੰਦ ਹੁੰਦਾ ਹੈ, ਕੁਝ ਛੋਟਾਂ ਨਾਲ। ਸਟੇਜ IV ਵਿੱਚ ਸਾਰਾ ਉਸਾਰੀ ਅਤੇ ਢਾਹੁਣ ਦਾ ਕੰਮ ਬੰਦ ਹੁੰਦਾ ਹੈ, ਪ੍ਰਾਈਵੇਟ ਸਾਈਟਾਂ ਵੀ, ਸਿਰਫ਼ ਐਮਰਜੈਂਸੀ ਅਤੇ ਛੋਟ ਵਾਲੇ ਕੰਮ ਛੱਡ ਕੇ।\n\nਪਾਬੰਦੀ ਤੋਂ ਪ੍ਰਭਾਵਿਤ ਰਜਿਸਟਰਡ ਮਜ਼ਦੂਰਾਂ ਲਈ ₹10,000 ਮੌਸਮੀ ਰਾਹਤ ਦਾ ਐਲਾਨ ਹੋਇਆ ਸੀ। ਸਰਕਾਰੀ ਹੁਕਮ ਅਤੇ ਪੁਸ਼ਟੀ ਤੋਂ ਬਿਨਾ ਇਸਨੂੰ ਪੱਕਾ ਨਾ ਮੰਨੋ। ਨਵੀਨਤਮ CAQM ਨੋਟਿਸ ਦੇਖੋ।",
      camps:
        "ਪ੍ਰਮਾਣਿਤ ਹੈਲਪ ਕੈਂਪ: ਆਨੰਦ ਵਿਹਾਰ, ਓਖਲਾ, ਭਲਸਵਾ, ਤਿਕਰੀ ਅਤੇ ਕਾਪਸਹੇੜਾ।\n\nਆਧਾਰ, ਬੈਂਕ ਪਾਸਬੁੱਕ, DBOCWWB ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਕੰਮ ਦਾ ਸਬੂਤ ਨਾਲ ਲੈ ਜਾਓ। ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਦਿੱਲੀ ਸ਼੍ਰਮ ਵਿਭਾਗ ਤੋਂ ਸਮਾਂ ਅਤੇ ਥਾਂ ਪੱਕਾ ਕਰੋ। ਮਦਦ ਲਈ 155214 ’ਤੇ ਕਾਲ ਕਰੋ।",
      helplines:
        "ਹੈਲਪਲਾਈਨ:\n• ਸ਼੍ਰਮਿਕ ਹੈਲਪਲਾਈਨ 155214 — ਮਜ਼ਦੂਰੀ, ਨੌਕਰੀ ਤੋਂ ਕੱਢੇ ਜਾਣ ਅਤੇ ਮਜ਼ਦੂਰੀ ਕਾਨੂੰਨ ਸਹਾਇਤਾ (ਸੋਮ–ਸ਼ਨਿੱਚਰ, 9:30 AM–6:00 PM)।\n• DBOCWWB 011-23386000 — ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਭਲਾਈ ਯੋਜਨਾਵਾਂ।\n• 1076 — ਦਿੱਲੀ ਸਰਕਾਰ ਅਤੇ GRAP ਸ਼ਿਕਾਇਤ ਹੈਲਪਲਾਈਨ।\n\nਵੇਰਵੇ ਸਰਕਾਰੀ ਸਰੋਤ ਤੋਂ ਜ਼ਰੂਰ ਪੱਕੇ ਕਰੋ।",
      documents:
        "ਦਸਤਾਵੇਜ਼ ਨਾਲ ਰੱਖੋ:\n1. ਆਧਾਰ ਕਾਰਡ\n2. ਬੈਂਕ ਪਾਸਬੁੱਕ (ਖਾਤਾ ਮਜ਼ਦੂਰ ਦੇ ਨਾਮ ’ਤੇ)\n3. Live Work Certificate ਜਾਂ 90 ਦਿਨਾਂ ਦਾ ਕੰਮ ਸਬੂਤ\n4. DBOCWWB ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਜਾਂ ਨਵੀਨੀਕਰਨ ਵੇਰਵੇ\n5. ਆਧਾਰ ਨਾਲ ਜੁੜਿਆ ਮੋਬਾਈਲ ਨੰਬਰ\n\nDBOCWWB ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਰਕਾਰੀ ਪੋਰਟਲ ਜਾਂ ਹੈਲਪ ਕੈਂਪ ਤੋਂ ਕਰਵਾਓ। ਫੋਟੋਕਾਪੀ ਰੱਖੋ। OTP ਜਾਂ ਬੈਂਕ PIN ਕਿਸੇ ਨੂੰ ਨਾ ਦਿਓ।",
    },
    extraKeywords: {
      workdays: ["90 ਦਿਨ", "ਸਬੂਤ"],
      grap: ["ਸਟੇਜ", "ਬੰਦ"],
      camps: [],
      helplines: [],
      documents: [],
    },
  },
  mr: {
    title: "Worker Saathi Sahayak",
    subtitle: "तुमच्या भाषेत मदत मार्गदर्शन",
    greeting:
      "नमस्ते! मी वर्कर साथी सहायक आहे. 90 दिवसांचा कामाचा नियम, DBOCWWB नोंदणी, GRAP बंधने, पडताळलेली शिबिरे, हेल्पलाइन किंवा कागदपत्रांबद्दल विचारा.",
    starters: [
      "90 दिवसांचा पुरावा काय आहे?",
      "GRAP टप्पा III/IV मध्ये काय बंद आहे?",
      "कोणती कागदपत्रे घ्यावीत?",
    ],
    placeholder: "तुमचा प्रश्न लिहा…",
    send: "पाठवा",
    openLabel: "वर्कर साथी सहायक चॅट उघडा",
    closeLabel: "चॅट बंद करा",
    listenLabel: "हे उत्तर ऐका",
    stopLabel: "वाचणे थांबवा",
    fallback:
      "मी 90 दिवसांचा कामाचा नियम, DBOCWWB नोंदणी, GRAP टप्पा III/IV बंधने, पडताळलेली शिबिरे, हेल्पलाइन आणि कागदपत्रांमध्ये मदत करू शकतो. तुमच्या प्रकरणासाठी श्रमिक हेल्पलाइन 155214 वर कॉल करा किंवा मदत शिबिरात जा. हे मार्गदर्शन आहे, अधिकृत आदेश नाही.",
    answers: {
      workdays:
        "90 दिवसांचा पुरावा: ₹10,000 हिवाळी मदतीसाठी गेल्या 12 महिन्यांत किमान 90 बांधकाम कामाच्या दिवसांचा पुरावा ठेवा.\n\nउपयुक्त पुरावा: DBOCWWB Live Work Certificate, कंत्राटदार किंवा मालकाचे कामाचे प्रमाणपत्र, मस्टर रोल किंवा उपस्थिती पत्रक, मजुरी पावती आणि तारखेसह साइट फोटो.\n\nप्रमाणपत्र मदत शिबिरात तपासून घ्या. हे मार्गदर्शन आहे — अंतिम पात्रता अधिकृत आदेशावर अवलंबून आहे.",
      grap:
        "GRAP टप्पा III आणि IV: टप्पा III मध्ये बहुतेक अनावश्यक बांधकाम आणि पाडकाम बंद असते, काही सवलतींसह. टप्पा IV मध्ये सर्व बांधकाम आणि पाडकाम बंद असते, खाजगी साइटही, फक्त आपत्कालीन आणि सूट असलेले काम वगळून.\n\nबंधनामुळे प्रभावित नोंदणीकृत कामगारांसाठी ₹10,000 हंगामी मदतीची घोषणा झाली होती. अधिकृत आदेश आणि पडताळणीशिवाय ती निश्चित मानू नका. नवीनतम CAQM सूचना पहा.",
      camps:
        "पडताळलेली मदत शिबिरे: आनंद विहार, ओखला, भलस्वा, तिकरी आणि कापसहेडा.\n\nआधार, बँक पासबुक, DBOCWWB नोंदणी आणि कामाचा पुरावा सोबत घ्या. जाण्यापूर्वी दिल्ली कामगार विभागाकडून वेळ आणि ठिकाण निश्चित करा. मदतीसाठी 155214 वर कॉल करा.",
      helplines:
        "हेल्पलाइन:\n• श्रमिक हेल्पलाइन 155214 — मजुरी, नोकरीतून काढणे आणि कामगार कायदा मदत (सोम–शनि, 9:30 AM–6:00 PM).\n• DBOCWWB 011-23386000 — नोंदणी आणि कल्याण योजना.\n• 1076 — दिल्ली सरकार आणि GRAP तक्रार हेल्पलाइन.\n\nतपशील अधिकृत स्रोताकडून नक्की तपासा.",
      documents:
        "कागदपत्रे सोबत ठेवा:\n1. आधार कार्ड\n2. बँक पासबुक (खाते कामगाराच्या नावावर)\n3. Live Work Certificate किंवा 90 दिवसांचा कामाचा पुरावा\n4. DBOCWWB नोंदणी किंवा नूतनीकरण तपशील\n5. आधारशी जोडलेला मोबाइल क्रमांक\n\nDBOCWWB नोंदणी अधिकृत पोर्टल किंवा मदत शिबिरातून करा. छायाप्रत ठेवा. OTP किंवा बँक PIN कोणालाही देऊ नका.",
    },
    extraKeywords: {
      workdays: ["90 दिवस", "पुरावा"],
      grap: ["टप्पा", "बंद"],
      camps: [],
      helplines: [],
      documents: ["कागदपत्रे"],
    },
  },
  bn: {
    title: "Worker Saathi Sahayak",
    subtitle: "আপনার ভাষায় সহায়তা নির্দেশনা",
    greeting:
      "নমস্কার! আমি ওয়ার্কার সাথী সহায়ক। 90 দিনের কাজের নিয়ম, DBOCWWB নিবন্ধন, GRAP নিষেধাজ্ঞা, যাচাই করা ক্যাম্প, হেল্পলাইন বা নথি সম্পর্কে জিজ্ঞাসা করুন।",
    starters: [
      "90 দিনের প্রমাণ কী?",
      "GRAP পর্যায় III/IV-এ কী নিষিদ্ধ?",
      "কোন নথি নিয়ে যাব?",
    ],
    placeholder: "আপনার প্রশ্ন লিখুন…",
    send: "পাঠান",
    openLabel: "ওয়ার্কার সাথী সহায়ক চ্যাট খুলুন",
    closeLabel: "চ্যাট বন্ধ করুন",
    listenLabel: "এই উত্তর শুনুন",
    stopLabel: "পড়া থামান",
    fallback:
      "আমি 90 দিনের কাজের নিয়ম, DBOCWWB নিবন্ধন, GRAP পর্যায় III/IV নিষেধাজ্ঞা, যাচাই করা ক্যাম্প, হেল্পলাইন ও নথিতে সাহায্য করতে পারি। ব্যক্তিগত বিষয়ের জন্য শ্রমিক হেল্পলাইন 155214-এ কল করুন বা সহায়তা ক্যাম্পে যান। এটি নির্দেশনা, সরকারি আদেশ নয়।",
    answers: {
      workdays:
        "90 দিনের প্রমাণ: ₹10,000 শীতকালীন সহায়তার জন্য গত 12 মাসে অন্তত 90টি নির্মাণ কাজের দিনের প্রমাণ রাখুন।\n\nকাজের প্রমাণ: DBOCWWB Live Work Certificate, ঠিকাদার বা মালিকের কাজের সার্টিফিকেট, মাস্টার রোল বা উপস্থিতি শিট, মজুরি স্লিপ এবং তারিখসহ সাইটের ছবি।\n\nসার্টিফিকেট সহায়তা ক্যাম্পে যাচাই করান। এটি নির্দেশনা — চূড়ান্ত যোগ্যতা সরকারি আদেশের উপর নির্ভর করে।",
      grap:
        "GRAP পর্যায় III ও IV: পর্যায় III-এ বেশিরভাগ অপ্রয়োজনীয় নির্মাণ ও ভাঙার কাজ নিষিদ্ধ, কিছু ছাড়সহ। পর্যায় IV-এ সব নির্মাণ ও ভাঙার কাজ বন্ধ থাকে, বেসরকারি সাইটও, শুধু জরুরি ও ছাড়প্রাপ্ত কাজ বাদে।\n\nনিষেধাজ্ঞায় ক্ষতিগ্রস্ত নিবন্ধিত শ্রমিকদের জন্য ₹10,000 মৌসুমি সহায়তার ঘোষণা হয়েছিল। সরকারি আদেশ ও যাচাই ছাড়া এটি নিশ্চিত ধরবেন না। সর্বশেষ CAQM বিজ্ঞপ্তি দেখুন।",
      camps:
        "যাচাই করা সহায়তা ক্যাম্প: আনন্দ বিহার, ওখলা, ভলসোয়া, টিকরি এবং কাপাসহেড়া।\n\nআধার, ব্যাংক পাসবুক, DBOCWWB নিবন্ধন এবং কাজের প্রমাণ সঙ্গে নিন। যাওয়ার আগে দিল্লি শ্রম বিভাগ থেকে সময় ও স্থান নিশ্চিত করুন। সাহায্যের জন্য 155214-এ কল করুন।",
      helplines:
        "হেল্পলাইন:\n• শ্রমিক হেল্পলাইন 155214 — মজুরি, চাকরি থেকে বাদ এবং শ্রম আইন সহায়তা (সোম–শনি, 9:30 AM–6:00 PM)।\n• DBOCWWB 011-23386000 — নিবন্ধন ও কল্যাণ প্রকল্প।\n• 1076 — দিল্লি সরকার ও GRAP অভিযোগ হেল্পলাইন।\n\nবিস্তারিত সরকারি সূত্র থেকে অবশ্যই যাচাই করুন।",
      documents:
        "নথি সঙ্গে রাখুন:\n1. আধার কার্ড\n2. ব্যাংক পাসবুক (অ্যাকাউন্ট শ্রমিকের নামে)\n3. Live Work Certificate বা 90 দিনের কাজের প্রমাণ\n4. DBOCWWB নিবন্ধন বা নবীকরণের তথ্য\n5. আধারের সঙ্গে যুক্ত মোবাইল নম্বর\n\nDBOCWWB নিবন্ধন সরকারি পোর্টাল বা সহায়তা ক্যাম্প থেকে করান। ফটোকপি রাখুন। OTP বা ব্যাংক PIN কাউকে দেবেন না।",
    },
    extraKeywords: {
      workdays: ["90 দিন", "প্রমাণ"],
      grap: ["পর্যায়", "নিষিদ্ধ"],
      camps: [],
      helplines: [],
      documents: ["নথি"],
    },
  },
  ta: {
    title: "Worker Saathi Sahayak",
    subtitle: "உங்கள் மொழியில் நிவாரண வழிகாட்டுதல்",
    greeting:
      "வணக்கம்! நான் வொர்க்கர் சாதி சகாயக். 90 நாள் வேலை விதி, DBOCWWB பதிவு, GRAP தடைகள், சரிபார்க்கப்பட்ட முகாம்கள், உதவி எண்கள் அல்லது ஆவணங்கள் பற்றிக் கேளுங்கள்.",
    starters: [
      "90 நாள் ஆதாரம் என்ன?",
      "GRAP நிலை III/IV-ல் என்ன தடை?",
      "எந்த ஆவணங்களை எடுத்துச் செல்ல வேண்டும்?",
    ],
    placeholder: "உங்கள் கேள்வியை எழுதுங்கள்…",
    send: "அனுப்பு",
    openLabel: "வொர்க்கர் சாதி சகாயக் அரட்டையைத் திற",
    closeLabel: "அரட்டையை மூடு",
    listenLabel: "இந்தப் பதிலைக் கேள்",
    stopLabel: "படிப்பதை நிறுத்து",
    fallback:
      "90 நாள் வேலை விதி, DBOCWWB பதிவு, GRAP நிலை III/IV தடைகள், சரிபார்க்கப்பட்ட முகாம்கள், உதவி எண்கள் மற்றும் ஆவணங்களில் என்னால் உதவ முடியும். தனிப்பட்ட விவகாரத்திற்கு ஷ்ரமிக் உதவி எண் 155214-ஐ அழையுங்கள் அல்லது உதவி முகாமுக்குச் செல்லுங்கள். இது வழிகாட்டுதல், அதிகாரப்பூர்வ உத்தரவு அல்ல.",
    answers: {
      workdays:
        "90 நாள் ஆதாரம்: ₹10,000 குளிர்கால நிவாரணத்திற்காக கடந்த 12 மாதங்களில் குறைந்தது 90 கட்டுமான வேலை நாட்களுக்கான ஆதாரத்தை வைத்திருங்கள்.\n\nபயனுள்ள ஆதாரம்: DBOCWWB Live Work Certificate, ஒப்பந்தக்காரர் அல்லது முதலாளியின் வேலைச் சான்றிதழ், மஸ்டர் ரோல் அல்லது வருகைப் பட்டியல், கூலி சீட்டு மற்றும் தேதியிட்ட தளப் புகைப்படங்கள்.\n\nசான்றிதழை உதவி முகாமில் சரிபார்க்கவும். இது வழிகாட்டுதல் — இறுதித் தகுதி அதிகாரப்பூர்வ உத்தரவைப் பொறுத்தது.",
      grap:
        "GRAP நிலை III மற்றும் IV: நிலை III-ல் அவசியமில்லாத பெரும்பாலான கட்டுமானம் மற்றும் இடிப்பு வேலைகள் தடை செய்யப்படும், சில விலக்குகளுடன். நிலை IV-ல் அனைத்து கட்டுமானம் மற்றும் இடிப்பு வேலைகளும் நிறுத்தப்படும், தனியார் தளங்களும் உட்பட, அவசர மற்றும் விலக்கு பெற்ற வேலைகளைத் தவிர.\n\nதடையால் பாதிக்கப்பட்ட பதிவு செய்யப்பட்ட தொழிலாளர்களுக்கு ₹10,000 பருவகால நிவாரணம் அறிவிக்கப்பட்டது. அதிகாரப்பூர்வ உத்தரவும் சரிபார்ப்பும் இல்லாமல் அதை உறுதி எனக் கொள்ளாதீர்கள். சமீபத்திய CAQM அறிவிப்பைப் பாருங்கள்.",
      camps:
        "சரிபார்க்கப்பட்ட உதவி முகாம்கள்: ஆனந்த் விஹார், ஒக்லா, பலஸ்வா, திக்ரி மற்றும் கபாஸ்ஹெரா.\n\nஆதார், வங்கி பாஸ்புக், DBOCWWB பதிவு மற்றும் வேலை ஆதாரத்தை எடுத்துச் செல்லுங்கள். புறப்படும் முன் டெல்லி தொழிலாளர் துறையிடம் நேரம் மற்றும் இடத்தை உறுதிசெய்யுங்கள். உதவிக்கு 155214-ஐ அழையுங்கள்.",
      helplines:
        "உதவி எண்கள்:\n• ஷ்ரமிக் உதவி எண் 155214 — ஊதியம், வேலை நீக்கம் மற்றும் தொழிலாளர் சட்ட உதவி (திங்கள்–சனி, 9:30 AM–6:00 PM).\n• DBOCWWB 011-23386000 — பதிவு மற்றும் நலத்திட்டங்கள்.\n• 1076 — டெல்லி அரசு மற்றும் GRAP புகார் உதவி எண்.\n\nவிவரங்களை அதிகாரப்பூர்வ ஆதாரத்தில் எப்போதும் உறுதிசெய்யுங்கள்.",
      documents:
        "எடுத்துச் செல்ல வேண்டிய ஆவணங்கள்:\n1. ஆதார் அட்டை\n2. வங்கி பாஸ்புக் (கணக்கு தொழிலாளர் பெயரில்)\n3. Live Work Certificate அல்லது 90 நாள் வேலை ஆதாரம்\n4. DBOCWWB பதிவு அல்லது புதுப்பித்தல் விவரங்கள்\n5. ஆதாருடன் இணைக்கப்பட்ட மொபைல் எண்\n\nDBOCWWB பதிவை அதிகாரப்பூர்வ இணையதளம் அல்லது உதவி முகாம் மூலம் செய்யுங்கள். நகல்களை வைத்திருங்கள். OTP அல்லது வங்கி PIN யாருக்கும் தர வேண்டாம்.",
    },
    extraKeywords: {
      workdays: ["90 நாள்", "ஆதாரம்"],
      grap: ["நிலை", "தடை"],
      camps: [],
      helplines: [],
      documents: ["ஆவணங்கள்"],
    },
  },
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[.,!?;:'"()[\]{}\-–—/\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function collectKeywords(content: ChatbotCopy): Record<ChatTopicId, string[]> {
  const topicIds: ChatTopicId[] = [
    "workdays",
    "grap",
    "camps",
    "helplines",
    "documents",
  ];

  return topicIds.reduce(
    (result, topicId) => {
      result[topicId] = [
        ...BASE_KEYWORDS[topicId],
        ...content.extraKeywords[topicId],
      ].map(normalize);
      return result;
    },
    {} as Record<ChatTopicId, string[]>
  );
}

const KEYWORDS: Record<Language, Record<ChatTopicId, string[]>> = {
  en: collectKeywords(CHATBOT_COPY.en),
  hinglish: collectKeywords(CHATBOT_COPY.hinglish),
  hi: collectKeywords(CHATBOT_COPY.hi),
  pa: collectKeywords(CHATBOT_COPY.pa),
  mr: collectKeywords(CHATBOT_COPY.mr),
  bn: collectKeywords(CHATBOT_COPY.bn),
  ta: collectKeywords(CHATBOT_COPY.ta),
};

export function getChatbotContent(language: Language): ChatbotContent {
  const content = CHATBOT_COPY[language];
  return {
    title: content.title,
    subtitle: content.subtitle,
    greeting: content.greeting,
    starters: content.starters,
    placeholder: content.placeholder,
    send: content.send,
    openLabel: content.openLabel,
    closeLabel: content.closeLabel,
    listenLabel: content.listenLabel,
    stopLabel: content.stopLabel,
    fallback: content.fallback,
    answers: content.answers,
  };
}

export function findChatbotAnswer(
  query: string,
  language: Language
): { topic: ChatTopicId | "fallback"; answer: string } {
  const content = CHATBOT_COPY[language];
  const normalizedQuery = normalize(query);

  const matches = (
    Object.keys(KEYWORDS[language]) as ChatTopicId[]
  )
    .map((topicId) => {
      const score = KEYWORDS[language][topicId].reduce((total, keyword) => {
        if (!keyword || !normalizedQuery.includes(keyword)) return total;
        return total + Math.max(1, Math.min(keyword.length, 12));
      }, 0);
      return { topicId, score };
    })
    .sort((a, b) => b.score - a.score);

  const best = matches[0];
  if (!best || best.score === 0) {
    return { topic: "fallback", answer: content.fallback };
  }

  return { topic: best.topicId, answer: content.answers[best.topicId] };
}
