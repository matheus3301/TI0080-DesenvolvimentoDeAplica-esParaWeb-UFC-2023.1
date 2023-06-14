function delete_student(id) {
  var result = confirm("Tem certeza que deseja deletar?");
  if (result) {
    let xmlhttp = new XMLHttpRequest();
    let apiUrl = `http://localhost:7777/students/${id}`;
  
    xmlhttp.open("DELETE", apiUrl);
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 204) {
        alert(`Estudante deletado com sucesso!`);
        location.reload();
      } else if (this.readyState == 4 && this.status != 204) {
        alert("Erro ao deletar estudante!");
      }
    };
    xmlhttp.send();
  }
}
  