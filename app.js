
const D=window.QABOOLI_DATA||{government:[],private:[]},G=D.government,P=D.private,state={rows:[],shown:24};
const q=id=>document.getElementById(id);
function num(x){const a="٠١٢٣٤٥٦٧٨٩",b="۰۱۲۳۴۵۶۷۸۹";return Number([...String(x||"")].map(c=>{let i=a.indexOf(c);if(i>=0)return String(i);i=b.indexOf(c);return i>=0?String(i):c}).join("").replace(/,/g,""))||0}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function money(x){return x==null?"غير محدد":new Intl.NumberFormat("en-US").format(x)+" د.ع"}
function nb(b){return b==="أحيائي"?"علمي":b}
function profile(){return q("branch").value==="مهني"?q("vocational").value:""}

q("branch").addEventListener("change",()=>{
 q("vocWrap").classList.toggle("hidden",q("branch").value!=="مهني");
});
q("vocWrap").classList.add("hidden");

function vocationalOK(dept,p){
 const sector=(p||"").split(":")[0],spec=(p||"").split(":")[1]||"";
 const d=(dept||"").replace(/ـ/g,"");
 if(/التربية الفنية/.test(d))return ["صناعة","تجارة","زراعي","حاسوب وتقنية المعلومات","فنون تطبيقية","فنون"].includes(sector);
 if(/التربية البدنية|علوم الرياضة/.test(d))return ["صناعة","تجارة","زراعي","حاسوب وتقنية المعلومات","فنون تطبيقية","فنون"].includes(sector);
 if(/السياحة الدينية|الدراسات الإسلامية|الدراسات الاسلامية/.test(d))return true;
 if(/المسرح/.test(d))return ["صناعة","تجارة","زراعي","حاسوب وتقنية المعلومات","فنون تطبيقية","فنون"].includes(sector);
 if(/الآثار|الاثار/.test(d))return ["صناعة","تجارة","زراعي","حاسوب وتقنية المعلومات","فنون تطبيقية","فنون"].includes(sector);
 if(/الإعلام|الاعلام/.test(d))return sector==="صناعة"&&spec==="تكنولوجيا الإعلام";
 if(/الصحافة/.test(d))return sector==="فنون";
 if(/العلاقات العامة/.test(d))return sector==="فنون";
 if(/إدارة الأعمال|إدارة الاعمال|تقنيات إدارة الأعمال|تقنيات ادارة الاعمال/.test(d))return sector==="تجارة"&&["عام","إدارة","إدارة مخازن","اقتصاد"].includes(spec);
 if(/المحاسبة/.test(d))return sector==="تجارة"&&["عام","محاسبة"].includes(spec);
 if(/الإدارة الصناعية/.test(d))return sector==="تجارة"&&["عام","إدارة"].includes(spec);
 if(/إدارة التسويق|التسويق والمبيعات|تقنيات التسويق والمبيعات/.test(d))return sector==="تجارة"&&["عام","إدارة"].includes(spec);
 if(/إدارة المشاريع/.test(d))return sector==="تجارة"&&["عام","إدارة","إدارة مخازن","اقتصاد"].includes(spec);
 if(/إدارة المخاطر|التأمين/.test(d))return sector==="تجارة"&&["عام","إدارة"].includes(spec);
 if(/إدارة تقنيات المعلومات/.test(d))return sector==="تجارة"&&["عام","إدارة"].includes(spec);
 if(/إدارة الاستثمار/.test(d))return sector==="تجارة"&&["عام","إدارة","محاسبة","سياحة وإدارة فنادق"].includes(spec);
 if(/الرقابة المحاسبية/.test(d))return sector==="تجارة"&&["عام","محاسبة"].includes(spec);
 if(/العلوم المالية والمصرفية|علوم مالية ومصرفية/.test(d))return sector==="تجارة"&&["عام","محاسبة","إدارة"].includes(spec);
 if(/^الاقتصاد$/.test(d.trim()))return sector==="تجارة"&&["عام","إدارة","اقتصاد","محاسبة","إدارة مخازن","سياحة وإدارة فنادق"].includes(spec);
 if(/اقتصاديات النفط/.test(d))return sector==="تجارة"&&["عام","اقتصاد","إدارة","محاسبة"].includes(spec);
 if(/هندسة تقنيات البناء|هندسة تقنيات البناش/.test(d))return sector==="صناعة"&&["عام","بناء","رسم هندسي","مساحة"].includes(spec);
 if(/تقنيات الهندسة الكهربائية/.test(d))return sector==="صناعة"&&["عام","كهرباء","قوى كهربائية","إلكترونيات وسيطرة","ميكاترونكس","اتصالات","أجهزة طبية","حاسبات"].includes(spec);
 if(/هندسة تقنيات الحاسبات|هندسة تقنيات الحاسوب/.test(d))return sector==="صناعة"&&["عام","إلكترونيات وسيطرة","اتصالات","حاسبات","كهرباء","أجهزة طبية"].includes(spec);
 if(/هندسة تقنيات الأجهزة الطبية/.test(d))return sector==="صناعة"&&["عام","إلكترونيات وسيطرة","أجهزة طبية"].includes(spec);
 if(/هندسة تقنيات التبريد/.test(d))return sector==="صناعة";
 if(/هندسة تقنيات السيارات/.test(d))return sector==="صناعة"&&["عام","ميكانيك","سيارات"].includes(spec);
 if(/هندسة تقنيات ميكانيك/.test(d))return sector==="صناعة"&&["عام","ميكانيك","سيارات","تبريد وتكييف"].includes(spec);
 if(/هندسة تقنيات الطيران|هندسة تقنيات الطائرات/.test(d))return sector==="صناعة"&&["ميكاترونكس","سيارات","ميكانيك","إلكترونيات وسيطرة","كهرباء"].includes(spec);
 if(/هندسة تقنيات الاتصالات/.test(d))return sector==="صناعة"&&["اتصالات","حاسبات","إلكترونيات وسيطرة","كهرباء","أجهزة طبية"].includes(spec);
 if(/هندسة تقنيات الوقود/.test(d))return sector==="صناعة"&&["ميكانيك","تبريد وتكييف","تكرير النفط ومعالجة الغاز","بتروكيمياويات"].includes(spec);
 if(/هندسة تقنيات الأمن السيبراني|هندسة تقنيات الامن السيبراني/.test(d))return sector==="صناعة"&&["إلكترونيات وسيطرة","حاسبات","اتصالات","تكنولوجيا الإعلام"].includes(spec);
 if(/هندسة تقنيات البيئة والتلوث/.test(d))return sector==="صناعة"&&["بتروكيمياويات","تكرير النفط ومعالجة الغاز","بناء","ميكانيك"].includes(spec);
 if(/هندسة تقنيات الميكاترونكس/.test(d))return sector==="صناعة"&&["إلكترونيات وسيطرة","كهرباء","ميكانيك","ميكاترونكس","سيارات","حاسبات"].includes(spec);
 if(/هندسة تقنيات الليزر/.test(d))return sector==="صناعة"&&["إلكترونيات وسيطرة","كهرباء","أجهزة طبية","اتصالات","حاسبات"].includes(spec);
 if(/هندسة تقنيات الصحة الذكية|تقنيات الصحة الرقمية/.test(d))return sector==="صناعة"&&["أجهزة طبية","حاسبات","إلكترونيات وسيطرة"].includes(spec);
 if(/هندسة تقنيات الذكاء الاصطناعي|هندسة تقنيات الروبوتات/.test(d))return sector==="صناعة"&&["إلكترونيات وسيطرة","ميكاترونكس","حاسبات"].includes(spec);
 if(/هندسة التقنيات النفطية|هندسة تقنيات النفط والغاز|هندسة تقنيات البتروكيمياويات/.test(d))return sector==="صناعة"&&["بتروكيمياويات","تكرير النفط ومعالجة الغاز","إنتاج","معادن"].includes(spec);
 if(/هندسة تقنيات الإنتاج والمعادن/.test(d))return sector==="صناعة"&&["إنتاج","معادن"].includes(spec);
 return false;
}

