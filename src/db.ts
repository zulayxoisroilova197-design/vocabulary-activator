import Dexie, { type Table } from "dexie";
import type { VocabWord } from "@/types";


export class VocabularyDB extends Dexie {

  words!: Table<VocabWord, number>;

  constructor() {

    super("VocabularyDB");

    this.version(1).stores({
      words: "++id, english, uzbek, topic, level, learned, createdAt",
    });

  }

}


export const db = new VocabularyDB();



type SeedWord = [
  english: string,
  uzbek: string,
  level: string
];


type SeedData = Record<string, SeedWord[]>;



export const seedWords: SeedData = {


"Daily Life": [

["house","uy","A1"],
["family","oila","A1"],
["food","ovqat","A1"],
["water","suv","A1"],
["book","kitob","A1"],
["room","xona","A1"],
["friend","do'st","A1"],
["school","maktab","A1"],
["day","kun","A1"],
["time","vaqt","A1"],

["habit","odat","A2"],
["routine","kundalik tartib","A2"],
["comfortable","qulay","A2"],
["healthy","sog'lom","A2"],
["busy","band","A2"],
["early","erta","A2"],
["quiet","tinch","A2"],
["simple","oddiy","A2"],
["prepare","tayyorlamoq","A2"],
["choose","tanlamoq","A2"],

["experience","tajriba","B1"],
["decision","qaror","B1"],
["relationship","munosabat","B1"],
["behavior","xulq","B1"],
["improve","yaxshilamoq","B1"],
["manage","boshqarmoq","B1"],
["organize","tashkil qilmoq","B1"],
["future","kelajak","B1"],
["goal","maqsad","B1"],
["progress","rivojlanish","B1"],

["challenge","qiyinchilik","B2"],
["responsibility","mas'uliyat","B2"],
["opportunity","imkoniyat","B2"],
["independent","mustaqil","B2"],
["effective","samarali","B2"],
["attitude","munosabat","B2"],
["confidence","ishonch","B2"],
["achievement","yutuq","B2"],
["influence","ta'sir","B2"],
["perspective","nuqtai nazar","B2"],

["resilient","chidamli","C1"],
["sophisticated","murakkab","C1"],
["significant","muhim","C1"],
["remarkable","ajoyib","C1"],
["adaptation","moslashish","C1"],
["contemporary","zamonaviy","C1"],

["unprecedented","misli ko'rilmagan","C2"],
["inevitable","muqarrar","C2"],
["meticulous","sinchkov","C2"],
["profound","chuqur","C2"],

],



"Education": [

["school","maktab","A1"],
["teacher","o'qituvchi","A1"],
["student","o'quvchi","A1"],
["book","kitob","A1"],
["class","sinf","A1"],
["lesson","dars","A1"],
["pen","ruchka","A1"],
["paper","qog'oz","A1"],
["test","test","A1"],
["learn","o'rganmoq","A1"],

["subject","fan","A2"],
["homework","uy vazifasi","A2"],
["practice","mashq","A2"],
["exam","imtihon","A2"],
["skill","ko'nikma","A2"],
["language","til","A2"],
["study","o'qimoq","A2"],
["remember","eslamoq","A2"],
["understand","tushunmoq","A2"],
["answer","javob","A2"],

["knowledge","bilim","B1"],
["research","tadqiqot","B1"],
["method","usul","B1"],
["ability","qobiliyat","B1"],
["development","rivojlanish","B1"],
["education","ta'lim","B1"],
["experience","tajriba","B1"],
["information","ma'lumot","B1"],
["project","loyiha","B1"],
["presentation","taqdimot","B1"],

["analysis","tahlil","B2"],
["academic","akademik","B2"],
["theory","nazariya","B2"],
["concept","tushuncha","B2"],
["strategy","strategiya","B2"],
["achievement","yutuq","B2"],
["qualification","malaka","B2"],
["assessment","baholash","B2"],
["critical","tanqidiy","B2"],
["creative","ijodiy","B2"],

["comprehensive","keng qamrovli","C1"],
["innovative","yangicha","C1"],
["intellectual","aqliy","C1"],
["fundamental","asosiy","C1"],
["methodology","metodologiya","C1"],
["specialized","ixtisoslashgan","C1"],

["dissertation","ilmiy ish","C2"],
["interdisciplinary","fanlararo","C2"],
["philosophical","falsafiy","C2"],
["enlightenment","ma'rifat","C2"],

],



"Technology": [

["computer","kompyuter","A1"],
["phone","telefon","A1"],
["screen","ekran","A1"],
["internet","internet","A1"],
["website","veb sayt","A1"],
["file","fayl","A1"],
["button","tugma","A1"],
["mouse","sichqoncha","A1"],
["keyboard","klaviatura","A1"],
["device","qurilma","A1"],

["software","dastur","A2"],
["application","ilova","A2"],
["download","yuklab olish","A2"],
["upload","yuklash","A2"],
["online","onlayn","A2"],
["digital","raqamli","A2"],
["update","yangilash","A2"],
["system","tizim","A2"],
["network","tarmoq","A2"],
["password","parol","A2"],

["database","ma'lumotlar bazasi","B1"],
["developer","dasturchi","B1"],
["programming","dasturlash","B1"],
["security","xavfsizlik","B1"],
["server","server","B1"],
["cloud","bulut","B1"],
["technology","texnologiya","B1"],
["information","axborot","B1"],
["code","kod","B1"],
["platform","platforma","B1"],

["algorithm","algoritm","B2"],
["artificial","sun'iy","B2"],
["intelligence","intellekt","B2"],
["automation","avtomatlashtirish","B2"],
["innovation","yangilik","B2"],
["architecture","arxitektura","B2"],
["interface","interfeys","B2"],
["framework","tizim","B2"],
["optimization","optimallashtirish","B2"],
["analysis","tahlil","B2"],

["sophisticated","murakkab rivojlangan","C1"],
["cybersecurity","kiberxavfsizlik","C1"],
["computational","hisoblashga oid","C1"],
["revolutionary","inqilobiy","C1"],
["technological","texnologik","C1"],
["advanced","ilg'or","C1"],

["ubiquitous","hamma joyda mavjud","C2"],
["quantum","kvant","C2"],
["autonomous","mustaqil ishlovchi","C2"],
["breakthrough","katta kashfiyot","C2"],

], "Work": [

["job","ish","A1"],
["office","ofis","A1"],
["worker","ishchi","A1"],
["boss","boshliq","A1"],
["team","jamoa","A1"],
["task","vazifa","A1"],
["money","pul","A1"],
["company","kompaniya","A1"],
["meeting","uchrashuv","A1"],
["work","ishlamoq","A1"],

["career","kasb","A2"],
["salary","maosh","A2"],
["manager","rahbar","A2"],
["employee","xodim","A2"],
["schedule","jadval","A2"],
["project","loyiha","A2"],
["plan","reja","A2"],
["skill","ko'nikma","A2"],
["experience","tajriba","A2"],
["business","biznes","A2"],

["responsibility","mas'uliyat","B1"],
["professional","kasbiy","B1"],
["department","bo'lim","B1"],
["opportunity","imkoniyat","B1"],
["performance","natija","B1"],
["training","o'qitish","B1"],
["strategy","strategiya","B1"],
["management","boshqaruv","B1"],
["develop","rivojlantirmoq","B1"],
["cooperation","hamkorlik","B1"],

["leadership","yetakchilik","B2"],
["productivity","unumdorlik","B2"],
["negotiation","muzokara","B2"],
["organization","tashkilot","B2"],
["achievement","yutuq","B2"],
["professionalism","kasbiylik","B2"],
["innovation","yangilik","B2"],
["decision-making","qaror qabul qilish","B2"],
["competitiveness","raqobatbardoshlik","B2"],
["sustainability","barqarorlik","B2"],

["entrepreneurship","tadbirkorlik","C1"],
["corporate","korporativ","C1"],
["strategic","strategik","C1"],
["administrative","ma'muriy","C1"],
["organizational","tashkiliy","C1"],
["multinational","ko'p millatli","C1"],

["entrepreneurial","tadbirkorlikka oid","C2"],
["professionalism","yuqori kasbiylik","C2"],
["transformative","o'zgartiruvchi","C2"],
["visionary","kelajakni ko'ra oluvchi","C2"],

],



"Travel": [

["trip","sayohat","A1"],
["ticket","chipta","A1"],
["hotel","mehmonxona","A1"],
["car","mashina","A1"],
["bus","avtobus","A1"],
["map","xarita","A1"],
["road","yo'l","A1"],
["city","shahar","A1"],
["country","mamlakat","A1"],
["tour","sayohat","A1"],

["airport","aeroport","A2"],
["passport","pasport","A2"],
["luggage","yuk","A2"],
["journey","safar","A2"],
["visit","tashrif","A2"],
["travel","sayohat qilmoq","A2"],
["guide","gid","A2"],
["destination","manzil","A2"],
["reservation","bron qilish","A2"],
["culture","madaniyat","A2"],

["adventure","sarguzasht","B1"],
["explore","tadqiq qilmoq","B1"],
["experience","tajriba","B1"],
["local","mahalliy","B1"],
["tourist","sayyoh","B1"],
["tradition","an'ana","B1"],
["environment","atrof-muhit","B1"],
["discover","kashf qilmoq","B1"],
["direction","yo'nalish","B1"],
["location","joylashuv","B1"],

["magnificent","ajoyib","B2"],
["unforgettable","unutib bo'lmas","B2"],
["landscape","manzara","B2"],
["atmosphere","muhit","B2"],
["historical","tarixiy","B2"],
["remote","uzoq","B2"],
["impressive","ta'sirli","B2"],
["spectacular","hayratlanarli","B2"],
["fascinating","qiziqarli","B2"],
["authentic","haqiqiy","B2"],

["breathtaking","juda chiroyli","C1"],
["exotic","ekzotik","C1"],
["extraordinary","favqulodda","C1"],
["adventurous","sarguzashtli","C1"],
["unexplored","o'rganilmagan","C1"],
["transformative","o'zgartiruvchi","C1"],

["wanderlust","sayohat istagi","C2"],
["mesmerizing","maftunkor","C2"],
["phenomenal","ajoyib darajadagi","C2"],
["remarkable","juda muhim","C2"],
],
};
export const initialWords: Omit<VocabWord, "id">[] =
  Object.entries(seedWords).flatMap(
    ([topic, words]) =>
      words.map(([english, uzbek, level]) => ({
        english,
        uzbek,
        example: `Example sentence with ${english}.`,
        topic,
        level,
        learned: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        timesReviewed: 0,
      }))
  );



export async function seedIfEmpty() {

  const count = await db.words.count();

  if (count === 0) {

    await db.words.bulkAdd(initialWords);

    console.log(
      `${initialWords.length} words added`
    );

  }

}