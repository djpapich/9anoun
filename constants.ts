import type { Language, DocumentCategory } from './types';

export const UI_TEXTS: { [key: string]: { [key in Language]: string } } = {
  // Sidebar
  appTitle: { fr: "NonProfit Assistant", ar: "مساعد غير ربحي" },
  developerCredit: { fr: "Développé par El Mehdi Ait Aissa", ar: "طوره المهدي آيت عيسى" },
  welcome: { fr: "Accueil", ar: "الرئيسية" },
  chat: { fr: "Chat Juridique", ar: "محادثة قانونية" },
  docAnalysis: { fr: "Analyse de Document", ar: "تحليل مستند" },
  docGeneration: { fr: "Génération de Document", ar: "إنشاء مستند" },
  theme: { fr: "Thème", ar: "السمة" },
  language: { fr: "Langue", ar: "اللغة" },
  signIn: { fr: "Se connecter", ar: "تسجيل الدخول" },
  signOut: { fr: "Se déconnecter", ar: "تسجيل الخروج" },
  
  // Login Modal
  signInTitle: { fr: "Connectez-vous pour commencer", ar: "سجل الدخول للبدء" },
  signInDesc: { fr: "Entrez votre email pour sauvegarder votre historique de chat de manière sécurisée.", ar: "أدخل بريدك الإلكتروني لحفظ سجل محادثاتك بشكل آمن." },
  emailLabel: { fr: "Adresse e-mail", ar: "البريد الإلكتروني" },
  
  // Welcome View
  welcomeTitle: { fr: "Bienvenue à NonProfit Assistant", ar: "مرحبًا بك في المساعد غير الربحي" },
  welcomeDesc: { fr: "Votre partenaire spécialisé dans le droit marocain. Analysez, générez et discutez de questions juridiques en toute confiance.", ar: "شريكك المتخصص في القانون المغربي. قم بتحليل وإنشاء ومناقشة المسائل القانونية بكل ثقة." },
  welcomeKnowledge: { fr: "Base de Connaissances", ar: "قاعدة المعرفة" },
  welcomeKnowledgeDesc: { fr: "Notre IA est continuellement mise à jour avec les dernières lois, décrets et jurisprudences des sources officielles marocaines comme 9anoun.ma et justice.gov.ma pour garantir des réponses précises et pertinentes.", ar: "يتم تحديث ذكائنا الاصطناعي باستمرار بأحدث القوانين والمراسيم والاجتهادات القضائية من مصادر مغربية رسمية مثل 9anoun.ma و justice.gov.ma لضمان إجابات دقيقة وذات صلة." },

  // Chat View
  chatPlaceholder: { fr: "Posez votre question ou joignez un document...", ar: "اطرح سؤالك أو أرفق مستندًا..." },
  chatSignInRequired: { fr: "Veuillez vous connecter pour commencer à chatter.", ar: "يرجى تسجيل الدخول لبدء المحادثة." },

  
  // Doc Analysis
  analysisTitle: { fr: "Analyse de Document", ar: "تحليل المستندات" },
  analysisDesc: { fr: "Uploadez un document (PDF, TXT, JPG, PNG) ou scannez-le pour l'analyser. Posez des questions, demandez des résumés ou extrayez des points clés.", ar: "قم بتحميل مستند (PDF ، TXT ، JPG ، PNG) أو مسحه ضوئيًا لتحليله. اطرح أسئلة أو اطلب ملخصات أو استخرج النقاط الرئيسية." },
  uploadLabel: { fr: "Sélectionnez un fichier", ar: "اختر ملفًا" },
  scanLabel: { fr: "Scannez un document", ar: "امسح مستندًا ضوئيًا" },
  fileReady: { fr: "Fichier prêt pour l'analyse.", ar: "الملف جاهز للتحليل." },
  askQuestion: { fr: "Posez une question sur le document...", ar: "اطرح سؤالاً حول المستند..." },
  analyzeButton: { fr: "Analyser", ar: "تحليل" },

  // Doc Generation
  generationTitle: { fr: "Génération de Documents", ar: "إنشاء المستندات" },
  generationDesc: { fr: "Choisissez un type de document, remplissez les informations et générez un écrit juridique ou administratif conforme.", ar: "اختر نوع المستند، املأ المعلومات، وأنشئ وثيقة قانونية أو إدارية متوافقة." },
  selectCategory: { fr: "Choisir une catégorie...", ar: "اختر فئة..." },
  selectTemplate: { fr: "Choisir un modèle...", ar: "اختر نموذجًا..." },
  fillDetails: { fr: "Remplissez les détails", ar: "املأ التفاصيل" },
  generateButton: { fr: "Générer le document", ar: "إنشاء المستند" },
  generatedDocument: { fr: "Document Généré", ar: "المستند الذي تم إنشاؤه" },
  copyButton: { fr: "Copier", ar: "نسخ" },
  copied: { fr: "Copié !", ar: "تم النسخ!" },
};


