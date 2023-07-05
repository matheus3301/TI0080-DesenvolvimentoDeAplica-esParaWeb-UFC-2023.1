function add_question() {
  let questions_div = document.getElementById("questions");
  let questions_child = questions_div.lastElementChild;

  questions_child.insertAdjacentHTML(
    "afterend",
    `
    <select type="text"
            class="form-select form-select-lg mb-3" id="question_${
              questions_div.childElementCount + 1
            }"name="question_${
      questions_div.childElementCount + 1
    }" aria-describedby="helpId" placeholder="Questão ${
      questions_div.childElementCount + 1
    }" required>
    </select>
    `
  );

  let original_select_collection = document.getElementById('question_1').options;
  let select_array = []

  for (var i = 0; i < original_select_collection.length; i++){
    if (original_select_collection[i].value) {
        select_array.push("<option value='" + original_select_collection[i].value + "'>" + original_select_collection[i].text + "</option>")
    }
  }

  document.getElementById(`question_${questions_div.childElementCount}`).innerHTML = select_array.join('');

}
