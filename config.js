/**
 * ╔══════════════════════════════════════════════════════╗
 * ║         芯灵科技官网 — 运营内容配置文件                  ║
 * ║  修改此文件即可更新网站内容，无需改动 index.html           ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * 使用说明：
 *  1. 修改对应字段的 zh（中文）或 en（英文）值
 *  2. 图片请放入 images/ 对应子目录，然后修改路径
 *  3. 增加产品/新闻/场景：在数组中复制一条填入新数据即可
 *  4. 保存后刷新浏览器即可生效
 */

const SITE_CONFIG = {

  /* ─────────────────────────────────────────────────────
   *  网站基本信息
   * ───────────────────────────────────────────────────── */
  site: {
    name:      { zh: "芯灵科技",    en: "XinLing Technology" },
    fullName:  { zh: "深圳市智汇芯灵科技有限公司", en: "ZhiHui XinLing Technology Co., Ltd." },
    slogan:    { zh: "驱动智能未来", en: "Powering the Intelligent Future" },
    icp:       "粤ICP备XXXXXXXX号",
    copyright: "2024",
    email:     "contact@xinling-tech.com",
    phone:     "400-XXX-XXXX",
    address:   { zh: "广东省深圳市南山区科技园", en: "Science Park, Nanshan, Shenzhen, China" }
  },

  /* ─────────────────────────────────────────────────────
   *  导航菜单
   * ───────────────────────────────────────────────────── */
  nav: [
    { zh: "产品",     en: "Products",    href: "#products"  },
    { zh: "解决方案", en: "Solutions",   href: "#scenarios" },
    { zh: "技术实力", en: "Technology",  href: "#stats"     },
    { zh: "新闻动态", en: "News",        href: "#news"      },
    { zh: "关于我们", en: "About",       href: "#footer"    }
  ],

  /* ─────────────────────────────────────────────────────
   *  首屏英雄区
   *  bgImage: 建议尺寸 1920×1080px，WebP/JPG 均可
   * ───────────────────────────────────────────────────── */
  hero: {
    bgImage:  "images/hero/hero-bg.jpg",
    slogan:   { zh: "驱动智能未来",                    en: "Powering the Intelligent Future"          },
    subTitle: { zh: "全栈 AI 芯片解决方案，从边缘到云端", en: "Full-stack AI chip solutions, edge to cloud" },
    ctaText:  { zh: "探索产品",  en: "Explore Products" },
    ctaLink:  "#products",
    ctaText2: { zh: "了解更多",  en: "Learn More"       },
    ctaLink2: "#stats"
  },

  /* ─────────────────────────────────────────────────────
   *  核心产品列表
   *  image: 建议尺寸 800×600px
   *  tags: 最多显示 4 个标签
   * ───────────────────────────────────────────────────── */
  products: [
    {
      name:  { zh: "XL-9000 旗舰AI芯片",    en: "XL-9000 Flagship AI Chip"   },
      image: "images/products/xl-9000.jpg",
      tags:  { zh: ["3nm制程", "1000 TOPS", "低功耗", "数据中心"],
               en: ["3nm Process", "1000 TOPS", "Low Power", "Data Center"] },
      desc:  { zh: "面向超大规模数据中心的旗舰AI推理芯片，业界领先的能效比，支持千亿参数大模型推理加速。",
               en: "Flagship AI inference chip for hyperscale data centers, with industry-leading energy efficiency and support for 100B+ parameter LLM inference." },
      link: "#"
    },
    {
      name:  { zh: "XL-7000 边缘AI芯片",    en: "XL-7000 Edge AI Chip"       },
      image: "images/products/xl-7000.jpg",
      tags:  { zh: ["5nm制程", "200 TOPS", "超低功耗", "边缘计算"],
               en: ["5nm Process", "200 TOPS", "Ultra-low Power", "Edge AI"] },
      desc:  { zh: "专为边缘智能设备设计，在极低功耗下实现高性能本地AI推理，适用于智能摄像、机器人等场景。",
               en: "Designed for edge intelligent devices, achieving high-performance local AI inference at ultra-low power for smart cameras, robotics, etc." },
      link: "#"
    },
    {
      name:  { zh: "XL-5000 车规AI芯片",    en: "XL-5000 Automotive AI Chip" },
      image: "images/products/xl-5000.jpg",
      tags:  { zh: ["7nm制程", "500 TOPS", "车规级", "自动驾驶"],
               en: ["7nm Process", "500 TOPS", "AEC-Q100", "Autonomous Driving"] },
      desc:  { zh: "通过 AEC-Q100 车规认证，专为 L2+ 至 L4 级自动驾驶打造，满足最高安全等级 ASIL-D 要求。",
               en: "AEC-Q100 certified, designed for L2+ to L4 autonomous driving with ASIL-D functional safety compliance." },
      link: "#"
    },
    {
      name:  { zh: "XL-3000 工业AI芯片",    en: "XL-3000 Industrial AI Chip" },
      image: "images/products/xl-3000.jpg",
      tags:  { zh: ["14nm制程", "80 TOPS", "宽温域", "工业级"],
               en: ["14nm Process", "80 TOPS", "Wide Temp", "Industrial"] },
      desc:  { zh: "工业级宽温设计，适用于工厂自动化、智能检测、工业机器人等严苛环境下的AI推理需求。",
               en: "Industrial-grade wide-temperature design for factory automation, smart inspection, and industrial robots in harsh environments." },
      link: "#"
    }
  ],

  /* ─────────────────────────────────────────────────────
   *  技术指标数据
   *  value: 显示数字（纯数字会有滚动动效，含汉字不滚动）
   *  unit:  单位文字
   * ───────────────────────────────────────────────────── */
  stats: [
    { icon: "⚡", value: "1000", unit: "TOPS", label: { zh: "峰值AI算力",   en: "Peak AI Compute"  } },
    { icon: "🔬", value: "3",    unit: "nm",   label: { zh: "最先进制程节点", en: "Leading Process"  } },
    { icon: "📦", value: "500",  unit: "M+",   label: { zh: "全球累计出货",  en: "Chips Shipped"    } },
    { icon: "🏢", value: "300",  unit: "+",    label: { zh: "全球合作客户",  en: "Global Clients"   } },
    { icon: "🌍", value: "40",   unit: "+",    label: { zh: "覆盖国家与地区", en: "Countries Served" } },
    { icon: "🏆", value: "120",  unit: "+",    label: { zh: "技术专利",      en: "Patents"          } }
  ],

  /* ─────────────────────────────────────────────────────
   *  应用场景
   *  image: 建议尺寸 1200×750px
   * ───────────────────────────────────────────────────── */
  scenarios: [
    {
      icon:  "🤖",
      name:  { zh: "AI 大模型",   en: "AI Foundation Models" },
      image: "images/scenarios/ai.jpg",
      desc:  { zh: "为 GPT、LLaMA、文心一言等千亿参数大模型的训练与推理提供极致算力支撑，单卡算力达 1000 TOPS，显著降低大模型部署成本。",
               en: "Delivering extreme compute for training and inference of 100B+ parameter foundation models like GPT and LLaMA. Single-card performance reaches 1000 TOPS, significantly reducing deployment costs." }
    },
    {
      icon:  "🚗",
      name:  { zh: "自动驾驶",    en: "Autonomous Driving"   },
      image: "images/scenarios/autonomous.jpg",
      desc:  { zh: "支持 L2+ 至 L4 级自动驾驶方案，融合视觉、雷达、激光雷达多传感器数据，实时完成环境感知、目标检测与路径规划。",
               en: "Supporting L2+ to L4 autonomous driving solutions with multi-sensor fusion of camera, radar, and LiDAR data for real-time perception, object detection, and path planning." }
    },
    {
      icon:  "🖥️",
      name:  { zh: "数据中心",    en: "Data Center"          },
      image: "images/scenarios/datacenter.jpg",
      desc:  { zh: "为云计算、大数据分析、科学计算等超大规模数据中心提供高性能、高能效的异构计算加速方案，支持主流 AI 框架。",
               en: "Providing high-performance, energy-efficient heterogeneous compute acceleration for hyperscale data centers, big data analytics, and scientific computing with support for mainstream AI frameworks." }
    },
    {
      icon:  "📱",
      name:  { zh: "智能终端",    en: "Smart Devices"        },
      image: "images/scenarios/terminal.jpg",
      desc:  { zh: "赋能智能手机、平板、智能音箱、AR/VR 设备等消费终端，在本地完成人脸识别、语音交互、内容推荐等 AI 任务，保护用户隐私。",
               en: "Empowering smartphones, tablets, smart speakers, and AR/VR devices to perform face recognition, voice interaction, and content recommendation locally for enhanced privacy." }
    },
    {
      icon:  "🏭",
      name:  { zh: "工业互联网",  en: "Industrial IoT"       },
      image: "images/scenarios/industrial.jpg",
      desc:  { zh: "应用于工厂质量检测、预测性维护、柔性制造等工业场景，结合边缘 AI 芯片实现毫秒级实时推理，提升生产效率与良品率。",
               en: "Applied in factory quality inspection, predictive maintenance, and flexible manufacturing, combining edge AI chips for millisecond real-time inference to improve production efficiency." }
    }
  ],

  /* ─────────────────────────────────────────────────────
   *  新闻动态
   *  cover: 建议尺寸 600×400px
   * ───────────────────────────────────────────────────── */
  news: [
    {
      cover:   "images/news/news1.jpg",
      tag:     { zh: "产品发布", en: "Product Launch" },
      title:   { zh: "芯灵发布旗舰 XL-9000 AI芯片，算力突破 1000 TOPS",
                 en: "XinLing Launches Flagship XL-9000 AI Chip with 1000 TOPS Breakthrough" },
      date:    "2026-06-18",
      summary: { zh: "芯灵科技正式发布基于 3nm 制程的旗舰级 AI 推理芯片 XL-9000，在数据中心 AI 推理场景中实现了算力与能效的全面领先。",
                 en: "XinLing officially launches the XL-9000 flagship AI inference chip based on 3nm process, achieving comprehensive leadership in compute performance and energy efficiency." },
      link: "#"
    },
    {
      cover:   "images/news/news2.jpg",
      tag:     { zh: "合作动态", en: "Partnership" },
      title:   { zh: "芯灵科技与国内头部车企达成战略合作，共推L4级自动驾驶量产",
                 en: "XinLing Partners with Leading Automaker to Accelerate L4 Autonomous Driving Mass Production" },
      date:    "2026-05-30",
      summary: { zh: "双方将在车规 AI 芯片研发、自动驾驶域控制器及整车方案三个层面深入合作，目标于 2027 年实现 L4 级自动驾驶方案量产落地。",
                 en: "Both parties will collaborate on automotive AI chip R&D, domain controllers, and full-vehicle solutions, targeting L4 autonomous driving mass production by 2027." },
      link: "#"
    },
    {
      cover:   "images/news/news3.jpg",
      tag:     { zh: "技术成果", en: "Technology" },
      title:   { zh: "芯灵 AI 芯片荣获 2026 年度「最佳创新芯片」大奖",
                 en: "XinLing AI Chip Wins '2026 Best Innovative Chip' Award" },
      date:    "2026-05-10",
      summary: { zh: "在2026国际半导体峰会上，芯灵XL-7000边缘AI芯片凭借超低功耗与超高算力密度，荣获评审委员会颁发的年度最佳创新芯片大奖。",
                 en: "At the 2026 International Semiconductor Summit, XinLing's XL-7000 edge AI chip won the annual Best Innovative Chip award for its ultra-low power and ultra-high compute density." },
      link: "#"
    },
    {
      cover:   "images/news/news4.jpg",
      tag:     { zh: "公司动态", en: "Company News" },
      title:   { zh: "芯灵科技完成 C 轮融资，融资金额超 20 亿元",
                 en: "XinLing Completes Series C Funding Round Exceeding RMB 2 Billion" },
      date:    "2026-04-22",
      summary: { zh: "本轮融资由知名产业资本领投，募集资金将主要用于下一代 2nm AI 芯片研发及全球市场拓展。",
                 en: "This round was led by a prominent industrial fund. Proceeds will be used for next-generation 2nm AI chip R&D and global market expansion." },
      link: "#"
    }
  ],

  /* ─────────────────────────────────────────────────────
   *  合作伙伴 Logo
   *  logo: 建议尺寸 200×80px，PNG/SVG 透明背景
   *  注意：logo 若无图片则显示公司名称文字作为占位
   * ───────────────────────────────────────────────────── */
  partners: [
    { logo: "images/partners/partner-huawei.png",  name: "华为",       link: "#" },
    { logo: "images/partners/partner-tencent.png", name: "腾讯云",     link: "#" },
    { logo: "images/partners/partner-alibaba.png", name: "阿里云",     link: "#" },
    { logo: "images/partners/partner-baidu.png",   name: "百度智能云", link: "#" },
    { logo: "images/partners/partner-byd.png",     name: "比亚迪",     link: "#" },
    { logo: "images/partners/partner-saic.png",    name: "上汽集团",   link: "#" },
    { logo: "images/partners/partner-foxconn.png", name: "富士康",     link: "#" },
    { logo: "images/partners/partner-hikvision.png", name: "海康威视", link: "#" }
  ]

};
