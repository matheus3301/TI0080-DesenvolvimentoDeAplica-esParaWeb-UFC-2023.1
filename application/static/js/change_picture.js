window.addEventListener('DOMContentLoaded', (event) => {
    // Get the necessary elements
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