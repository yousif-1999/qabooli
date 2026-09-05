
const D=window.QABOOLI_DATA||{government:[],private:[]},G=D.government,P=D.private,state={rows:[],shown:24};
const q=id=>document.getElementById(id);
function num(x){const a="٠١٢٣٤٥٦٧٨٩",b="۰۱۲۳۴۵۶۷۸۹";return Number([...String(x||"")].map(c=>{let i=a.indexOf(c);if(i>=0)return String(i);i=b.indexOf(c);return i>=0?String(i):c}).join("").replace(/,/g,""))||0}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function money(x){return x==null?"غير محدد":new Intl.NumberFormat("en-US").format(x)+" د.ع"}
function normalizeBranch(b){return b==="أحيائي"?"علمي":b}

const VOC={
  "تجاري|عام":"تجارة:عام","تجاري|إدارة":"تجارة:إدارة","تجاري|محاسبة":"تجارة:محاسبة","تجاري|اقتصاد":"تجارة:اقتصاد",
  "تجاري|إدارة مخازن":"تجارة:إدارة مخازن","تجاري|سياحة وإدارة فنادق":"تجارة:سياحة وفنادق",
  "صناعي|عام":"صناعة:عام","صناعي|ميكانيك":"صناعة:ميكانيك","صناعي|سيارات":"صناعة:سيارات","صناعي|كهرباء":"صناعة:كهرباء",
  "صناعي|إلكترونيات وسيطرة":"صناعة:إلكترونيات وسيطرة","صناعي|اتصالات":"صناعة:اتصالات","صناعي|حاسبات":"صناعة:حاسبات",
  "صناعي|أجهزة طبية":"صناعة:أجهزة طبية","صناعي|تبريد وتكييف":"صناعة:تبريد وتكييف",
  "فنون تطبيقية|عام":"فنون تطبيقية:عام","فنون|عام":"فنون:عام"
};

function setVoc(){
  q("vocWrap").classList.toggle("hidden",q("branch").value!=="مهني");
}
q("branch").addEventListener("change",setVoc);setVoc();

function acceptedVocational(dept,profile){
 if(!profile)return false;
 const [sector,spec]=profile.split(":");
 const d=(dept||"").replace(/ـ/g,"").replace(/\s+/g," ").trim();

 // Exact professional destinations stated by the 2025–2026 guide.
 if(/إدارة الاعمال|ادارة الاعمال|إدارة وتقنيات الأعمال|تقنيات إدارة الاعمال|تقنيات ادارة الاعمال/.test(d)){
   return sector==="تجارة" && ["عام","إدارة","إدارة مخازن"].includes(spec);
 }
 if(/المحاسبة|تقنيات المحاسبة/.test(d)) return sector==="تجارة" && ["عام","محاسبة"].includes(spec);
 if(/الإدارة الصناعية|الادارة الصناعية/.test(d)) return sector==="تجارة" && ["عام","إدارة"].includes(spec);
 if(/ادارة التسويق|تسويق|التسويق والمبيعات/.test(d)) return sector==="تجارة" && ["عام","إدارة"].includes(spec);
 if(/ادارة المشاريع/.test(d)) return sector==="تجارة" && ["عام","إدارة","إدارة مخازن"].includes(spec);
 if(/ادارة المخاطر|التأمين/.test(d)) return sector==="تجارة" && ["عام","إدارة"].includes(spec);
 if(/ادارة تقنيات المعلومات/.test(d)) return sector==="تجارة" && ["عام","إدارة"].includes(spec);
 if(/ادارة الاستثمار والاعمال|إدارة الاستثمار والأعمال/.test(d)) return sector==="تجارة" && ["عام","إدارة","محاسبة","سياحة وفنادق"].includes(spec);
 if(/الرقابة المحاسبية|الرقابة المحاسبية والمالية/.test(d)) return sector==="تجارة" && ["عام","محاسبة"].includes(spec);
 if(/علوم مالية|علوم محاسبية ومصرفية|العلوم المالية والمصرفية/.test(d)) return sector==="تجارة" && ["عام","محاسبة","إدارة"].includes(spec);
 if(/^الاقتصاد$|^اقتصاد$/.test(d)) return sector==="تجارة" && ["عام","إدارة","اقتصاد","محاسبة","إدارة مخازن","سياحة وفنادق"].includes(spec);
 if(/اقتصاديات النفط والغاز/.test(d)) return sector==="تجارة" && ["عام","اقتصاد","إدارة","محاسبة"].includes(spec);

 // Arts / education / sport / tourism rows that explicitly accept vocational branches.
 if(/التربية الفنية/.test(d)) return ["صناعة","تجارة","زراعي","حاسوب","فنون تطبيقية","فنون"].includes(sector);
 if(/التربية البدنية|علوم الرياضة/.test(d)) return ["صناعة","تجارة","زراعي","حاسوب","فنون تطبيقية","فنون"].includes(sector);
 if(/المسرح/.test(d)) return ["صناعة","تجارة","زراعي","حاسوب","فنون تطبيقية","فنون"].includes(sector);
 if(/التصميم( الداخلي| الصناعي)?/.test(d)) return ["صناعة","تجارة","زراعي","حاسوب","فنون تطبيقية","فنون"].includes(sector);
 if(/الدراسات الاسلامية|الحوار الاديان|التربية الاسلامية/.test(d)) return true; // الفروع المهنية كافة
 if(/السياحة الدينية/.test(d)) return true; // الفروع المهنية كافة
 if(/الاعلام|الإعلام/.test(d)) return sector==="صناعة" && spec==="عام" ? true : sector==="فنون";
 if(/الاعلان|الإعلان|الاتصال التسويقي|السينما|التلفزيون|السمعية/.test(d)) return ["صناعة","تجارة","زراعي","حاسوب","فنون تطبيقية","فنون"].includes(sector);
 if(/الاثار|الآثار/.test(d)) return ["صناعة","تجارة","زراعي","حاسوب","فنون تطبيقية","فنون"].includes(sector);
 if(/تقنيات الازياء|الموضة/.test(d)) return true;

 // Industrial technical destinations in the guide.
 if(/هندسة تقنيات/.test(d)||/تقنيات الهندسة/.test(d)){
   const industrial=["عام","ميكانيك","سيارات","كهرباء","إلكترونيات وسيطرة","اتصالات","حاسبات","أجهزة طبية","تبريد وتكييف"];
   return sector==="صناعة" && industrial.includes(spec);
 }
 if(/هندسة النفط|هندسة البترول|هندسة النفط والغاز|هندسة الكهرباء|هندسة الميكانيك|الهندسة الميكانيكية|الهندسة المدنية|هندسة العمارة|هندسة الطرق|هندسة المساحة|هندسة الطيران/.test(d)){
   return false; // دليل مدخلات 2025–2026 لا يضيف الفروع المهنية لهذه الهندسات العامة.
 }
 return false;
}