function privateAcademicRule(dept,branch,study){
 const b=nb(branch),d=(dept||"").replace(/ـ/g,"").trim();
 if(/طب عام/.test(d))return b==="علمي"&&study!=="evening"?95:null;
 if(/طب الأسنان|طب الاسنان/.test(d))return b==="علمي"&&study!=="evening"?85:null;
 if(/^الصيدلة$/.test(d))return b==="علمي"&&study!=="evening"?85:null;
 if(/تمريض|قبالة|مختبرات طبية|تقنيات الاشعة|تقنيات الأشعة|صناعة الاسنان|العلاج الطبيعي|التأهيل الطبي|التخدير|صحة المجتمع|الكلية الصناعية|التغذية العلاجية|البصريات|فحص البصر|التجميل|عناية القلب|طب الطوارئ|العقم والانجاب/.test(d))return b==="علمي"?(study==="evening"?65:70):null;
 if(/هندسة/.test(d)){
   if(!(b==="علمي"||b==="تطبيقي"))return null;
   if(/نفط|طب الحياتي|كيمياوية|تكرير/.test(d))return study==="evening"?60:71;
   if(/عمارة/.test(d))return study==="evening"?60:69;
   if(/مدنية|ميكانيك|بناء|كهرباء/.test(d))return study==="evening"?60:63;
   return study==="evening"?60:61;
 }
 if(/علوم الادلة الجنائية|علوم الأدلة الجنائية|علم الحاسوب|علوم الحاسوب|علوم الحاسبات|تكنولوجيا المعلومات|علوم الفيزياء الطبية|علوم التحليلات المرضية|علوم الامن السيبراني|علوم الأمن السيبراني|علوم الحياة|علوم الكيمياء الحياتية|علوم الانظمة الطبية الذكية|علوم الطاقة المتجددة|علوم الجيوفيزياء|علوم التقنية الاحيائية الطبية|الاحياء الطبية المجهرية/.test(d))
   return (b==="علمي"||b==="تطبيقي")?(study==="evening"?55:57):null;
 if(/القانون/.test(d))return ["ادبي","علمي","تطبيقي"].includes(b)?(study==="evening"?61:65):null;
 if(/إدارة أعمال|ادارة اعمال|المحاسبة|العلوم المالية والمصرفية|اقتصاد|إدارة المشاريع|إدارة المخاطر|التأمين|إدارة تقنيات المعلومات|إدارة الاستثمار|تقنيات التسويق|التسويق والمبيعات|الإدارة الصناعية|إدارة الهندسة/.test(d))
   return {competition:true};
 if(/التربية|اللغة العربية|اللغة الانكليزية|اللغة الإنكليزية|التاريخ|الجغرافية|علم النفس|الاعلام|الإعلام|السياحة|الاثار|الآثار|المسرح|التربية الفنية|التربية البدنية|علوم الرياضة/.test(d))
   return {competition:true};
 return null; // critical: unknown department => no result
}

