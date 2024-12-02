import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/Nosotros.css';

const Nosotros = () => {
    return (
        <main className="about-us">
            <Container className="my-5">
                <h1 className="text-center mb-4">Conoce a Bettpplay</h1>

                <Row className="mb-5">
                    <Col md={6}>
                        <Card className="p-4 shadow-lg border-0 rounded-4">
                            <Card.Title className="d-flex align-items-center">
                                <i className="fas fa-bullseye fs-3 me-3 icon"></i>
                                Misión
                            </Card.Title>
                            <Card.Body>
                                <p>
                                    En Bettpplay, nuestra misión es ofrecer a nuestros clientes una experiencia de compra única,
                                    brindando productos de calidad y un servicio excepcional que haga cada visita memorable.
                                    Queremos ser el centro comercial de referencia para todos los estilos de vida.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="p-4 shadow-lg border-0 rounded-4">
                            <Card.Title className="d-flex align-items-center">
                                <i className="fas fa-eye fs-3 me-3 icon"></i>
                                Visión
                            </Card.Title>
                            <Card.Body>
                                <p>
                                    Nuestra visión es ser el centro comercial más innovador y accesible, con una amplia variedad de
                                    productos y servicios. Aspiramos a expandir nuestras categorías y mantenernos a la vanguardia de las
                                    necesidades y deseos de nuestros clientes.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <section className="text-center">
                    <h2 className="mb-4 section-title">
                        <i className="fas fa-location fs-3 me-2"></i>
                        Ubicación
                    </h2>
                    <Row className="mb-3">
                        <Col md={12} className="d-flex align-items-center justify-content-center">
                            <p className="location-text">
                                Psj. Los Angeles 121 urb. San Carlos y anexos, Ica, Perú
                            </p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <iframe
                                title="Ubicación de Bettpplay"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.120934954178!2d-75.7294068!3d-14.0610742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9110e3888ffb63d1%3A0x7da9467d978bdfde!2sFerreter%C3%ADa%20DIFELEC!5e0!3m2!1ses!2sus!4v1632543518784!5m2!1ses!2sus"
                                width="100%"
                                height="350"
                                style={{ border: 0, borderRadius: '15px' }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </Col>
                    </Row>
                </section>
            </Container>
        </main>
    );
};

export default Nosotros;
