
const DATA=window.QABOOLI_DATA||{government:[],private:[]};
const G=DATA.government,P=DATA.private;
const state={rows:[],shown:0};
const q=id=>document.getElementById(id);
function num(x){
 const a="٠١٢٣٤٥٦٧٨٩",b="۰۱۲۳۴۵۶۷۸۹";
 return Number([...String(x||"")].map(c=>{let i=a.indexOf(c);if(i>=0)return String(i);i=b.indexOf(c);return i>=0?String(i):c}).join("").replace(/,/g,""))||0;
}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function money(x){return x==null?"غير محدد":new Intl.NumberFormat("en-US").format(x)+" د.ع"}
function bnorm(x){return x==="أحيائي"?"علمي":x}

function governmentRows(branch,avg,gender,study){
 const b=bnorm(branch);
 if(study==="evening"){
   return G.filter(r=>r.branch===b && (r.gender==="مختلط"||!gender||r.gender===gender))
    .map(r=>{
      const er=eveningRule(r.program||r.fullName||"",gender);
      return er && avg>=er.min ? {...r,type:"حكومي",studyType:"مسائي",displayMin:er.min,fee:er.fee,feeLabel:"الحد الأعلى للأجور المسائية",rule:er.rule,rank:avg-er.min}:null;
    }).filter(Boolean);
 }
 return G.filter(r=>{
   if(r.branch!==b)return false;
   if(r.gender==="انثى"&&gender==="ذكر")return false;
   if(r.gender==="ذكر"&&gender==="أنثى")return false;
   return study==="all"||study==="morning";
 }).filter(r=>avg>=r.minRate).map(r=>({...r,type:"حكومي",studyType:"صباحي",displayMin:r.minRate,fee:0,feeLabel:"القسط الدراسي",rule:"القبول الصباحي مجاني",rank:avg-r.minRate}));
}

function eveningRule(name,gender){
 const s=name||"";
 if(/تمريض/.test(s))return {min:70,fee:2500000,rule:"التمريض"};
 if(/تقنيات.*(طبية|صحية)|التحليلات المرضية/.test(s))return {min:75,fee:2250000,rule:"التقنيات الطبية والصحية"};
 if(/طب بيطري|الطب البيطري/.test(s))return {min:65,fee:1750000,rule:"الطب البيطري"};
 if(/هندسة تقنيات|التقنيات الهندسية/.test(s))return {min:60,fee:2000000,rule:"التقنيات الهندسية"};
 if(/هندسة/.test(s))return {min:65,fee:/نفط|العمارة|الطب الحياتي/.test(s)?3000000:2250000,rule:"الهندسة"};
 if(/قانون|حقوق/.test(s))return {min:65,fee:1200000,rule:"القانون"};
 if(/علوم سياسية|إدارة|االدارة|اقتصاد|علوم سياحية|سياحة/.test(s))return {min:60,fee:1200000,rule:"العلوم السياسية والإدارة والاقتصاد"};
 if(/علوم|حاسوب|تكنولوجيا معلومات/.test(s))return {min:60,fee:1500000,rule:"العلوم والحاسوب وتكنولوجيا المعلومات"};
 if(/تربية بدنية|علوم الرياضة/.test(s))return {min:gender==="أنثى"?55:57,fee:900000,rule:"التربية البدنية وعلوم الرياضة"};
 return {min:58,fee:900000,rule:"بقية التخصصات"};
}

