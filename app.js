
let G=[],P=[],state={rows:[],shown:24};
const q=id=>document.getElementById(id);
function num(x){const a="٠١٢٣٤٥٦٧٨٩",b="۰۱۲۳۴۵۶۷۸۹";return Number([...String(x||"")].map(c=>{let i=a.indexOf(c);if(i>=0)return String(i);i=b.indexOf(c);return i>=0?String(i):c}).join("").replace(/,/g,""))||0}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function money(x){return x==null?"غير محدد":new Intl.NumberFormat("en-US").format(x)+" د.ع"}
function nb(b){return b==="أحيائي"?"علمي":b}
function cleanDept(s){
 let d=String(s??"").replace(/ـ/g,"").replace(/\s+/g," ").trim();
 if(d==="التربية السالمية"||d==="التربية الاسلامية"||d.includes("التربية")&&d.includes("السالمية"))return "التربية الإسلامية";
 if(d.includes("التربية البدنية")&&d.includes("علوم الرياضة"))return "التربية البدنية وعلوم الرياضة";
 if(d==="علوم الرياضة التربية البدنية و"||d==="الرياضة التربية البدنية و علوم")return "التربية البدنية وعلوم الرياضة";
 return d;
}
function cleanCollege(s){return String(s??"").replace(/ـ/g,"").replace(/\s+/g," ").trim()}
function profile(){return q("branch").value==="مهني"?q("vocational").value:""}
q("branch").addEventListener("change",()=>q("vocWrap").classList.toggle("hidden",q("branch").value!=="مهني"));
q("vocWrap").classList.add("hidden");

function vocationalOK(dept,p){
 const [sec,spec]=(p||"").split(":"); const d=cleanDept(dept); if(!sec)return false;
 if(/التربية الفنية/.test(d))return ["صناعة","تجارة","زراعي","حاسوب وتقنية المعلومات","فنون تطبيقية","فنون"].includes(sec);
 if(/التربية البدنية|علوم الرياضة/.test(d))return ["صناعة","تجارة","زراعي","حاسوب وتقنية المعلومات","فنون تطبيقية","فنون"].includes(sec);
 if(/السياحة الدينية|الدراسات الإسلامية|الدراسات الاسلامية/.test(d))return true;
 if(/المسرح/.test(d))return ["صناعة","تجارة","زراعي","حاسوب وتقنية المعلومات","فنون تطبيقية","فنون"].includes(sec);
 if(/الآثار|الاثار/.test(d))return ["صناعة","تجارة","زراعي","حاسوب وتقنية المعلومات","فنون تطبيقية","فنون"].includes(sec);
 if(/الإعلام|الاعلام/.test(d))return sec==="صناعة"&&spec==="تكنولوجيا الإعلام";
 if(/الصحافة/.test(d))return sec==="فنون";
 if(/العلاقات العامة/.test(d))return sec==="فنون";
 if(/إدارة الأعمال|إدارة الاعمال|تقنيات إدارة الأعمال|تقنيات ادارة الاعمال/.test(d))return sec==="تجارة"&&["عام","إدارة","إدارة مخازن","اقتصاد"].includes(spec);
 if(/المحاسبة/.test(d))return sec==="تجارة"&&["عام","محاسبة"].includes(spec);
 if(/الإدارة الصناعية/.test(d))return sec==="تجارة"&&["عام","إدارة"].includes(spec);
 if(/إدارة التسويق|التسويق والمبيعات/.test(d))return sec==="تجارة"&&["عام","إدارة"].includes(spec);
 if(/إدارة المشاريع/.test(d))return sec==="تجارة"&&["عام","إدارة","إدارة مخازن","اقتصاد"].includes(spec);
 if(/إدارة المخاطر|التأمين/.test(d))return sec==="تجارة"&&["عام","إدارة"].includes(spec);
 if(/إدارة تقنيات المعلومات/.test(d))return sec==="تجارة"&&["عام","إدارة"].includes(spec);
 if(/إدارة الاستثمار/.test(d))return sec==="تجارة"&&["عام","إدارة","محاسبة","سياحة وإدارة فنادق"].includes(spec);
 if(/الرقابة المحاسبية/.test(d))return sec==="تجارة"&&["عام","محاسبة"].includes(spec);
 if(/العلوم المالية والمصرفية|علوم مالية ومصرفية/.test(d))return sec==="تجارة"&&["عام","محاسبة","إدارة"].includes(spec);
 if(/^الاقتصاد$/.test(d))return sec==="تجارة"&&["عام","إدارة","اقتصاد","محاسبة","إدارة مخازن","سياحة وإدارة فنادق"].includes(spec);
 if(/اقتصاديات النفط/.test(d))return sec==="تجارة"&&["عام","اقتصاد","إدارة","محاسبة"].includes(spec);
 if(/هندسة تقنيات|تقنيات الهندسة/.test(d))return sec==="صناعة" || sec==="حاسوب وتقنية المعلومات";
 return false;
}


