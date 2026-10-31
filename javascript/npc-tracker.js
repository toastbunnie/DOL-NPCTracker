(function () {
    "use strict";

    window.setup = window.setup || {};
    setup.npcTracker = setup.npcTracker || {};

    const LOVE_NPCS = [
        "Robin", "Whitney", "Eden", "Kylar", "Avery",
        "Black Wolf", "Great Hawk", "Alex", "Sydney", "Gwylan"
    ];

    const VANILLA_NPCS = [
        "Avery", "Bailey", "Briar", "Charlie", "Darryl",
        "Doren", "Eden", "Gwylan", "Harper", "Jordan",
        "Kylar", "Landry", "Leighton", "Mason", "Morgan",
        "River", "Robin", "Sam", "Sirris", "Whitney",
        "Winter", "Black Wolf", "Niki", "Quinn", "Remy",
        "Alex", "Great Hawk", "Wren", "Sydney", "Ivory Wraith",
        "Zephyr", "Night Monster"
    ];

    const LOVE_SET = new Set(LOVE_NPCS);
    const VANILLA_SET = new Set(VANILLA_NPCS);
    const LANGUAGES = ["zh-CN", "zh-TW", "en"];

    const UI_TEXT = {
        "zh-CN": {
            title: "NPC 追踪",
            note: "当前游戏状态读取结果",
            love: "恋爱角色",
            ordinary: "其他 NPC",
            mods: "模组 NPC",
            location: "当前位置",
            activity: "当前活动",
            unknown: "未知",
            notKnown: "尚未认识",
            favorites: "关注角色",
            favorite: "关注",
            unfavorite: "取消关注",
            empty: "当前分类暂无已发现的 NPC",
            noFavorites: "点击角色名称旁的星标，将角色添加到这里",
            favoriteLimit: "最多只能关注三名角色",
            language: "语言",
            count: "名角色",
            previous: "上一个",
            next: "下一个"
        },
        "zh-TW": {
            title: "NPC 追蹤",
            note: "目前遊戲狀態讀取結果",
            love: "戀愛角色",
            ordinary: "其他 NPC",
            mods: "模組 NPC",
            location: "目前位置",
            activity: "目前活動",
            unknown: "未知",
            notKnown: "尚未認識",
            favorites: "關注角色",
            favorite: "關注",
            unfavorite: "取消關注",
            empty: "目前分類沒有已發現的 NPC",
            noFavorites: "點擊角色名稱旁的星號，將角色加入這裡",
            favoriteLimit: "最多只能關注三名角色",
            language: "語言",
            count: "名角色",
            previous: "上一個",
            next: "下一個"
        },
        "en": {
            title: "NPC Tracker",
            note: "Current in-game data",
            love: "Love Interests",
            ordinary: "Other NPCs",
            mods: "Mod NPCs",
            location: "Current Location",
            activity: "Current Activity",
            unknown: "Unknown",
            notKnown: "Not yet acquainted",
            favorites: "Favorites",
            favorite: "Add to favorites",
            unfavorite: "Remove from favorites",
            empty: "No discovered NPCs in this category",
            noFavorites: "Click the star beside an NPC's name to add them here",
            favoriteLimit: "You can follow up to three NPCs",
            language: "Language",
            count: "NPCs",
            previous: "Previous",
            next: "Next"
        }
    };

    const NPC_NAMES = {
        "zh-CN": {
            Alex: "艾利克斯",
            Avery: "艾弗里",
            Bailey: "贝利",
            Briar: "布莱尔",
            Charlie: "查里",
            Darryl: "达里尔",
            Doren: "多伦",
            Eden: "伊甸",
            Gwylan: "格威岚",
            Harper: "哈珀",
            Jordan: "约旦",
            Kylar: "凯拉尔",
            Landry: "兰德里",
            Leighton: "礼顿",
            Mason: "梅森",
            Morgan: "摩根",
            River: "瑞沃",
            Robin: "罗宾",
            Sam: "萨姆",
            Sirris: "西里斯",
            Whitney: "惠特尼",
            Winter: "温特",
            "Black Wolf": "黑狼",
            Niki: "尼奇",
            Quinn: "奎恩",
            Remy: "雷米",
            "Great Hawk": "巨鹰",
            Wren: "伦恩",
            Sydney: "悉尼",
            "Ivory Wraith": "象牙怨灵",
            Zephyr: "泽菲尔",
            "Night Monster": "黑夜恐怪",
            "Black Dog": "黑狗",
            Mickey: "米奇",
            Charlene: "夏玲",
            Charles: "查尔斯",
            Bishop: "主教",
            Virgo: "维戈",
            Auriga: "奥利加",
            "Lemur Plum": "勒穆·普拉姆",
            "Loris Younger": "洛里斯·杨格",
            Raul: "劳尔",
            Janet: "珍妮特",
            Lew: "鲁鲁",
            Pinch: "林奇",
            Fayne: "费恩",
            Nona: "诺娜"
        },
        "zh-TW": {
            Alex: "艾利克斯",
            Avery: "艾弗里",
            Bailey: "貝利",
            Briar: "布萊爾",
            Charlie: "查里",
            Darryl: "達里爾",
            Doren: "多倫",
            Eden: "伊甸",
            Gwylan: "格威嵐",
            Harper: "哈珀",
            Jordan: "約旦",
            Kylar: "凱拉爾",
            Landry: "蘭德里",
            Leighton: "禮頓",
            Mason: "梅森",
            Morgan: "摩根",
            River: "瑞沃",
            Robin: "羅賓",
            Sam: "薩姆",
            Sirris: "西里斯",
            Whitney: "惠特尼",
            Winter: "溫特",
            "Black Wolf": "黑狼",
            Niki: "尼奇",
            Quinn: "奎恩",
            Remy: "雷米",
            "Great Hawk": "巨鷹",
            Wren: "倫恩",
            Sydney: "悉尼",
            "Ivory Wraith": "象牙怨靈",
            Zephyr: "澤菲爾",
            "Night Monster": "黑夜恐怪",
            "Black Dog": "黑狗",
            Mickey: "米奇",
            Charlene: "夏玲",
            Charles: "查爾斯",
            Bishop: "主教",
            Virgo: "維戈",
            Auriga: "奧利加",
            "Lemur Plum": "勒穆·普拉姆",
            "Loris Younger": "洛里斯·楊格",
            Raul: "勞爾",
            Janet: "珍妮特",
            Lew: "魯魯",
            Pinch: "林奇",
            Fayne: "費恩",
            Nona: "諾娜"
        },
        "en": {}
    };

    const NPC_TITLE_NAMES = {
        "zh-CN": {
            "terror": "恐怖者",
            "farmhand": "农场主",
            "bully": "霸凌者",
            "alpha": "头狼",
            "brothel owner": "妓院老板",
            "brothel keeper": "妓院老板",
            "brothel manager": "妓院经理",
            "gang leader": "帮派头目",
            "gang member": "帮派成员",
            "gangster": "黑帮成员",
            "police officer": "警察",
            "police chief": "警察局长",
            "police inspector": "警探",
            "prison guard": "监狱守卫",
            "prisoner": "囚犯",
            "inmate": "囚犯",
            "teacher": "教师",
            "student": "学生",
            "shopkeeper": "店主",
            "shop owner": "店主",
            "bartender": "酒保",
            "waiter": "服务员",
            "waitress": "服务员",
            "doctor": "医生",
            "nurse": "护士",
            "priest": "牧师",
            "priestess": "女祭司",
            "caretaker": "看护人",
            "headmaster": "校长",
            "headmistress": "校长",
            "janitor": "清洁工",
            "librarian": "图书管理员",
            "mechanic": "机械师",
            "blacksmith": "铁匠",
            "farmer": "农夫",
            "landlord": "房东",
            "landlady": "房东",
            "owner": "老板",
            "prostitute": "妓女",
            "sex worker": "性工作者",
            "maid": "女仆",
            "butler": "管家",
            "servant": "仆人",
            "noble": "贵族",
            "noblewoman": "贵族女性",
            "nobleman": "贵族男性",
            "mayor": "市长",
            "guard": "守卫",
            "warden": "监狱长",
            "pimp": "皮条客",
            "madam": "鸨母",
            "host": "接待员",
            "hostess": "女接待员",
            "shop assistant": "店员",
            "business owner": "商店老板",
            "club owner": "俱乐部老板",
            "bar owner": "酒吧老板",
            "street vendor": "街头摊贩",
            "homeless person": "流浪者",
            "beggar": "乞丐",
            "criminal": "罪犯",
            "thief": "小偷",
            "bandit": "强盗",
            "victim": "受害者",
            "witness": "目击者",
            "stranger": "陌生人",
            "farmer's wife": "农夫的妻子",
            "farm owner": "农场主",
            "school bully": "校园霸凌者",
            "school teacher": "学校教师",
            "student council president": "学生会主席",
            "security guard": "保安",
            "bodyguard": "保镖",
            "mercenary": "雇佣兵",
            "soldier": "士兵",
            "captain": "队长",
            "commander": "指挥官",
            "shop worker": "店员",
            "customer": "顾客",
            "regular customer": "常客",
            "customer service": "客服人员",
            "businessman": "商人",
            "businesswoman": "女商人",
            "wait staff": "服务员",
            "chef": "厨师",
            "cook": "厨师",
            "artist": "艺术家",
            "photographer": "摄影师",
            "musician": "音乐家",
            "dancer": "舞者",
            "performer": "表演者",
            "athlete": "运动员",
            "coach": "教练",
            "trainer": "训练师",
            "riding instructor": "骑术教练",
            "student teacher": "实习教师",
            "nun": "修女",
            "monk": "僧侣",
            "bishop": "主教",
            "receptionist": "接待员",
            "secretary": "秘书",
            "office worker": "办公室职员",
            "manager": "经理",
            "assistant manager": "副经理",
            "director": "主管",
            "nanny": "保姆",
            "babysitter": "临时保姆",
            "child": "孩子",
            "teenager": "青少年",
            "adult": "成年人",
            "elder": "长者",
            "old man": "老人",
            "old woman": "老妇人",
            "mysterious stranger": "神秘陌生人",
            "mysterious figure": "神秘人物",
            "monster": "怪物",
            "wolf": "狼",
            "hunter": "猎人",
            "fisherman": "渔夫",
            "fisher": "渔夫",
            "sailor": "水手",
            "pirate": "海盗",
            "smuggler": "走私者",
            "drug dealer": "毒贩",
            "dealer": "交易者",
            "street thug": "街头混混",
            "thug": "混混",
            "gang boss": "帮派首领",
            "gangster boss": "黑帮头目",
            "leader": "首领",
            "alpha male": "头狼",
            "pack leader": "狼群首领",
            "prison warden": "监狱长",
            "jailer": "狱卒",
            "instructor": "指导员",
            "professor": "教授",
            "lecturer": "讲师",
            "school principal": "校长",
            "principal": "校长",
            "head teacher": "班主任",
            "classmate": "同学",
            "roommate": "室友",
            "neighbour": "邻居",
            "neighbor": "邻居",
            "friend": "朋友",
            "acquaintance": "熟人",
            "rival": "对手",
            "enemy": "敌人",
            "survivor": "幸存者",
            "patient": "病人",
            "client": "顾客",
            "visitor": "访客",
            "guest": "客人",
            "tourist": "游客",

            "orphan": "孤儿",
            "dance coach": "舞蹈教练",
            "english teacher": "英语教师",
            "swimming teacher": "游泳教师",
            "sewer dweller": "下水道居民",
            "maths teacher": "数学教师",
            "math teacher": "数学教师",
            "cafe owner": "咖啡馆老板",
            "café owner": "咖啡馆老板",
            "science teacher": "科学教师",
            "history teacher": "历史教师"
        },
        "zh-TW": {
            "terror": "恐怖者",
            "farmhand": "農場主",
            "bully": "霸凌者",
            "alpha": "頭狼",
            "brothel owner": "妓院老闆",
            "brothel keeper": "妓院老闆",
            "brothel manager": "妓院經理",
            "gang leader": "幫派頭目",
            "gang member": "幫派成員",
            "gangster": "黑幫成員",
            "police officer": "警察",
            "police chief": "警察局長",
            "police inspector": "警探",
            "prison guard": "監獄守衛",
            "prisoner": "囚犯",
            "inmate": "囚犯",
            "teacher": "教師",
            "student": "學生",
            "shopkeeper": "店主",
            "shop owner": "店主",
            "bartender": "酒保",
            "waiter": "服務生",
            "waitress": "服務生",
            "doctor": "醫生",
            "nurse": "護士",
            "priest": "牧師",
            "priestess": "女祭司",
            "caretaker": "看護人",
            "headmaster": "校長",
            "headmistress": "校長",
            "janitor": "清潔工",
            "librarian": "圖書管理員",
            "mechanic": "機械師",
            "blacksmith": "鐵匠",
            "farmer": "農夫",
            "landlord": "房東",
            "landlady": "房東",
            "owner": "老闆",
            "prostitute": "妓女",
            "sex worker": "性工作者",
            "maid": "女僕",
            "butler": "管家",
            "servant": "僕人",
            "noble": "貴族",
            "noblewoman": "貴族女性",
            "nobleman": "貴族男性",
            "mayor": "市長",
            "guard": "守衛",
            "warden": "監獄長",
            "pimp": "皮條客",
            "madam": "鴇母",
            "host": "接待員",
            "hostess": "女接待員",
            "shop assistant": "店員",
            "business owner": "商店老闆",
            "club owner": "俱樂部老闆",
            "bar owner": "酒吧老闆",
            "street vendor": "街頭攤販",
            "homeless person": "流浪者",
            "beggar": "乞丐",
            "criminal": "罪犯",
            "thief": "小偷",
            "bandit": "強盜",
            "victim": "受害者",
            "witness": "目擊者",
            "stranger": "陌生人",
            "farmer's wife": "農夫的妻子",
            "farm owner": "農場主",
            "school bully": "校園霸凌者",
            "school teacher": "學校教師",
            "student council president": "學生會主席",
            "security guard": "保全",
            "bodyguard": "保鑣",
            "mercenary": "傭兵",
            "soldier": "士兵",
            "captain": "隊長",
            "commander": "指揮官",
            "shop worker": "店員",
            "customer": "顧客",
            "regular customer": "常客",
            "customer service": "客服人員",
            "businessman": "商人",
            "businesswoman": "女商人",
            "wait staff": "服務生",
            "chef": "廚師",
            "cook": "廚師",
            "artist": "藝術家",
            "photographer": "攝影師",
            "musician": "音樂家",
            "dancer": "舞者",
            "performer": "表演者",
            "athlete": "運動員",
            "coach": "教練",
            "trainer": "訓練師",
            "riding instructor": "騎術教練",
            "student teacher": "實習教師",
            "nun": "修女",
            "monk": "僧侶",
            "bishop": "主教",
            "receptionist": "接待員",
            "secretary": "秘書",
            "office worker": "辦公室職員",
            "manager": "經理",
            "assistant manager": "副經理",
            "director": "主管",
            "nanny": "保母",
            "babysitter": "臨時保母",
            "child": "孩子",
            "teenager": "青少年",
            "adult": "成年人",
            "elder": "長者",
            "old man": "老人",
            "old woman": "老妇人",
            "mysterious stranger": "神秘陌生人",
            "mysterious figure": "神秘人物",
            "monster": "怪物",
            "wolf": "狼",
            "hunter": "獵人",
            "fisherman": "漁夫",
            "fisher": "漁夫",
            "sailor": "水手",
            "pirate": "海盜",
            "smuggler": "走私者",
            "drug dealer": "毒販",
            "dealer": "交易者",
            "street thug": "街頭混混",
            "thug": "混混",
            "gang boss": "幫派首領",
            "gangster boss": "黑幫頭目",
            "leader": "首領",
            "alpha male": "頭狼",
            "pack leader": "狼群首領",
            "prison warden": "監獄長",
            "jailer": "獄卒",
            "instructor": "指導員",
            "professor": "教授",
            "lecturer": "講師",
            "school principal": "校長",
            "principal": "校長",
            "head teacher": "班主任",
            "classmate": "同學",
            "roommate": "室友",
            "neighbour": "鄰居",
            "neighbor": "鄰居",
            "friend": "朋友",
            "acquaintance": "熟人",
            "rival": "對手",
            "enemy": "敵人",
            "survivor": "倖存者",
            "patient": "病人",
            "client": "顧客",
            "visitor": "訪客",
            "guest": "客人",
            "tourist": "遊客",

            "orphan": "孤兒",
            "dance coach": "舞蹈教練",
            "english teacher": "英語教師",
            "swimming teacher": "游泳教師",
            "sewer dweller": "下水道居民",
            "maths teacher": "數學教師",
            "math teacher": "數學教師",
            "cafe owner": "咖啡館老闆",
            "café owner": "咖啡館老闆",
            "science teacher": "科學教師",
            "history teacher": "歷史教師"
        },
        "en": {}
    };

    // 建立中文称号到英文原文的反向索引。
    // 用于处理游戏数据已经返回中文称号的情况。
    const NPC_TITLE_ENGLISH = {};

    ["zh-CN", "zh-TW"].forEach(function (language) {
        Object.keys(NPC_TITLE_NAMES[language]).forEach(function (key) {
            const translated = NPC_TITLE_NAMES[language][key];
            if (translated && !NPC_TITLE_ENGLISH[translated]) {
                NPC_TITLE_ENGLISH[translated] = key;
            }
        });
    });

    function normalizeTitle(title) {
        return title.trim()
            .replace(/\s+/g, " ")
            .replace(/^the\s+/i, "")
            .toLowerCase();
    }

    function translateNpcTitle(title) {
        if (typeof title !== "string" || !title.trim()) return "";

        const normalized = title.trim().replace(/\s+/g, " ");
        const key = normalizeTitle(normalized);
        const language = currentLanguage();

        if (language === "en") {
            return NPC_TITLE_ENGLISH[normalized] ||
                NPC_TITLE_ENGLISH[normalized.replace(/^the\s+/i, "")] ||
                normalized;
        }

        return NPC_TITLE_NAMES[language][key] || normalized;
    }

    const LOCATION_NAMES = {
        "zh-CN": {
            sleep: "家中",
            home: "家中",
            school: "学校",
            garden: "花园",
            bath: "浴室",
            orphanage: "孤儿院",
            park: "公园",
            beach: "海滩",
            mansion: "庄园",
            docks: "码头",
            landfill: "麋鹿街垃圾填埋场",
            dinner: "用餐地点",
            pillory: "颈手枷",
            pub: "酒吧",
            sulking: "独处地点",
            shop: "商店",
            cliff: "峭壁街",
            cafe: "咖啡馆",
            walking_to_cafe: "前往咖啡馆途中",
            nowhere: "当前没有固定地点",
            forest: "森林",
            sewer: "下水道",
            bus: "公交车",
            office: "办公大楼",
            away: "外出",
            temple: "神殿",
            sleep_location: "家中",
            "Adult Shop": "成人用品店",
            "Alex's Cottage": "艾利克斯的小屋",
            "Alex’s Cottage": "艾利克斯的小屋",
            "Alex's Farm": "艾利克斯的农场",
            "Alex’s Farm": "艾利克斯的农场",
            "Barb Street": "倒钩街",
            "Beach": "海滩",
            "Bus Station": "车站",
            "Cliff Street": "峭壁街",
            "Commercial Alleyways": "商业街小巷",
            "Commercial Drain System": "商业区排水系统",
            "Connudatus Street": "康努达塔斯街",
            "Dance Studio": "舞蹈室",
            "Danube Spa": "多瑙河水疗中心",
            "Danube Street": "多瑙河街",
            "Docks": "码头",
            "Domus Street": "宅邸街",
            "Doren's Flat": "多伦的公寓",
            "Doren’s Flat": "多伦的公寓",
            "Elk Street": "麋鹿街",
            "Elk Street Compound": "麋鹿街复合加工厂",
            "Elk Street Landfill": "麋鹿街垃圾填埋场",
            "Farmlands": "农田",
            "Forest Cemetery": "森林墓地",
            "Forest Lake": "森林湖泊",
            "Forest Lake Ruins": "森林湖中遗址",
            "Forest Shop": "森林商店",
            "Harvest Street": "丰收街",
            "Harvest Trail": "丰收小路",
            "Hawk's Tower": "鹰塔",
            "Hawk’s Tower": "鹰塔",
            "High Street": "商业街",
            "Hospital": "医院",
            "Industrial Alleyways": "工业区小巷",
            "Industrial Drain System": "工业区排水系统",
            "Meadow": "草地",
            "Mer Street": "梅尔街",
            "Monster's Lair": "怪物的巢穴",
            "Monster’s Lair": "怪物的巢穴",
            "Museum": "博物馆",
            "Nightingale Street": "南丁格尔街",
            "Ocean Breeze Cafe": "海风咖啡馆",
            "Old Sewers": "旧下水道",
            "Orphanage": "孤儿院",
            "Orphanage Loft": "孤儿院阁楼",
            "Oxford Street": "牛津街",
            "Park": "公园",
            "Photography Studio": "摄影工作室",
            "Police Station": "警察局",
            "Prison": "监狱",
            "Pub": "酒吧",
            "Remy's Estate": "雷米庄园",
            "Remy’s Estate": "雷米庄园",
            "Residential Alleyways": "住宅区小巷",
            "Residential Drain System": "住宅区排水系统",
            "Riding School": "骑术学校",
            "School": "学校",
            "Shopping Centre": "购物中心",
            "Smuggler's Cave": "走私者洞穴",
            "Smuggler’s Cave": "走私者洞穴",
            "Soup Kitchen": "施粥所",
            "Starfish Street": "海星街",
            "Strip Club": "脱衣舞俱乐部",
            "Sydney's Counter": "悉尼的柜台",
            "Sydney’s Counter": "悉尼的柜台",
            "Temple": "神殿",
            "Tentacle Plains": "触手平原",
            "Underground Brothel": "地下妓院",
            "Underground Farm": "地下农场",
            "Wolf Cave": "狼洞",
            "Wolf Street": "狼街",
            "Ocean": "海洋",
            "Bog": "沼泽",
            "Asylum": "精神病院",
            "Forest": "森林",
            "Moor": "荒原",
            "Outside Town": "镇外",
            "Town Outskirts": "郊外",
            "In Town": "镇内",
            "Town Locations": "城镇地点",
            "Residential": "住宅区",
            "Commercial": "商业区",
            "Industrial": "工业区",
            "Underground": "地下",
            "Sewers": "下水道",
            "Tunnel covered in webs": "布满蜘蛛网的管道",
            "Tunnel filled with wood": "满是木头的隧道",
            "Tunnel filled with litter": "满是垃圾的隧道",
            "Tunnel filled with scrap": "充满废料的隧道",
            "Tunnel filled with sculptures": "塞满雕塑的水管",
            "Follow the breeze": "跟随微风",
            "Crumbling tunnel": "坍陷的管道",
            "Tunnel filled with rubbish": "全是垃圾的管道",
            "Muddy tunnel": "泥泞的隧道",
            "Fungus-coated tunnel": "长满真菌的管道",
            "Drain ocean exit": "排海出口",
            "Tunnel filled with detritus": "充满碎石的管道",
            "Algae-coated tunnel": "水藻覆盖的管道",
            "Smuggler's pub": "走私者酒吧",
            "Wet tunnel": "潮湿的隧道",
            "Island": "海岛",
            "Eden's Cabin": "伊甸的小屋",
            "Eden’s Cabin": "伊甸的小屋",
            "Kylar's Manor": "凯拉尔的庄园",
            "Mason's pond": "梅森的池塘",
            "Old Churchyard": "老教堂墓地",
            "Pirate Ship": "海盗船",
            "Tentacle Forest": "触手森林",
            "Mines": "矿坑",
            "Nursery": "育儿室",
            "Maze": "迷宫",
            "Serpent's maze": "蛇之迷宫"
        },
        "zh-TW": {
            sleep: "家中",
            home: "家中",
            school: "學校",
            garden: "花園",
            bath: "浴室",
            orphanage: "孤兒院",
            park: "公園",
            beach: "海灘",
            mansion: "莊園",
            docks: "碼頭",
            landfill: "麋鹿街垃圾掩埋場",
            dinner: "用餐地點",
            pillory: "頸手枷",
            pub: "酒吧",
            sulking: "獨處地點",
            shop: "商店",
            cliff: "峭壁街",
            cafe: "咖啡館",
            walking_to_cafe: "前往咖啡館途中",
            nowhere: "目前沒有固定地點",
            forest: "森林",
            sewer: "下水道",
            bus: "公車",
            office: "辦公大樓",
            away: "外出",
            temple: "神殿",
            "Adult Shop": "成人用品店",
            "Alex's Cottage": "艾利克斯的小屋",
            "Alex’s Cottage": "艾利克斯的小屋",
            "Alex's Farm": "艾利克斯的農場",
            "Alex’s Farm": "艾利克斯的農場",
            "Barb Street": "倒鉤街",
            "Beach": "海灘",
            "Bus Station": "車站",
            "Cliff Street": "峭壁街",
            "Commercial Alleyways": "商業街小巷",
            "Commercial Drain System": "商業區排水系統",
            "Connudatus Street": "康努達塔斯街",
            "Dance Studio": "舞蹈室",
            "Danube Spa": "多瑙河水療中心",
            "Danube Street": "多瑙河街",
            "Docks": "碼頭",
            "Domus Street": "宅邸街",
            "Doren's Flat": "多倫的公寓",
            "Doren’s Flat": "多倫的公寓",
            "Elk Street": "麋鹿街",
            "Elk Street Compound": "麋鹿街複合加工廠",
            "Elk Street Landfill": "麋鹿街垃圾掩埋場",
            "Farmlands": "農田",
            "Forest Cemetery": "森林墓地",
            "Forest Lake": "森林湖泊",
            "Forest Lake Ruins": "森林湖中遺址",
            "Forest Shop": "森林商店",
            "Harvest Street": "豐收街",
            "Harvest Trail": "豐收小路",
            "Hawk's Tower": "鷹塔",
            "Hawk’s Tower": "鷹塔",
            "High Street": "商業街",
            "Hospital": "醫院",
            "Industrial Alleyways": "工業區小巷",
            "Industrial Drain System": "工業區排水系統",
            "Meadow": "草地",
            "Mer Street": "梅爾街",
            "Monster's Lair": "怪物的巢穴",
            "Monster’s Lair": "怪物的巢穴",
            "Museum": "博物館",
            "Nightingale Street": "南丁格爾街",
            "Ocean Breeze Cafe": "海風咖啡館",
            "Old Sewers": "舊下水道",
            "Orphanage": "孤兒院",
            "Orphanage Loft": "孤兒院閣樓",
            "Oxford Street": "牛津街",
            "Park": "公園",
            "Photography Studio": "攝影工作室",
            "Police Station": "警察局",
            "Prison": "監獄",
            "Pub": "酒吧",
            "Remy's Estate": "雷米莊園",
            "Remy’s Estate": "雷米莊園",
            "Residential Alleyways": "住宅區小巷",
            "Residential Drain System": "住宅區排水系統",
            "Riding School": "騎術學校",
            "School": "學校",
            "Shopping Centre": "購物中心",
            "Smuggler's Cave": "走私者洞穴",
            "Smuggler’s Cave": "走私者洞穴",
            "Soup Kitchen": "施粥所",
            "Starfish Street": "海星街",
            "Strip Club": "脫衣舞俱樂部",
            "Sydney's Counter": "悉尼的櫃檯",
            "Sydney’s Counter": "悉尼的櫃檯",
            "Temple": "神殿",
            "Tentacle Plains": "觸手平原",
            "Underground Brothel": "地下妓院",
            "Underground Farm": "地下農場",
            "Wolf Cave": "狼洞",
            "Wolf Street": "狼街",
            "Ocean": "海洋",
            "Bog": "沼澤",
            "Asylum": "精神病院",
            "Forest": "森林",
            "Moor": "荒原",
            "Outside Town": "鎮外",
            "Town Outskirts": "郊外",
            "In Town": "鎮內",
            "Town Locations": "城鎮地點",
            "Residential": "住宅區",
            "Commercial": "商業區",
            "Industrial": "工業區",
            "Underground": "地下",
            "Sewers": "下水道",
            "Island": "海島",
            "Pirate Ship": "海盜船",
            "Tentacle Forest": "觸手森林",
            "Mines": "礦坑",
            "Nursery": "育兒室",
            "Maze": "迷宮",
            "Serpent's maze": "蛇之迷宮"
        },
        "en": {}
    };

    const ACTIVITY_NAMES = {
        "zh-CN": {
            sleep: "休息或睡眠",
            school: "在学校活动",
            garden: "在花园活动",
            bath: "洗浴",
            orphanage: "在孤儿院活动",
            park: "在公园活动",
            beach: "在海滩活动",
            halloween: "参加万圣节活动",
            englishPlay: "参加英语活动",
            mansion: "在庄园活动",
            docks: "在码头活动",
            landfill: "在垃圾填埋场活动",
            dinner: "用餐",
            pillory: "处于颈手枷状态",
            pub: "在酒吧活动",
            sulking: "独处",
            shop: "在商店活动",
            cliff: "在峭壁街活动",
            cafe: "在咖啡馆活动",
            walking_to_cafe: "正在前往咖啡馆",
            nowhere: "当前活动未知",
            forest: "在森林活动",
            sewer: "在下水道活动",
            bus: "乘坐公交车",
            home: "在家中活动",
            office: "工作",
            away: "外出",
            temple: "在神殿活动",
            dressing: "更衣",
            breakfast: "用早餐",
            work: "工作",
            return: "返回庄园",
            party_prepare: "准备宴会",
            party: "参加宴会",
            drink: "饮酒",
            study: "学习",
            pool: "在泳池活动",
            lounge: "休息",
            date: "约会",
            flirt: "调情",
            approach: "走近",
            combat: "战斗",
            tending: "护理",
            lunch_break: "午休"
        },
        "zh-TW": {
            sleep: "休息或睡眠",
            school: "在學校活動",
            garden: "在花園活動",
            bath: "洗浴",
            orphanage: "在孤兒院活動",
            park: "在公園活動",
            beach: "在海灘活動",
            halloween: "參加萬聖節活動",
            englishPlay: "參加英語活動",
            mansion: "在莊園活動",
            docks: "在碼頭活動",
            landfill: "在垃圾掩埋場活動",
            dinner: "用餐",
            pillory: "處於頸手枷狀態",
            pub: "在酒吧活動",
            sulking: "獨處",
            shop: "在商店活動",
            cliff: "在峭壁街活動",
            cafe: "在咖啡館活動",
            walking_to_cafe: "正在前往咖啡館",
            nowhere: "目前活動未知",
            forest: "在森林活動",
            sewer: "在下水道活動",
            bus: "搭乘公車",
            home: "在家中活動",
            office: "工作",
            away: "外出",
            temple: "在神殿活動",
            dressing: "更衣",
            breakfast: "用早餐",
            work: "工作",
            return: "返回莊園",
            party_prepare: "準備宴會",
            party: "參加宴會",
            drink: "飲酒",
            study: "學習",
            pool: "在泳池活動",
            lounge: "休息",
            date: "約會",
            flirt: "調情",
            approach: "走近",
            combat: "戰鬥",
            tending: "護理",
            lunch_break: "午休"
        },
        "en": {}
    };

    function isObject(value) {
        return value !== null &&
            typeof value === "object" &&
            !Array.isArray(value);
    }

    function safeGet(object, key) {
        try {
            return object && object[key];
        } catch (error) {
            return undefined;
        }
    }

    function getVariables() {
        return window.V ||
            (window.State && window.State.variables) ||
            null;
    }

    function getTemporary() {
        return window.T ||
            (window.State && window.State.temporary) ||
            null;
    }

    function getSaveData() {
        const variables = getVariables();

        if (!variables) {
            return {
                language: "zh-CN",
                favorites: [],
                tab: "love",
                favoriteIndex: 0
            };
        }

        if (!isObject(variables.npcTracker)) {
            variables.npcTracker = {};
        }

        const data = variables.npcTracker;

        if (!LANGUAGES.includes(data.language)) {
            data.language = "zh-CN";
        }

        if (!Array.isArray(data.favorites)) {
            data.favorites = [];
        }

        data.favorites = data.favorites
            .filter(name => typeof name === "string")
            .slice(0, 3);

        if (!["love", "ordinary", "mods"].includes(data.tab)) {
            data.tab = "love";
        }

        if (!Number.isInteger(data.favoriteIndex)) {
            data.favoriteIndex = 0;
        }

        return data;
    }

    function currentLanguage() {
        return getSaveData().language;
    }

    function text(key) {
        const language = currentLanguage();
        return UI_TEXT[language][key] ||
            UI_TEXT["zh-CN"][key] ||
            key;
    }

    function getReadableValue(value) {
        if (typeof value === "string" || typeof value === "number") {
            return String(value);
        }

        if (!isObject(value)) {
            return "";
        }

        const fields = [
            "location_name",
            "area_name",
            "name",
            "descr",
            "title",
            "description",
            "location",
            "area",
            "room",
            "place"
        ];

        for (const field of fields) {
            const result = safeGet(value, field);

            if (typeof result === "string" && result.trim() !== "") {
                return result;
            }
        }

        return "";
    }

    function translateValue(value, dictionary) {
        if (value === undefined || value === null || value === "") {
            return text("unknown");
        }

        if (typeof value === "object") {
            const readable = getReadableValue(value);

            if (!readable) {
                return text("unknown");
            }

            return translateValue(readable, dictionary);
        }

        const key = String(value);
        const language = currentLanguage();

        if (language === "en") {
            return key;
        }

        return dictionary[language][key] || key;
    }

    function translateLocation(value) {
        return translateValue(value, LOCATION_NAMES);
    }

    function translateActivity(value) {
        return translateValue(value, ACTIVITY_NAMES);
    }

    function translateNpcName(name) {
        const language = currentLanguage();

        if (language === "en") {
            return name;
        }

        return NPC_NAMES[language][name] || name;
    }

    function unknownData(name, title) {
        return {
            name: name,
            title: title || "",
            location: text("unknown"),
            activity: text("unknown")
        };
    }

    function notKnown(name) {
        return {
            name: name,
            title: "",
            location: text("notKnown"),
            activity: text("notKnown")
        };
    }

    function getKnownStatus(name) {
        try {
            const npc = window.C && C.npc && C.npc[name];

            if (!npc || npc.init === undefined || npc.init === null) {
                return null;
            }

            return npc.init === 1;
        } catch (error) {
            return null;
        }
    }

    function getRuntimeNpc(name) {
        try {
            const variables = getVariables();
            const names = variables && variables.NPCNameList;
            const data = variables && variables.NPCName;

            if (Array.isArray(names) && Array.isArray(data)) {
                const index = names.indexOf(name);

                if (index >= 0 && index < data.length) {
                    return data[index] || null;
                }
            }
        } catch (error) {}

        return null;
    }

    function getCNpc(name) {
        try {
            return window.C && C.npc ? C.npc[name] || null : null;
        } catch (error) {
            return null;
        }
    }

    function getMapleBirchNpc(name) {
        try {
            const variables = getVariables();
            const npcContainer =
                variables &&
                variables.maplebirch &&
                variables.maplebirch.npc;

            if (!npcContainer) {
                return null;
            }

            const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "");

            for (const key of Object.keys(npcContainer)) {
                const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");

                if (normalizedKey === normalizedName) {
                    return npcContainer[key];
                }
            }
        } catch (error) {}

        return null;
    }

    function getNpcTitle(name) {
        const npc =
            getRuntimeNpc(name) ||
            getCNpc(name) ||
            getMapleBirchNpc(name);

        if (!isObject(npc)) {
            return "";
        }

        const title =
            safeGet(npc, "title") ||
            safeGet(npc, "description");

        return translateNpcTitle(typeof title === "string" ? title : "");
    }

    function readLocationFields(npc) {
        if (!isObject(npc)) {
            return null;
        }

        const locationFields = [
            "currentLocation",
            "current_location",
            "location",
            "area",
            "room",
            "place"
        ];

        const activityFields = [
            "currentActivity",
            "current_activity",
            "activity",
            "action",
            "doing",
            "task"
        ];

        let location;
        let currentActivity;

        for (const field of locationFields) {
            const value = safeGet(npc, field);

            if (value !== undefined && value !== null && value !== "") {
                location = value;
                break;
            }
        }

        for (const field of activityFields) {
            const value = safeGet(npc, field);

            if (value !== undefined && value !== null && value !== "") {
                currentActivity = value;
                break;
            }
        }

        if (location === undefined && currentActivity === undefined) {
            return null;
        }

        return {
            location: translateLocation(location),
            activity: translateActivity(currentActivity)
        };
    }

    function readDailyData(name) {
        try {
            const variables = getVariables();
            const daily = variables && variables.daily;

            if (!daily || !isObject(daily)) {
                return null;
            }

            const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, "");

            for (const key of Object.keys(daily)) {
                const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, "");

                if (normalizedKey !== normalizedName) {
                    continue;
                }

                const data = daily[key];

                if (!isObject(data)) {
                    continue;
                }

                const directResult = readLocationFields(data);

                if (directResult) {
                    return directResult;
                }

                for (const field of ["current", "today", "status"]) {
                    const nested = safeGet(data, field);

                    if (isObject(nested)) {
                        const result = readLocationFields(nested);

                        if (result) {
                            return result;
                        }
                    }
                }
            }
        } catch (error) {}

        return null;
    }

    function getGenericNpc(name) {
        const sources = [
            getRuntimeNpc(name),
            getCNpc(name),
            getMapleBirchNpc(name)
        ];

        for (const source of sources) {
            const result = readLocationFields(source);

            if (result) {
                return {
                    name: name,
                    title: getNpcTitle(name),
                    location: result.location,
                    activity: result.activity
                };
            }
        }

        const dailyResult = readDailyData(name);

        if (dailyResult) {
            return {
                name: name,
                title: getNpcTitle(name),
                location: dailyResult.location,
                activity: dailyResult.activity
            };
        }

        return unknownData(name, getNpcTitle(name));
    }

    function getRobin() {
        if (getKnownStatus("Robin") === false) {
            return notKnown("Robin");
        }

        try {
            if (
                !window.C ||
                !C.npc ||
                !C.npc.Robin ||
                C.npc.Robin.init !== 1 ||
                typeof window.getRobinLocation !== "function"
            ) {
                return unknownData("Robin");
            }

            const location = window.getRobinLocation();

            return {
                name: "Robin",
                title: getNpcTitle("Robin"),
                location: translateLocation(location),
                activity: translateActivity(location)
            };
        } catch (error) {
            return unknownData("Robin");
        }
    }

    function getKylar() {
        if (getKnownStatus("Kylar") === false) {
            return notKnown("Kylar");
        }

        try {
            if (typeof window.getKylarLocation !== "function") {
                return getGenericNpc("Kylar");
            }

            const result = window.getKylarLocation();

            if (!result || typeof result !== "object") {
                return unknownData("Kylar");
            }

            return {
                name: "Kylar",
                title: getNpcTitle("Kylar"),
                location: translateLocation(result.area),
                activity: translateActivity(result.state)
            };
        } catch (error) {
            return unknownData("Kylar");
        }
    }

    function getSydney() {
        if (getKnownStatus("Sydney") === false) {
            return notKnown("Sydney");
        }

        try {
            const temporary = getTemporary();
            const variables = getVariables();
            const location = temporary && temporary.sydney_location;
            const templeWork = variables && variables.sydney_templeWork;

            if (!location) {
                return getGenericNpc("Sydney");
            }

            return {
                name: "Sydney",
                title: getNpcTitle("Sydney"),
                location: translateLocation(location),
                activity: templeWork
                    ? translateActivity(templeWork)
                    : translateActivity(location)
            };
        } catch (error) {
            return unknownData("Sydney");
        }
    }

    function getGwylan() {
        if (getKnownStatus("Gwylan") === false) {
            return notKnown("Gwylan");
        }

        try {
            if (typeof window.gwylanSchedule !== "function") {
                return getGenericNpc("Gwylan");
            }

            const location = window.gwylanSchedule();

            return {
                name: "Gwylan",
                title: getNpcTitle("Gwylan"),
                location: translateLocation(location),
                activity: translateActivity(location)
            };
        } catch (error) {
            return unknownData("Gwylan");
        }
    }

    function getAvery() {
        if (getKnownStatus("Avery") === false) {
            return notKnown("Avery");
        }

        try {
            const variables = getVariables();
            const schedule =
                variables &&
                variables.avery_mansion &&
                variables.avery_mansion.schedule;

            if (!schedule) {
                return getGenericNpc("Avery");
            }

            const scheduleLocations = {
                sleep: "庄园卧室",
                bath: "庄园浴室",
                dressing: "庄园卧室",
                breakfast: "庄园餐厅",
                work: "办公大楼",
                return: "庄园",
                party_prepare: "庄园",
                party: "庄园宴会厅",
                drink: "庄园",
                dinner: "庄园餐厅",
                study: "书房",
                pool: "泳池",
                lounge: "休息室",
                garden: "庄园花园",
                date: "约会地点",
                away: "外出"
            };

            const scheduleActivities = {
                sleep: "休息或睡眠",
                bath: "洗浴",
                dressing: "更衣",
                breakfast: "用早餐",
                work: "工作",
                return: "返回庄园",
                party_prepare: "准备宴会",
                party: "参加宴会",
                drink: "饮酒",
                dinner: "用晚餐",
                study: "学习",
                pool: "在泳池活动",
                lounge: "休息",
                garden: "在花园活动",
                date: "约会",
                away: "外出"
            };

            if (currentLanguage() === "en") {
                return {
                    name: "Avery",
                    title: getNpcTitle("Avery"),
                    location: schedule,
                    activity: schedule
                };
            }

            return {
                name: "Avery",
                title: getNpcTitle("Avery"),
                location: scheduleLocations[schedule] || text("unknown"),
                activity: scheduleActivities[schedule] || text("unknown")
            };
        } catch (error) {
            return unknownData("Avery");
        }
    }

    const SPECIAL_GETTERS = {
        Robin: getRobin,
        Kylar: getKylar,
        Sydney: getSydney,
        Gwylan: getGwylan,
        Avery: getAvery
    };

    function isValidNpcName(name) {
        return typeof name === "string" && name.trim().length > 0;
    }

    function discoverNpcs() {
        const discovered = new Map();

        function addNpc(name) {
            if (!isValidNpcName(name)) return;

            const cleanName = name.trim();

            if (!discovered.has(cleanName)) {
                discovered.set(cleanName, { name: cleanName });
            }
        }

        try {
            const variables = getVariables();
            const runtimeNames = variables && variables.NPCNameList;

            if (Array.isArray(runtimeNames)) {
                runtimeNames.forEach(addNpc);
            }
        } catch (error) {}

        try {
            const staticNames = window.setup && setup.NPCNameList;

            if (Array.isArray(staticNames)) {
                staticNames.forEach(addNpc);
            }
        } catch (error) {}

        VANILLA_NPCS.forEach(addNpc);

        try {
            const npcContainer = window.C && C.npc;

            if (npcContainer && typeof npcContainer === "object") {
                Object.keys(npcContainer).forEach(function (name) {
                    try {
                        const npc = npcContainer[name];

                        if (
                            npc &&
                            typeof npc === "object" &&
                            (
                                npc.nam ||
                                npc.title ||
                                npc.description ||
                                VANILLA_SET.has(name)
                            )
                        ) {
                            addNpc(name);
                        }
                    } catch (error) {}
                });
            }
        } catch (error) {}

        return Array.from(discovered.values());
    }

    function getNpcData(info) {
        const name = info.name;

        if (SPECIAL_GETTERS[name]) {
            return SPECIAL_GETTERS[name]();
        }

        return getGenericNpc(name);
    }

    function getCategory(name) {
        if (LOVE_SET.has(name)) return "love";
        if (VANILLA_SET.has(name)) return "ordinary";
        return "mods";
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>"']/g, function (char) {
            return {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }[char];
        });
    }

    function getDisplayName(name) {
        return translateNpcName(name);
    }

    function renderFavoriteCard(npc) {
        return (
            '<div class="npc-tracker-favorite-item">' +
                '<span class="npc-tracker-favorite-name">' +
                    escapeHtml(getDisplayName(npc.name)) +
                '</span>' +
                '<button type="button" class="npc-tracker-star is-active" ' +
                    'data-npc-action="favorite" data-npc-name="' +
                    escapeHtml(npc.name) + '" title="' +
                    escapeHtml(text("unfavorite")) + '" aria-label="' +
                    escapeHtml(text("unfavorite")) + '">★</button>' +
            '</div>'
        );
    }

    function renderNpcCard(npc, favorites) {
        const isFavorite = favorites.includes(npc.name);
        const star = isFavorite ? "★" : "☆";
        const actionTitle = isFavorite ? text("unfavorite") : text("favorite");

        return (
            '<section class="npc-tracker-entry">' +
                '<div class="npc-tracker-entry-header">' +
                    '<div class="npc-tracker-name">' +
                        escapeHtml(getDisplayName(npc.name)) +
                    '</div>' +
                    '<button type="button" class="npc-tracker-star ' +
                        (isFavorite ? "is-active" : "") +
                        '" data-npc-action="favorite" data-npc-name="' +
                        escapeHtml(npc.name) + '" title="' +
                        escapeHtml(actionTitle) + '" aria-label="' +
                        escapeHtml(actionTitle) + '">' + star + '</button>' +
                '</div>' +
                (npc.title
                    ? '<div class="npc-tracker-title">' +
                        escapeHtml(npc.title) +
                      '</div>'
                    : "") +
                '<div class="npc-tracker-detail">' +
                    '<span>' + escapeHtml(text("location")) + '</span>' +
                    '<span>' + escapeHtml(npc.location) + '</span>' +
                '</div>' +
                '<div class="npc-tracker-detail">' +
                    '<span>' + escapeHtml(text("activity")) + '</span>' +
                    '<span>' + escapeHtml(npc.activity) + '</span>' +
                '</div>' +
            '</section>'
        );
    }

    function renderLanguageSelector() {
        const language = currentLanguage();

        return (
            '<label class="npc-tracker-language">' +
                '<span>' + escapeHtml(text("language")) + '</span>' +
                '<select data-npc-action="language" aria-label="' +
                    escapeHtml(text("language")) + '">' +
                    '<option value="zh-CN" ' +
                        (language === "zh-CN" ? "selected" : "") +
                        '>简体中文</option>' +
                    '<option value="zh-TW" ' +
                        (language === "zh-TW" ? "selected" : "") +
                        '>繁體中文</option>' +
                    '<option value="en" ' +
                        (language === "en" ? "selected" : "") +
                        '>English</option>' +
                '</select>' +
            '</label>'
        );
    }

    function renderTabs(activeTab) {
        const tabs = [
            ["love", text("love")],
            ["ordinary", text("ordinary")],
            ["mods", text("mods")]
        ];

        return (
            '<nav class="npc-tracker-tabs">' +
                tabs.map(function (tab) {
                    return (
                        '<button type="button" class="npc-tracker-tab ' +
                            (activeTab === tab[0] ? "is-active" : "") +
                            '" data-npc-action="tab" data-npc-tab="' +
                            tab[0] + '">' +
                            escapeHtml(tab[1]) +
                        '</button>'
                    );
                }).join("") +
            '</nav>'
        );
    }

    function renderFavorites(rows, favorites) {
        const favoriteRows = favorites
            .map(function (name) {
                return rows.find(npc => npc.name === name);
            })
            .filter(Boolean);

        return (
            '<section class="npc-tracker-favorites">' +
                '<div class="npc-tracker-favorites-heading">' +
                    escapeHtml(text("favorites")) +
                    '<span>' + favoriteRows.length + '/3</span>' +
                '</div>' +
                '<div class="npc-tracker-favorites-list">' +
                    (favoriteRows.length
                        ? favoriteRows.map(renderFavoriteCard).join("")
                        : '<span class="npc-tracker-empty-favorite">' +
                            escapeHtml(text("noFavorites")) +
                          '</span>') +
                '</div>' +
            '</section>'
        );
    }

    function renderTracker() {
        const data = getSaveData();
        const rows = window.npcTrackerGetData();
        const favorites = data.favorites;
        const activeTab = data.tab;

        const visibleRows = rows.filter(function (npc) {
            return getCategory(npc.name) === activeTab;
        }).sort(function (a, b) {
            const ai = favorites.indexOf(a.name);
            const bi = favorites.indexOf(b.name);

            if (ai >= 0 && bi >= 0) return ai - bi;
            if (ai >= 0) return -1;
            if (bi >= 0) return 1;

            return 0;
        });

        return (
            '<div class="npc-tracker">' +
                '<header class="npc-tracker-header">' +
                    '<div class="npc-tracker-heading">' +
                        '<div class="npc-tracker-title-main">' +
                            escapeHtml(text("title")) +
                        '</div>' +
                        '<div class="npc-tracker-note">' +
                            escapeHtml(text("note")) +
                        '</div>' +
                    '</div>' +
                    renderLanguageSelector() +
                '</header>' +
                renderFavorites(rows, favorites) +
                renderTabs(activeTab) +
                '<div class="npc-tracker-list">' +
                    (visibleRows.length
                        ? visibleRows.map(npc => renderNpcCard(npc, favorites)).join("")
                        : '<div class="npc-tracker-empty">' +
                            escapeHtml(text("empty")) +
                          '</div>') +
                '</div>' +
            '</div>'
        );
    }

    window.npcTrackerGetData = function () {
        return discoverNpcs().map(getNpcData);
    };

    window.npcTrackerRender = function () {
        return renderTracker();
    };

    function rerender() {
        const containers = document.querySelectorAll(".npc-tracker-container");

        containers.forEach(function (container) {
            container.innerHTML = window.npcTrackerRender();
        });

        renderFloatingCard();
    }

    let toastTimer = null;
    let floatingRefreshTimer = null;

    function showToast(message) {
        let toast = document.getElementById("npc-tracker-toast");

        if (!toast) {
            toast = document.createElement("div");
            toast.id = "npc-tracker-toast";
            toast.className = "npc-tracker-toast";
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.add("is-visible");

        if (toastTimer) {
            window.clearTimeout(toastTimer);
        }

        toastTimer = window.setTimeout(function () {
            toast.classList.remove("is-visible");
        }, 2300);
    }

    function ensureFloatingCard() {
        if (!document.body) return null;

        let card = document.getElementById("npc-tracker-floating");

        if (!card) {
            card = document.createElement("aside");
            card.id = "npc-tracker-floating";
            card.className = "npc-tracker-floating";
            card.setAttribute("aria-live", "polite");
            document.body.appendChild(card);
        }

        return card;
    }

    function renderFloatingCard() {
        const data = getSaveData();
        const favorites = data.favorites;
        const card = ensureFloatingCard();

        if (!card) return;

        if (!favorites.length) {
            card.hidden = true;
            card.innerHTML = "";
            return;
        }

        if (!Number.isInteger(data.favoriteIndex)) {
            data.favoriteIndex = 0;
        }

        data.favoriteIndex =
            ((data.favoriteIndex % favorites.length) + favorites.length) %
            favorites.length;

        const npc = getNpcData({
            name: favorites[data.favoriteIndex]
        });

        const position = (data.favoriteIndex + 1) + "/" + favorites.length;
        const canSwitch = favorites.length > 1;

        card.hidden = false;
        card.innerHTML =
            '<div class="npc-tracker-floating-top">' +
                '<span class="npc-tracker-floating-label">' +
                    escapeHtml(text("favorites")) +
                '</span>' +
                '<span class="npc-tracker-floating-count">' +
                    position +
                '</span>' +
            '</div>' +
            '<div class="npc-tracker-floating-person">' +
                '<div class="npc-tracker-floating-name">' +
                    escapeHtml(getDisplayName(npc.name)) +
                '</div>' +
                (npc.title
                    ? '<div class="npc-tracker-floating-title">' +
                        escapeHtml(npc.title) +
                      '</div>'
                    : '') +
            '</div>' +
            '<div class="npc-tracker-floating-info">' +
                '<span>' + escapeHtml(text("location")) + '</span>' +
                '<strong>' + escapeHtml(npc.location || text("unknown")) + '</strong>' +
            '</div>' +
            '<div class="npc-tracker-floating-info">' +
                '<span>' + escapeHtml(text("activity")) + '</span>' +
                '<strong>' + escapeHtml(npc.activity || text("unknown")) + '</strong>' +
            '</div>' +
            '<div class="npc-tracker-floating-controls">' +
                '<button type="button" data-npc-floating="prev" ' +
                    (canSwitch ? '' : 'disabled') +
                    ' aria-label="' + escapeHtml(text("previous")) + '">‹</button>' +
                '<span>' + escapeHtml(position) + '</span>' +
                '<button type="button" data-npc-floating="next" ' +
                    (canSwitch ? '' : 'disabled') +
                    ' aria-label="' + escapeHtml(text("next")) + '">›</button>' +
            '</div>';
    }

    function cycleFavorite(direction) {
        const data = getSaveData();
        const count = data.favorites.length;

        if (count < 2) return;

        if (!Number.isInteger(data.favoriteIndex)) {
            data.favoriteIndex = 0;
        }

        data.favoriteIndex =
            (data.favoriteIndex + direction + count) % count;

        renderFloatingCard();
    }

    function toggleFavorite(name) {
        const data = getSaveData();
        const index = data.favorites.indexOf(name);

        if (index >= 0) {
            data.favorites.splice(index, 1);

            if (data.favoriteIndex >= data.favorites.length) {
                data.favoriteIndex = Math.max(0, data.favorites.length - 1);
            }

            return true;
        }

        if (data.favorites.length >= 3) {
            showToast(text("favoriteLimit"));
            return false;
        }

        data.favorites.push(name);
        data.favoriteIndex = data.favorites.length - 1;

        return true;
    }

    function bindEvents() {
        if (window.__npcTrackerEventsVersion === "2.3") {
            return;
        }

        window.__npcTrackerEventsVersion = "2.3";
        window.npcTrackerEventsBound = true;

        document.addEventListener("click", function (event) {
            const target = event.target;

            if (!(target instanceof Element)) return;

            const floatingButton = target.closest(
                "#npc-tracker-floating [data-npc-floating]"
            );

            if (floatingButton) {
                event.preventDefault();
                event.stopPropagation();

                cycleFavorite(
                    floatingButton.getAttribute("data-npc-floating") === "next"
                        ? 1
                        : -1
                );

                return;
            }

            const button = target.closest(
                '.npc-tracker [data-npc-action="tab"], ' +
                '.npc-tracker [data-npc-action="favorite"]'
            );

            if (!button) return;

            event.preventDefault();
            event.stopPropagation();

            const action = button.getAttribute("data-npc-action");
            const data = getSaveData();

            if (action === "tab") {
                const tab = button.getAttribute("data-npc-tab");

                if (["love", "ordinary", "mods"].includes(tab)) {
                    data.tab = tab;
                    rerender();
                }

                return;
            }

            if (action === "favorite") {
                const name = button.getAttribute("data-npc-name");

                if (name) {
                    toggleFavorite(name);
                    rerender();
                }
            }
        }, true);

        document.addEventListener("change", function (event) {
            const target = event.target;

            if (!(target instanceof Element)) return;

            if (
                target.matches(
                    '.npc-tracker select[data-npc-action="language"]'
                )
            ) {
                const language = target.value;

                if (LANGUAGES.includes(language)) {
                    event.stopPropagation();
                    getSaveData().language = language;
                    rerender();
                }
            }
        }, true);

        document.addEventListener("keydown", function (event) {
            if (
                event.altKey ||
                event.ctrlKey ||
                event.metaKey ||
                event.shiftKey
            ) {
                return;
            }

            const target = event.target;

            if (
                target &&
                (
                    target.isContentEditable ||
                    /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
                )
            ) {
                return;
            }

            if (
                event.key === "ArrowLeft" ||
                event.key === "ArrowRight"
            ) {
                if (getSaveData().favorites.length < 2) return;

                event.preventDefault();
                event.stopPropagation();

                cycleFavorite(
                    event.key === "ArrowRight" ? 1 : -1
                );
            }
        }, true);

        function initializeFloatingCard() {
            renderFloatingCard();

            if (floatingRefreshTimer) {
                window.clearInterval(floatingRefreshTimer);
            }

            floatingRefreshTimer = window.setInterval(
                renderFloatingCard,
                5000
            );
        }

        if (document.body) {
            initializeFloatingCard();
        } else {
            document.addEventListener(
                "DOMContentLoaded",
                initializeFloatingCard,
                { once: true }
            );
        }
    }

    bindEvents();
})();