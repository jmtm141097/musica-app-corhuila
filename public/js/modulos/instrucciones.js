import { instrucciones } from '../funciones/instrucciones';

const instru = document.querySelector('.listado-instrucciones');

if (instru) {
    instru.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const icono = e.target;
            icono.classList.toggle('completo');
            instrucciones();
        }
    });
}