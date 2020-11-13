import axios from 'axios';

const letrasBuscador = document.querySelector('.letrasBuscador');
if (letrasBuscador) {

    letrasBuscador.addEventListener('click', e => {
        if (e.target.classList.contains('visitasBuscador')) {
            const target = e.target;
            const idLetra = target.dataset.letra;
            console.log(idLetra);
            const url = `${location.origin}/letras/${idLetra}`
            axios.patch(url, { idLetra })
                .then((respuesta) => {
                    alert('Ocurrio un error inesperado: \n' + respuesta);
                });
        }
    });

}

export default letrasBuscador;