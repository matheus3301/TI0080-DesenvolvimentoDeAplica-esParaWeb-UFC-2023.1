function add_alternative() {
    let alternatives_div = document.getElementById('alternatives');
    let alternatives_child = alternatives_div.lastElementChild;
  
    if (alternatives_div.childElementCount <= 2) {
      alternatives_child.insertAdjacentHTML(
        'afterend',
        `
              <input type="text"
              class="form-control mb-3" id="alternative_${
                alternatives_div.childElementCount + 1
              }"name="alternative_${
                alternatives_div.childElementCount + 1
              }" aria-describedby="helpId" placeholder="Alternativa ${
          alternatives_div.childElementCount + 1
        }" required>
          `
      );
    } else if (alternatives_div.childElementCount == 3) {
      alternatives_child.insertAdjacentHTML(
        'afterend',
        `
              <input type="text"
              class="form-control mb-3" id="alternative_${
                alternatives_div.childElementCount + 1
              }" name="alternative_${
                alternatives_div.childElementCount + 1
              }" aria-describedby="helpId" placeholder="Alternativa ${
          alternatives_div.childElementCount + 1
        }" required>
          `
      );
      let button = document.getElementById('button-function');
      button.classList.add('disabled');
    }
  }