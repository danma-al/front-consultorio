function PaginaInicio() {
  return (
    <>
      {/* Sección: INICIO */}
      <section id="inicio" className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h1>Bienvenido al Centro Radiológico</h1>
          <p className="lead">Tu salud visual odontológica es nuestra prioridad</p>
        </div>
      </section>

      {/* Sección: ¿QUIÉNES SOMOS? */}
      <section id="quienes-somos" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center">¿Quiénes somos?</h2>
          <p className="text-center">
            Somos un centro especializado en estudios radiológicos odontológicos, enfocados en brindar resultados precisos, rápidos y de fácil acceso para pacientes y profesionales de la salud oral.
          </p>
        </div>
      </section>

      {/* Sección: SERVICIOS */}
      <section id="servicios" className="py-5">
        <div className="container">
          <h2 className="text-center">Nuestros servicios</h2>
          <div className="row mt-4">
            <div className="col-md-4 text-center">
              <h5>Radiografía panorámica</h5>
              <p>Imagen completa de la estructura dental y ósea.</p>
            </div>
            <div className="col-md-4 text-center">
              <h5>Radiografía cefalométrica</h5>
              <p>Ideal para planificación ortodóntica.</p>
            </div>
            <div className="col-md-4 text-center">
              <h5>Tomografía dental</h5>
              <p>Estudio detallado en 3D para diagnósticos precisos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: CONTACTO */}
      <section id="contacto" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center">Contáctanos</h2>
          <p className="text-center">
            Estamos ubicados en la Calle 123 #45-67. <br />
            Tel: (1) 234 5678 | WhatsApp: +57 300 123 4567 <br />
            Email: info@centroodontologico.com
          </p>
          <div className="text-center mt-3">
            <a href="/consulta" className="btn btn-primary">
              Consulta tu imagen
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default PaginaInicio