function privateRule(d,branch,study,profile){
 const b=normalizeBranch(branch),name=(d||"").replace(/ـ/g,"");
 if(branch==="مهني") return acceptedVocational(name,profile) ? {competition:true,voc:true} : null;

 if(/طب عام/.test(name))return b==="علمي"&&study!=="evening"?95:null;
 if(/طب الأسنان|طب الاسنان/.test(name))return b==="علمي"&&study!=="evening"?85:null;
 if(/^الصيدلة$/.test(name))return b==="علمي"&&study!=="evening"?85:null;
 if(/تمريض|قبالة|مختبرات طبية|الاشعة|صناعة الاسنان|العلاج الطبيعي|التأهيل الطبي|التخدير|صحة المجتمع|التغذية العلاجية|النطق|العلاج الوظيفي|الادارة الصحية|الإدارة الصحية|البصريات|فحص البصر|التجميل|عناية القلب|طب الطوارئ|العقم والانجاب|تقنيات الصيدلة|تقنيات التمريض|تقنيات الادارة الصحية/.test(name))
   return b==="علمي"?(study==="evening"?65:70):null;
 if(/هندسة|الهندسة/.test(name)){
   if(!(b==="علمي"||b==="تطبيقي"))return null;
   if(/نفط|طب الحياتي|كيمياوية|تكرير/.test(name))return study==="evening"?60:71;
   if(/عمارة/.test(name))return study==="evening"?60:69;
   if(/مدنية|ميكانيك|بناء|كهرباء/.test(name))return study==="evening"?60:63;
   return study==="evening"?60:61;
 }
 if(/علوم الادلة الجنائية|علم الحاسوب|علوم الحاسوب|علوم الحاسبات|تكنولوجيا المعلومات|الذكاء الاصطناعي|علوم الفيزياء الطبية|علوم التحليلات المرضية|علوم الامن السيبراني|علوم الحياة|علوم الكيمياء الحياتية|علوم الانظمة الطبية الذكية|علوم الطاقة المتجددة|علوم الجيوفيزياء|علوم التقنية الاحيائية الطبية|الاحياء المجهرية|تقنيات النباتات الطبية|تقنيات الانتاج الحيواني|تقنيات الانتاج النباتي/.test(name))
   return (b==="علمي"||b==="تطبيقي")?(study==="evening"?55:57):null;
 if(/القانون/.test(name))return (b==="ادبي"||b==="علمي"||b==="تطبيقي")?(study==="evening"?61:65):null;
 return {competition:true};
}

