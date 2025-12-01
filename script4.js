
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const age = document.getElementById('age');
const calcBtn = document.getElementById('calcBtn');
const resetBtn = document.getElementById('resetBtn');
const bmiValue = document.getElementById('bmiValue');
const bmiCategory = document.getElementById('bmiCategory');
const bmiTips = document.getElementById('bmiTips');


function calculateBMI(){
const w = parseFloat(weight.value);
const hcm = parseFloat(height.value);
if(!w || !hcm) return;
const h = hcm / 100;
const bmi = w / (h*h);
const rounded = Math.round(bmi * 10) / 10;
bmiValue.textContent = rounded;


// category
let cat = '';
let cls = '';
let tips = '';
if (rounded < 18.5){
cat = 'Underweight'; cls='cat-underweight';
tips = 'You are below the normal BMI range. Consider a balanced diet with more calories and strength training. Consult a nutritionist if needed.';
} else if (rounded < 25){
cat = 'Normal'; cls='cat-normal';
tips = 'Great — your BMI is in the normal range. Maintain a balanced diet and regular activity to keep it up.';
} else if (rounded < 30){
cat = 'Overweight'; cls='cat-overweight';
tips = 'You are above the normal range. Consider a mix of cardio and strength training and review your calorie intake.';
} else {
cat = 'Obese'; cls='cat-obese';
tips = 'BMI indicates obesity. It may be helpful to consult a healthcare professional for a personalised plan.';
}


bmiCategory.className = 'category '+cls;
bmiCategory.textContent = cat;
bmiCategory.style.visibility = 'visible';
bmiTips.textContent = tips;


// accessibility focus
bmiValue.setAttribute('tabindex','-1');
bmiValue.focus();
}


calcBtn.addEventListener('click', calculateBMI);
resetBtn.addEventListener('click', ()=>{
weight.value = 70; height.value = 170; age.value=''; bmiValue.textContent = '—'; bmiCategory.style.visibility='hidden'; bmiTips.textContent = 'Enter values and press Calculate to see results and tips.';
});


// calculate on Enter inside inputs
[weight,height,age].forEach(el=>el.addEventListener('keydown', (e)=>{ if(e.key==='Enter') calculateBMI(); }));


// small enhancement: live calc when pressing up/down quickly
let timer;
[weight,height].forEach(el=>el.addEventListener('input', ()=>{ clearTimeout(timer); timer = setTimeout(()=>{/* no-op; user can press Calculate */}, 400); }));

