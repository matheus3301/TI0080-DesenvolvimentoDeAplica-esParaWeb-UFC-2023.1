const form = document.getElementById("form_submit_question");
form.addEventListener("submit", submit_question);

async function submit_question(event) {
    event.preventDefault();
    let method = ""
    form_name = form.getAttribute('name')
    if (form_name == "create"){
      method="POST"
    } else if (form_name == "edit"){
      method="PUT"
    }

    let id = document.getElementById('id')?.value;
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let profilePictureUrl = document.getElementById('profilePictureUrl').value;
    let post_json = {
        name: name,
        email: email,
        profilePictureUrl: profilePictureUrl,
    }

    let id_url = '';

    if (method == "POST"){
      let password = document.getElementById('password').value;
      let confirmPassword = document.getElementById('confirmPassword').value;
      post_json.confirmPassword = confirmPassword;
      post_json.password = password;
    } else {
      id_url = `/${id}`;
    }

    let xmlhttp = new XMLHttpRequest();
    let apiUrl = "http://localhost:7777/students" + id_url;

    xmlhttp.open(method, apiUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(post_json));
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200 || this.status == 201) {
          alert(`Estudante ${method == "POST" ? 'cadastrado' : 'atualizado'} com sucesso!`);
          location.reload();
      } else if (this.readyState == 4 && this.status != 200 || this.status == 201) {
          alert('Erro no cadastro do estudante!');
      }
  };
}

window.addEventListener('DOMContentLoaded', (event) => { // Get the necessary elements
    const urlInput = document.getElementById('profilePictureUrl');
    const imgElement = document.getElementById('profilePicture');
    // Add event listener to the input field
    urlInput.addEventListener('input', (event) => {
      let newSrc = event.target.value;
      if (newSrc.trim() == '') {
        newSrc = '/img/defaultuser.png';
      }
      imgElement.src = newSrc;
    });
  });