function governmentRows(branch,avg,gender,study){
 const b=normalizeBranch(branch);
 if(branch==="مهني") return [];
 if(study==="evening") return [];
 if(study!=="all"&&study!=="morning")return [];
 return G.filter(r=>r.branch===b&&(!gender||r.gender==="مختلط"||r.gender===gender)&&avg>=r.minRate)
   .map(r=>({...r,type:"حكومي",studyType:"صباحي",displayMin:r.minRate,fee:0,rank:avg-r.minRate}));
}
function governmentEvening(branch,avg,gender){
 const b=normalizeBranch(branch);
 if(branch==="مهني")return [];
 return G.filter(r=>r.branch===b&&(!gender||r.gender==="مختلط"||r.gender===gender)).map(r=>{
   const s=r.program||r.fullName||"";
   let min=58,fee=900000;
   if(/تمريض/.test(s)){min=70;fee=2500000}
   else if(/تقنيات.*(طبية|صحية)|تحليلات مرضية/.test(s)){min=75;fee=2250000}
   else if(/بيطري/.test(s)){min=65;fee=1750000}
   else if(/هندسة/.test(s)){min=/نفط|عمارة|طب حياتي/.test(s)?60:65;fee=/نفط|عمارة|طب حياتي/.test(s)?3000000:2250000}
   else if(/قانون/.test(s)){min=65;fee=1200000}
   else if(/علوم|حاسوب|تكنولوجيا المعلومات/.test(s)){min=60;fee=1500000}
   else if(/تربية بدنية|علوم الرياضة/.test(s)){min=gender==="أنثى"?55:57;fee=900000}
   else if(/إدارة|ادارة|اقتصاد|علوم سياسية|سياحة/.test(s)){min=60;fee=1200000}
   return avg>=min?{...r,type:"حكومي",studyType:"مسائي",displayMin:min,fee,rank:avg-min}:null;
 }).filter(Boolean);
}

function privateRows(branch,avg,study,profile){
 const rows=[];
 for(const r of P){
   const rule=privateRule(r.department,branch,study,profile);
   if(!rule)continue;
   // Non-vocational competition rows: show only for branch-compatible rules.
   if(rule.competition)rows.push({...r,type:"أهلي",studyType:study==="evening"?"مسائي":"صباحي",
      fee:study==="evening"?r.eveningFee:r.morningFee,competition:true,rank:9999,voc:true});
   else if(avg>=rule)rows.push({...r,type:"أهلي",studyType:study==="evening"?"مسائي":"صباحي",
      fee:study==="evening"?r.eveningFee:r.morningFee,displayMin:rule,rank:avg-rule,voc:false});
 }
 return rows;
}

function apply(){
 const branch=q("branch").value,avg=num(q("average").value),gender=q("gender").value,study=q("study").value,sector=q("sector").value,search=q("search").value.trim().toLowerCase();
 const profile=branch==="مهني"?VOC[q("vocational").value]:"";
 if(!avg){alert("أدخل المعدل أولًا.");return}
 if(branch==="مهني"&&!profile){alert("اختر التخصص المهني أولًا: تجاري أو صناعي وتخصصه.");return}
 let rows=[];
 if(sector!=="private") rows.push(...(study==="evening"?governmentEvening(branch,avg,gender):governmentRows(branch,avg,gender,study)));
 if(sector!=="government") rows.push(...privateRows(branch,avg,study,profile));
 if(search)rows=rows.filter(r=>(r.fullName||r.program||r.institution||r.department||r.college||"").toLowerCase().includes(search));
 state.rows=rows;state.shown=24;
 q("summary").classList.remove("hidden");
 const profLabel=branch==="مهني"?q("vocational").selectedOptions[0].textContent:"";
 q("summary").innerHTML=[
  `<div class="stat"><b>${rows.length}</b><span>النتائج المطابقة</span></div>`,
  `<div class="stat"><b>${rows.filter(x=>x.type==="حكومي").length}</b><span>حكومي</span></div>`,
  `<div class="stat"><b>${rows.filter(x=>x.type==="أهلي").length}</b><span>أهلي</span></div>`
 ].join("");
 q("resultsHead").classList.remove("hidden");q("results").classList.remove("hidden");q("alerts").classList.remove("hidden");
 q("alerts").innerHTML=branch==="مهني"
   ? `<strong>الفرع المهني:</strong> ${esc(profLabel)} — لن تظهر إلا الأقسام التي ينص دليل 2025–2026 على قبول هذا المسار المهني فيها.`
   : study==="evening"
   ? "الدراسة الحكومية المسائية ليست مجانية؛ يعرض التطبيق الحد الأعلى للأجور بحسب فئة التخصص في دليل القبول المركزي."
   : "الدراسة الحكومية الصباحية مجانية، والحد الأدنى مأخوذ من ملف 2025–2026.";
 render();window.scrollTo({top:q("resultsHead").offsetTop-15,behavior:"smooth"});
}

