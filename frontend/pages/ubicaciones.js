import "@fontsource/roboto"
import { MdDeleteForever } from "react-icons/md"
import styles from "../styles/Ubicaciones.module.css"
import { IoMdAdd } from "react-icons/io"
import Header from "../components/Header/header"
import MenuLateral from "../components/MenuLateral/menulateral"
import React, {useState} from "react"
import Swal from 'sweetalert2'
import ReactLoading from "react-loading";

export default function Ubicaciones(resultado) {
    const [nombreUbicacion, setNombreUbicacion] = useState('');
    const [usuarioId, setUsuaroId] = useState('');
    const [cargando, setCargando] = useState(false);
    const [ubicaciones, setUbicaciones] = useState(resultado.ubicaciones.datos);

    const crearUbicacion = async() => {
        setCargando(true)

        const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ubicaciones`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: nombreUbicacion,
                usuario_id: usuarioId,
            }),
        });

        if(respuesta.status === 201) {
            setCargando(false)
            setNombreUbicacion("")
            setUsuaroId("")
            const listUbicaciones = await obtenerUbicaciones()
            setUbicaciones(listUbicaciones.datos)

            Swal.fire({
                title: '<p>Creado</p>',
                text: 'Se creó correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            })
        }
    }

    const obtenerUbicaciones = async() => {
        const respuestaAPI = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ubicaciones/1`)
        return await respuestaAPI.json()
    }

    return (
        <main className={styles.main}>
            <Header />
            <MenuLateral />
            <h1 className={styles.titulo_pagina}>Ubicaciones</h1>
            <div className={styles.body_table}>
                <div className={styles.row_header} key={"titulo"}>
                    <div className={styles.cell_header}>ID</div>
                    <div className={styles.cell_header}>Nombre</div>
                    <div className={styles.cell_header}>Usuario id</div>
                    <div className={styles.cell_header}>Opciones</div>
                </div>

                {
                    ubicaciones.map((ubicacion, index) => {
                        return (
                            <div className={styles.row_header} key={`contenido_${index}`}>
                                <div className={styles.cell_header}>{ubicacion.id}</div>
                                <div className={styles.cell_header}>{ubicacion.nombre}</div>
                                <div className={styles.cell_header}>{ubicacion.usuario_id}</div>
                                <div className={styles.cell_header}><MdDeleteForever className={styles.icono} /></div>
                            </div>
                        )
                    })
                }

                <div className={styles.row_header}>
                    <div className={styles.cell_header}>
                        
                    </div>
                    <div>
                        <input 
                            value={nombreUbicacion}
                            onChange={event => setNombreUbicacion(event.target.value)}
                        ></input>
                    </div>
                    <div>
                        <input
                            value={usuarioId}
                            onChange={event => setUsuaroId(event.target.value)}
                        ></input>
                    </div>
                    <div className={styles.cell_header}>
                        {cargando ? (<ReactLoading type={"spin"} color={"white"} height={20} width={20} />) : <IoMdAdd className={styles.icono} onClick={() => crearUbicacion()} /> }
                    </div>
                </div>
            </div>
        </main>
    );
}

/**
 * Renderización
 */
export const getServerSideProps = async() => {
    const respuestaAPI = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ubicaciones/1`)
    const ubicaciones = await respuestaAPI.json()

    return {
        props: {
            ubicaciones,
        },
    }
}