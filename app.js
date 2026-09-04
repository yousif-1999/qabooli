
const programs=[
 {type:"حكومي",channel:"القبول المركزي",university:"جامعة بغداد",college:"كلية التميز",department:"إدارة الأعمال والتجارة الإلكترونية",branches:["ادبي"],min:85,note:"الدليل يشترط معدل نهائي لا يقل عن 85%، مع نجاح اختبار اللغة الإنكليزية واجتياز المقابلة."},
 {type:"حكومي",channel:"القبول المركزي",university:"جامعة بغداد",college:"كلية التميز",department:"المحاسبة والمصارف",branches:["ادبي"],min:85,note:"الدليل يسمح لخريجي الفرع الأدبي بالتقديم على هذا القسم ضمن كلية التميز، مع الشروط الخاصة بالكلية."},
 {type:"حكومي",channel:"القبول المركزي",university:"جامعة بغداد",college:"كلية التميز",department:"الفلسفة وعلم الاجتماع",branches:["ادبي"],min:85,note:"الدليل يسمح لخريجي الفرع الأدبي بالتقديم على هذا القسم ضمن كلية التميز."},
 {type:"حكومي",channel:"القبول المركزي",university:"جامعة بغداد",college:"كلية التميز",department:"أقسام كلية التميز كافة",branches:["علمي"],min:85,note:"الدليل يذكر أن خريجي الفرع العلمي يحق لهم التقديم على أقسام كلية التميز كافة، مع اختبار اللغة الإنكليزية والمقابلة."},
 {type:"حكومي",channel:"القبول المركزي",university:"جامعة بغداد",college:"كلية الذكاء الاصطناعي",department:"التطبيقات الهندسية",branches:["علمي"],min:85,note:"الدليل يحدد هذه الأقسام لخريجي الفرع العلمي، مع شروط الكلية وآلية التقديم المذكورة فيه."},
 {type:"حكومي",channel:"القبول المركزي",university:"جامعة بغداد",college:"كلية الذكاء الاصطناعي",department:"التطبيقات الطبية الحيوية",branches:["علمي"],min:85,note:"الدليل يحدد هذا القسم لخريجي الفرع العلمي."},
 {type:"حكومي",channel:"القبول المركزي",university:"جامعة بغداد",college:"كلية الذكاء الاصطناعي",department:"البيانات الضخمة",branches:["علمي"],min:85,note:"الدليل يحدد هذا القسم لخريجي الفرع العلمي."},
 {type:"حكومي",channel:"التعليم الحكومي الجامعي الخاص (صباحي)",university:"الجامعات والكليات الحكومية",college:"المجموعة الطبية",department:"الطب / طب الأسنان / الصيدلة",branches:["علمي"],min:90,offset:3,category:"طبي",note:"القناة الصباحية على النفقة الخاصة تشترط استيفاء شروط القبول المركزي، والحد المذكور في الدليل هو فارق 3 درجات عن أدنى قبول كليات المجموعة الطبية على مستوى الجامعات العراقية."},
 {type:"حكومي",channel:"الدراسة المسائية",university:"الجامعات والكليات الحكومية",college:"كليات التمريض",department:"التمريض",branches:["علمي"],min:70,note:"الحد الأدنى المذكور للدراسة المسائية: 70%."},
 {type:"حكومي",channel:"الدراسة المسائية",university:"الجامعات والكليات الحكومية",college:"الطب البيطري",department:"الطب البيطري",branches:["علمي"],min:65,note:"الحد الأدنى المذكور للدراسة المسائية: 65%."},
 {type:"حكومي",channel:"الدراسة المسائية",university:"الجامعات والكليات الحكومية",college:"التقنيات الطبية والصحية",department:"التقنيات الطبية والصحية",branches:["علمي"],min:75,note:"الحد الأدنى المذكور للدراسة المسائية: 75%."},
 {type:"حكومي",channel:"الدراسة المسائية",university:"الجامعات والكليات الحكومية",college:"الهندسة",department:"التخصصات الهندسية",branches:["علمي"],min:65,note:"الحد الأدنى المذكور للدراسة المسائية: 65%."},
 {type:"حكومي",channel:"الدراسة المسائية",university:"الجامعات والكليات الحكومية",college:"التقنيات الهندسية",department:"التقنيات الهندسية",branches:["علمي"],min:60,note:"الحد الأدنى المذكور للدراسة المسائية: 60%."},
 {type:"حكومي",channel:"الدراسة المسائية",university:"الجامعات والكليات الحكومية",college:"العلوم والحاسوب وتكنولوجيا المعلومات",department:"تخصصات العلوم والحاسوب",branches:["علمي"],min:60,note:"الحد الأدنى المذكور للدراسة المسائية: 60%."},
 {type:"حكومي",channel:"الدراسة المسائية",university:"الجامعات والكليات الحكومية",college:"القانون",department:"القانون",branches:["علمي","ادبي"],min:65,note:"الحد الأدنى المذكور للدراسة المسائية: 65%، مع تطبيق تخصصات الدليل وشروط كل جامعة."},
 {type:"حكومي",channel:"الدراسة المسائية",university:"الجامعات والكليات الحكومية",college:"العلوم السياسية والإدارة والاقتصاد",department:"التخصصات ذات الصلة",branches:["علمي","ادبي"],min:60,note:"الحد الأدنى المذكور للدراسة المسائية: 60%."},
 {type:"حكومي",channel:"الدراسة المسائية",university:"الجامعات والكليات الحكومية",college:"باقي التخصصات",department:"تخصصات أخرى",branches:["علمي","ادبي","فنون"],min:58,note:"الحد الأدنى المذكور للدراسة المسائية: 58%."},
 {type:"حكومي",channel:"الدراسة المسائية",university:"الجامعات والكليات الحكومية",college:"التربية البدنية وعلوم الرياضة",department:"التربية البدنية وعلوم الرياضة",branches:["علمي","ادبي","فنون"],minMale:57,minFemale:55,note:"الحد الأدنى المذكور للدراسة المسائية: 57% للذكور و55% للإناث."},
 {type:"حكومي",channel:"القبول المركزي",university:"جميع الجامعات الحكومية",college:"كليات القانون",department:"القانون",branches:["علمي","ادبي"],provinceRule:true,note:"التقديم إلى كليات القانون يقتصر على سكنة المحافظة، ولا يحق للطالب التقديم إلى كلية القانون في جامعة تقع خارج محافظته."},
 {type:"أهلي",channel:"القبول الأهلي",university:"جامعة التراث",college:"كلية طب الأسنان",department:"طب الأسنان",branches:["علمي"],fee:9110000,note:"الدليل الأهلي يسجل القسم ضمن الجامعة ويذكر أجور المرحلة الأولى؛ هذا الإصدار لا يفترض حدًا أدنى غير مذكور صراحةً في الدليل المرفوع."},
 {type:"أهلي",channel:"القبول الأهلي",university:"جامعة التراث",college:"كلية الصيدلة",department:"الصيدلة",branches:["علمي"],fee:8610000,note:"الدليل الأهلي يسجل القسم ويذكر أجور المرحلة الأولى."},
 {type:"أهلي",channel:"القبول الأهلي",university:"جامعة التراث",college:"كلية العلوم",department:"علوم الحاسبات",branches:["علمي"],fee:2010000,note:"الدليل الأهلي يسجل القسم ويذكر أجور المرحلة الأولى."},
 {type:"أهلي",channel:"القبول الأهلي",university:"كلية المنصور الجامعة",college:"كلية الهندسة",department:"هندسة الحاسوب",branches:["علمي"],fee:2100000,note:"القسم وارد في دليل الجامعات والكليات الأهلية 2025–2026."},
 {type:"أهلي",channel:"القبول الأهلي",university:"جامعة الرافدين",college:"كلية القانون",department:"القانون",branches:["علمي","ادبي"],fee:2100000,note:"القسم وارد في دليل الجامعات والكليات الأهلية 2025–2026."},
 {type:"أهلي",channel:"القبول الأهلي",university:"جامعة الرافدين",college:"كلية الإدارة والاقتصاد",department:"العلوم المالية والمصرفية",branches:["علمي","ادبي"],fee:0,note:"القسم وارد في دليل الجامعات والكليات الأهلية 2025–2026؛ الأجور تعتمد على الدراسة والبيانات الواردة في جدول الجامعة."}
];

