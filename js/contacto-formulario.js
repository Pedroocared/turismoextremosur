document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('miFormulario');
  const btn = document.getElementById('button');

  document.getElementById('miFormulario')
  .addEventListener('submit', function(event) {
    event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_tgwulpr';

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Send Email';
        alert('Sent!');
      }, (err) => {
        btn.value = 'Send Email';
        alert(JSON.stringify(err));
      });
  });

  // Función para limpiar los campos del formulario
  function limpiarCampos() {
    formulario.reset(); // Restablece los campos del formulario
  }

  // Evento para limpiar los campos después de enviar el formulario
  formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

    // Envía el formulario
    enviarFormulario();

    // Espera 1 segundo (1000 milisegundos) antes de limpiar los campos
    setTimeout(limpiarCampos, 1000);
  });

  // Función para enviar el formulario
  function enviarFormulario() {
    // Aquí puedes realizar cualquier acción adicional antes de enviar el formulario
    formulario.submit(); // Envía el formulario
  }
});
