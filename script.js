// script.js
function loadModule(name) {
    const content = document.getElementById('module-content');
    switch (name) {
      case 'sorting':
        content.innerHTML = sortingModule();
        break;
      case 'searching':
        content.innerHTML = searchingModule();
        break;
      case 'trees':
        content.innerHTML = treesModule();
        break;
      case 'linkedlist':
        content.innerHTML = linkedListModule();
        break;
      case 'graph':
        content.innerHTML = graphModule();
        break;

      case 'stack':
        content.innerHTML = stackModule();
        break;
      case 'queue':
        content.innerHTML = queueModule();
        break;
      default:
        content.innerHTML = '<p>Module not found</p>';
    }
  }
  
  function toggleInstructions(id) {
    const box = document.getElementById(id);
    box.style.display = box.style.display === "none" ? "block" : "none";
  }
  function updateOperationDisplay(count) {
    const display = document.getElementById("operationDisplay");
    if (display) display.textContent = `Operations: ${count}`;
  }
  