export const DOCUMENT_CATEGORIES: DocumentCategory[] = [
  {
    id: 'admin',
    name: { fr: "Demandes Administratives", ar: "طلبات إدارية" },
    templates: [
      { id: 'auth-request', name: { fr: "Demande d'autorisation", ar: "طلب ترخيص" }, description: { fr: "Document officiel pour solliciter une permission auprès d'une autorité administrative pour une activité spécifique (ex: construction, événement).", ar: "وثيقة رسمية لطلب إذن من سلطة إدارية لممارسة نشاط معين (مثل: البناء، تنظيم حدث)." }, fields: [ { id: 'fullName', type: 'text', label: { fr: "Nom et Prénom", ar: "الاسم الكامل" } }, { id: 'cin', type: 'text', label: { fr: "N° CIN", ar: "رقم البطاقة الوطنية" } }, { id: 'address', type: 'text', label: { fr: "Adresse", ar: "العنوان" } }, { id: 'subject', type: 'textarea', label: { fr: "Objet de la demande", ar: "موضوع الطلب" } } ] },
      { id: 'complaint', name: { fr: "Plainte / Réclamation", ar: "شكاية / تظلم" }, description: { fr: "Écrit formel pour signaler un préjudice, un litige ou un mécontentement à une autorité compétente afin de demander une intervention ou une réparation.", ar: "كتابة رسمية للإبلاغ عن ضرر أو نزاع أو عدم رضا لدى سلطة مختصة لطلب تدخل أو جبر." }, fields: [ { id: 'fullName', type: 'text', label: { fr: "Nom du plaignant", ar: "اسم المشتكي" } }, { id: 'cin', type: 'text', label: { fr: "N° CIN", ar: "رقم البطاقة الوطنية" } }, { id: 'against', type: 'text', label: { fr: "Contre qui/quoi", ar: "ضد من/ماذا" } }, { id: 'facts', type: 'textarea', label: { fr: "Exposé des faits", ar: "عرض الوقائع" } } ] }
    ]
  },
  {
    id: 'contracts',
    name: { fr: "Contrats", ar: "عقود" },
    templates: [
      { id: 'lease', name: { fr: "Contrat de location", ar: "عقد كراء" }, description: { fr: "Accord légal entre un propriétaire (bailleur) et un locataire, définissant les conditions de location d'un bien immobilier (loyer, durée, obligations).", ar: "اتفاق قانوني بين مالك (مكري) ومستأجر (مكتري)، يحدد شروط استئجار عقار (الإيجار، المدة، الالتزامات)." }, fields: [ { id: 'lessorName', type: 'text', label: { fr: "Nom du bailleur", ar: "اسم المكري" } }, { id: 'lesseeName', type: 'text', label: { fr: "Nom du locataire", ar: "اسم المكتري" } }, { id: 'propertyAddress', type: 'text', label: { fr: "Adresse du bien", ar: "عنوان العقار" } }, { id: 'rentAmount', type: 'text', label: { fr: "Montant du loyer (Dhs)", ar: "مبلغ الكراء (درهم)" } }, { id: 'startDate', type: 'date', label: { fr: "Date de début", ar: "تاريخ البدء" } } ] },
      { id: 'work-contract', name: { fr: "Contrat de travail (CDD)", ar: "عقد عمل (محدد المدة)" }, description: { fr: "Contrat liant un employeur et un salarié pour une mission et une durée déterminées, précisant le poste, la rémunération et les dates de début et de fin.", ar: "عقد يربط بين صاحب عمل وأجير لإنجاز مهمة لمدة محددة، مع تحديد المنصب والأجر وتاريخي البدء والانتهاء." }, fields: [ { id: 'employerName', type: 'text', label: { fr: "Nom de l'employeur", ar: "اسم المشغل" } }, { id: 'employeeName', type: 'text', label: { fr: "Nom de l'employé(e)", ar: "اسم الأجير(ة)" } }, { id: 'position', type: 'text', label: { fr: "Poste occupé", ar: "المنصب" } }, { id: 'salary', type: 'text', label: { fr: "Salaire (Dhs)", ar: "الأجر (درهم)" } }, { id: 'startDate', type: 'date', label: { fr: "Date de début", ar: "تاريخ البدء" } }, { id: 'endDate', type: 'date', label: { fr: "Date de fin", ar: "تاريخ الانتهاء" } } ] }
    ]
  },
  {
    id: 'lawyer',
    name: { fr: "Actes d'Avocat", ar: "وثائق المحامي" },
    templates: [
      { id: 'mise-en-demeure', name: { fr: "Mise en demeure", ar: "إنذار" }, description: { fr: "Acte juridique formel sommant une personne d'exécuter une obligation (payer, livrer un bien) dans un délai précis, avant d'engager une procédure judiciaire.", ar: "إجراء قانوني رسمي يُلزم شخصًا بتنفيذ التزام (دفع، تسليم سلعة) في غضون فترة محددة، قبل الشروع في إجراءات قضائية." }, fields: [ { id: 'claimantName', type: 'text', label: { fr: "Nom du requérant", ar: "اسم الطالب" } }, { id: 'defendantName', type: 'text', label: { fr: "Nom du mis en cause", ar: "اسم المطلوب" } }, { id: 'claimSubject', type: 'textarea', label: { fr: "Objet de la réclamation", ar: "موضوع المطالبة" } }, { id: 'deadline', type: 'text', label: { fr: "Délai accordé (ex: 15 jours)", ar: "المدة الممنوحة (مثال: 15 يوما)" } } ] },
      { id: 'requete-introductive', name: { fr: "Requête introductive d'instance", ar: "مقال افتتاحي للدعوى" }, description: { fr: "Document juridique qui saisit officiellement un tribunal pour commencer un procès. Il expose les faits, les arguments et les demandes du plaignant.", ar: "وثيقة قانونية ترفع إلى المحكمة لبدء دعوى قضائية بشكل رسمي. تعرض وقائع وحجج ومطالب المدعي." }, fields: [ { id: 'plaintiffName', type: 'text', label: { fr: "Nom du demandeur", ar: "اسم المدعي" } }, { id: 'defendantName', type: 'text', label: { fr: "Nom du défendeur", ar: "اسم المدعى عليه" } }, { id: 'court', type: 'text', label: { fr: "Tribunal compétent", ar: "المحكمة المختصة" } }, { id: 'factsAndClaims', type: 'textarea', label: { fr: "Exposé des faits et demandes", ar: "عرض الوقائع والطلبات" } } ] },
      { id: 'power-of-attorney', name: { fr: "وكالة خاصة", ar: "وكالة خاصة" }, description: { fr: "Acte par lequel une personne (le mandant) donne à une autre (le mandataire) le pouvoir d'accomplir en son nom un ou plusieurs actes juridiques précis.", ar: "محرر يمنح بموجبه شخص (الموكل) لشخص آخر (الوكيل) سلطة إبرام تصرف أو تصرفات قانونية محددة باسمه ولحسابه." }, fields: [ { id: 'principalName', type: 'text', label: { fr: "Nom du mandant", ar: "اسم الموكل" } }, { id: 'agentName', type: 'text', label: { fr: "Nom du mandataire", ar: "اسم الوكيل" } }, { id: 'powers', type: 'textarea', label: { fr: "Étendue des pouvoirs", ar: "حدود الوكالة" } } ] },
      { id: 'response-memo', name: { fr: "Mذكرة جوابية", ar: "مذكرة جوابية" }, description: { fr: "Document soumis au tribunal en réponse aux arguments et aux demandes de la partie adverse, présentant ses propres moyens de défense ou contre-arguments.", ar: "مستند يقدم للمحكمة رداً على دفوع وطلبات الخصم، ويعرض فيه أسانيد الدفاع أو الحجج المضادة." }, fields: [ { id: 'courtName', type: 'text', label: { fr: "Tribunal", ar: "المحكمة" } }, { id: 'caseNumber', type: 'text', label: { fr: "Numéro de dossier", ar: "رقم الملف" } }, { id: 'defendant', type: 'text', label: { fr: "Nom du défendeur", ar: "اسم المدعى عليه" } }, { id: 'plaintiff', type: 'text', label: { fr: "Nom du demandeur", ar: "اسم المدعي" } }, { id: 'arguments', type: 'textarea', label: { fr: "Arguments et défense", ar: "الحجج والدفاع" } } ] },
       { id: 'provisional-execution', name: { fr: "Demande d'exécution provisoire", ar: "طلب التنفيذ المعجل" }, description: { fr: "Requête demandant au tribunal d'ordonner que son jugement soit exécutoire immédiatement, malgré les délais d'appel, en raison de l'urgence ou de la nature de l'affaire.", ar: "طلب يرفع إلى المحكمة لإصدار أمر بتنفيذ حكمها فوراً، رغم آجال الاستئناف، بسبب الاستعجال أو طبيعة القضية." }, fields: [ { id: 'courtName', type: 'text', label: { fr: "Tribunal", ar: "المحكمة" } }, { id: 'judgmentRef', type: 'text', label: { fr: "Référence du jugement", ar: "مرجع الحكم" } }, { id: 'requestingParty', type: 'text', label: { fr: "Partie demanderesse", ar: "الطرف الطالب" } }, { id: 'opposingParty', type: 'text', label: { fr: "Partie adverse", ar: "الطرف الخصم" } }, { id: 'justification', type: 'textarea', label: { fr: "Justification de l'urgence", ar: "مبررات الاستعجال" } } ] }
    ]
  },
  {
    id: 'notary',
    name: { fr: "Actes Notariés", ar: "وثائق الموثق" },
    templates: [
        { id: 'promesse-vente', name: { fr: "Promesse de vente", ar: "وعد بالبيع" }, description: { fr: "Avant-contrat par lequel un vendeur s'engage à vendre un bien immobilier à un acheteur à un prix convenu, qui dispose d'un délai pour accepter l'offre.", ar: "عقد تمهيدي يلتزم بموجبه البائع ببيع عقار للمشتري بسعر متفق عليه، ويكون للمشتري مهلة لقبول العرض." }, fields: [ { id: 'sellerName', type: 'text', label: { fr: "Nom du promettant (vendeur)", ar: "اسم الواعد (البائع)" } }, { id: 'buyerName', type: 'text', label: { fr: "Nom du bénéficiaire (acheteur)", ar: "اسم المستفيد (المشتري)" } }, { id: 'propertyDesc', type: 'textarea', label: { fr: "Description du bien immobilier", ar: "وصف العقار" } }, { id: 'price', type: 'text', label: { fr: "Prix de vente (Dhs)", ar: "ثمن البيع (درهم)" } } ] },
        { id: 'reconnaissance-dette', name: { fr: "Reconnaissance de dette", ar: "إقرار بدين" }, description: { fr: "Écrit par lequel une personne (le débiteur) reconnaît devoir une somme d'argent à une autre personne (le créancier), précisant le montant et les conditions.", ar: "محرر يعترف فيه شخص (المدين) بأنه مدين بمبلغ من المال لشخص آخر (الدائن)، مع تحديد المبلغ والشروط." }, fields: [ { id: 'debtorName', type: 'text', label: { fr: "Nom du débiteur", ar: "اسم المدين" } }, { id: 'creditorName', type: 'text', label: { fr: "Nom du créancier", ar: "اسم الدائن" } }, { id: 'amount', type: 'text', label: { fr: "Montant de la dette (Dhs)", ar: "مبلغ الدين (درهم)" } }, { id: 'repaymentTerms', type: 'textarea', label: { fr: "Modalités de remboursement", ar: "شروط السداد" } } ] }
    ]
  },
  {
      id: 'prefecture',
      name: { fr: "Démarches Préfectorales", ar: "إجراءات العمالة" },
      templates: [
          { id: 'demande-certificat-residence', name: { fr: "Demande de certificat de résidence", ar: "طلب شهادة السكنى" }, description: { fr: "Document administratif pour demander une attestation officielle (certificat de résidence ou 'شهادة السكنى') prouvant le lieu de domicile principal.", ar: "وثيقة إدارية لطلب شهادة رسمية (شهادة السكنى) تثبت مكان الإقامة الرئيسي." }, fields: [ { id: 'applicantName', type: 'text', label: { fr: "Nom du demandeur", ar: "اسم الطالب" } }, { id: 'cin', type: 'text', label: { fr: "N° CIN", ar: "رقم البطاقة الوطنية" } }, { id: 'address', type: 'text', label: { fr: "Adresse complète", ar: "العنوان الكامل" } }, { id: 'reason', type: 'textarea', label: { fr: "Motif de la demande", ar: "سبب الطلب" } } ] },
          { id: 'declaration-perte-cin', name: { fr: "Déclaration de perte de la CIN", ar: "تصريح بضياع البطاقة الوطنية" }, description: { fr: "Procédure officielle pour déclarer la perte de la Carte d'Identité Nationale, étape indispensable avant de demander un duplicata.", ar: "إجراء رسمي للإعلان عن ضياع بطاقة التعريف الوطنية، وهي خطوة ضرورية قبل طلب نسخة جديدة." }, fields: [ { id: 'declarantName', type: 'text', label: { fr: "Nom du déclarant", ar: "اسم المصرح" } }, { id: 'cin', type: 'text', label: { fr: "N° CIN perdue", ar: "رقم البطاقة الوطنية المفقودة" } }, { id: 'circumstances', type: 'textarea', label: { fr: "Circonstances de la perte", ar: "ظروف الضياع" } }, { id: 'dateOfLoss', type: 'date', label: { fr: "Date de la perte (approximative)", ar: "تاريخ الضياع (تقريبي)" } } ] }
      ]
  }
];