function competitionEligible(dept,branch){
 const b=nb(branch),d=cleanDept(dept);
 const common=["علمي","تطبيقي","أحيائي","أدبي"];
 if(/إدارة الأعمال|إدارة الاعمال|تقنيات إدارة الأعمال|تقنيات ادارة الاعمال|إدارة المشاريع|إدارة المخاطر|التأمين|إدارة تقنيات المعلومات|إدارة الاستثمار|تقنيات التسويق|التسويق والمبيعات|التدقيق والرقابة|الرقابة المحاسبية|العلوم المالية والمصرفية|علوم مالية ومصرفية|الاقتصاد|اقتصاديات النفط|الإدارة الصناعية|العلوم السياسية/.test(d)) return common.includes(b);
 if(/التربية الإسلامية|الدراسات الإسلامية|حوار الأديان/.test(d)) return common.includes(b)||branch==="مهني"||branch==="فنون تطبيقية";
 if(/التربية البدنية|علوم الرياضة/.test(d)) return common.includes(b)||["صناعي","تجارة","زراعي","حاسوب وتقنية المعلومات","فنون","فنون تطبيقية"].includes(branch);
 if(/التربية الفنية/.test(d)) return common.includes(b)||["صناعي","تجارة","زراعي","حاسوب وتقنية المعلومات","فنون","فنون تطبيقية"].includes(branch);
 if(/التربية الخاصة|رياض الأطفال|معلم الصفوف الأولى|العلوم التربوية والنفسية/.test(d)) return common.includes(b)||branch==="فنون تطبيقية";
 if(/الرياضيات|التربية كيمياء|التربية فيزياء|التربية حاسبات|تربية علوم حياة|اللغة العربية|اللغة الإنكليزية|آداب اللغة|الترجمة|التاريخ|الجغرافية|علم النفس|الإعلام|الإعلام الرقمي|الصحافة|السياحة الدينية|علوم السياحة|الآثار|السياحة الأثرية|المسرح|التصميم|التصميم الداخلي|التصميم الصناعي|الفنون التشكيلية|الفنون المسرحية|الصحافة الإذاعية والتلفزيونية|الإعلان والاتصال التسويقي|السينما والتلفزيون|الفنون السينمائية|الفنون السمعية|تقنيات الأزياء والموضة|العلاقات العامة/.test(d)) return common.includes(b) || ["صناعة","تجارة","زراعي","حاسوب وتقنية المعلومات","فنون","فنون تطبيقية"].includes(branch);
 return false;
}

function getPrivateRule(r,branch,study){
 const b=nb(branch),d=cleanDept(r.department);
 if(branch==="مهني"){
   if(!vocationalOK(d,profile()))return null;
   // For professional rows, derive numeric minimum only where the guide gives one.
   const industrialNames=/هندسة تقنيات|تقنيات الهندسة|تقنيات النباتات الطبية|تقنيات الانتاج النباتي|تقنيات الانتاج الحيواني/.test(d);
   if(industrialNames){
      if(/تقنيات النباتات الطبية|تقنيات الانتاج النباتي|تقنيات الانتاج الحيواني/.test(d))return study==="evening"?55:57;
      return study==="evening"?60:62;
   }
   // Other vocational destinations in the guide are competition-based.
   return {competition:true};
 }
 const rules=r.admissionRules||[];
 for(const rr of rules){
   if(!rr.branches.includes(b))continue;
   const min=study==="evening"?rr.evening:rr.morning;
   if(min==null)continue;
   return min;
 }
 if(competitionEligible(cleanDept(r.department),branch))return {competition:true};
 return null;
}

