function showFile() {
    var input = document.querySelector("#fileInput");
    var fileNameDisplay = document.querySelector("#fileNameDisplay");
  
    if (input.files.length > 0) {
      fileNameDisplay.textContent = `${input.files[0].name}`;
      fileNameDisplay.classList.remove('hidden');
     
    } else {
      fileNameDisplay.classList.add('hidden');
      fileNameDisplay.textContent = '';
    }
}
  