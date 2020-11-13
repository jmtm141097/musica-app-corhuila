import Swal from 'sweetalert2';

export const instrucciones = () => {

    const instrucciones = document.querySelectorAll('li.instruccion');

    const instruccionesCompletadas = document.querySelectorAll('i.completo');

    const avance = Math.round((instruccionesCompletadas.length / instrucciones.length) * 100);

    const porcentaje = document.querySelector('#porcentaje');

    porcentaje.style.width = avance + '%';

    if (avance == 100) {
        Swal.fire(
            'Instrucciones completadas',
            'Felicidades, ahora puedes disfrutar del aplicativo',
            'success'
        )
    }

}