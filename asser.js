// Array الأسئلة — هنا تضيف أي سؤال جديد
const questions = [
  { text: "are you in grade 8?!??!", yes: "okay", no: "go away" },
  { text: "Is grade 8 good?!??!", yes: "Correct", no: "Wrong" }
];

// اختر الـ div اللي هيظهر فيه كل الأسئلة
const container = document.getElementById("square");

// لكل سؤال في الـ array، نبني العناصر كلها تلقائيًا
questions.forEach((q, index) => {

  // Main wrapper لكل سؤال
  const main = document.createElement("main");
  main.className = "center";

  // Section card
  const section = document.createElement("section");
  section.className = "card";

  // السؤال
  const p = document.createElement("p");
  p.className = "question";
  p.textContent = q.text;

  // Form لكل سؤال
  const form = document.createElement("form");
  form.autocomplete = "off";

  // Choices container
  const choices = document.createElement("div");
  choices.className = "choices";

  // Yes choice
  const yesLabel = document.createElement("label");
  yesLabel.className = "choice";
  yesLabel.innerHTML = <input type="radio" name="q${index}" value="yes"><span>Yes</span>;

  // No choice
  const noLabel = document.createElement("label");
  noLabel.className = "choice";
  noLabel.innerHTML = <input type="radio" name="q${index}" value="no"><span>No</span>;

  choices.appendChild(yesLabel);
  choices.appendChild(noLabel);

  // Submit button
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn black";
  btn.textContent = "Submit";

  // Result div
  const result = document.createElement("div");
  result.className = "result";

  // Event listener للزر
  btn.addEventListener("pointerdown", (e) => {
    e.preventDefault(); // منع أي submit افتراضي

    // استخدام name مخصص لكل سؤال
    const ans = form.querySelector(input[name="q${index}"]:checked);

    if (!ans) {
      result.textContent = "Choose an answer!";
      result.classList.add("wrong");
      result.classList.remove("correct");
      return;
    }

    btn.remove(); // إزالة الزر بعد الإجابة

    if (ans.value === "yes") {
      result.textContent = q.yes;
      result.classList.add("correct");
      result.classList.remove("wrong");
    } else {
      result.textContent = q.no;
      result.classList.add("wrong");
      result.classList.remove("correct");
    }
  });

  // ربط كل العناصر ببعض
  form.appendChild(choices);
  form.appendChild(btn);

  section.appendChild(p);
  section.appendChild(form);
  section.appendChild(result);

  main.appendChild(section);
  container.appendChild(main);
});
