function toggleAside() {
    const aside = document.getElementById("side-panel");
    const arrow = document.getElementById("arrowBtn");
    const arrowBar = document.getElementById("arrowBar");

    aside.classList.toggle("hidden");

    if (aside.classList.contains("hidden")) {
      arrow.innerText = "→";
      arrowBar.classList.add("hidden");
    } else {
      arrow.innerText = "←";
      arrowBar.classList.remove("hidden");
    }
  }

  function createFile() {
    const fileName = prompt("Ingrese el nombre del archivo:");
    const description = prompt("Ingrese una descripción para el archivo:");
    const tags = prompt("Ingrese etiquetas separadas por comas:");
    if (fileName) {
      alert(`Archivo "${fileName}" creado con éxito.`);
    }
  }

  function openFile() {
    alert("Seleccione un archivo para abrir.");
  }

  function importFile() {
    alert("Importar archivo desde el dispositivo.");
  }

  function exportFile() {
    alert("Exportar archivo seleccionado en formato Excel.");
  }

  function createFolder() {
    const folderName = prompt("Ingrese el nombre de la carpeta:");
    const description = prompt("Ingrese una descripción para la carpeta:");
    const tags = prompt("Ingrese etiquetas separadas por comas:");
    if (folderName) {
      alert(`Carpeta "${folderName}" creada con éxito.`);
    }
  }

  function openFolder() {
    alert("Seleccione una carpeta para abrir.");
  }

  function pinItem() {
    alert("Elemento fijado.");
  }

  function unpinItem() {
    alert("Elemento desfijado.");
  }

  function viewFileInfo() {
    alert("Mostrando información del archivo.");
  }

  function createTag() {
    const tagName = prompt("Ingrese el nombre de la etiqueta:");
    const tagColor = prompt("Ingrese el color de la etiqueta (en formato hexadecimal):");
    if (tagName && tagColor) {
      alert(`Etiqueta "${tagName}" creada con éxito.`);
    }
  }

  function deleteTag() {
    alert("Seleccione una etiqueta para borrar.");
  }

  function deleteItem() {
    alert("Seleccione un archivo o carpeta para borrar.");
  }

// Función para mostrar la pestaña correspondiente al hacer clic

function showTab(index) {
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content div');

  tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
  });

  contents.forEach((content, i) => {
      content.classList.toggle('active', i === index);
  });
}

const folderInput = document.getElementById('folderInput');
const fileList = document.getElementById('fileList');

folderInput.addEventListener('change', (event) => {
  fileList.innerHTML = ''; // Limpiar la lista de archivos
  const files = Array.from(event.target.files);

  const folderStructure = {};

  files.forEach(file => {
      const pathParts = file.webkitRelativePath.split('/');
      let currentLevel = folderStructure;

      pathParts.forEach((part, index) => {
          if (!currentLevel[part]) {
              currentLevel[part] = index === pathParts.length - 1 ? null : {};
          }
          currentLevel = currentLevel[part];
      });
  });

  function createList(structure) {
      const ul = document.createElement('ul');
      for (const key in structure) {
          const li = document.createElement('li');
          const toggleBtn = document.createElement('span');
          toggleBtn.textContent = structure[key] ? '▶' : ''; // Flecha derecha
          toggleBtn.className = 'toggle-btn';
          toggleBtn.onclick = () => {
              const childUl = li.querySelector('ul');
              if (childUl) {
                  const isHidden = childUl.classList.toggle('hidden');
                  toggleBtn.textContent = isHidden ? '▶' : '▼'; // Alternar flecha
              }
          };

          li.appendChild(toggleBtn);
          li.appendChild(document.createTextNode(key));

          if (structure[key]) {
              const childUl = createList(structure[key]);
              childUl.classList.add('hidden'); // Ocultar inicialmente
              li.appendChild(childUl);
          }

          ul.appendChild(li);
      }
      return ul;
  }

  fileList.appendChild(createList(folderStructure));
});