function render(){
 let rows=[...state.rows],s=q("sort").value;
 if(s==="name")rows.sort((a,b)=>(a.program||a.department||"").localeCompare(b.program||b.department||"","ar"));
 else if(s==="location")rows.sort((a,b)=>(a.location||"").localeCompare(b.location||"","ar"));
 else rows.sort((a,b)=>(a.rank??9999)-(b.rank??9999));
 const shown=rows.slice(0,state.shown);
 q("results").innerHTML=shown.map(card).join("")||`<article class="result-card"><div class="result-title">لا توجد نتائج مطابقة</div><div class="no-match-note">لا يوجد قسم يطابق الفرع والمعدل والقناة والتخصص المهني المدخل في قاعدة 2025–2026 الحالية.</div></article>`;
 q("moreBtn").classList.toggle("hidden",shown.length>=rows.length)
}
function card(r){
 if(r.type==="أهلي"){
  return `<article class="result-card"><div class="result-head"><div><div class="result-title">${esc(r.department)}</div><div class="result-sub">${esc(r.institution)} — ${esc(r.college||"")}</div><div class="location-chip">📍 ${esc(r.location)}</div>${q("branch").value==="مهني"?`<div class="profile-chip">🎓 ${esc(q("vocational").selectedOptions[0].textContent)}</div>`:""}</div><span class="tag warn">أهلي</span></div><div class="body"><div class="row"><span>الدراسة</span><b>${esc(r.studyType)}</b></div><div class="row"><span>معدلك</span><b>${num(q("average").value).toFixed(2)}%</b></div>${r.displayMin!=null?`<div class="row"><span>الحد الأدنى للتقديم</span><b>${r.displayMin}%</b></div>`:`<div class="row"><span>القبول</span><b>مفاضلة</b></div>`}<div class="row"><span>القسط</span><b class="school-fee">${money(r.fee)}</b></div>${r.feeStatus?`<div class="row"><span>ملاحظات الأجور</span><b>${esc(r.feeStatus)}</b></div>`:""}<div class="status status-warn">${r.competition?"القسم خاضع للمفاضلة":"مستوفٍ للحد الأدنى المذكور"}</div><div class="source">الأهلية: دليل ضوابط القبول الأهلي 2025–2026. الأجور: دليل الجامعات والكليات الأهلية 2025–2026 — صفحة ${esc(r.page)}.</div></div></article>`;
 }
 return `<article class="result-card"><div class="result-head"><div><div class="result-title">${esc(r.program)}</div><div class="result-sub">${esc(r.institution)}</div><div class="location-chip">📍 ${esc(r.location)}</div></div><span class="tag ok">حكومي</span></div><div class="body"><div class="row"><span>الدراسة</span><b>${esc(r.studyType)}</b></div><div class="row"><span>الفرع</span><b>${esc(r.branch)}</b></div><div class="row"><span>الحد الأدنى</span><b>${Number(r.displayMin).toFixed(2)}%</b></div><div class="row"><span>معدلك</span><b>${num(q("average").value).toFixed(2)}%</b></div><div class="row"><span>القسط الصباحي</span><b class="free">مجاني</b></div>${r.studyType==="مسائي"?`<div class="row"><span>الحد الأعلى للأجور المسائية</span><b>${money(r.fee)}</b></div>`:""}<div class="status status-ok">مطابق للحد الأدنى المنشور</div><div class="source">المصدر: الحدود الدنيا للقبول المركزي 2025–2026 — صفحة ${esc(r.page)}.</div></div></article>`;
}
q("checkBtn").addEventListener("click",apply);q("sort").addEventListener("change",render);q("moreBtn").addEventListener("click",()=>{state.shown+=24;render()});
