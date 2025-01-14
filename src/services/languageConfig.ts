export type Language = 'en' | 'fr' | 'ar';

export interface Translation {
  // Common
  appName: string;
  loading: string;
  error: string;
  back: string;
  save: string;
  delete: string;
  cancel: string;
  confirm: string;
  unknownError: string;
  minutes: string;
  duration: string;
  progress: string;
  created: string;

  // Homepage
  tagline: string;
  appDescription: string;
  startNewSession: string;
  viewSavedSessions: string;
  disclaimer: string;

  // Chat
  chatWelcome: string;
  chatPlaceholder: string;
  startSession: string;
  generating: string;
  generatingScript: string;
  generatingAudio: string;
  processingAudio: string;

  // Player
  play: string;
  pause: string;
  stop: string;
  volume: string;
  voiceVolume: string;
  musicVolume: string;
  resetToDefault: string;
  backToSessions: string;
  backToHome: string;

  // Sessions
  savedSessions: string;
  noSavedSessions: string;
  createFirstSession: string;
  createNewSession: string;
  chooseSession: string;
  sessionPageDescription: string;
  confirmDelete: string;
  deleteSessionConfirm: string;

  // Session Types
  stressReliefTitle: string;
  stressReliefDescription: string;
  confidenceTitle: string;
  confidenceDescription: string;
  sleepTitle: string;
  sleepDescription: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    // Common
    appName: 'HypnoJourney',
    loading: 'Loading...',
    error: 'An error occurred',
    back: 'Back',
    save: 'Save',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    unknownError: 'An unknown error occurred',
    minutes: 'minutes',
    duration: 'Duration',
    progress: 'Progress',
    created: 'Created',

    // Homepage
    tagline: 'Begin Your Journey to Inner Peace and Self-Improvement',
    appDescription: 'Experience personalized hypnotherapy sessions designed to help you achieve your goals and find inner peace.',
    startNewSession: 'Start New Session',
    viewSavedSessions: 'View Saved Sessions',
    disclaimer: 'This app is not a substitute for professional medical advice. All sessions use AI-generated voices for demonstration purposes.',

    // Chat
    chatWelcome: 'Hello! I am your AI hypnotherapist. How can I help you today?',
    chatPlaceholder: 'Type your message here...',
    startSession: 'Start Session',
    generating: 'Generating your personalized session...',
    generatingScript: 'Creating your personalized hypnosis script...',
    generatingAudio: 'Converting script to soothing audio...',
    processingAudio: 'Processing audio...',

    // Player
    play: 'Play',
    pause: 'Pause',
    stop: 'Stop',
    volume: 'Volume',
    voiceVolume: 'Voice Volume',
    musicVolume: 'Music Volume',
    resetToDefault: 'Reset to Default',
    backToSessions: 'Back to Sessions',
    backToHome: 'Back to Home',

    // Sessions
    savedSessions: 'Saved Sessions',
    noSavedSessions: 'No saved sessions yet',
    createFirstSession: 'Create Your First Session',
    createNewSession: 'Create New Session',
    chooseSession: 'Choose Your Session',
    sessionPageDescription: 'Select a session type to begin your journey',
    confirmDelete: 'Confirm Deletion',
    deleteSessionConfirm: 'Are you sure you want to delete this session? This action cannot be undone.',

