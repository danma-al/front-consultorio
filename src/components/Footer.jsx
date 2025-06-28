import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-light text-center py-3 mt-5">
      <p>© 2025 Centro Odontológico. Todos los derechos reservados.</p>
      <p>
        <Link to="/medico-login" style={{ textDecoration: 'none' }}>
          ¿Eres médico? Ingresa aquí
        </Link>
      </p>
    </footer>
  )
}

export default Footer
