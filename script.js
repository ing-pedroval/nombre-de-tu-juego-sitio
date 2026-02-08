const nav = document.getElementById('navItems');
const input = document.getElementById('temaInput');
const addBtn = document.getElementById('addTemaBtn');
const contentArea = document.getElementById('contentArea');

// Mostrar página por ID y ocultar las demás
function mostrarPagina(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('visible'));
  const target = document.getElementById(id);
  if (target) target.classList.add('visible');

  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const activeLink = document.querySelector(`[data-page="${id}"]`);
  if (activeLink) activeLink.classList.add('active');
}

// Evento para enlaces de navegación
nav.addEventListener('click', function (e) {
  if (e.target.classList.contains('nav-link')) {
    e.preventDefault();
    const pageId = e.target.getAttribute('data-page');
    mostrarPagina(pageId);
  }
});

// Agregar nueva "página"
addBtn.addEventListener('click', () => {
  const tema = input.value.trim();
  if (tema === '') return;

  const idTema = tema.toLowerCase().replace(/\s+/g, '-');

  // Crear enlace
  const link = document.createElement('a');
  link.href = '#';
  link.className = 'nav-link';
  link.textContent = tema;
  link.setAttribute('data-page', idTema);
  nav.appendChild(link);

  // Crear sección
  const section = document.createElement('div');
  section.className = 'page';
  section.id = idTema;
  section.innerHTML = `
    <h1>${tema}</h1>
    <p>Andamos pobres de ppto</p>
  `;
  contentArea.appendChild(section);

  // Mostrar la nueva página inmediatamente
  mostrarPagina(idTema);
  input.value = '';
});
