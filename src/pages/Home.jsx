import { useState, useRef, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import logo from '../assets/logo.png';

export default function Home() {
    const [formData, setFormData] = useState({
        ownerName: "",
        businessName: "",
        phoneNumber: "",
        email: "",
        registerSpecificEntity: "no",
        specificEntity: "",
    });

    const [contactForm, setContactForm] = useState({
        name: "",
        phone: "",
        email: ""
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [language, setLanguage] = useState('en');
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const reviewsRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await addDoc(collection(db, "submissions"), {
                ...formData,
                submittedAt: new Date(),
                status: "new"
            });
            setIsSubmitted(true);
            setFormData({
                ownerName: "",
                businessName: "",
                phoneNumber: "",
                email: "",
                registerSpecificEntity: "no",
                specificEntity: "",
            });
        } catch (err) {
            console.error("Error adding document: ", err);
            setError("Failed to submit. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "messages"), {
                ...contactForm,
                submittedAt: new Date(),
                status: "new"
            });
            alert("Message sent successfully!");
            setContactForm({ name: "", phone: "", email: "" });
        } catch (err) {
            console.error("Error sending message: ", err);
            alert("Failed to send message.");
        }
    };

    // Language translations
    const translations = {
        en: {
            heroTitle: "Abu Dhabi Vendor Registration Services",
            heroSubtitle: "Professional vendor registration services for businesses seeking to become approved suppliers with Abu Dhabi government departments and private sector entities.",
            statsText: "Abu Dhabi Entities Supported",
            formTitle: "Get Started with Your Abu Dhabi Vendor Registration",
            ownerNameLabel: "Business Owner's Name *",
            ownerNamePlaceholder: "Enter your full name",
            businessNameLabel: "Full Business Name (As in the Trading License) *",
            businessNamePlaceholder: "Enter your complete business name as registered",
            phoneLabel: "UAE Phone Number *",
            phonePlaceholder: "+971 50 123 4567",
            emailLabel: "Business Email Address *",
            emailPlaceholder: "your.business@email.com",
            specificEntityLabel: "Register with Specific Abu Dhabi Entity? *",
            generalRegistration: "No - General Registration",
            specificRegistration: "Yes - Specific Entity",
            specifyEntityLabel: "Specify Abu Dhabi Government or Private Entity *",
            specifyEntityPlaceholder: "e.g., Abu Dhabi Municipality, ADNOC, Aldar Properties, etc.",
            submitButton: "Submit Registration Request",
            servicesTitle: "Abu Dhabi Vendor Registration Services",
            servicesSubtitle: "Expert assistance for businesses seeking vendor registration with Abu Dhabi government entities and private sector organizations.",
            whyChooseTitle: "Why Choose Our Abu Dhabi Vendor Registration Service?",
            whyChooseText1: "GoVendor provides specialized vendor registration services for businesses looking to become approved suppliers with Abu Dhabi government departments, municipalities, and leading private sector companies. Our expertise ensures your business meets all requirements for successful vendor registration.",
            whyChooseText2: "Whether you're a small business, SME, or large corporation, our team understands the specific documentation, compliance, and procedural requirements needed for vendor approval across various Abu Dhabi entities including ADNOC, Abu Dhabi Municipality, Ministry of Finance, and major private sector organizations.",
            whyChooseText3: "We streamline the entire vendor registration process, saving you time and ensuring your application meets all Abu Dhabi government and private sector vendor requirements from the start.",
            abuDhabiExpertise: "Abu Dhabi Expertise",
            abuDhabiExpertiseDesc: "Specialized knowledge of Abu Dhabi government and private entity vendor requirements.",
            fastProcessing: "Fast Processing",
            fastProcessingDesc: "Expedited vendor registration process for Abu Dhabi entities.",
            complianceAssurance: "Compliance Assurance",
            complianceAssuranceDesc: "Ensure your business meets all Abu Dhabi vendor compliance standards.",
            entitiesTitle: "Abu Dhabi Government & Private Entities",
            entitiesSubtitle: "We assist with vendor registration for leading Abu Dhabi government departments and private sector organizations.",
            governmentRegistration: "Government Vendor Registration",
            governmentRegistrationDesc: "Complete assistance with vendor registration for Abu Dhabi government departments, municipalities, and federal entities.",
            privateSectorRegistration: "Private Sector Vendor Registration",
            privateSectorRegistrationDesc: "Expert support for vendor registration with leading Abu Dhabi private sector companies and organizations.",
            complianceDocumentation: "Compliance & Documentation",
            complianceDocumentationDesc: "Ensure your business meets all Abu Dhabi vendor compliance requirements and documentation standards.",
            footerTagline: "Professional Abu Dhabi vendor registration services for government and private sector entities. Your trusted partner for business growth in Abu Dhabi.",
            contactTitle: "Contact Us",
            name: "Name",
            phone: "Phone Number",
            email: "Email",
            sendButton: "Send Message",
            servicesListTitle: "Our Services",
            governmentService: "Abu Dhabi Government Vendor Registration",
            privateService: "Abu Dhabi Private Sector Vendor Registration",
            complianceService: "UAE Business Compliance Assistance",
            supplierService: "Abu Dhabi Supplier Registration Support",
            copyright: "GoVendor - Abu Dhabi Vendor Registration Services. All rights reserved.",
            thankYouTitle: "Thank You!",
            thankYouMessage: "Your request has been submitted successfully. We will contact you shortly to discuss the next steps for your Abu Dhabi vendor registration.",
            submitAnother: "Submit Another Request",
            reviewsTitle: "What Our Clients Say",
            reviewsSubtitle: "Hear from businesses that have successfully registered as vendors with Abu Dhabi entities"
        },
        ar: {
            heroTitle: "خدمات تسجيل الموردين في أبوظبي",
            heroSubtitle: "خدمات تسجيل الموردين الاحترافية للشركات التي تسعى لتصبح موردين معتمدين لدى إدارات حكومة أبوظبي والقطاع الخاص.",
            statsText: "كيانات أبوظبي المدعومة",
            formTitle: "ابدأ تسجيلك كمورد في أبوظبي",
            ownerNameLabel: "اسم مالك العمل *",
            ownerNamePlaceholder: "أدخل اسمك الكامل",
            businessNameLabel: "الاسم الكامل للعمل التجاري (كما في رخصة التداول) *",
            businessNamePlaceholder: "أدخل الاسم الكامل لعملك كما هو مسجل",
            phoneLabel: "رقم الهاتف الإماراتي *",
            phonePlaceholder: "+971 50 123 4567",
            emailLabel: "عنوان البريد الإلكتروني التجاري *",
            emailPlaceholder: "your.business@email.com",
            specificEntityLabel: "التسجيل لدى كيان محدد في أبوظبي؟ *",
            generalRegistration: "لا - تسجيل عام",
            specificRegistration: "نعم - كيان محدد",
            specifyEntityLabel: "حدد جهة حكومة أبوظبي أو القطاع الخاص *",
            specifyEntityPlaceholder: "مثال: بلدية أبوظبي، أدنوك، ألدار للعقارات، إلخ.",
            submitButton: "إرسال طلب التسجيل",
            servicesTitle: "خدمات تسجيل الموردين في أبوظبي",
            servicesSubtitle: "مساعدة خبيرة للشركات التي تسعى لتسجيل موردين مع كيانات حكومة أبوظبي ومؤسسات القطاع الخاص.",
            whyChooseTitle: "لماذا تختار خدمة تسجيل الموردين في أبوظبي؟",
            whyChooseText1: "توفر جوفندور خدمات تسجيل الموردين المتخصصة للشركات التي تسعى لتصبح موردين معتمدين لدى إدارات حكومة أبوظبي والبلديات وشركات القطاع الخاص الرائدة. تضمن خبرتنا استيفاء عملك لجميع المتطلبات للتسجيل الناجح كمورد.",
            whyChooseText2: "سواء كنت شركة صغيرة أو مؤسسة متوسطة أو شركة كبيرة، فإن فريقنا يفهم المتطلبات المحددة من الوثائق والامتثال والإجراءات اللازمة لموافقة المورد عبر مختلف كيانات أبوظبي بما في ذلك أدنوك وبلدية أبوظبي ووزارة المالية ومؤسسات القطاع الخاص الرئيسية.",
            whyChooseText3: "نحن نبسط عملية تسجيل الموردين بالكامل، مما يوفر وقتك ويضمن استيفاء طلبك لجميع متطلبات الموردين الحكومية والخاصة في أبوظبي من البداية.",
            abuDhabiExpertise: "خبرة أبوظبي",
            abuDhabiExpertiseDesc: "معرفة متخصصة بمتطلبات تسجيل الموردين في كيانات أبوظبي الحكومية والخاصة.",
            fastProcessing: "معالجة سريعة",
            fastProcessingDesc: "عملية تسجيل موردين متسارعة لك entities أبوظبي.",
            complianceAssurance: "ضمان الامتثال",
            complianceAssuranceDesc: "ضمان استيفاء عملك لجميع معايير امتثال الموردين في أبوظبي.",
            entitiesTitle: "كيانات حكومة أبوظبي والقطاع الخاص",
            entitiesSubtitle: "نساعد في تسجيل الموردين لدى إدارات حكومة أبوظبي الرائدة ومؤسسات القطاع الخاص.",
            governmentRegistration: "تسجيل الموردين الحكوميين",
            governmentRegistrationDesc: "مساعدة كاملة في تسجيل الموردين لإدارات حكومة أبوظبي والبلديات والكيانات الاتحادية.",
            privateSectorRegistration: "تسجيل الموردين في القطاع الخاص",
            privateSectorRegistrationDesc: "دعم خبير لتسجيل الموردين مع شركات ومنظمات القطاع الخاص الرائدة في أبوظبي.",
            complianceDocumentation: "الامتثال والتوثيق",
            complianceDocumentationDesc: "ضمان استيفاء عملك لجميع متطلبات امتثال الموردين ومعايير التوثيق في أبوظبي.",
            footerTagline: "خدمات تسجيل الموردين الاحترافية في أبوظبي للكيانات الحكومية والخاصة. شريكك الموثوق لنمو الأعمال في أبوظبي.",
            contactTitle: "اتصل بنا",
            name: "الاسم",
            phone: "رقم الهاتف",
            email: "البريد الإلكتروني",
            sendButton: "إرسال الرسالة",
            servicesListTitle: "خدماتنا",
            governmentService: "تسجيل موردي حكومة أبوظبي",
            privateService: "تسجيل موردي القطاع الخاص في أبوظبي",
            complianceService: "مساعدة امتثال الأعمال في الإمارات",
            supplierService: "دعم تسجيل الموردين في أبوظبي",
            copyright: "جوفندور - خدمات تسجيل موردي أبوظبي. جميع الحقوق محفوظة.",
            thankYouTitle: "شكرًا لك!",
            thankYouMessage: "تم إرسال طلبك بنجاح. سنقوم بالاتصال بك قريبًا لمناقشة الخطوات التالية لتسجيلك كمورد في أبوظبي.",
            submitAnother: "إرسال طلب آخر",
            reviewsTitle: "ما يقوله عملاؤنا",
            reviewsSubtitle: "استمع من الشركات التي سجلت بنجاح كموردين لدى كيانات أبوظبي"
        }
    };

    const t = translations[language];

    // Updated Reviews data - 5 reviews including the Arabic one
    const reviews = [
        {
            id: 1,
            name: "Ahmed Al Mansoori",
            rating: 5,
            comment: "The registration process as a vendor with the Abu Dhabi Municipality done by GoVendor is very easy and quick. The team is very professional, knowing all the regulations. It took me only 2 weeks to be approved. Best for businesses looking to partner with the Abu Dhabi government institutions.",
            language: "en"
        },
        {
            id: 2,
            name: "Rajesh Kumar",
            rating: 5,
            comment: "As a new Indian entrepreneur in the UAE city of Abu Dhabi, I have encountered many regulations in vendor registration. But GoVendor has demonstrated every step with so much patience and expertise. This service of GoVendor is fast, trustworthy, and worth every dirham. They helped me register successfully with ADNOC.",
            language: "en"
        },
        {
            id: 3,
            name: "Sarah Johnson",
            rating: 5,
            comment: "I was hesitant to use a local service to register the vendors, but GoVendor proved to be a pleasant surprise. They have responded to my queries with incredible speed, and everything is handled with utmost professionalism. My business is now registered with many Abu Dhabi organizations thanks to their expertise. They are efficient, speedy, and reliable.",
            language: "en"
        },
        {
            id: 4,
            name: "Fatima Al Hashimi",
            rating: 5,
            comment: "The team at GoVendor is amazing! They assisted me in registering my business with Aldar Properties very efficiently. They are very knowledgeable about the requirements of the government, as well as the requirements of the private sector. I highly recommend their services to all business owners in Abu Dhabi.",
            language: "en"
        },
        {
            id: 5,
            name: "Mohammed Al Zaabi",
            rating: 5,
            comment: "خدمتكم ممتازة جدًا! ساعدتموني في تسجيل شركتي كمورد لدى بلدية أبوظبي خلال أسبوعين فقط. الفريق محترف وسريع في الرد على الاستفسارات. أنصح بشدة باستخدام خدمات جوفندور لأي شركة ترغب في العمل مع الجهات الحكومية في أبوظبي. الشكر الجزيل لكم!",
            language: "ar"
        }
    ];

    const nextReview = () => {
        setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    // Auto-rotate reviews every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            nextReview();
        }, 5000);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const currentReview = reviews[currentReviewIndex];

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.thankYouTitle}</h2>
                    <p className="text-gray-600 mb-6">
                        {t.thankYouMessage}
                    </p>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                    >
                        {t.submitAnother}
                    </button>
                </div>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden">
                                <img src={logo} alt="GoVendor Logo" className="w-full h-full object-cover" />
                            </div>
                            <h1 className="ml-3 text-2xl font-bold text-gray-900">GoVendor</h1>
                        </div>

                        {/* Language Selector */}
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="en" className="flex items-center">
                                        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-red-600 via-white to-blue-600 border border-gray-300 mr-2 inline-block"></span>
                                        English
                                    </option>
                                    <option value="ar" className="flex items-center">
                                        <span className="w-5 h-5 rounded-full bg-gradient-to-br from-red-600 via-green-600 to-black border border-gray-300 mr-2 inline-block"></span>
                                        العربية
                                    </option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="max-w-4xl mx-auto mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            {t.heroTitle}
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            {t.heroSubtitle}
                        </p>

                        {/* Statistics Block */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
                            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">50+</div>
                                    <div className="text-gray-700 font-medium">{t.statsText}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Registration Form Section - Full Width Background */}
            <section className="py-16 bg-white w-full">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.formTitle}</h2>
                    </div>

                    {error && <p className="text-red-500 mb-6 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.ownerNameLabel}
                                </label>
                                <input
                                    type="text"
                                    id="ownerName"
                                    name="ownerName"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50"
                                    placeholder={t.ownerNamePlaceholder}
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.phoneLabel}
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50"
                                    placeholder={t.phonePlaceholder}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                                {t.businessNameLabel}
                            </label>
                            <input
                                type="text"
                                id="businessName"
                                name="businessName"
                                value={formData.businessName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50"
                                placeholder={t.businessNamePlaceholder}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                {t.emailLabel}
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50"
                                placeholder={t.emailPlaceholder}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {t.specificEntityLabel}
                            </label>
                            <div className="flex space-x-6" dir="ltr">
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="registerSpecificEntity"
                                        value="no"
                                        checked={formData.registerSpecificEntity === "no"}
                                        onChange={handleChange}
                                        className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    {t.generalRegistration}
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="registerSpecificEntity"
                                        value="yes"
                                        checked={formData.registerSpecificEntity === "yes"}
                                        onChange={handleChange}
                                        className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    {t.specificRegistration}
                                </label>
                            </div>
                        </div>

                        {formData.registerSpecificEntity === "yes" && (
                            <div>
                                <label htmlFor="specificEntity" className="block text-sm font-medium text-gray-700 mb-2">
                                    {t.specifyEntityLabel}
                                </label>
                                <textarea
                                    id="specificEntity"
                                    name="specificEntity"
                                    value={formData.specificEntity}
                                    onChange={handleChange}
                                    required={formData.registerSpecificEntity === "yes"}
                                    rows={3}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-gray-50"
                                    placeholder={t.specifyEntityPlaceholder}
                                ></textarea>
                            </div>
                        )}

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition duration-300 shadow-lg transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {loading ? (language === 'ar' ? 'جاري الإرسال...' : 'Sending...') : t.submitButton}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* SEO Optimized Services Section */}
            <section id="overview" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.servicesTitle}</h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                            {t.servicesSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.whyChooseTitle}</h3>
                            <p className="text-gray-700 mb-6 text-lg">
                                {t.whyChooseText1}
                            </p>
                            <p className="text-gray-700 mb-6 text-lg">
                                {t.whyChooseText2}
                            </p>
                            <p className="text-gray-700 text-lg">
                                {t.whyChooseText3}
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{t.abuDhabiExpertise}</h4>
                                        <p className="text-gray-600">{t.abuDhabiExpertiseDesc}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{t.fastProcessing}</h4>
                                        <p className="text-gray-600">{t.fastProcessingDesc}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2">{t.complianceAssurance}</h4>
                                        <p className="text-gray-600">{t.complianceAssuranceDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Abu Dhabi Entities Section */}
            <section id="entities" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.entitiesTitle}</h2>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                            {t.entitiesSubtitle}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {/* Abu Dhabi City Municipality */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                                <img
                                    src="https://placehold.co/250x250/ffffff/000000?text=ABU+DHABI+CITY+MUNICIPALITY"
                                    alt={language === 'en' ? "Abu Dhabi City Municipality - Government Vendor Registration" : "بلدية مدينة أبوظبي - تسجيل الموردين الحكوميين"}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* Ministry of Finance */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                                <img
                                    src="https://placehold.co/250x250/ffffff/000000?text=MINISTRY+OF+FINANCE"
                                    alt={language === 'en' ? "Ministry of Finance UAE - Government Vendor Registration" : "وزارة المالية الإمارات - تسجيل الموردين الحكوميين"}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* ADNOC */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                                <img
                                    src="https://placehold.co/250x250/ffffff/000000?text=ADNOC"
                                    alt={language === 'en' ? "ADNOC - Abu Dhabi National Oil Company Vendor Registration" : "أدنوك - تسجيل موردي شركة أبوظبي الوطنية للنفط"}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* Aldar */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                                <img
                                    src="https://placehold.co/250x250/ffffff/000000?text=ALDAR"
                                    alt={language === 'en' ? "Aldar Properties - Abu Dhabi Real Estate Vendor Registration" : "ألدار للعقارات - تسجيل موردي العقارات في أبوظبي"}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* MÜDON */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                                <img
                                    src="https://placehold.co/250x250/ffffff/000000?text=MÜDON"
                                    alt={language === 'en' ? "MÜDON - Abu Dhabi Construction Vendor Registration" : "ميودون - تسجيل موردي الإنشاءات في أبوظبي"}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        {/* TAQA */}
                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 bg-white rounded-lg p-4 shadow-md">
                                <img
                                    src="https://placehold.co/250x250/ffffff/000000?text=TAQA"
                                    alt={language === 'en' ? "TAQA - Abu Dhabi Energy Company Vendor Registration" : "طاقة - تسجيل موردي شركة أبوظبي للطاقة"}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Services Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.servicesTitle}</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            {t.servicesSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t.governmentRegistration}</h3>
                            <p className="text-gray-600">
                                {t.governmentRegistrationDesc}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t.privateSectorRegistration}</h3>
                            <p className="text-gray-600">
                                {t.privateSectorRegistrationDesc}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition duration-300">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t.complianceDocumentation}</h3>
                            <p className="text-gray-600">
                                {t.complianceDocumentationDesc}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.reviewsTitle}</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {t.reviewsSubtitle}
                        </p>
                    </div>

                    {/* Single Review Display with Navigation Arrows */}
                    <div className="relative max-w-2xl mx-auto">
                        <div
                            className="bg-blue-50 rounded-xl p-8 text-center transition-opacity duration-300"
                            dir={currentReview.language === 'ar' ? 'rtl' : 'ltr'}
                        >
                            <div className="flex items-center justify-center mb-4">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-600">({currentReview.rating}/5)</span>
                            </div>
                            <p className="text-gray-700 mb-6 italic text-lg">
                                "{currentReview.comment}"
                            </p>
                            <div className="flex items-center justify-center">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {currentReview.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-gray-900 text-lg">{currentReview.name}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevReview}
                            className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-blue-50 transition duration-200"
                            aria-label="Previous review"
                        >
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={nextReview}
                            className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-blue-50 transition duration-200"
                            aria-label="Next review"
                        >
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        {/* Indicator Dots */}
                        <div className="flex justify-center mt-8 space-x-2">
                            {reviews.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentReviewIndex(index)}
                                    className={`w-3 h-3 rounded-full transition duration-200 ${index === currentReviewIndex ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                    aria-label={`Go to review ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <h3 className="ml-3 text-xl font-bold">GoVendor</h3>
                            </div>
                            <p className="text-gray-400">
                                {t.footerTagline}
                            </p>
                            <p className="text-gray-600 text-xs mt-4">v1.1</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">{t.contactTitle}</h4>
                            <form onSubmit={handleContactSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-300 mb-1">
                                        {t.name}
                                    </label>
                                    <input
                                        type="text"
                                        id="contactName"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleContactChange}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder={language === 'en' ? "Your name" : "اسمك"}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-300 mb-1">
                                        {t.phone}
                                    </label>
                                    <input
                                        type="tel"
                                        id="contactPhone"
                                        name="phone"
                                        value={contactForm.phone}
                                        onChange={handleContactChange}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder={language === 'en' ? "+971 50 123 4567" : "+971 50 123 4567"}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-300 mb-1">
                                        {t.email}
                                    </label>
                                    <input
                                        type="email"
                                        id="contactEmail"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={handleContactChange}
                                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder={language === 'en' ? "your.email@example.com" : "your.email@example.com"}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                                >
                                    {t.sendButton}
                                </button>
                            </form>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">{t.servicesListTitle}</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>✓ {t.governmentService}</li>
                                <li>✓ {t.privateService}</li>
                                <li>✓ {t.complianceService}</li>
                                <li>✓ {t.supplierService}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; {new Date().getFullYear()} {t.copyright}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
