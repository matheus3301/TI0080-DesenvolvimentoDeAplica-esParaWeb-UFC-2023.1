async function submit_question(event) {
    event.preventDefault();
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let profilePictureUrl = document.getElementById('profilePictureUrl').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let post_json = {
        name: name,
        email: email,
        profilePictureUrl: profilePictureUrl,
        password: password,
        confirmPassword: confirmPassword,
    }

    let xmlhttp = new XMLHttpRequest();
    let apiUrl = "http://localhost:7777/students";
    xmlhttp.open("POST", apiUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(post_json));

    alert('Estudante criado com sucesso!');
    location.reload();
}

const form = document.getElementById("form_submit_question");
form.addEventListener("submit", submit_question);

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