function govMorning(branch,avg,gender){
 const b=nb(branch); if(branch==="مهني")return [];
 return G.filter(r=>r.branch===b&&(!gender||r.gender==="مختلط"||r.gender===gender)&&avg>=Number(r.minRate))
 .map(r=>({...r,type:"حكومي",studyType:"صباحي",displayMin:Number(r.minRate),fee:0,rank:avg-Number(r.minRate)}));
}
function govEvening(branch,avg,gender){
 const b=nb(branch); if(branch==="مهني")return [];
 return G.filter(r=>r.branch===b&&(!gender||r.gender==="مختلط"||r.gender===gender)).map(r=>{
  const d=cleanDept(r.program||r.fullName||"");let min=null,fee=null;
  if(/تمريض/.test(d)){min=70;fee=2500000}else if(/تقنيات.*(طبية|صحية)|تحليلات مرضية/.test(d)){min=75;fee=2250000}
  else if(/بيطري/.test(d)){min=65;fee=1750000}else if(/هندسة/.test(d)){min=/نفط|عمارة|طب حياتي/.test(d)?60:65;fee=/نفط|عمارة|طب حياتي/.test(d)?3000000:2250000}
  else if(/قانون/.test(d)){min=65;fee=1200000}else if(/علوم|حاسوب|تكنولوجيا المعلومات/.test(d)){min=60;fee=1500000}
  else if(/تربية بدنية|علوم الرياضة/.test(d)){min=gender==="أنثى"?55:57;fee=900000}else if(/إدارة|ادارة|اقتصاد|علوم سياسية|سياحة/.test(d)){min=60;fee=1200000}
  return min!==null&&avg>=min?{...r,type:"حكومي",studyType:"مسائي",displayMin:min,fee,rank:avg-min}:null;
 }).filter(Boolean);
}

