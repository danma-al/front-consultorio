import { useState } from 'react'
import Swal from 'sweetalert2'

function LoginMedico() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')

  const handleLogin = async () => {
    if (!usuario || !clave) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error')
      return
    }

    Swal.fire({
      title: 'Verificando credenciales...',
      timer: 1000,
      didOpen: () => {
        Swal.showLoading()
      },
      willClose: async () => {
        const res = await fetch('https://api-consultorio-i3u6.onrender.com/medicos')
        const medicos = await res.json()
        const encontrado = medicos.find(m => m.usuario === usuario && m.clave === clave)

        if (encontrado) {
          localStorage.setItem('medicoActual', JSON.stringify(encontrado))
          window.location.href = '/dashboard-medico'
        }
        else {
          Swal.fire('Acceso denegado', 'Credenciales incorrectas', 'error')
        }
      }
    })
  }

  return (
    <div className="container mt-5">
      <h2>Ingreso Médico</h2>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="password"
        className="form-control mb-3"
        placeholder="Contraseña"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />
      <p className="mt-3">
        ¿No estás registrado?{' '}
        <a href="/registro-medico" style={{ color: '#007bff' }}>Regístrate aquí</a>
      </p>

      <button className="btn btn-primary" onClick={handleLogin}>
        Ingresar
      </button>

    </div>
  )
}

export default LoginMedico