function privateRows(branch,avg,study){
 const p=profile(),rows=[];
 for(const r of P){
   let rule;
   if(branch==="مهني") {
     if(!vocationalOK(r.department,p))continue;
     rule={competition:true};
   } else rule=privateAcademicRule(r.department,branch,study);
   if(!rule)continue;
   if(rule.competition) rows.push({...r,type:"أهلي",studyType:study==="evening"?"مسائي":"صباحي",fee:study==="evening"?r.eveningFee:r.morningFee,competition:true,rank:9999});
   else if(avg>=rule) rows.push({...r,type:"أهلي",studyType:study==="evening"?"مسائي":"صباحي",fee:study==="evening"?r.eveningFee:r.morningFee,displayMin:rule,rank:avg-rule});
 }
 return rows;
}

function govRows(branch,avg,gender,study){
 const b=nb(branch);if(branch==="مهني"||study==="evening")return [];
 return G.filter(r=>r.branch===b&&(!gender||r.gender==="مختلط"||r.gender===gender)&&avg>=r.minRate)
   .map(r=>({...r,type:"حكومي",studyType:"صباحي",displayMin:r.minRate,fee:0,rank:avg-r.minRate}));
}
function govEvening(branch,avg,gender){
 const b=nb(branch);if(branch==="مهني")return [];
 return G.filter(r=>r.branch===b&&(!gender||r.gender==="مختلط"||r.gender===gender)).map(r=>{
   const s=r.program||r.fullName||"";let min=58,fee=900000;
   if(/تمريض/.test(s)){min=70;fee=2500000}else if(/تقنيات.*(طبية|صحية)|تحليلات مرضية/.test(s)){min=75;fee=2250000}else if(/بيطري/.test(s)){min=65;fee=1750000}else if(/هندسة/.test(s)){min=/نفط|عمارة|طب حياتي/.test(s)?60:65;fee=/نفط|عمارة|طب حياتي/.test(s)?3000000:2250000}else if(/قانون/.test(s)){min=65;fee=1200000}else if(/علوم|حاسوب|تكنولوجيا المعلومات/.test(s)){min=60;fee=1500000}else if(/تربية بدنية|علوم الرياضة/.test(s)){min=gender==="أنثى"?55:57;fee=900000}else if(/إدارة|ادارة|اقتصاد|علوم سياسية|سياحة/.test(s)){min=60;fee=1200000}
   return avg>=min?{...r,type:"حكومي",studyType:"مسائي",displayMin:min,fee,rank:avg-min}:null;
 }).filter(Boolean);
}

