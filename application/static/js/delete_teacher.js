function delete_teacher(id) {
  var result = confirm('Tem certeza que deseja deletar?');
  if (result) {
    let xmlhttp = new XMLHttpRequest();
    let apiUrl = `http://localhost:7777/teachers/${id}`;

    xmlhttp.open('DELETE', apiUrl);
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 204) {
        alert(`Professor deletado com sucesso!`);
        location.reload();
      } else if (this.readyState == 4 && this.status != 204) {
        alert('Erro ao deletar professor!');
      }
    };
    xmlhttp.send();
  }
}
