// asser.js

document.addEventListener("DOMContentLoaded", () => {
  try {
    // --- اضف اسئلتك هنا ---
    const questions = [
      { text: "are you in grade 8?!??!", yes: "okay", no: "go away" },
      { text: "Is grade 8 good?!??!", yes: "Correct", no: "Wrong" }
      // مثال لإضافة سؤال جديد:
      // ,{ text: "Do you like math?", yes: "Nice!", no: "Nope!" }
    ];

    // المكان اللي الأسئلة هتتبنى فيه — إذا مش موجود، fallback إلى body
    const container = document.getElementById("square") || document.body;

    // Safety: لو container لسه null (نادراً جداً)، نمنع الكود من الاستمرار
    if (!container) {
      console.error("No container found for questions (expected #square).");
      return;
    }

    // لكل سؤال: بننشئ نفس بنية العناصر مع نفس الكلاسات
    questions.forEach((q, index) => {
      // main wrapper
      const main = document.createElement("main");
      main.className = "center";

      // card section
      const section = document.createElement("section");
      section.className = "card";
      // NOTE: لا نضع id="card" هنا لتجنب duplicate id (لكن لو تريده نستطيع إضافته).
      // نحتفظ بالكلاسات كما هي لأنها تتحكم في الحركة.

      // question text
      const p = document.createElement("p");
      p.className = "question";
      p.textContent = q.text;

      // form
      const form = document.createElement("form");
      form.autocomplete = "off";
      // لا نستخدم onsubmit لتجنب أي submission غير مقصود

      // choices container
      const choices = document.createElement("div");
      choices.className = "choices";

      // yes choice
      const yesLabel = document.createElement("label");
      yesLabel.className = "choice";
      // نستخدم name فريد لكل سؤال q{index} لتفادي تعارضات
      yesLabel.innerHTML = <input type="radio" name="q${index}" value="yes"><span>Yes</span>;

      // no choice
      const noLabel = document.createElement("label");
      noLabel.className = "choice";
      noLabel.innerHTML = <input type="radio" name="q${index}" value="no"><span>No</span>;

      choices.appendChild(yesLabel);
      choices.appendChild(noLabel);

      // submit button
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn black";
      btn.textContent = "Submit";
      // لا نغير أي كلاس لأن CSS يتحكم في الحركة

      // result div
      const result = document.createElement("div");
      result.className = "result";
      result.setAttribute("aria-live", "polite");

      // Event listener: pointerdown و click كfallback
      // نستخدم e.preventDefault() لمنع سلوك الفورم الافتراضي
      const onSubmit = (e) => {
        try {
          e.preventDefault();

          // نبحث فقط داخل الفورم الحالي باستخدام اسم الحقل الخاص بهذا السؤال
          const ans = form.querySelector(input[name="q${index}"]:checked);

          if (!ans) {
            result.textContent = "Choose an answer!";
            result.classList.add("wrong");
            result.classList.remove("correct");
            return;
          }

          // إزالة الزر بعد الاجابة
          if (btn && btn.parentNode) btn.remove();

          // عرض النتيجة
          if (ans.value === "yes") {
            result.textContent = q.yes;
            result.classList.add("correct");
            result.classList.remove("wrong");
          } else {
            result.textContent = q.no;
            result.classList.add("wrong");
            result.classList.remove("correct");
          }
        } catch (err) {
          console.error("Error in onSubmit handler:", err);
        }
      };

      btn.addEventListener("pointerdown", onSubmit, { passive: false });
      btn.addEventListener("click", onSubmit);

      // ربط العناصر
      form.appendChild(choices);
      form.appendChild(btn);

      section.appendChild(p);
      section.appendChild(form);
      section.appendChild(result);

      main.appendChild(section);
      container.appendChild(main);
    });

    // OPTIONAL: keyboard accessibility — Enter on a radio's label will trigger its submit
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        // إذا المؤشر داخل فورم، نضغط الزر الخاص بالفورم القريب
        const activeForm = document.activeElement && document.activeElement.closest && document.activeElement.closest("form");
        if (activeForm) {
          const submitBtn = activeForm.querySelector("button[type='button']");
          if (submitBtn) {
            submitBtn.click();
            e.preventDefault();
          }
        }
      }
    });

    console.log("asser.js loaded — questions rendered:", questions.length);
  } catch (err) {
    console.error("Critical error in asser.js:", err);
  }
});