function apply(){
 const branch=q("branch").value,avg=num(q("average").value),gender=q("gender").value,study=q("study").value,sector=q("sector").value,search=q("search").value.trim().toLowerCase();
 if(!avg){alert("أدخل المعدل أولًا.");return}
 if(branch==="مهني"&&!profile()){alert("اختر التخصص المهني أولًا.");return}
 let rows=[];
 if(sector!=="private")rows.push(...(study==="evening"?govEvening(branch,avg,gender):govRows(branch,avg,gender,study)));
 if(sector!=="government")rows.push(...privateRows(branch,avg,study));
 if(search)rows=rows.filter(r=>(r.fullName||r.program||r.institution||r.department||r.college||"").toLowerCase().includes(search));
 state.rows=rows;state.shown=24;
 q("summary").classList.remove("hidden");q("summary").innerHTML=[`<div class="stat"><b>${rows.length}</b><span>إجمالي النتائج المطابقة</span></div>`,`<div class="stat"><b>${rows.filter(x=>x.type==="حكومي").length}</b><span>حكومي</span></div>`,`<div class="stat"><b>${rows.filter(x=>x.type==="أهلي").length}</b><span>أهلي</span></div>`].join("");
 q("resultsHead").classList.remove("hidden");q("results").classList.remove("hidden");q("alerts").classList.remove("hidden");
 q("alerts").textContent=branch==="مهني"?"تم تفعيل المطابقة الدقيقة للتخصص المهني: لن تظهر نتيجة إلا لقسم ينص الدليل على قبول هذا المسار.":study==="evening"?"الدراسة المسائية الحكومية لها ضوابط وأجور مستقلة؛ الصباحية الحكومية مجانية.":"تم تفعيل مطابقة الفرع والمعدل مع بيانات 2025–2026.";
 render();window.scrollTo({top:q("resultsHead").offsetTop-15,behavior:"smooth"});
}
function render(){
 let rows=[...state.rows],s=q("sort").value;if(s==="name")rows.sort((a,b)=>(a.program||a.department||"").localeCompare(b.program||b.department||"","ar"));else if(s==="location")rows.sort((a,b)=>(a.location||"").localeCompare(b.location||"","ar"));else rows.sort((a,b)=>(a.rank??9999)-(b.rank??9999));
 const shown=rows.slice(0,state.shown);
 q("results").innerHTML=shown.map(card).join("")||`<article class="result-card"><div class="result-title">لا توجد نتائج مطابقة</div><div class="reason">لا يوجد قسم يطابق هذه البيانات في قاعدة 2025–2026 الحالية.</div></article>`;
 q("moreBtn").classList.toggle("hidden",shown.length>=rows.length);
}
function card(r){
 if(r.type==="أهلي")return `<article class="result-card"><div class="result-head"><div><div class="result-title">${esc(r.department)}</div><div class="result-sub">${esc(r.institution)} — ${esc(r.college||"")}</div><div class="location-chip">📍 ${esc(r.location)}</div>${q("branch").value==="مهني"?`<div class="profile-chip">🎓 ${esc(q("vocational").selectedOptions[0].textContent)}</div>`:""}</div><span class="tag warn">أهلي</span></div><div class="body"><div class="row"><span>الدراسة</span><b>${esc(r.studyType)}</b></div><div class="row"><span>القسط</span><b class="school-fee">${money(r.fee)}</b></div>${r.displayMin!=null?`<div class="row"><span>الحد الأدنى للتقديم</span><b>${r.displayMin}%</b></div>`:`<div class="row"><span>القبول</span><b>مفاضلة</b></div>`}<div class="status status-warn">${r.competition?"القسم خاضع للمفاضلة":"مستوفٍ للحد الأدنى"}</div>${r.feeStatus?`<div class="reason">${esc(r.feeStatus)}</div>`:""}<div class="source">الأهلية: دليل ضوابط القبول الأهلي 2025–2026. الأجور: دليل الجامعات والكليات الأهلية 2025–2026 — صفحة ${esc(r.page)}.</div></div></article>`;
 return `<article class="result-card"><div class="result-head"><div><div class="result-title">${esc(r.program)}</div><div class="result-sub">${esc(r.institution)}</div><div class="location-chip">📍 ${esc(r.location)}</div></div><span class="tag ok">حكومي</span></div><div class="body"><div class="row"><span>الدراسة</span><b>${esc(r.studyType)}</b></div><div class="row"><span>الفرع</span><b>${esc(r.branch)}</b></div><div class="row"><span>الحد الأدنى</span><b>${Number(r.displayMin).toFixed(2)}%</b></div><div class="row"><span>معدلك</span><b>${num(q("average").value).toFixed(2)}%</b></div><div class="row"><span>القسط الصباحي</span><b class="free">مجاني</b></div>${r.studyType==="مسائي"?`<div class="row"><span>الحد الأعلى للأجور المسائية</span><b>${money(r.fee)}</b></div>`:""}<div class="status status-ok">مطابق للحد الأدنى المنشور</div><div class="source">المصدر: الحدود الدنيا للقبول المركزي 2025–2026 — صفحة ${esc(r.page)}.</div></div></article>`;
}
q("checkBtn").addEventListener("click",apply);q("sort").addEventListener("change",render);q("moreBtn").addEventListener("click",()=>{state.shown+=24;render()});
