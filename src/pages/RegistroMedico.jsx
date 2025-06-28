import { useState } from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'


function RegistroMedico() {
  const [nombre, setNombre] = useState('')
  const [usuario, setUsuario] = useState('')
  const [email, setEmail] = useState('')
  const [clave, setClave] = useState('')

  const handleRegistro = async () => {
    if (!nombre || !usuario || !clave) {
      Swal.fire('Error', 'Por favor completa los campos obligatorios', 'error')
      return
    }

    // Verificar si el usuario ya existe
    const respuesta = await fetch('https://api-consultorio-i3u6.onrender.com/medicos')
    const medicos = await respuesta.json()
    const existe = medicos.some(m => m.usuario === usuario)

    if (existe) {
      Swal.fire('Error', 'El usuario ya está registrado', 'warning')
      return
    }

    const nuevoMedico = {
      id: crypto.randomUUID(),
      nombre,
      usuario,
      email,
      clave
    }

    await fetch('https://api-consultorio-i3u6.onrender.com/medicos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoMedico)
    })

    Swal.fire('Registro exitoso', 'Ya puedes iniciar sesión', 'success').then(() => {
      window.location.href = '/medico-login'
    })
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Registro de Médico</h2>

      <input
        className="form-control mb-3"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Correo electrónico (opcional)"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="form-control mb-4"
        placeholder="Contraseña"
        type="password"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />

      <button className="btn btn-success w-100" onClick={handleRegistro}>
        Registrarse
      </button>

      <p className="mt-3 text-center">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/medico-login" style={{ color: '#007bff' }}>
          Inicia sesión
        </Link>
      </p>
    </div>
  )
}

export default RegistroMedico
