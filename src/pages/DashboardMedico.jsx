import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { FaSearch, FaSignOutAlt } from 'react-icons/fa'

function DashboardMedico() {
    const [pacientes, setPacientes] = useState([])
    const [nombre, setNombre] = useState('')
    const [cedula, setCedula] = useState('')
    const [fechaExpedicion, setFechaExpedicion] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [idEdicion, setIdEdicion] = useState(null)
    const [seccion, setSeccion] = useState('registro')

    const [cedulaBusqueda, setCedulaBusqueda] = useState('')
    const [pacienteEncontrado, setPacienteEncontrado] = useState(null)
    const [imagen, setImagen] = useState(null)

    const medicoActual = JSON.parse(localStorage.getItem('medicoActual'))

    useEffect(() => {
        fetch('https://api-consultorio-i3u6.onrender.com/pacientes')
            .then((res) => res.json())
            .then((data) => {
                const filtrados = data.filter(p => p.medicoId === medicoActual?.id)
                setPacientes(filtrados)
            })
    }, [])

    const handleAgregarActualizarPaciente = async () => {
        if (!nombre || !cedula || !fechaExpedicion) {
            Swal.fire('Error', 'Todos los campos son obligatorios', 'error')
            return
        }

        const datosPaciente = {
            nombre,
            cedula,
            fechaExpedicion,
            medicoId: medicoActual?.id,
        }

        if (modoEdicion) {
            await fetch(`https://api-consultorio-i3u6.onrender.com/pacientes/${idEdicion}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...datosPaciente,
                    imagen: pacientes.find((p) => p.id === idEdicion)?.imagen || '',
                }),
            })
            Swal.fire('Actualizado', 'Paciente actualizado', 'success')
        } else {
            const res = await fetch('https://api-consultorio-i3u6.onrender.com/pacientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...datosPaciente, imagen: '' }),
            })
            const nuevo = await res.json()
            setPacientes([...pacientes, nuevo])
            Swal.fire('Registrado', 'Paciente agregado', 'success')
        }

        limpiarFormulario()
        setSeccion('lista')
        recargarPacientes()
    }

    const limpiarFormulario = () => {
        setNombre('')
        setCedula('')
        setFechaExpedicion('')
        setModoEdicion(false)
        setIdEdicion(null)
    }

    const recargarPacientes = () => {
        fetch('https://api-consultorio-i3u6.onrender.com/pacientes')
            .then((res) => res.json())
            .then((data) => {
                const filtrados = data.filter(p => p.medicoId === medicoActual?.id)
                setPacientes(filtrados)
            })
    }

    const handleEliminar = (id) => {
        Swal.fire({
            title: '¿Eliminar paciente?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            icon: 'warning',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch(`https://api-consultorio-i3u6.onrender.com/pacientes/${id}`, {
                    method: 'DELETE',
                })
                Swal.fire('Eliminado', 'Paciente eliminado', 'success')
                recargarPacientes()
            }
        })
    }

    const handleEditar = (paciente) => {
        setNombre(paciente.nombre)
        setCedula(paciente.cedula)
        setFechaExpedicion(paciente.fechaExpedicion)
        setIdEdicion(paciente.id)
        setModoEdicion(true)
        setSeccion('registro')
    }

    const handleBuscarPaciente = () => {
        const encontrado = pacientes.find((p) => p.cedula === cedulaBusqueda)
        if (encontrado) {
            setPacienteEncontrado(encontrado)
        } else {
            Swal.fire('No encontrado', 'Paciente no registrado', 'error')
            setPacienteEncontrado(null)
        }
    }

    const handleBuscarEnter = (e) => {
        if (e.key === 'Enter') {
            handleBuscarPaciente()
        }
    }

    const handleGuardarImagen = async () => {
        if (!pacienteEncontrado || !imagen) {
            Swal.fire('Error', 'Debes seleccionar una imagen', 'error')
            return
        }

        await fetch(`https://api-consultorio-i3u6.onrender.com/pacientes/${pacienteEncontrado.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...pacienteEncontrado, imagen }),
        })

        Swal.fire('Guardado', 'Imagen actualizada', 'success')
        setImagen(null)
        setCedulaBusqueda('')
        setPacienteEncontrado(null)
        recargarPacientes()
        setSeccion('lista')
    }

    const handleCerrarSesion = () => {
        Swal.fire({
            title: '¿Deseas cerrar sesión?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/medico-login'
            }
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3 bg-light vh-100 p-3">
                    <h4>Panel Médico</h4>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={() => setSeccion('registro')}>
                                Registrar paciente
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={() => setSeccion('imagen')}>
                                Subir imagen
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={() => setSeccion('lista')}>
                                Ver pacientes
                            </button>
                        </li>
                        <li className="nav-item mt-4">
                            <button className="btn btn-danger w-100" onClick={handleCerrarSesion}>
                                <FaSignOutAlt /> Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="col-md-9 p-4">
                    {seccion === 'registro' && (
                        <>
                            <h2>{modoEdicion ? 'Actualizar paciente' : 'Registrar nuevo paciente'}</h2>
                            <input className="form-control mb-2" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            <input className="form-control mb-2" placeholder="Cédula" value={cedula} onChange={(e) => setCedula(e.target.value)} />
                            <input className="form-control mb-3" type="date" value={fechaExpedicion} onChange={(e) => setFechaExpedicion(e.target.value)} />
                            <button className="btn btn-primary" onClick={handleAgregarActualizarPaciente}>
                                {modoEdicion ? 'Actualizar' : 'Registrar'}
                            </button>
                        </>
                    )}

                    {seccion === 'imagen' && (
                        <>
                            <h2>Subir imagen para paciente</h2>
                            <div className="input-group mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Cédula del paciente"
                                    value={cedulaBusqueda}
                                    onChange={(e) => setCedulaBusqueda(e.target.value)}
                                    onKeyDown={handleBuscarEnter}
                                />
                                <button className="btn btn-outline-secondary" onClick={handleBuscarPaciente}>
                                    <FaSearch />
                                </button>
                            </div>

                            {pacienteEncontrado && (
                                <div className="card p-3 mb-3">
                                    <h5>{pacienteEncontrado.nombre}</h5>
                                    <p>Cédula: {pacienteEncontrado.cedula}</p>
                                    {pacienteEncontrado.imagen && (
                                        <div className="mb-2">
                                            <p><strong>Imagen actual:</strong></p>
                                            <a href={pacienteEncontrado.imagen} target="_blank" rel="noopener noreferrer">
                                                <img src={pacienteEncontrado.imagen} alt="Radiografía" style={{ width: '300px' }} />
                                            </a>
                                        </div>
                                    )}
                                    <input type="text" className="form-control mb-2" placeholder="URL de imagen" onChange={(e) => setImagen(e.target.value)} />
                                    <button className="btn btn-success" onClick={handleGuardarImagen}>Guardar imagen</button>
                                </div>
                            )}
                        </>
                    )}

                    {seccion === 'lista' && (
                        <>
                            <h2>Pacientes registrados</h2>

                            <div className="input-group mb-3">
                                <input
                                    className="form-control"
                                    placeholder="Buscar por cédula"
                                    value={cedulaBusqueda}
                                    onChange={(e) => setCedulaBusqueda(e.target.value)}
                                />
                            </div>

                            <ul className="list-group">
                                {pacientes
                                    .filter((p) =>
                                        p.cedula.toLowerCase().includes(cedulaBusqueda.toLowerCase())
                                    )
                                    .map((p) => (
                                        <li
                                            key={p.id}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <div>
                                                <strong>{p.nombre}</strong> - {p.cedula}
                                                {p.imagen && (
                                                    <div className="mt-2">
                                                        <a
                                                            href={p.imagen}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <img
                                                                src={p.imagen}
                                                                alt="Radiografía"
                                                                style={{
                                                                    width: '120px',
                                                                    height: 'auto',
                                                                    borderRadius: '4px',
                                                                }}
                                                            />
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => handleEditar(p)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleEliminar(p.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </>
                    )}


                </div>
            </div>
        </div>
    )
}

export default DashboardMedico
