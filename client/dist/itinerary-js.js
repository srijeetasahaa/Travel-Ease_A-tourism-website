const toggleBtn = document.querySelector ('.toggle-nav');
const dropDownMenu = document.querySelector ('.dropdown-menu');

toggleBtn.onclick = function () {
    dropDownMenu.classList.toggle('open');
    
}