import axios from 'axios';

const letras = document.querySelector('.letras');

console.log(letras);

if (letras) {

    letras.addEventListener('click', e => {

        if (e.target.classList.contains('visitas')) {
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
export default letras;