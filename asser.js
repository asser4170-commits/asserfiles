const questions = [
  {
    text: "Are you in grade 8?!??!",
    yes: "Okay",
    no: "Go away"
  },
  {
    text: "Is grade 8 good?!??!",
    yes: "Correct",
    no: "Wrong"
  },
  {
    text: "which ms is your favorite ms 8?!??!",
    yes: "Okay",
    no: "Go away"
  }
];

const container = document.getElementById("square");

questions.forEach((q) => {
  const card = document.createElement("section");
  card.className = "card";

  const p = document.createElement("p");
  p.className = "question";
  p.textContent = q.text;

  const form = document.createElement("form");
  form.autocomplete = "off";

  const choices = document.createElement("div");
  choices.className = "choices";

  ["yes", "no"].forEach((val) => {
    const label = document.createElement("label");
    label.className = "choice";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = q.text;
    input.value = val;

    const span = document.createElement("span");
    span.textContent = val.toUpperCase();

    label.appendChild(input);
    label.appendChild(span);
    choices.appendChild(label);
  });

  const btn = document.createElement("button");
  btn.className = "btn black";
  btn.textContent = "Submit";
  btn.type = "button";

  const result = document.createElement("div");
  result.className = "result";

  btn.addEventListener("pointerdown", () => {
    const ans = form.querySelector("input:checked");

    if (!ans) {
      result.textContent = "Choose an answer!";
      result.className = "result wrong";
      return;
    }

    btn.remove();

    if (ans.value === "yes") {
      result.textContent = q.yes;
      result.className = "result correct";
    } else {
      result.textContent = q.no;
      result.className = "result wrong";
    }
  });

  form.appendChild(choices);
  form.appendChild(btn);

  card.appendChild(p);
  card.appendChild(form);
  card.appendChild(result);

  container.appendChild(card);
});