function privateRows(branch,avg,study){
 const rows=[];
 for(const raw of P){
   const rule=getPrivateRule(raw,branch,study);
   if(rule==null)continue;
   if(rule.competition)rows.push({...raw,type:"أهلي",studyType:study==="evening"?"مسائي":"صباحي",fee:study==="evening"?raw.eveningFee:raw.morningFee,competition:true,rank:9999});
   else if(avg>=rule)rows.push({...raw,type:"أهلي",studyType:study==="evening"?"مسائي":"صباحي",fee:study==="evening"?raw.eveningFee:raw.morningFee,displayMin:rule,competition:false,rank:avg-rule});
 }
 return rows;
}
function apply(){
 const branch=q("branch").value,avg=num(q("average").value),gender=q("gender").value,study=q("study").value,sector=q("sector").value,search=q("search").value.trim().toLowerCase();
 if(!avg){alert("أدخل المعدل أولًا.");return}
 if(branch==="مهني"&&!profile()){alert("اختر التخصص المهني أولًا.");return}
 let rows=[];
 if(sector!=="private")rows.push(...(study==="evening"?govEvening(branch,avg,gender):govMorning(branch,avg,gender)));
 if(sector!=="government")rows.push(...privateRows(branch,avg,study));
 if(search)rows=rows.filter(r=>(r.fullName||r.program||r.institution||r.department||r.college||"").toLowerCase().includes(search));
 state.rows=rows;state.shown=24;
 q("summary").classList.remove("hidden");
 q("summary").innerHTML=[`<div class="stat"><b>${rows.length}</b><span>النتائج المطابقة</span></div>`,`<div class="stat"><b>${rows.filter(r=>r.type==="حكومي").length}</b><span>حكومي</span></div>`,`<div class="stat"><b>${rows.filter(r=>r.type==="أهلي").length}</b><span>أهلي</span></div>`].join("");
 q("resultsHead").classList.remove("hidden");q("results").classList.remove("hidden");q("alerts").classList.remove("hidden");
 q("alerts").textContent=branch==="مهني"?"تم تطبيق المطابقة حسب التخصص المهني الفرعي، ولن يظهر القسم لمجرد أنه موجود في دليل الأجور.":"قاعدة المعدل: يجب أن يكون المعدل مساويًا أو أعلى من الحد الأدنى للقسم؛ لا توجد إضافة نصف درجة.";
 render();window.scrollTo({top:q("resultsHead").offsetTop-15,behavior:"smooth"});
}
function render(){
 let rows=[...state.rows],s=q("sort").value;
 if(s==="name")rows.sort((a,b)=>(a.program||a.department||"").localeCompare(b.program||b.department||"","ar"));
 else if(s==="location")rows.sort((a,b)=>(a.location||"").localeCompare(b.location||"","ar"));
 else rows.sort((a,b)=>(a.rank??9999)-(b.rank??9999));
 const shown=rows.slice(0,state.shown);
 q("results").innerHTML=shown.map(card).join("")||`<article class="result-card"><div class="result-title">لا توجد نتائج مطابقة</div><div class="reason">تحقق من المعدل والفرع والتخصص المهني ونوع الدراسة.</div></article>`;
 q("moreBtn").classList.toggle("hidden",shown.length>=rows.length);
}
function card(r){
 if(r.type==="أهلي"){
  return `<article class="result-card"><div class="result-head"><div><div class="result-title">${esc(cleanDept(r.department))}</div><div class="result-sub">${esc(r.institution)} — ${esc(cleanCollege(r.college||""))}</div><div class="location-chip">📍 ${esc(r.location)}</div>${q("branch").value==="مهني"?`<div class="profile-chip">🎓 ${esc(q("vocational").selectedOptions[0].textContent)}</div>`:""}</div><span class="tag warn">أهلي</span></div><div class="body"><div class="row"><span>الدراسة</span><b>${esc(r.studyType)}</b></div><div class="row"><span>المعدل</span><b>${num(q("average").value).toFixed(2)}%</b></div>${r.competition?`<div class="row"><span>القبول</span><b>مفاضلة</b></div>`:`<div class="row"><span>الحد الأدنى للقسم</span><b>${Number(r.displayMin).toFixed(2)}%</b></div>`}<div class="row"><span>القسط</span><b class="school-fee">${money(r.fee)}</b></div>${r.feeStatus?`<div class="row"><span>ملاحظات الأجور</span><b>${esc(r.feeStatus)}</b></div>`:""}<div class="status status-warn">${r.competition?"القسم خاضع للمفاضلة — الدليل لا يضع له حدًا رقميًا واحدًا في جدول الحدود":"معدل الطالب مستوفٍ للحد الأدنى"}</div><div class="source">الأهلية: دليل القبول الأهلي 2025–2026. الأجور: دليل الجامعات والكليات الأهلية 2025–2026.</div></div></article>`;
 }
 return `<article class="result-card"><div class="result-head"><div><div class="result-title">${esc(cleanDept(r.program))}</div><div class="result-sub">${esc(r.institution)}</div><div class="location-chip">📍 ${esc(r.location)}</div></div><span class="tag ok">حكومي</span></div><div class="body"><div class="row"><span>الدراسة</span><b>${esc(r.studyType)}</b></div><div class="row"><span>الفرع</span><b>${esc(r.branch)}</b></div><div class="row"><span>الحد الأدنى</span><b>${Number(r.displayMin).toFixed(2)}%</b></div><div class="row"><span>معدلك</span><b>${num(q("average").value).toFixed(2)}%</b></div><div class="row"><span>القسط الصباحي</span><b class="free">مجاني</b></div>${r.studyType==="مسائي"?`<div class="row"><span>الحد الأعلى للأجور المسائية</span><b>${money(r.fee)}</b></div>`:""}<div class="status status-ok">معدل الطالب مستوفٍ للحد الأدنى</div><div class="source">المصدر: الحدود الدنيا للقبول المركزي 2025–2026 — صفحة ${esc(r.page)}.</div></div></article>`;
}
async function loadData(){
 const manifest=await fetch("data/manifest.json").then(r=>{if(!r.ok)throw new Error("manifest "+r.status);return r.json()});
 G=await fetch(manifest.government).then(r=>{if(!r.ok)throw new Error("government "+r.status);return r.json()});
 const parts=await Promise.all(manifest.private.map(u=>fetch(u).then(r=>{if(!r.ok)throw new Error(u+" "+r.status);return r.json()})));
 P=parts.flat();
}
async function init(){
 const btn=q("checkBtn"); btn.disabled=true; btn.textContent="⏳ تحميل قاعدة البيانات...";
 try{await loadData(); btn.disabled=false; btn.textContent="🔎 اعرض النتائج";}
 catch(e){console.error(e); btn.textContent="تعذر تحميل البيانات"; q("alerts").classList.remove("hidden"); q("alerts").textContent="تعذر تحميل قاعدة البيانات. ارفع مجلد data كاملًا إلى GitHub.";}
}
q("checkBtn").addEventListener("click",apply);q("sort").addEventListener("change",render);q("moreBtn").addEventListener("click",()=>{state.shown+=24;render()});init();
