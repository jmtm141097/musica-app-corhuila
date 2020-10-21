import Swal from 'sweetalert2';

import axios from 'axios';

const btnEliminarGrupo = document.querySelector('#eliminar-grupo');

if (btnEliminarGrupo) {
    btnEliminarGrupo.addEventListener('click', e => {
        const urlGrupo = e.target.dataset.grupoUrl;

        Swal.fire({
            title: 'Quieres eliminar el grupo?',
            text: "Si se elimina, se pierde la informacion registrada!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrarlo!',
            cancelButtonText: 'Cancelar!'
        }).then((result) => {
            if (result.value) {
                const url = `${location.origin}/grupo/${urlGrupo}`;

                axios.delete(url, { params: { urlGrupo } })
                    .then(function(respuesta) {
                        console.log(respuesta);

                        Swal.fire(
                            'Grupo Borrado!',
                            respuesta.data,
                            'success'
                        );

                        setTimeout(() => {
                            window.location.href = '/grupos';
                        }, 2000);
                    })
                    .catch(() => {
                        Swal.fire({
                            type: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el grupo',
                            icon: 'error'
                        });
                    });
            }
        });
    });
}

export default btnEliminarGrupo;