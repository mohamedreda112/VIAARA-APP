const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src/locales/en/common.json');
const arPath = path.join(__dirname, 'src/locales/ar/common.json');

const enNew = {
  missionVision: {
    mission: {
      badge: "Our Mission",
      title1: "To deliver cutting-edge software solutions that drive",
      title2: "digital transformation",
      desc: "We are dedicated to improving operational efficiency and empowering businesses to thrive securely and sustainably in a rapidly evolving technology-driven world."
    },
    vision: {
      badge: "Our Vision",
      title1: "To become the",
      title2: "global partner",
      title3: "of choice for technological innovation.",
      desc: "We aim to set new standards of excellence in software engineering, consistently delivering products that redefine industry benchmarks and elevate digital experiences."
    }
  },
  coreValues: {
    badge: "Our DNA",
    title1: "Core",
    title2: "Values",
    desc: "These principles guide our engineering practices, our culture, and how we partner with our clients every single day.",
    items: [
      {
        title: "Innovation",
        desc: "Constantly exploring new technologies and better solutions to keep our clients ahead of the curve."
      },
      {
        title: "Quality",
        desc: "Unwavering commitment to engineering excellence, scalable architectures, and long-term reliability."
      },
      {
        title: "Integrity",
        desc: "Transparent communication, honest timelines, and building trusted partnerships based on mutual respect."
      },
      {
        title: "Agility",
        desc: "Rapid adaptation to changing business requirements and market dynamics without sacrificing quality."
      }
    ]
  }
};

const arNew = {
  missionVision: {
    mission: {
      badge: "مهمتنا",
      title1: "تقديم حلول برمجية متطورة تدفع",
      title2: "التحول الرقمي",
      desc: "نحن ملتزمون بتحسين الكفاءة التشغيلية وتمكين الشركات من الازدهار بأمان واستدامة في عالم سريع التطور تقنياً."
    },
    vision: {
      badge: "رؤيتنا",
      title1: "أن نصبح",
      title2: "الشريك العالمي",
      title3: "المفضل للابتكار التكنولوجي.",
      desc: "نهدف إلى وضع معايير جديدة للتميز في هندسة البرمجيات، وتقديم منتجات تعيد تعريف معايير الصناعة وترتقي بالتجارب الرقمية باستمرار."
    }
  },
  coreValues: {
    badge: "هويتنا",
    title1: "قيمنا",
    title2: "الأساسية",
    desc: "توجه هذه المبادئ ممارساتنا الهندسية وثقافتنا وكيفية شراكتنا مع عملائنا كل يوم.",
    items: [
      {
        title: "الابتكار",
        desc: "استكشاف تقنيات جديدة وحلول أفضل باستمرار لإبقاء عملائنا في الطليعة."
      },
      {
        title: "الجودة",
        desc: "التزام لا يتزعزع بالتميز الهندسي، والبنى القابلة للتوسع، والموثوقية طويلة الأمد."
      },
      {
        title: "النزاهة",
        desc: "تواصل شفاف، وجداول زمنية صادقة، وبناء شراكات موثوقة قائمة على الاحترام المتبادل."
      },
      {
        title: "المرونة",
        desc: "التكيف السريع مع متطلبات العمل المتغيرة وديناميكيات السوق دون المساس بالجودة."
      }
    ]
  }
};

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));

enData.missionVision = enNew.missionVision;
enData.coreValues = enNew.coreValues;
arData.missionVision = arNew.missionVision;
arData.coreValues = arNew.coreValues;

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));