function privateRule(dept,branch,study){
 const d=(dept||"").replace(/ـ/g,"").replace(/\s+/g," ").trim(),b=bnorm(branch);
 if(study==="evening"&&/طب عام|طب الأسنان|طب الاسنان|الصيدلة/.test(d))return null;
 if(/طب عام/.test(d))return b==="علمي"&&study!=="evening"?95:null;
 if(/طب الأسنان|طب الاسنان/.test(d))return b==="علمي"&&study!=="evening"?85:null;
 if(/^الصيدلة$/.test(d))return b==="علمي"&&study!=="evening"?85:null;
 const health=/تمريض|قبالة|مختبرات طبية|الاشعة|صناعة الاسنان|العلاج الطبيعي|التأهيل الطبي|التخدير|صحة المجتمع|الكلية الصناعية|التغذية العلاجية|النطق|العلاج الوظيفي|الادارة الصحية|الإدارة الصحية|البصريات|فحص البصر|التجميل|عناية القلب|طب الطوارئ|العقم والانجاب|تقنيات الصيدلة|تقنيات التمريض|تقنيات الادارة الصحية|تقنيات طب الطوارئ/i;
 if(health.test(d))return b==="علمي"?(study==="evening"?65:70):null;
 const tech=/هندسة تقنيات الحاسوب|هندسة تقنيات الاجهزة الطبية|هندسة تقنيات الطاقة|هندسة تقنيات الطاقة المتجددة|هندسة تقنيات الطيران|هندسة تقنيات الاتصالات|هندسة تقنيات الوقود|هندسة تقنيات الامن السيبراني|هندسة تقنيات السيارات|هندسة تقنيات الميكاترونكس|هندسة تقنيات الليزر|هندسة تقنيات الميكانيك|هندسة تقنيات ميكانيك القوى|هندسة تقنيات الطائرات|هندسة تقنيات الزراعة الذكية|هندسة تقنيات الصحة الذكية|هندسة تقنيات المساحة|هندسة التقنيات البروتوكيمياويات|هندسة تقنيات الانتاج والمعادن|تقنيات الصحة الرقمية/i;
 if(tech.test(d)){
   if(b==="صناعي")return study==="evening"?60:62;
   return ["علمي","تطبيقي"].includes(b)||(branch==="أحيائي") ? (study==="evening"?58:60):null;
 }
 const eng=/هندسة الطب الحياتي|الهندسة الكيمياوية|هندسة تكرير النفط|هندسة النفط|هندسة البترول|هندسة النفط والغاز|هندسة الطيران|هندسة الطائرات|هندسة الاتصالات|هندسة الاتصالات الرقمية|هندسة الليزر|هندسة الحاسوب|هندسة الذكاء الاصطناعي|هندسة سيطرة وحاسبات|هندسة السيطرة والنظم|هندسة أمن المعلومات|هندسة الامن السيبراني|هندسة الكترونيك|هندسة المعلومات والاتصالات|هندسة الطاقة|هندسة الاطراف|هندسة الاجهزة الطبية|ادارة الهندسة|هندسة التصميم الرقمي|هندسة الميكانيك|الهندسة الميكانيكية|هندسة الكهرباء|الهندسة المدنية|هندسة العمارة|هندسة معماري|هندسة البناء وادارة المشاريع|هندسة الطرق والجسور|هندسة المساحة/i;
 if(eng.test(d)){
   if(!["علمي","تطبيقي"].includes(b)&&branch!=="أحيائي")return null;
   if(/نفط|الطب الحياتي|كيمياوية|تكرير/.test(d))return study==="evening"?60:71;
   if(/العمارة/.test(d))return study==="evening"?60:69;
   if(/طائرات مسيرة/.test(d))return study==="evening"?60:65;
   if(/المدنية|الميكانيك|البناء|الكهرباء/.test(d))return study==="evening"?60:63;
   return study==="evening"?60:61;
 }
 const sci=/علوم الحاسوب|علوم الحاسبات|تكنولوجيا المعلومات|الذكاء الاصطناعي|علوم الفيزياء الطبية|علوم الحياة|علوم التحليلات المرضية|علوم الامن السيبراني|علوم الأمن السيبراني|علوم الكيمياء الحياتية|علوم الجيوفيزياء|علوم التقنية الاحيائية الطبية|الاحياء الطبية المجهرية|علوم الطاقة المتجددة|النظم الطبية الذكية|علوم الادلة الجنائية/i;
 if(sci.test(d))return ["علمي","تطبيقي"].includes(b)||branch==="أحيائي" ? (study==="evening"?55:57):null;
 if(/القانون/i.test(d))return ["علمي","تطبيقي"].includes(b)||branch==="أحيائي"||b==="ادبي" ? (study==="evening"?61:65):null;
 const competition=/ادارة الاعمال|إدارة الاعمال|تقنيات ادارة الاعمال|المحاسبة|العلوم المالية والمصرفية|اقتصاد|اقتصاديات النفط|ادارة المشاريع|ادارة المخاطر|التأمين|ادارة تقنيات المعلومات|التسويق|المبيعات|التدقيق|الرقابة المحاسبية|العلوم السياسية|الادارة الصناعية|ادارة الاستثمار|ادارة المؤسسات الصحية|التربية|اللغة العربية|اللغة الانكليزية|التاريخ|الجغرافية|علم النفس|الاعلام|الصحافة|السياحة|الاثار|المسرح|الفنون|الرياضة/i;
 if(competition.test(d))return {min:0,competition:true};
 return null;
}

