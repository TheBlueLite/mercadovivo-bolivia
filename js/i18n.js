let currentLang = localStorage.getItem('app_lang') || 'es';

async function loadLanguage(lang) {
  try {
    const response = await fetch(`./assets/i18n/${lang}.json`);
    const translations = await response.json();
    
    // Buscar todos los elementos HTML con el atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        if (element.tagName === 'INPUT' && element.placeholder) {
          element.placeholder = translations[key];
        } else {
          element.textContent = translations[key];
        }
      }
    });

    localStorage.setItem('app_lang', lang);
    currentLang = lang;
  } catch (error) {
    console.error('Error cargando el archivo de idioma:', error);
  }
}

// Inicializar al cargar el documento
document.addEventListener('DOMContentLoaded', () => {
  loadLanguage(currentLang);
});
