const questions = [
  { text: "are you in grade 8?!??!", yes: "okay", no: "go away" },
  { text: "Is grade 8 good?!??!", yes: "Correct", no: "Wrong" },
];
questions.push({
  text: "Do you like math?",
  yes: "Great!",
  no: "Why not?"
});

// المكان اللي هيتحط فيه الأسئلة تلقائيًا
const container = document.body;

questions.forEach((q, index) => {

  const main = document.createElement("main");
  main.className = "center";

  const section = document.createElement("section");
  section.className = "card";

  const p = document.createElement("p");
  p.className = "question";
  p.textContent = q.text;

  const form = document.createElement("form");
  form.autocomplete = "off";
  form.onsubmit = () => false;

  const choices = document.createElement("div");
  choices.className = "choices";

  const yesLabel = document.createElement("label");
  yesLabel.className = "choice";
  yesLabel.innerHTML = <input type="radio" name="q${index}" value="yes"><span>Yes</span>;

  const noLabel = document.createElement("label");
  noLabel.className = "choice";
  noLabel.innerHTML = <input type="radio" name="q${index}" value="no"><span>No</span>;

  choices.appendChild(yesLabel);
  choices.appendChild(noLabel);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "btn black";
  btn.textContent = "Submit";

  const result = document.createElement("div");
  result.className = "result";

  btn.addEventListener("pointerdown", () => {
    const ans = form.querySelector("input:checked");

    if (!ans) {
      result.textContent = "Choose an answer!";
      result.classList.add("wrong");
      return;
    }

    btn.remove();

    if (ans.value === "yes") {
      result.textContent = q.yes;
      result.classList.add("correct");
    } else {
      result.textContent = q.no;
      result.classList.add("wrong");
    }
  });

  form.appendChild(choices);
  form.appendChild(btn);

  section.appendChild(p);
  section.appendChild(form);
  section.appendChild(result);

  main.appendChild(section);
  container.appendChild(main);
});
