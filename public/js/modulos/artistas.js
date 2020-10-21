import Swal from 'sweetalert2';

import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-artista');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        const urlArtista = e.target.dataset.artistaUrl;

        Swal.fire({
            title: 'Quieres eliminar el artista?',
            text: "Si se elimina, se pierde la informacion registrada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrarlo!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.value) {
                const url = `${location.origin}/artista/${urlArtista}`;

                axios.delete(url, { params: { urlArtista } })
                    .then(function(respuesta) {
                        console.log(respuesta);

                        Swal.fire(
                            'Artista Borrado!',
                            respuesta.data,
                            'success'
                        );

                        setTimeout(() => {
                            window.location.href = '/artistas';
                        }, 2000);
                    })
                    .catch(() => {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el artista',
                            icon: 'error'
                        });
                    });
            }
        });
    });
}

export default btnEliminar;