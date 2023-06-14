function add_alternative() {
    let alternatives_div = document.getElementById('alternatives');
    let alternatives_child = alternatives_div.lastElementChild;

    if (alternatives_div.childElementCount <= 2) {
        alternatives_child.insertAdjacentHTML('afterend', `
            <input type="text"
            class="form-control mb-3" id="alternative_${alternatives_div.childElementCount + 1}" aria-describedby="helpId" placeholder="Alternativa ${alternatives_div.childElementCount + 1}" required>
        `)
    } else if (alternatives_div.childElementCount == 3)  {
        alternatives_child.insertAdjacentHTML('afterend', `
            <input type="text"
            class="form-control mb-3" id="alternative_${alternatives_div.childElementCount + 1}" aria-describedby="helpId" placeholder="Alternativa ${alternatives_div.childElementCount + 1}" required>
        `)
        let button = document.getElementById('button-function');
        button.classList.add('disabled')
    }
}

async function submit_question(event) {
    event.preventDefault();
    let title = document.getElementById('question_title').value;
    let statement = document.getElementById('question_statement').value;
    let alternatives = document.getElementById('alternatives');
    let post_json = {
        title: title,
        teacher: 4,
        statement: statement,
        choices: [
        ]
    }
    for (const child of alternatives.children) {

        post_json.choices.push(
            {
                value: child.value,
                isCorrect: child.id == 'alternative_1' ? true : false
            }
        )
    }

    let xmlhttp = new XMLHttpRequest();
    let apiUrl = "http://localhost:7777/questions";
    xmlhttp.open("POST", apiUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(post_json));
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('Questão criada com sucesso!');
            location.reload();
        } else if (this.readyState == 4 && this.status != 200) {
            alert('Erro na criação da questão!');
        }
    };
}

const form = document.getElementById("form_submit_question");
form.addEventListener("submit", submit_question);