function privateRows(branch,avg,study){
 const rows=[];
 for(const r of P){
   const rule=privateRule(r.department||"",branch,study);
   if(!rule)continue;
   if(rule.competition){
     rows.push({...r,type:"أهلي",studyType:study==="evening"?"مسائي":"صباحي",fee:study==="evening"?r.eveningFee:r.morningFee,
       feeLabel:study==="evening"?"القسط المسائي":"القسط الصباحي",ruleText:"القسم خاضع للمفاضلة وفق دليل القبول الأهلي 2025–2026.",rank:9999});
   }else if(avg>=rule){
     rows.push({...r,type:"أهلي",studyType:study==="evening"?"مسائي":"صباحي",fee:study==="evening"?r.eveningFee:r.morningFee,
       feeLabel:study==="evening"?"القسط المسائي":"القسط الصباحي",displayMin:rule,
       ruleText:`الحد الأدنى للتقديم وفق جدول 2025–2026: ${rule}%.`,rank:avg-rule});
   }
 }
 return rows;
}
function apply(){
 const branch=q("branch").value,avg=num(q("average").value),gender=q("gender").value,study=q("study").value,sector=q("sector").value,search=q("search").value.trim().toLowerCase();
 if(!avg){alert("أدخل المعدل أولًا.");return}
 let rows=[];
 if(sector!=="private")rows.push(...governmentRows(branch,avg,gender,study));
 if(sector!=="government")rows.push(...privateRows(branch,avg,study));
 if(search)rows=rows.filter(r=>(r.fullName||r.program||r.institution||r.department||r.college||"").toLowerCase().includes(search));
 state.rows=rows;state.shown=0;
 q("summary").classList.remove("hidden");
 q("summary").innerHTML=[`<div class="stat"><b>${rows.length}</b><span>النتائج المطابقة</span></div>`,`<div class="stat"><b>${rows.filter(x=>x.type==="حكومي").length}</b><span>حكومي</span></div>`,`<div class="stat"><b>${rows.filter(x=>x.type==="أهلي").length}</b><span>أهلي</span></div>`].join("");
 q("resultsHead").classList.remove("hidden");q("results").classList.remove("hidden");render();q("moreBtn").classList.toggle("hidden",rows.length<=24);
 q("warnings").classList.remove("hidden");q("warnings").innerHTML=study==="evening"?"الحكومي المسائي ليس مجانيًا؛ يعرض التطبيق الحد الأعلى للأجور بحسب فئة التخصص الواردة في دليل 2025–2026.":"الحكومي الصباحي مجاني ضمن القناة الحكومية المركزية. النتائج الحكومية مبنية على الحدود الدنيا الفعلية.";
 window.scrollTo({top:q("resultsHead").offsetTop-15,behavior:"smooth"});
}
function render(){
 let rows=[...state.rows],sort=q("sort").value;
 if(sort==="name")rows.sort((a,b)=>(a.program||a.department||"").localeCompare(b.program||b.department||"","ar"));
 else if(sort==="location")rows.sort((a,b)=>(a.location||"").localeCompare(b.location||"","ar"));
 else rows.sort((a,b)=>(a.rank??9999)-(b.rank??9999));
 const shown=rows.slice(0,state.shown+24);state.shown=shown.length;
 q("results").innerHTML=shown.map(card).join("")||`<article class="result-card"><div class="result-title">لا توجد نتائج مطابقة</div><div class="reason">جرّب فرعًا أو دراسة مختلفة أو تأكد من إدخال المعدل.</div></article>`;
 q("moreBtn").classList.toggle("hidden",shown.length>=rows.length);
}
function card(r){
 if(r.type==="أهلي")return `<article class="result-card"><div class="result-head"><div><div class="result-title">${esc(r.department)}</div><div class="result-sub">${esc(r.institution)} — ${esc(r.college)}</div><div class="location-chip">📍 ${esc(r.location)}</div></div><span class="tag warn">أهلي</span></div><div class="body"><div class="row"><span>الدراسة</span><b>${esc(r.studyType)}</b></div><div class="row"><span>معدلك</span><b>${num(q("average").value).toFixed(2)}%</b></div>${r.displayMin!=null?`<div class="row"><span>الحد الأدنى للتقديم</span><b>${r.displayMin}%</b></div>`:`<div class="row"><span>القبول</span><b>مفاضلة</b></div>`}<div class="row"><span>${esc(r.feeLabel)}</span><b class="school-fee">${money(r.fee)}</b></div><div class="status status-warn">${esc(r.ruleText)}</div><div class="acceptance-note">المصدر الخاص بالأهلية: الدليل الإرشادي للقبول الأهلي 2025–2026. بيانات الأجور: دليل الأجور الأهلي.</div></div></article>`;
 return `<article class="result-card"><div class="result-head"><div><div class="result-title">${esc(r.program)}</div><div class="result-sub">${esc(r.institution)}</div><div class="location-chip">📍 ${esc(r.location)}</div></div><span class="tag ok">حكومي</span></div><div class="body"><div class="row"><span>الدراسة</span><b>${esc(r.studyType)}</b></div><div class="row"><span>الفرع</span><b>${esc(r.branch)}</b></div><div class="row"><span>معدلك</span><b>${num(q("average").value).toFixed(2)}%</b></div><div class="row"><span>الحد الأدنى</span><b>${Number(r.displayMin).toFixed(2)}%</b></div><div class="row"><span>القسط الصباحي</span><b class="free">مجاني</b></div>${r.fee?`<div class="row"><span>${esc(r.feeLabel)}</span><b>${money(r.fee)}</b></div>`:""}<div class="status status-ok">مطابق للحد الأدنى المنشور</div><div class="acceptance-note">${esc(r.rule||"القبول النهائي تنافسي وفق ضوابط القبول المركزي وترتيب الاختيارات.")}</div><div class="source">المصدر: ملف الحدود الدنيا للقبول المركزي 2025–2026، صفحة ${esc(r.page)}.</div></div></article>`;
}
q("checkBtn").addEventListener("click",apply);
q("sort").addEventListener("change",render);
q("moreBtn").addEventListener("click",render);