function q(id){return document.getElementById(id)}
function n(x){return Number(String(x).replace(/[٠-٩۰-۹]/g,d=> "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)>=0?"٠١٢٣٤٥٦٧٨٩".indexOf(d):"۰۱۲۳۴۵۶۷۸۹".indexOf(d)] || d).replace(/,/g,""))||0}
function eligible(p,avg,branch,gender,province){
 if(!p.branches.includes(branch)) return {ok:false,reason:"الفرع الدراسي غير مشمول."};
 if(p.provinceRule && !province) return {ok:false,reason:"يشترط تحديد المحافظة لأن التقديم للقانون مرتبط بسكنة المحافظة."};
 if(p.min!==undefined && avg<p.min) return {ok:false,reason:`المعدل المدخل أقل من الحد المستخدم في هذا السجل (${p.min}%).`};
 if(p.minMale!==undefined && gender==="ذكر" && avg<p.minMale) return {ok:false,reason:`المعدل المدخل أقل من ${p.minMale}% للذكور.`};
 if(p.minFemale!==undefined && gender==="انثى" && avg<p.minFemale) return {ok:false,reason:`المعدل المدخل أقل من ${p.minFemale}% للإناث.`};
 if(p.provinceRule) return {ok:true,reason:"الفرع مستوفٍ. يجب أن تكون الجامعة المختارة داخل محافظتك، وفق نص الدليل."};
 return {ok:true,reason:p.note};
}
function money(x){return x?new Intl.NumberFormat("en-US").format(x)+" د.ع":"غير محدد في هذا السجل"}
q("checkBtn").onclick=()=>{
 const branch=q("branch").value,avg=n(q("average").value),gender=q("gender").value,province=q("province").value;
 if(!avg){alert("أدخل المعدل أولًا.");return;}
 let eligibleRows=[],blocked=0;
 programs.forEach(p=>{const r=eligible(p,avg,branch,gender,province);if(r.ok)eligibleRows.push({...p,reason:r.reason});else blocked++;});
 q("summary").classList.remove("hidden");
 q("summary").innerHTML=[
  `<div class="stat"><b>${eligibleRows.length}</b><span>خيارات مطابقة للمدخلات الحالية</span></div>`,
  `<div class="stat"><b>${eligibleRows.filter(x=>x.type==="حكومي").length}</b><span>حكومي</span></div>`,
  `<div class="stat"><b>${eligibleRows.filter(x=>x.type==="أهلي").length}</b><span>أهلي</span></div>`
 ].join("");
 q("results").classList.remove("hidden");
 q("results").innerHTML=eligibleRows.length?eligibleRows.map(p=>`<article class="result-card"><div class="result-head"><div><div class="result-title">${p.university}</div><div class="result-sub">${p.college} — ${p.department}</div></div><span class="tag ${p.type==="حكومي"?"ok":"warn"}">${p.type} · ${p.channel}</span></div><div class="result-body"><div class="row"><span>الفرع</span><b>${branch}</b></div><div class="row"><span>المعدل المدخل</span><b>${avg.toFixed(2)}%</b></div>${p.min!==undefined?`<div class="row"><span>الحد المستخدم</span><b>${p.min}%</b></div>`:""}${p.fee!==undefined&&p.fee?`<div class="row"><span>أجور المرحلة الأولى</span><b>${money(p.fee)}</b></div>`:""}<div class="reason">${p.reason}</div></div></article>`).join(""):`<article class="result-card"><div class="result-title">لا توجد نتيجة مطابقة في قاعدة البيانات الحالية</div><div class="reason">النسخة الحالية هي الأساس لمحرك القبول. قبل إطلاق التطبيق للطلاب يجب إكمال إدخال جميع البرامج والضوابط والقنوات من الدليلين.</div></article>`;
 window.scrollTo({top:q("results").offsetTop-20,behavior:"smooth"});
};
