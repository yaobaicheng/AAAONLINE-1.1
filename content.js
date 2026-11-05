/* ====================================================================
   YIMIAO HUANYU 网站内容（1.1.3）

   这个文件就是网站的“内容仓库”：三语文字、产品、方案、服务、画廊、
   常见问题、热门搜索、联系方式、每页配色都在这里。

   改完保存后运行：node build/build.js（或在 VS Code 运行任务 ②）
   就会重新生成 index.html、en/index.html、id/index.html。

   想快速定位：Ctrl+F 搜索 version / site / company / siteMeta /
   pageVisuals / products / solutions / support / gallery / faq /
   hotSearches / contactLinks / locales
   ==================================================================== */
window.siteContent = {
  /* 版本号（发布时同步改这里） */
  "version": "1.1.3",

  /* 网站地址。换域名只改 url 这一行。 */
  "site": {
    "url": "https://yimiaohuanyu.com"
  },

  /* 公司名、电话、邮箱；address 有公开地址再填，留空也没问题。 */
  "company": {
    "name": "PT. YIMIAO HUANYU TECHNOLOGY INDONESIA",
    "shortName": "YIMIAO HUANYU",
    "initial": "Y",
    "copyright": "© 2026 PT. YIMIAO HUANYU TECHNOLOGY INDONESIA. All rights reserved.",
    "contact": [
      "+62 811-1008-6666",
      "+62 811-1008-7777",
      "yimiaohuanyu@gmail.com"
    ],
    "country": "ID",
    "serviceArea": "Indonesia",
    "address": {
      "streetAddress": "",
      "addressLocality": "",
      "addressRegion": "",
      "postalCode": ""
    },
    "languages": [
      "zh-CN",
      "en",
      "id"
    ],
    "brands": [
      "Hailiang 海亮",
      "YAKAYA 亚凯亚"
    ]
  },

  /* 语言切换菜单：默认显示 Language，打开后选择语言。 */
  "languageMenu": {
    "label": "Language",
    "options": [
      { "code": "zh", "label": "中文" },
      { "code": "en", "label": "English" },
      { "code": "id", "label": "Bahasa Indonesia" }
    ]
  },

  /* 可选的 logo 图片；留空时顶栏使用 Y 字标记。 */
  "assets": {
    "logo": ""
  },

  /* 1) 搜索引擎标题、描述、关键词（每种语言各一份） */
  "siteMeta": {
    "zh": {
      "title": "印尼铜管·海亮铜管·分支管｜冷暖辅材供应商｜億淼寰宇",
      "description": "億淼寰宇是印尼的冷暖辅材供应商，现货供应海亮铜管、铜盘管、分支管、铜配件、保温材料、PU 风板与制冷剂，并提供配送、安装与售后支持。",
      "keywords": "印尼铜管, 海亮铜管, 海亮铜盘管, 铜管, 分支管, 保温铜管, 铜配件, 保温材料, PU 风板, 制冷剂, 印尼冷暖辅材, HVAC Indonesia"
    },
    "en": {
      "title": "Copper Tube Indonesia | Hailiang Copper Tube & HVAC Materials",
      "description": "YIMIAO HUANYU supplies Hailiang copper tubes, branch pipes, copper fittings, insulation, PU duct panels and refrigerants in Indonesia, with ready stock, delivery and after-sales support.",
      "keywords": "copper tube Indonesia, Hailiang copper tube, copper pancake coil, branch pipe, copper fittings, insulation, PU duct panel, refrigerant, HVAC materials Indonesia"
    },
    "id": {
      "title": "Pipa Tembaga Indonesia | Pipa Hailiang & Material HVAC",
      "description": "YIMIAO HUANYU menyediakan pipa tembaga Hailiang, pipa cabang, fitting tembaga, insulasi, panel PU, dan refrigeran di Indonesia, dengan stok siap kirim dan layanan purnajual.",
      "keywords": "pipa tembaga Indonesia, pipa Hailiang, koil pancake, pipa cabang, fitting tembaga, insulasi, panel PU, refrigeran, material HVAC Indonesia"
    }
  },

  /* 2) 每页配色。只有 home 和 vision 有大图，其他页用纯色。 */
  "pageVisuals": {
    "home": {
      "image": "/assets/optimized/hvac-materials-hero.webp",
      "bg": "#EAF5FF",
      "text": "#123F69",
      "accent": "#1689E8",
      "soft": "#D5EBFF",
      "muted": "#52779B",
      "photo": 0.55
    },
    "about": {
      "bg": "#FFFFFF",
      "text": "#174A75",
      "accent": "#117ED8",
      "soft": "#E8F5FF",
      "muted": "#537391"
    },
    "vision": {
      "image": "/assets/optimized/仓库.webp",
      "bg": "#DCEFFF",
      "text": "#12436F",
      "accent": "#087FCE",
      "soft": "#C8E6FF",
      "muted": "#3E6A91",
      "photo": 0.5
    },
    "products": {
      "bg": "#F6FBFF",
      "text": "#163F66",
      "accent": "#237FCA",
      "soft": "#E4F2FF",
      "muted": "#5A7790"
    },
    "solutions": {
      "bg": "#E9F5FF",
      "text": "#14456F",
      "accent": "#1485DE",
      "soft": "#D7EBFF",
      "muted": "#4C6E8D"
    },
    "support": {
      "bg": "#F4FAFF",
      "text": "#173E65",
      "accent": "#1D89DE",
      "soft": "#E1F1FF",
      "muted": "#54748F"
    },
    "gallery": {
      "bg": "#FFFFFF",
      "text": "#16436D",
      "accent": "#258BE5",
      "soft": "#E5F3FF",
      "muted": "#557791"
    },
    "faq": {
      "image": "",
      "bg": "#FFFFFF",
      "text": "#17466E",
      "accent": "#1689E8",
      "soft": "#EDF6FF",
      "muted": "#5A7893"
    },
    "contact": {
      "bg": "#EAF5FF",
      "text": "#153F66",
      "accent": "#157FD1",
      "soft": "#D7EBFD",
      "muted": "#4F7395"
    }
  },

  /* 3) 产品分类（选项卡） */
  "productCategories": [
    "all",
    "tube",
    "rod",
    "foil",
    "aluminum",
    "custom"
  ],

  /* 4) 产品。加产品就复制一整段，改 no / image / 三语名字和文字。 */
  "products": [
    {
      "no": "01",
      "category": "tube",
      "image": "/assets/铜盘管.png",
      "tone": "copper",
      "brand": "Hailiang",
      "name": {
        "zh": "海亮铜盘管",
        "en": "Hailiang Copper Coil",
        "id": "Koil Tembaga Hailiang"
      },
      "text": {
        "zh": "精密制造，适配多种严苛工况，管壁均匀",
        "en": "Precision manufacturing for demanding applications, with uniform tube walls.",
        "id": "Diproduksi secara presisi untuk berbagai kondisi penggunaan, dengan ketebalan dinding pipa yang merata."
      }
    },
    {
      "no": "02",
      "category": "tube",
      "image": "/assets/铜直管.png",
      "tone": "silver",
      "brand": "Hailiang",
      "name": {
        "zh": "海亮铜直管",
        "en": "Hailiang Straight Copper Tube",
        "id": "Pipa Tembaga Lurus Hailiang"
      },
      "text": {
        "zh": "稳定连接，可靠耐用单端扩口，安装便捷",
        "en": "Reliable and durable connections, with a flared end for easier installation.",
        "id": "Sambungan andal dan tahan lama, dengan ujung yang sudah diflaring untuk memudahkan pemasangan."
      }
    },
    {
      "no": "03",
      "category": "tube",
      "image": "/assets/保温铜管.png",
      "tone": "copper",
      "name": {
        "zh": "保温铜管",
        "en": "Insulated Copper Tube",
        "id": "Pipa Tembaga Berinsulasi"
      },
      "text": {
        "zh": "导热高效，绝热防潮安装便捷，节能环保",
        "en": "Efficient heat transfer, thermal insulation, moisture resistance, easy installation and energy efficiency.",
        "id": "Transfer panas efisien, insulasi termal, tahan lembap, mudah dipasang, dan hemat energi."
      }
    },
    {
      "no": "04",
      "category": "tube",
      "image": "/assets/蚊香盘管.png",
      "tone": "blue",
      "name": {
        "zh": "蚊香盘管",
        "en": "Copper Pancake Coil",
        "id": "Koil Tembaga Gulung"
      },
      "text": {
        "zh": "高效导热，管壁均匀尺寸精准 · 品质可靠",
        "en": "High thermal conductivity, uniform tube walls, accurate dimensions and reliable quality.",
        "id": "Konduktivitas termal tinggi, dinding pipa merata, ukuran presisi, dan kualitas andal."
      }
    },
    {
      "no": "05",
      "category": "rod",
      "image": "/assets/分支管.png",
      "tone": "silver",
      "brand": "Hailiang",
      "name": {
        "zh": "海亮分支管",
        "en": "Hailiang Copper Branch Pipe",
        "id": "Pipa Cabang Tembaga Hailiang"
      },
      "text": {
        "zh": "分流精准，多联连接制冷均匀，焊接可靠",
        "en": "Accurate flow distribution for multi-split systems and reliable brazed joints.",
        "id": "Distribusi aliran akurat untuk sistem multi-split dengan sambungan brazing yang andal."
      }
    },
    {
      "no": "06",
      "category": "rod",
      "image": "/assets/海亮铜直接.png",
      "tone": "silver",
      "brand": "Hailiang",
      "name": {
        "zh": "海亮铜直接",
        "en": "Hailiang Copper Coupling",
        "id": "Sambungan Lurus Tembaga Hailiang"
      },
      "text": {
        "zh": "连接牢固，导流顺畅耐压耐用，品质可靠",
        "en": "Secure connections, smooth flow, pressure resistance and durability.",
        "id": "Sambungan kuat, aliran lancar, tahan tekanan, dan tahan lama."
      }
    },
    {
      "no": "07",
      "category": "rod",
      "image": "/assets/海亮铜弯头.png",
      "tone": "dark",
      "brand": "Hailiang",
      "name": {
        "zh": "海亮铜弯头",
        "en": "Hailiang Copper Elbow",
        "id": "Siku Tembaga Hailiang"
      },
      "text": {
        "zh": "连接牢固，转向顺畅耐压耐用，品质可靠",
        "en": "Secure connections for smooth changes of direction, with pressure resistance and durability.",
        "id": "Sambungan kuat untuk perubahan arah aliran yang lancar, tahan tekanan, dan tahan lama."
      }
    },
    {
      "no": "08",
      "category": "rod",
      "image": "/assets/铜三通.png",
      "tone": "copper",
      "name": {
        "zh": "铜三通",
        "en": "Copper Tee",
        "id": "Tee Tembaga"
      },
      "text": {
        "zh": "连接牢固，分流顺畅耐压耐用，品质可靠",
        "en": "Secure branch connections, smooth flow, pressure resistance and reliable quality.",
        "id": "Sambungan cabang kuat, aliran lancar, tahan tekanan, dan kualitas andal."
      }
    },
    {
      "no": "09",
      "category": "rod",
      "image": "/assets/U型弯.png",
      "tone": "copper",
      "name": {
        "zh": "U型弯",
        "en": "Copper U-Bend",
        "id": "Pipa Tekuk U Tembaga"
      },
      "text": {
        "zh": "连接牢固，流道顺畅耐压耐用，品质可靠",
        "en": "Reliable U-shaped connections with smooth flow and durable performance.",
        "id": "Sambungan berbentuk U yang andal, aliran lancar, dan kinerja tahan lama."
      }
    },
    {
      "no": "10",
      "category": "rod",
      "image": "/assets/海亮铜磷焊条.png",
      "tone": "copper",
      "brand": "Hailiang",
      "name": {
        "zh": "海亮铜磷焊条",
        "en": "Hailiang Copper-Phosphorus Brazing Rod",
        "id": "Batang Brazing Tembaga-Fosfor Hailiang"
      },
      "text": {
        "zh": "加长加料，更多焊接熔化均匀，成分可靠",
        "en": "Extended rod length provides more brazing material, even melting and consistent composition.",
        "id": "Batang lebih panjang menyediakan lebih banyak bahan brazing, dengan peleburan merata dan komposisi konsisten."
      }
    },
    {
      "no": "11",
      "category": "foil",
      "image": "/assets/亚凯亚保温管.png",
      "tone": "silver",
      "brand": "YAKAYA",
      "name": {
        "zh": "亚凯亚保温管",
        "en": "YAKAYA Rubber Foam Insulation Pipe",
        "id": "Pipa Insulasi Busa Karet YAKAYA"
      },
      "text": {
        "zh": "高效绝热，防潮防露防腐阻燃，环保节能",
        "en": "Thermal insulation with moisture, condensation, corrosion and flame resistance for energy-efficient applications.",
        "id": "Insulasi termal yang tahan lembap, kondensasi, korosi, dan api untuk penggunaan hemat energi."
      }
    },
    {
      "no": "12",
      "category": "foil",
      "image": "/assets/亚凯亚保温板.png",
      "tone": "silver",
      "brand": "YAKAYA",
      "name": {
        "zh": "亚凯亚保温板",
        "en": "YAKAYA Rubber Foam Insulation Board",
        "id": "Papan Insulasi Busa Karet YAKAYA"
      },
      "text": {
        "zh": "高效绝热，防潮防露防腐阻燃，环保节能",
        "en": "Thermal insulation with moisture, condensation, corrosion and flame resistance for energy-efficient applications.",
        "id": "Insulasi termal yang tahan lembap, kondensasi, korosi, dan api untuk penggunaan hemat energi."
      }
    },
    {
      "no": "13",
      "category": "foil",
      "image": "/assets/彩色保温管.png",
      "tone": "silver",
      "name": {
        "zh": "彩色保温管",
        "en": "Custom-Color Insulation Pipe",
        "id": "Pipa Insulasi Warna Kustom"
      },
      "text": {
        "zh": "高端美观，支持定制颜色多样，可供选择",
        "en": "A refined appearance with a range of color options and custom colors available.",
        "id": "Tampilan premium dengan beragam pilihan warna dan opsi warna khusus."
      }
    },
    {
      "no": "14",
      "category": "aluminum",
      "image": "/assets/保温铝板风板.png",
      "tone": "blue",
      "name": {
        "zh": "保温铝板风板",
        "en": "Insulated Aluminum Duct Panel",
        "id": "Panel Saluran Udara Aluminium Berinsulasi"
      },
      "text": {
        "zh": "高效隔热，轻质坚固防潮耐用，灵活定制",
        "en": "Effective thermal insulation, lightweight strength, moisture resistance, durability and flexible customization.",
        "id": "Insulasi termal efektif, ringan dan kuat, tahan lembap, awet, serta dapat disesuaikan."
      }
    },
    {
      "no": "15",
      "category": "aluminum",
      "image": "/assets/单面彩钢酚醛风板.png",
      "tone": "blue",
      "name": {
        "zh": "单面彩钢酚醛风板",
        "en": "Single-Sided Color-Steel Phenolic Duct Panel",
        "id": "Panel Saluran Udara Fenolik Berlapis Baja Warna Satu Sisi"
      },
      "text": {
        "zh": "高效隔热，轻质高强防潮耐用，灵活定制",
        "en": "High-performance thermal insulation, lightweight strength, moisture resistance, durability and flexible customization.",
        "id": "Insulasi termal berkinerja tinggi, ringan dan kuat, tahan lembap, awet, serta dapat disesuaikan."
      }
    },
    {
      "no": "16",
      "category": "aluminum",
      "image": "/assets/风板推刀.png",
      "tone": "blue",
      "name": {
        "zh": "风板推刀",
        "en": "Duct Board Cutter",
        "id": "Pemotong Panel Saluran Udara"
      },
      "text": {
        "zh": "精准切割，操作便捷锋利耐用，省时省力",
        "en": "Precise cutting, easy handling, a durable sharp edge and time-saving operation.",
        "id": "Pemotongan presisi, mudah digunakan, tajam dan tahan lama, serta menghemat waktu."
      }
    },
    {
      "no": "17",
      "category": "aluminum",
      "image": "/assets/风板推刀刀片.png",
      "tone": "blue",
      "name": {
        "zh": "风板推刀刀片",
        "en": "Duct Board Cutter Blade",
        "id": "Mata Pisau Pemotong Panel Saluran Udara"
      },
      "text": {
        "zh": "锋利耐磨，精准切割持久耐用，拆装便捷",
        "en": "Sharp and wear-resistant for precise, lasting cuts, with convenient blade replacement.",
        "id": "Tajam dan tahan aus untuk pemotongan presisi yang tahan lama, serta mudah diganti."
      }
    },
    {
      "no": "18",
      "category": "aluminum",
      "image": "/assets/F型法兰.png",
      "tone": "blue",
      "name": {
        "zh": "F型法兰",
        "en": "F-Type Flange",
        "id": "Flensa Tipe F"
      },
      "text": {
        "zh": "F型连接，安装便捷结构稳固，拼接严密",
        "en": "F-type connection for easy installation, a stable structure and tight panel joints.",
        "id": "Sambungan tipe F yang mudah dipasang, berstruktur kokoh, dan menghasilkan sambungan panel yang rapat."
      }
    },
    {
      "no": "19",
      "category": "aluminum",
      "image": "/assets/H型法兰.png",
      "tone": "blue",
      "name": {
        "zh": "H型法兰",
        "en": "H-Type Flange",
        "id": "Flensa Tipe H"
      },
      "text": {
        "zh": "H型连接，紧密拼接安装便捷，结构稳固",
        "en": "H-type connection for tight panel joints, easy installation and a stable structure.",
        "id": "Sambungan tipe H untuk panel yang rapat, pemasangan mudah, dan struktur kokoh."
      }
    },
    {
      "no": "20",
      "category": "aluminum",
      "image": "/assets/隐形法兰.png",
      "tone": "blue",
      "name": {
        "zh": "隐形法兰",
        "en": "Concealed Flange",
        "id": "Flensa Tersembunyi"
      },
      "text": {
        "zh": "隐形连接，美观简洁拼接牢固，安装便捷",
        "en": "A neat, concealed connection with secure joints and convenient installation.",
        "id": "Sambungan tersembunyi yang rapi, kuat, dan mudah dipasang."
      }
    },
    {
      "no": "21",
      "category": "aluminum",
      "image": "/assets/挤塑板侧法兰.png",
      "tone": "blue",
      "name": {
        "zh": "挤塑板侧法兰",
        "en": "XPS Board Side Flange",
        "id": "Flensa Samping untuk Papan XPS"
      },
      "text": {
        "zh": "三通连接，灵活转接拼接稳固，安装便捷",
        "en": "Versatile side connections for flexible transitions, secure panel joints and easy installation.",
        "id": "Sambungan samping serbaguna untuk transisi fleksibel, sambungan panel yang kokoh, dan pemasangan mudah."
      }
    },
    {
      "no": "22",
      "category": "aluminum",
      "image": "/assets/包边角.png",
      "tone": "blue",
      "name": {
        "zh": "包边角",
        "en": "Edge Trim Corner",
        "id": "Sudut Pelindung Tepi"
      },
      "text": {
        "zh": "边角防护，拼接紧密安装便捷，牢固耐用",
        "en": "Protects panel edges and corners while keeping joints tight and installation convenient.",
        "id": "Melindungi tepi dan sudut panel, menjaga sambungan tetap rapat, dan memudahkan pemasangan."
      }
    },
    {
      "no": "23",
      "category": "aluminum",
      "image": "/assets/挤塑板镀锌弯头.png",
      "tone": "blue",
      "name": {
        "zh": "挤塑板镀锌弯头",
        "en": "Galvanized Elbow for XPS Duct Board",
        "id": "Siku Galvanis untuk Panel Saluran Udara XPS"
      },
      "text": {
        "zh": "转角连接，镀锌防锈结构稳固，安装便捷",
        "en": "A stable corner connection with galvanized rust protection and convenient installation.",
        "id": "Sambungan sudut yang kokoh, dilapisi galvanis agar tahan karat, dan mudah dipasang."
      }
    },
    {
      "no": "24",
      "category": "aluminum",
      "image": "/assets/H型卡扣.png",
      "tone": "blue",
      "name": {
        "zh": "H型卡扣",
        "en": "H-Type Clip",
        "id": "Klip Tipe H"
      },
      "text": {
        "zh": "稳固卡合，精准拼接安装便捷，牢固耐用",
        "en": "Secure locking and precise panel alignment, with convenient installation and durable performance.",
        "id": "Mengunci dengan kuat dan menyelaraskan panel secara presisi, mudah dipasang, serta tahan lama."
      }
    },
    {
      "no": "25",
      "category": "aluminum",
      "image": "/assets/铝箔胶带.png",
      "tone": "blue",
      "name": {
        "zh": "铝箔胶带",
        "en": "Aluminum Foil Tape",
        "id": "Pita Aluminium Foil"
      },
      "text": {
        "zh": "密封防潮，粘接牢固耐受高温，耐用抗老",
        "en": "Seals against moisture with strong adhesion, heat resistance and long-term durability.",
        "id": "Menyegel dan menahan kelembapan dengan daya rekat kuat, tahan panas, dan tahan lama."
      }
    },
    {
      "no": "26",
      "category": "aluminum",
      "image": "/assets/挤塑板胶水.png",
      "tone": "blue",
      "name": {
        "zh": "挤塑板胶水",
        "en": "XPS Board Adhesive",
        "id": "Perekat Papan XPS"
      },
      "text": {
        "zh": "粘接牢固，施工便捷防水耐用，持久稳固",
        "en": "Strong bonding, convenient application, water resistance and lasting durability.",
        "id": "Daya rekat kuat, mudah diaplikasikan, tahan air, dan tahan lama."
      }
    },
    {
      "no": "27",
      "category": "custom",
      "image": "/assets/R32制冷剂.png",
      "tone": "blue",
      "name": {
        "zh": "R32制冷剂",
        "en": "R32 Refrigerant",
        "id": "Refrigeran R32"
      },
      "text": {
        "zh": "高效制冷，节能环保性能稳定，纯净可靠",
        "en": "Efficient cooling, energy saving, stable performance and reliable purity.",
        "id": "Pendinginan efisien, hemat energi, kinerja stabil, dan kemurnian yang andal."
      }
    },
    {
      "no": "28",
      "category": "custom",
      "image": "/assets/R410A制冷剂.png",
      "tone": "dark",
      "name": {
        "zh": "R410A制冷剂",
        "en": "R410A Refrigerant",
        "id": "Refrigeran R410A"
      },
      "text": {
        "zh": "高效制冷，节能环保性能稳定，纯净可靠",
        "en": "Efficient cooling, energy saving, stable performance and reliable purity.",
        "id": "Pendinginan efisien, hemat energi, kinerja stabil, dan kemurnian yang andal."
      }
    },
    {
      "no": "29",
      "category": "custom",
      "image": "/assets/R22A制冷剂.png",
      "tone": "dark",
      "name": {
        "zh": "R22制冷剂",
        "en": "R22 Refrigerant",
        "id": "Refrigeran R22"
      },
      "text": {
        "zh": "高效制冷，运行稳定品质可靠，适用广泛",
        "en": "Efficient cooling, stable operation, reliable quality and broad applicability.",
        "id": "Pendinginan efisien, operasi stabil, kualitas andal, dan penggunaan luas."
      }
    },
    {
      "no": "30",
      "category": "custom",
      "image": "/assets/R134A制冷剂.png",
      "tone": "dark",
      "name": {
        "zh": "R134A制冷剂",
        "en": "R134A Refrigerant",
        "id": "Refrigeran R134A"
      },
      "text": {
        "zh": "高效制冷，节能环保性能稳定，纯净可靠",
        "en": "Efficient cooling, energy saving, stable performance and reliable purity.",
        "id": "Pendinginan efisien, hemat energi, kinerja stabil, dan kemurnian yang andal."
      }
    },
    {
      "no": "31",
      "category": "custom",
      "image": "/assets/R404A制冷剂.png",
      "tone": "dark",
      "name": {
        "zh": "R404A制冷剂",
        "en": "R404A Refrigerant",
        "id": "Refrigeran R404A"
      },
      "text": {
        "zh": "高效制冷，节能环保性能稳定，纯净可靠",
        "en": "Efficient cooling, energy saving, stable performance and reliable purity.",
        "id": "Pendinginan efisien, hemat energi, kinerja stabil, dan kemurnian yang andal."
      }
    },
    {
      "no": "32",
      "category": "custom",
      "image": "/assets/R507A制冷剂.png",
      "tone": "dark",
      "name": {
        "zh": "R507A",
        "en": "R507A Refrigerant",
        "id": "Refrigeran R507A"
      },
      "text": {
        "zh": "高效制冷，节能环保性能稳定，纯净可靠",
        "en": "Efficient cooling, energy saving, stable performance and reliable purity.",
        "id": "Pendinginan efisien, hemat energi, kinerja stabil, dan kemurnian yang andal."
      }
    }
  ],

  /* 5) 解决方案 */
  "solutions": [
    {
      "title": {
        "zh": "家用空调安装",
        "en": "Residential AC Installation",
        "id": "Instalasi AC Rumah"
      }
    },
    {
      "title": {
        "zh": "商用空调项目",
        "en": "Commercial HVAC Projects",
        "id": "Proyek HVAC Komersial"
      }
    },
    {
      "title": {
        "zh": "冷库材料供应",
        "en": "Cold Storage Materials Supply",
        "id": "Pasokan Material Gudang Pendingin"
      }
    },
    {
      "title": {
        "zh": "数据中心项目",
        "en": "Data Center Projects",
        "id": "Proyek Pusat Data"
      }
    },
    {
      "title": {
        "zh": "新风材料供应",
        "en": "Fresh-Air Ventilation Materials",
        "id": "Pasokan Material Ventilasi Udara Segar"
      }
    },
    {
      "title": {
        "zh": "各种配件供应",
        "en": "HVAC Accessories Supply",
        "id": "Pasokan Aksesori HVAC"
      }
    }
  ],

  /* 6) 服务支持 */
  "support": [
    {
      "label": {
        "zh": "咨询",
        "en": "Consult",
        "id": "Konsultasi"
      },
      "title": {
        "zh": "产品咨询",
        "en": "Product Inquiry",
        "id": "Konsultasi Produk"
      },
      "text": {
        "zh": "帮助您找到合适的产品与方案",
        "en": "Find the right products and solutions for your needs.",
        "id": "Bantu Anda menemukan produk dan solusi yang tepat."
      }
    },
    {
      "label": {
        "zh": "售后",
        "en": "After-Sales",
        "id": "Purnajual"
      },
      "title": {
        "zh": "售后服务",
        "en": "After-Sales Service",
        "id": "Layanan Purnajual"
      },
      "text": {
        "zh": "及时响应，持续提供专业支持",
        "en": "Responsive service and ongoing professional support.",
        "id": "Layanan responsif dan dukungan profesional berkelanjutan."
      }
    },
    {
      "label": {
        "zh": "产品",
        "en": "Products",
        "id": "Produk"
      },
      "title": {
        "zh": "资料下载",
        "en": "Downloads",
        "id": "Unduhan"
      },
      "text": {
        "zh": "获取产品手册与技术资料",
        "en": "Access product catalogues and technical documents.",
        "id": "Akses katalog produk dan dokumen teknis."
      }
    }
  ],

  /* 7) 企业画廊 */
  "gallery": [
    {
      "image": "/assets/仓库现货.png",
      "size": "wide",
      "title": {
        "zh": "仓库现货",
        "en": "Warehouse Stock",
        "id": "Stok Gudang"
      }
    },
    {
      "image": "/assets/安装服务.png",
      "size": "tall",
      "title": {
        "zh": "安装服务",
        "en": "Installation Services",
        "id": "Layanan Instalasi"
      }
    },
    {
      "image": "/assets/售后维修.png",
      "size": "normal",
      "title": {
        "zh": "售后维修",
        "en": "After-Sales Maintenance",
        "id": "Perawatan Purnajual"
      }
    },
    {
      "image": "/assets/配送服务.png",
      "size": "normal",
      "title": {
        "zh": "配送服务",
        "en": "Delivery Services",
        "id": "Layanan Pengiriman"
      }
    },
    {
      "image": "/assets/展会宣传.jpg",
      "size": "normal",
      "title": {
        "zh": "展会宣传",
        "en": "Trade Show Promotion",
        "id": "Promosi Pameran"
      }
    }
  ],

  /* 8) 常见问题（同时写进 FAQ 结构化数据和 llms.txt） */
  "faq": {
    "eyebrow": {
      "zh": "常见问题",
      "en": "FAQ",
      "id": "PERTANYAAN UMUM"
    },
    "title": {
      "zh": "关于印尼铜管<br>你可能想问的",
      "en": "Questions About Copper Tubes<br>in Indonesia",
      "id": "Pertanyaan Tentang Pipa Tembaga<br>di Indonesia"
    },
    "text": {
      "zh": "库存、规格、配套和交期，都可以直接问我们；下面先整理最常见的几项。",
      "en": "Stock, sizes, matching accessories and lead time — ask us directly. Here are the questions we hear most often.",
      "id": "Stok, ukuran, aksesori pendukung, dan waktu kirim—tanyakan langsung kepada kami. Berikut pertanyaan yang paling sering kami terima."
    },
    "items": [
      {
        "q": {
          "zh": "你们在印尼主要供应哪些产品？",
          "en": "What products do you supply in Indonesia?",
          "id": "Produk apa saja yang Anda sediakan di Indonesia?"
        },
        "a": {
          "zh": "我们常备海亮铜盘管、铜直管、保温铜管、蚊香盘管、分支管、铜直接、铜弯头、铜三通等铜管与铜配件，也供应保温材料、PU 风板、辅材和 R22、R32、R410A、R134A 等制冷剂。具体规格和库存请咨询我们的销售团队。",
          "en": "We keep Hailiang copper pancake coils, straight copper tubes, insulated copper tubes, branch pipes, straight connectors, elbows and tees in stock, together with insulation materials, PU duct panels, accessories and refrigerants such as R22, R32, R410A and R134A. Please contact our sales team for current sizes and stock.",
          "id": "Kami menyediakan stok koil tembaga Hailiang, pipa tembaga lurus, pipa tembaga berinsulasi, pipa cabang, sambungan lurus, siku, dan tee, serta material insulasi, panel saluran udara PU, aksesori, dan refrigeran seperti R22, R32, R410A, dan R134A. Hubungi tim penjualan kami untuk ukuran dan stok terkini."
        }
      },
      {
        "q": {
          "zh": "铜管常用规格有哪些？",
          "en": "What copper tube sizes are commonly available?",
          "id": "Ukuran pipa tembaga apa yang umum tersedia?"
        },
        "a": {
          "zh": "空调和制冷行业常用铜管规格包括：1/4 英寸、3/8 英寸、1/2 英寸、5/8 英寸、3/4 英寸、7/8 英寸、1 英寸、1-1/8 英寸、1-1/4 英寸、1-3/8 英寸、1-1/2 英寸、1-5/8 英寸、1-3/4 英寸。分为盘管和直管，壁厚可根据使用压力和项目要求选择。告诉我们您的项目需求和数量，我们可以为您匹配合适的规格。",
          "en": "Common copper tube sizes used in air-conditioning and refrigeration include 1/4\", 3/8\", 1/2\", 5/8\", 3/4\", 7/8\", 1\", 1-1/8\", 1-1/4\", 1-3/8\", 1-1/2\", 1-5/8\" and 1-3/4\". They are supplied as pancake coils or straight lengths, and wall thickness can be selected according to working pressure and project requirements. Tell us your project requirements and quantity, and we will help match the right sizes.",
          "id": "Ukuran pipa tembaga yang umum digunakan untuk AC dan refrigerasi meliputi 1/4 inci, 3/8 inci, 1/2 inci, 5/8 inci, 3/4 inci, 7/8 inci, 1 inci, 1-1/8 inci, 1-1/4 inci, 1-3/8 inci, 1-1/2 inci, 1-5/8 inci, dan 1-3/4 inci. Tersedia dalam bentuk koil atau batang lurus, dengan ketebalan dinding yang dapat disesuaikan dengan tekanan kerja dan kebutuhan proyek. Beri tahu kami kebutuhan proyek dan jumlahnya, kami akan membantu mencocokkan ukuran yang tepat."
        }
      },
      {
        "q": {
          "zh": "分支管（分歧管）怎么选？",
          "en": "How do I choose a branch pipe?",
          "id": "Bagaimana memilih pipa cabang?"
        },
        "a": {
          "zh": "分支管按室内机数量、单机冷量和主管/支管管径来选。多联机系统建议按厂家冷量表和管径表匹配，避免支管过细导致冷量不足。我们可以根据你的系统图和室内机清单协助选型。",
          "en": "Branch pipes are selected by the number of indoor units, each unit's capacity and the main/branch pipe diameters. For multi-split systems, match them against the manufacturer's capacity and pipe-size tables so the branch line is not undersized. We can help select the right model from your system drawing and indoor-unit list.",
          "id": "Pipa cabang dipilih berdasarkan jumlah unit indoor, kapasitas tiap unit, serta diameter pipa utama dan pipa cabang. Untuk sistem multi-split, cocokkan dengan tabel kapasitas dan ukuran pipa dari pabrikan agar pipa cabang tidak terlalu kecil. Kami dapat membantu memilih model yang tepat berdasarkan gambar sistem dan daftar unit indoor Anda."
        }
      },
      {
        "q": {
          "zh": "有现货吗？多久能发货？",
          "en": "Do you keep stock, and how fast can you deliver?",
          "id": "Apakah ada stok dan berapa lama pengirimannya?"
        },
        "a": {
          "zh": "我们在印尼设有仓库，常备常用规格的铜管、保温材料和制冷剂。现货一般可在确认订单后尽快安排出库，具体交期取决于规格、数量和配送地区，下单前请与销售确认。",
          "en": "We hold stock of popular copper tube sizes, insulation materials and refrigerants in our Indonesian warehouse. In-stock items can usually be released soon after order confirmation; the exact lead time depends on size, quantity and delivery area, so please confirm with our sales team before ordering.",
          "id": "Kami menyimpan stok ukuran pipa tembaga, material insulasi, dan refrigeran yang populer di gudang kami di Indonesia. Barang yang tersedia biasanya dapat dikeluarkan segera setelah konfirmasi pesanan; waktu pengiriman tepatnya bergantung pada ukuran, jumlah, dan wilayah pengiriman, jadi konfirmasikan dengan tim penjualan sebelum memesan."
        }
      },
      {
        "q": {
          "zh": "铜管和保温管怎么配套？",
          "en": "How do I match insulation with copper tubes?",
          "id": "Bagaimana menyesuaikan insulasi dengan pipa tembaga?"
        },
        "a": {
          "zh": "保温管内径要与铜管外径匹配，例如 9.52 mm 铜管配对应内径的保温管；保温层厚度按环境温度、湿度和是否防结露来选择。需要成套配货时，把铜管规格清单发给我们即可。",
          "en": "The insulation's inner diameter should match the copper tube's outside diameter — for example, a 9.52 mm tube needs the matching insulation size. Insulation thickness depends on ambient temperature, humidity and condensation risk. Send us your copper tube list and we will quote a complete set.",
          "id": "Diameter dalam insulasi harus sesuai dengan diameter luar pipa tembaga—misalnya pipa 9,52 mm memerlukan ukuran insulasi yang sesuai. Ketebalan insulasi bergantung pada suhu lingkungan, kelembapan, dan risiko kondensasi. Kirimkan daftar pipa tembaga Anda dan kami akan menyiapkan satu set lengkap."
        }
      },
      {
        "q": {
          "zh": "可以配送到印尼各地吗？支持哪些语言？",
          "en": "Can you deliver across Indonesia, and which languages do you support?",
          "id": "Apakah bisa kirim ke seluruh Indonesia, dan bahasa apa yang didukung?"
        },
        "a": {
          "zh": "可以按项目地址安排配送，具体运费和时效以下单时确认。我们的团队可以用中文、英文和印尼语沟通，WhatsApp 和微信都可以联系。",
          "en": "We can arrange delivery to your project address; freight cost and lead time are confirmed when you order. Our team communicates in Chinese, English and Indonesian via WhatsApp or WeChat.",
          "id": "Kami dapat mengatur pengiriman ke alamat proyek Anda; biaya dan waktu kirim dikonfirmasi saat pemesanan. Tim kami dapat berkomunikasi dalam bahasa Mandarin, Inggris, dan Indonesia melalui WhatsApp atau WeChat."
        }
      },
      {
        "q": {
          "zh": "億淼寰宇的产品品质怎么确认？",
          "en": "How can I verify the quality of YIMIAO HUANYU products?",
          "id": "Bagaimana cara memastikan kualitas produk YIMIAO HUANYU?"
        },
        "a": {
          "zh": "我们经营的产品均来自正规采购渠道，到货会核对规格、包装和批次信息。需要技术资料或质量文件时，可以在下单前告诉我们具体型号和用途，我们会提供可提供的资料。",
          "en": "All products we supply come through regular purchasing channels, and we check specifications, packaging and batch information on arrival. If you need technical data or quality documents, tell us the model and application before ordering, and we will provide the documents available for the actual batch.",
          "id": "Semua produk yang kami sediakan diperoleh melalui saluran pembelian resmi, dan kami memeriksa spesifikasi, kemasan, serta informasi batch saat barang tiba. Jika Anda memerlukan data teknis atau dokumen kualitas, beri tahu kami model dan penggunaannya sebelum memesan, dan kami akan menyediakan dokumen yang tersedia untuk batch tersebut."
        }
      }
    ]
  },

  /* 9) 页脚热门搜索，href 写 #product-01 或 #products / #contact */
  "hotSearches": [
    {
      "label": {
        "zh": "印尼铜管",
        "en": "Copper tube Indonesia",
        "id": "Pipa tembaga Indonesia"
      },
      "href": "#products"
    },
    {
      "label": {
        "zh": "海亮铜管",
        "en": "Hailiang copper tube",
        "id": "Pipa Hailiang"
      },
      "href": "#product-01"
    },
    {
      "label": {
        "zh": "分支管",
        "en": "Branch pipe",
        "id": "Pipa cabang"
      },
      "href": "#product-05"
    },
    {
      "label": {
        "zh": "海亮铜直管",
        "en": "Straight copper tube",
        "id": "Pipa tembaga lurus"
      },
      "href": "#product-02"
    },
    {
      "label": {
        "zh": "保温铜管",
        "en": "Insulated copper tube",
        "id": "Pipa tembaga berinsulasi"
      },
      "href": "#product-03"
    },
    {
      "label": {
        "zh": "保温材料",
        "en": "Insulation materials",
        "id": "Material insulasi"
      },
      "href": "#product-11"
    },
    {
      "label": {
        "zh": "PU 风板",
        "en": "PU duct panel",
        "id": "Panel PU"
      },
      "href": "#product-14"
    },
    {
      "label": {
        "zh": "R32 制冷剂",
        "en": "R32 refrigerant",
        "id": "Refrigeran R32"
      },
      "href": "#product-27"
    }
  ],

  /* 10) 联系方式 */
  "contactMainLink": "mailto:yimiaohuanyu@gmail.com",

  /* WhatsApp 与微信二维码 */
  "contactLinks": [
    {
      "type": "link",
      "icon": "↗",
      "url": "https://wa.me/6281110086666",
      "label": {
        "zh": "WhatsApp（Andy）",
        "en": "WhatsApp (Andy)",
        "id": "WhatsApp (Andy)"
      },
      "note": {
        "zh": "+62 811-1008-6666",
        "en": "+62 811-1008-6666",
        "id": "+62 811-1008-6666"
      }
    },
    {
      "type": "qr",
      "image": "/assets/wechat-andy.png",
      "label": {
        "zh": "Andy 微信",
        "en": "Andy WeChat",
        "id": "WeChat Andy"
      },
      "note": {
        "zh": "扫码添加 Andy",
        "en": "Scan to add Andy",
        "id": "Pindai untuk menambahkan Andy"
      }
    },
    {
      "type": "link",
      "icon": "↗",
      "url": "https://wa.me/6281110087777",
      "label": {
        "zh": "WhatsApp（Jack）",
        "en": "WhatsApp (Jack)",
        "id": "WhatsApp (Jack)"
      },
      "note": {
        "zh": "+62 811-1008-7777",
        "en": "+62 811-1008-7777",
        "id": "+62 811-1008-7777"
      }
    },
    {
      "type": "qr",
      "image": "/assets/wechat-jack.png",
      "label": {
        "zh": "Jack 微信",
        "en": "Jack WeChat",
        "id": "WeChat Jack"
      },
      "note": {
        "zh": "扫码添加 Jack",
        "en": "Scan to add Jack",
        "id": "Pindai untuk menambahkan Jack"
      }
    }
  ],

  /* 11) 三语界面文字。中文是基准，英文/印尼语必须同步。 */
  "locales": {
    "zh": {
      "utility": {
        "tagline": "冷暖材料 · 億淼寰宇",
        "sustainability": "可持续发展",
        "careers": "人才招聘",
        "contact": "联系我们"
      },
      "nav": {
        "about": "关于我们",
        "products": "产品中心",
        "solutions": "解决方案",
        "support": "服务支持",
        "contact": "联系我们"
      },
      "actions": {
        "learnMore": "了解更多",
        "discover": "探索我们的故事",
        "productInquiry": "产品咨询",
        "contactUs": "联系我们",
        "backTop": "回到顶部 ↑"
      },
      "hero": {
        "eyebrow": "合作 · 共赢",
        "title": "印尼充足库存<br>冷暖辅材一站式供应",
        "text": "为印尼伙伴提供更可靠、更省心的材料供应方案"
      },
      "about": {
        "title": "要做印尼最全面的<br>冷暖辅材供应商",
        "text": "億淼寰宇是印尼的冷暖辅材供应商之一，以庞大的库存储备和专业的服务为基础。我们致力于将优质制冷材料与品牌价值带给更多印尼用户。我们提供现货供应、产品选型和采购服务。让用户买得放心、用的省心。"
      },
      "vision": {
        "eyebrow": "OUR VISION",
        "title": "成为您在印尼的<br>冷暖辅材仓库"
      },
      "products": {
        "title": "覆盖多场景的<br>产品体系",
        "categories": {
          "all": "全部",
          "tube": "铜管系列",
          "rod": "铜配件系列",
          "foil": "保温系列",
          "aluminum": "PU系列",
          "custom": "制冷剂系列"
        }
      },
      "solutions": {
        "title": "以专业方案<br>连接每一种需求",
        "text": "从产品设计到技术服务，我们深入理解行业应用，为客户创造长期价值。"
      },
      "support": {
        "title": "全程服务<br>让合作更简单"
      },
      "gallery": {
        "title": "企业画廊"
      },
      "contact": {
        "title": "让我们<br>开启对话",
        "text": "欢迎通过以下方式与我们联系。"
      },
      "labels": {
        "scrollToExplore": "向下探索",
        "aboutEyebrow": "关于我们",
        "visionVertical": "一站式 · 轻松省心",
        "productsEyebrow": "产品中心",
        "solutionsEyebrow": "解决方案",
        "supportEyebrow": "服务支持",
        "galleryEyebrow": "企业画廊",
        "contactEyebrow": "联系我们",
        "languageSelector": "语言选择",
        "menu": "打开菜单",
        "detailEyebrow": "详情介绍",
        "moreAbout": "了解更多：",
        "enlargeQr": "点击放大二维码",
        "closeQr": "关闭二维码",
        "closeQrHint": "点击外部区域或按 Esc 键关闭",
        "close": "关闭",
        "defaultDetailText": "了解更多产品信息、技术参数及适用场景，欢迎联系我们获取详细资料。",
        "qrDialog": "二维码放大预览",
        "hotSearches": "热门搜索",
        "qrGeneric": "二维码"
      }
    },
    "en": {
      "utility": {
        "tagline": "HVAC MATERIALS · YIMIAO HUANYU",
        "sustainability": "Sustainability",
        "careers": "Careers",
        "contact": "Contact"
      },
      "nav": {
        "about": "About Us",
        "products": "Products",
        "solutions": "Solutions",
        "support": "Support",
        "contact": "Contact"
      },
      "actions": {
        "learnMore": "Learn more",
        "discover": "Discover our story",
        "productInquiry": "Product inquiry",
        "contactUs": "Contact us",
        "backTop": "Back to top ↑"
      },
      "hero": {
        "eyebrow": "PARTNERSHIP · SHARED SUCCESS",
        "title": "One-Stop HVAC<br>Materials Supply in Indonesia",
        "text": "Reliable, convenient material supply solutions for our partners across Indonesia."
      },
      "about": {
        "title": "Aiming to Be Indonesia's Most Comprehensive HVAC Materials Supplier",
        "text": "YIMIAO HUANYU is one of Indonesia's HVAC materials suppliers, backed by large warehouse stock and professional service. We are committed to bringing quality refrigeration materials and brand value to more Indonesian customers. We provide ready stock, product selection support and purchasing services, so customers can buy with confidence and use with peace of mind."
      },
      "vision": {
        "eyebrow": "OUR VISION",
        "title": "Your HVAC Materials<br>Warehouse in Indonesia"
      },
      "products": {
        "title": "A Complete Product Range<br>for HVAC Applications",
        "categories": {
          "all": "All Products",
          "tube": "Copper Tube Series",
          "rod": "Copper Fittings",
          "foil": "Insulation Series",
          "aluminum": "PU Series",
          "custom": "Refrigerants"
        }
      },
      "solutions": {
        "title": "Professional Solutions<br>for Every Requirement",
        "text": "From product selection to technical support, we understand HVAC applications and help customers create lasting value."
      },
      "support": {
        "title": "End-to-End Support<br>for Easier Cooperation"
      },
      "gallery": {
        "title": "Company Gallery"
      },
      "contact": {
        "title": "Let's Start a Conversation",
        "text": "Please contact us through any of the channels below."
      },
      "labels": {
        "scrollToExplore": "SCROLL TO EXPLORE",
        "aboutEyebrow": "ABOUT US",
        "visionVertical": "INNOVATION · IN MOTION",
        "productsEyebrow": "PRODUCTS",
        "solutionsEyebrow": "SOLUTIONS",
        "supportEyebrow": "SERVICE SUPPORT",
        "galleryEyebrow": "OUR WORLD",
        "contactEyebrow": "CONTACT US",
        "languageSelector": "Language selector",
        "menu": "Open menu",
        "detailEyebrow": "DETAILS",
        "moreAbout": "Learn more about:",
        "enlargeQr": "Enlarge QR code",
        "closeQr": "Close QR code",
        "closeQrHint": "Click outside or press Esc to close",
        "close": "Close",
        "defaultDetailText": "Learn more about product information, technical specifications and applications. Contact us for details.",
        "qrDialog": "Enlarged QR code preview",
        "hotSearches": "Popular searches",
        "qrGeneric": "QR code"
      }
    },
    "id": {
      "utility": {
        "tagline": "MATERIAL HVAC · YIMIAO HUANYU",
        "sustainability": "Keberlanjutan",
        "careers": "Karier",
        "contact": "Hubungi Kami"
      },
      "nav": {
        "about": "Tentang Kami",
        "products": "Produk",
        "solutions": "Solusi",
        "support": "Layanan",
        "contact": "Kontak"
      },
      "actions": {
        "learnMore": "Selengkapnya",
        "discover": "Temukan cerita kami",
        "productInquiry": "Konsultasi produk",
        "contactUs": "Hubungi kami",
        "backTop": "Kembali ke atas ↑"
      },
      "hero": {
        "eyebrow": "KEMITRAAN · TUMBUH BERSAMA",
        "title": "Penyediaan Material HVAC<br>Satu Pintu di Indonesia",
        "text": "Solusi pasokan material yang andal dan praktis bagi mitra kami di seluruh Indonesia."
      },
      "about": {
        "title": "Berupaya Menjadi Supplier Material HVAC Paling Lengkap di Indonesia",
        "text": "YIMIAO HUANYU adalah salah satu supplier material HVAC di Indonesia, dengan dukungan stok gudang yang besar dan layanan profesional. Kami berkomitmen menghadirkan material refrigerasi berkualitas dan nilai merek bagi lebih banyak pelanggan di Indonesia. Kami menyediakan stok siap kirim, bantuan pemilihan produk, dan layanan pengadaan, sehingga pelanggan dapat membeli dengan yakin dan menggunakan produk dengan tenang."
      },
      "vision": {
        "eyebrow": "VISI KAMI",
        "title": "Gudang Material HVAC Anda<br>di Indonesia"
      },
      "products": {
        "title": "Rangkaian Produk Lengkap<br>untuk Kebutuhan HVAC",
        "categories": {
          "all": "Semua Produk",
          "tube": "Seri Pipa Tembaga",
          "rod": "Fitting Tembaga",
          "foil": "Seri Insulasi",
          "aluminum": "Seri PU",
          "custom": "Refrigeran"
        }
      },
      "solutions": {
        "title": "Solusi Profesional<br>untuk Setiap Kebutuhan",
        "text": "Dari pemilihan produk hingga dukungan teknis, kami memahami aplikasi HVAC dan membantu pelanggan menciptakan nilai jangka panjang."
      },
      "support": {
        "title": "Dukungan Menyeluruh<br>untuk Kerja Sama yang Mudah"
      },
      "gallery": {
        "title": "Galeri Perusahaan"
      },
      "contact": {
        "title": "Mari Mulai Percakapan",
        "text": "Silakan hubungi kami melalui salah satu saluran di bawah ini."
      },
      "labels": {
        "scrollToExplore": "GULIR UNTUK MENJELAJAHI",
        "aboutEyebrow": "TENTANG KAMI",
        "visionVertical": "INOVASI · TERUS BERGERAK",
        "productsEyebrow": "PRODUK",
        "solutionsEyebrow": "SOLUSI",
        "supportEyebrow": "DUKUNGAN LAYANAN",
        "galleryEyebrow": "GALERI KAMI",
        "contactEyebrow": "HUBUNGI KAMI",
        "languageSelector": "Pilihan bahasa",
        "menu": "Buka menu",
        "detailEyebrow": "INFORMASI",
        "moreAbout": "Pelajari lebih lanjut tentang:",
        "enlargeQr": "Perbesar kode QR",
        "closeQr": "Tutup kode QR",
        "closeQrHint": "Klik di luar atau tekan Esc untuk menutup",
        "close": "Tutup",
        "defaultDetailText": "Pelajari informasi produk, spesifikasi teknis, dan aplikasinya. Hubungi kami untuk informasi lebih lanjut.",
        "qrDialog": "Pratinjau kode QR yang diperbesar",
        "hotSearches": "Pencarian populer",
        "qrGeneric": "Kode QR"
      }
    }
  }
};
