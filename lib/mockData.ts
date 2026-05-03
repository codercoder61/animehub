export interface Server {
  id: string;
  name: string;
  url: string;
}



export interface Anime {
  id: string;
  title: string;
  poster: string;
  coverImage: string;
  description: string;
  genres: string[];
  totalEpisodes: number;
  episodes:Server[];
}

export const mockAnimeData: Anime[] = [
  {
    id: '1064',
    title: 'Naruto',
    poster: 'https://witanime.you/wp-content/uploads/2021/09/Naruto-323x470.png',
    coverImage: 'https://photos.tf1.fr/1920/1080/merged-cover-showpage-naruto-cf3aba-fcabf4-838baa-0@1x.jpg',
    description: 'القصة تتحدث عن النينجا المراهق ناروتو أوزوماكي الذي وجد نفسه منبوذًا من قبل سكان قريته بسبب الكيوبي الذي بداخله، لذلك وضع نصب عينيه أن ينال لقب الهوكاجي وهو اللقب الذي يُطلق على قائد القرية وأقوى نينجا فيها، لينال احترام واعتراف الجميع.',
    genres: ['قوة خارقة', 'مغامرات', 'فنون قتالية', 'كوميدي','أكشن'],
    totalEpisodes: 220,
    episodes : [],
  },
  {
    id: '1341',
    title: 'Death Note',
    poster: 'https://witanime.you/wp-content/uploads/2021/01/Death-Note-323x470.jpg',
    coverImage: 'https://a.storyblok.com/f/178900/640x414/96bdb54ffa/9ad8556129a7f0a7ed37a3f0a5614b191579792149_full.jpg/m/640x414',
    description: '(لايت ياغامي) طالب موهوب و عبقري , لكنه يشعر بالملل و الرتابة من حياته التي يعيشها , في أحد الأيام عثر على دفتر مذكرات معنون بــ  “مذكرة الموت ” كان قد سقط من عالم الشينيجامي و تقول التعليمات المدونة على المذكرة بأنه بمجرد كتابة اسم الشخص و طريقة الوفاة فإن حادثة الموت ستقع وفق التفاصيل التي يدونها على الصفحات؟!.',
    genres: [
  "غموض",
  "بوليسي",
  "نفسي",
  "خارق للطبيعة",
  "إثارة",
  "شياطين"
],
    totalEpisodes: 37,
    episodes : [],
  },
  {
    id: '1472',
    title: 'Jujutsu Kaisen',
    poster: 'https://witanime.you/wp-content/uploads/2020/09/Jujutsu-Kaisen-TV-323x470.jpg',
    coverImage: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/01/mixcollage-05-jan-2025-09-55-am-9793.jpg?q=49&fit=crop&w=825&dpr=2',
    description: 'القصة تتحدث عن إيتادوري يوجي و هو فتى عبقري ذو بنية جسدية قوية ويتسكع مع نادي الظواهر الخارقة في المدرسة. ذات يوم تتغير حياة يوجي بعد وفاة جده ومقابلته لميغومي فوشيغورو الذي أخبره بأنه يمتلك غرضًا ملعونًا، عندها تتوالى المصائب على يوجي.',
    genres: [
  "أكشن",
  "رعب",
  "شياطين",
  "خارق للطبيعة",
  "مدرسي",
  "شونين"
],
    totalEpisodes: 24,
    episodes : [],
   
  },
  {
    id: '1326',
    title: 'Fullmetal Alchemist: Brotherhood',
    poster: 'https://witanime.you/wp-content/uploads/2021/01/Fullmetal-Alchemist-Brotherhood-323x470.jpg',
    coverImage: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2025/04/demon-slayer-and-fullmetal-alchemist-cover-image.jpg?w=1200&h=675&fit=crop',
    description: ' ألفونس و أدوارد أمهما إثر مرض عضال.. عندها يقومان بإستخدام قوة الخيمياء المحرمة لإرجاع روح أمهما. تفشل تلك العملية حيث يفقد الأخ الأكبر إدوارد رجله اليسرى بينما يتخلى أخوه الأصغر عن روحه كي يقوم بحماية أخوه كنتيجة حتمية لإستخدامها شيئاً محرماً. يُضحي إدوارد بيده اليمنى حتى لا ينتقل أخوه لعالم لا عودة منه ويقسم حينها بأن يحصل على حجر الفلاسفة حتى يستطيعا العودة لسابق عهدهما ويحافظ على روح أخيه حتى لو أضطر لأن يكون مجرد حالة خيميائه تقوم بإستخدامها الأبحاث العسكرية.',
    genres: [
  "أكشن",
  "عسكري",
  "مغامرات",
  "كوميدي",
  "دراما",
  "سحر",
  "خيال",
  "شونين"
],
    totalEpisodes: 64,
    episodes : [],
  },
  {
    id: '1',
    title: 'Dandelion',
    poster: 'https://witanime.you/wp-content/uploads/2026/04/Dandelion-323x470.jpg',
    coverImage: 'https://a.storyblok.com/f/178900/851x479/4a55ab9d6e/dandelion-header.jpg/m/filters:quality(95)format(webp)',
    description: 'في وكالة تعمل في شؤون ما بعد الموت، حيث ترشد الملائكة الأرواح العالقة، يخوض "تتسو" و"ميساكي" جميع التحديات بأسلوبهما غير التقليدي لمساعدة الموتى في الوصول إلى حالة الطمأنينة.',
    genres: [
  "خارق للطبيعة",
  "كوميدي"
],
    totalEpisodes: 7,
    episodes : [],
  },
  {
    id: '2',
    title: 'Aishiteru Game wo Owarasetai',
    poster: 'https://witanime.you/wp-content/uploads/2026/04/Aishiteru-Game-wo-Owarasetai-323x470.jpg',
    coverImage: 'https://nami.news/wordpress/wp-content/uploads/2025/06/Aishiteru-Game-o-Owarasetai-Manga-cover-1-1-e1749734501641.jpg',
    description:'في الصف السادس الابتدائي ابتكر صديقا الطفولة يوكيا أساجي وميكو ساكورا لعبة هدفها إحراج الآخر من خلال قول أنا أحبك بالتناوب. وبعد أربع سنوات، ومع دخولهما المرحلة الثانوية، لا يزال الاثنان يحاولان التفوق على الآخر والفوز باللعبة. ومع ذلك، ومع بدء مشاعر رقيقة في التفتح في قلوبهما، اكتسبت العبارة البسيطة معنى جديدًا يتجاوز قواعد لعبتهما مع مرور كل يوم، تنمو رغبتهما في أن يصبحا أكثر من مجرد أصدقاء طفولة، لكنّ يوكيا وميكو يقاومان القيام بالخطوة الأولى، مترددين بشأن ما ينتظرهما بمجرد انتهاء اللعبة أخيرًا.',
    genres: [
  "مدرسي",
  "رومانسي",
  "كوميدي"
],
    totalEpisodes: 12,
    episodes : [],
  },
];