    // Session Types
    stressReliefTitle: 'Stress Relief',
    stressReliefDescription: 'Release tension and find inner calm with this gentle relaxation session.',
    confidenceTitle: 'Confidence Boost',
    confidenceDescription: 'Build self-confidence and embrace your inner strength.',
    sleepTitle: 'Better Sleep',
    sleepDescription: 'Drift into peaceful, restorative sleep with this calming session.',
  },
  fr: {
    // Common
    appName: 'HypnoJourney',
    loading: 'Chargement...',
    error: 'Une erreur est survenue',
    back: 'Retour',
    save: 'Enregistrer',
    delete: 'Supprimer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    unknownError: 'Une erreur inconnue est survenue',
    minutes: 'minutes',
    duration: 'Durée',
    progress: 'Progression',
    created: 'Créé le',

    // Homepage
    tagline: 'Commencez Votre Voyage vers la Paix Intérieure',
    appDescription: 'Découvrez des séances d\'hypnothérapie personnalisées pour atteindre vos objectifs et trouver la paix intérieure.',
    startNewSession: 'Nouvelle Séance',
    viewSavedSessions: 'Voir les Séances Sauvegardées',
    disclaimer: 'Cette application ne remplace pas l\'avis médical professionnel. Toutes les séances utilisent des voix générées par IA à des fins de démonstration.',

    // Chat
    chatWelcome: 'Bonjour! Je suis votre hypnothérapeute IA. Comment puis-je vous aider aujourd\'hui?',
    chatPlaceholder: 'Écrivez votre message ici...',
    startSession: 'Commencer la Séance',
    generating: 'Génération de votre séance personnalisée...',
    generatingScript: 'Création de votre script d\'hypnose personnalisé...',
    generatingAudio: 'Conversion du script en audio apaisant...',
    processingAudio: 'Traitement de l\'audio...',

    // Player
    play: 'Lecture',
    pause: 'Pause',
    stop: 'Arrêter',
    volume: 'Volume',
    voiceVolume: 'Volume de la Voix',
    musicVolume: 'Volume de la Musique',
    resetToDefault: 'Réinitialiser',
    backToSessions: 'Retour aux Séances',
    backToHome: 'Retour à l\'Accueil',

    // Sessions
    savedSessions: 'Séances Sauvegardées',
    noSavedSessions: 'Aucune séance sauvegardée',
    createFirstSession: 'Créer Votre Première Séance',
    createNewSession: 'Créer une Nouvelle Séance',
    chooseSession: 'Choisissez Votre Séance',
    sessionPageDescription: 'Sélectionnez un type de séance pour commencer votre voyage',
    confirmDelete: 'Confirmer la Suppression',
    deleteSessionConfirm: 'Êtes-vous sûr de vouloir supprimer cette séance ? Cette action est irréversible.',

    // Session Types
    stressReliefTitle: 'Gestion du Stress',
    stressReliefDescription: 'Libérez les tensions et trouvez le calme intérieur avec cette séance de relaxation.',
    confidenceTitle: 'Boost de Confiance',
    confidenceDescription: 'Développez votre confiance en vous et embrassez votre force intérieure.',
    sleepTitle: 'Meilleur Sommeil',
    sleepDescription: 'Plongez dans un sommeil paisible et réparateur avec cette séance apaisante.',
  },
  ar: {
    // Common
    appName: 'رحلة التنويم',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    back: 'رجوع',
    save: 'حفظ',
    delete: 'حذف',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    unknownError: 'حدث خطأ غير معروف',
    minutes: 'دقائق',
    duration: 'المدة',
    progress: 'التقدم',
    created: 'تم الإنشاء في',

    // Homepage
    tagline: 'ابدأ رحلتك نحو السلام الداخلي',
    appDescription: 'اختبر جلسات التنويم المغناطيسي المخصصة لمساعدتك في تحقيق أهدافك والعثور على السلام الداخلي.',
    startNewSession: 'بدء جلسة جديدة',
    viewSavedSessions: 'عرض الجلسات المحفوظة',
    disclaimer: 'هذا التطبيق ليس بديلاً عن المشورة الطبية المهنية. تستخدم جميع الجلسات أصواتاً منشأة بواسطة الذكاء الاصطناعي لأغراض العرض.',

    // Chat
    chatWelcome: 'مرحباً! أنا معالجك بالتنويم المغناطيسي. كيف يمكنني مساعدتك اليوم؟',
    chatPlaceholder: 'اكتب رسالتك هنا...',
    startSession: 'بدء الجلسة',
    generating: 'جاري إنشاء جلستك المخصصة...',
    generatingScript: 'جاري إنشاء نص التنويم المخصص لك...',
    generatingAudio: 'جاري تحويل النص إلى صوت هادئ...',
    processingAudio: 'جاري معالجة الصوت...',

    // Player
    play: 'تشغيل',
    pause: 'إيقاف مؤقت',
    stop: 'إيقاف',
    volume: 'مستوى الصوت',
    voiceVolume: 'مستوى صوت المتحدث',
    musicVolume: 'مستوى صوت الموسيقى',
    resetToDefault: 'إعادة للإعدادات الافتراضية',
    backToSessions: 'العودة إلى الجلسات',
    backToHome: 'العودة إلى الرئيسية',

    // Sessions
    savedSessions: 'الجلسات المحفوظة',
    noSavedSessions: 'لا توجد جلسات محفوظة',
    createFirstSession: 'إنشاء جلستك الأولى',
    createNewSession: 'إنشاء جلسة جديدة',
    chooseSession: 'اختر جلستك',
    sessionPageDescription: 'اختر نوع الجلسة لبدء رحلتك',
    confirmDelete: 'تأكيد الحذف',
    deleteSessionConfirm: 'هل أنت متأكد من رغبتك في حذف هذه الجلسة؟ لا يمكن التراجع عن هذا الإجراء.',

    // Session Types
    stressReliefTitle: 'تخفيف التوتر',
    stressReliefDescription: 'تخلص من التوتر واعثر على الهدوء الداخلي مع هذه الجلسة المريحة.',
    confidenceTitle: 'تعزيز الثقة',
    confidenceDescription: 'ابنِ ثقتك بنفسك واكتشف قوتك الداخلية.',
    sleepTitle: 'نوم أفضل',
    sleepDescription: 'انجرف نحو نوم هادئ ومريح مع هذه الجلسة المهدئة.',
  },
}; 