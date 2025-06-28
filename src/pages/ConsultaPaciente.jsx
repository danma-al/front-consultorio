import { useState } from 'react'
import Swal from 'sweetalert2'

function ConsultaPaciente() {
  const [cedula, setCedula] = useState('')
  const [fechaExpedicion, setFechaExpedicion] = useState('')
  const [pacienteAutenticado, setPacienteAutenticado] = useState(null)

  const handleLogin = async () => {
    if (!cedula || !fechaExpedicion) {
      Swal.fire('Error', 'Debes ingresar todos los campos', 'error')
      return
    }

    // Mostrar mensaje de carga
    Swal.fire({
      title: 'Consultando datos...',
      timer: 1000,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: async () => {
        const res = await fetch('https://api-consultorio-i3u6.onrender.com/pacientes')
        const pacientes = await res.json()

        const paciente = pacientes.find(
          (p) => p.cedula === cedula && p.fechaExpedicion === fechaExpedicion
        )

        if (paciente) {
          setPacienteAutenticado(paciente)
        } else {
          Swal.fire('No encontrado', 'Datos incorrectos o paciente no registrado', 'error')
        }
      }
    })
  }

  const handleCerrarSesion = () => {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Cerrando sesión...',
          timer: 1000,
          didOpen: () => {
            Swal.showLoading()
          },
          willClose: () => {
            setPacienteAutenticado(null)
            setCedula('')
            setFechaExpedicion('')
          }
        })
      }
    })
  }

  return (
    <div className="container mt-5">
      {!pacienteAutenticado ? (
        <>
          <h2>Consulta tu imagen</h2>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Cédula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
          <input
            type="date"
            className="form-control mb-3"
            placeholder="Fecha de expedición"
            value={fechaExpedicion}
            onChange={(e) => setFechaExpedicion(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleLogin}>
            Ingresar
          </button>
        </>
      ) : (
        <div className="text-center">
          <h2>Hola, {pacienteAutenticado.nombre}</h2>
          <p>Cédula: {pacienteAutenticado.cedula}</p>

          {pacienteAutenticado.imagen ? (
            <div className="mt-3">
              <p><strong>Tu imagen:</strong></p>
              <a href={pacienteAutenticado.imagen} target="_blank" rel="noopener noreferrer">
                <img
                  src={pacienteAutenticado.imagen}
                  alt="Radiografía"
                  style={{ maxWidth: '300px', borderRadius: '6px' }}
                />
              </a>
            </div>
          ) : (
            <p>No tienes imagen registrada aún.</p>
          )}

          <button className="btn btn-danger mt-4" onClick={handleCerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

export default ConsultaPaciente
