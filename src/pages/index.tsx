import { CiLocationOn } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import Image from "next/image";
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { env } from "process";

export default function Home(props: any) {
  console.log(props);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [salvou, setSalvou] = useState<boolean | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const test = () => {
    handleShow();
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  
    const data = {
      name,
      email,
      phone
    } 

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    };

    await fetch(process.env.API_URL + 'guests', requestOptions)
      .then(() => setSalvou(true))
      .catch(() => setSalvou(false));
  }

  console.log(process.env.API_URL);

  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (document) {
      const test1 = document?.querySelector('body');

      if (test1) {
        setWidth(test1?.clientWidth);
      }
    }
  }, []);
  
  return (
    <main className="bg-pink-100 text-xs pb-10 text-black grid grid-cols-1 md:grid-cols-2">
        <Image
              src='/images/ester-aniversario.jpg'
              alt="Foto Teté"
              width={700}
              height={100} 
          />
        <div className="flex flex-col items-center justify-start pt-20 gap-3 text-xl">
          <button 
            className="bg-pink-700 p-2 border rounded-full text-pink-100 text-xl mb-3"
            type="button"
            onClick={test}
          >
            Confirmar presença
          </button>
          <div className="flex flex-col items-center">
            <div className="flex items-start justify-start gap-2 mb-2 ">
              <CiCalendar className="text-pink-700 text-2xl" />
              <h2 className="text-2xl font-medium">Quando será</h2>
            </div>
            <span>14/01/2024 - a partir de 11:00</span>
          </div>
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-start justify-start gap-2 mb-2">
                <CiLocationOn  className="text-pink-700 text-2xl" />
                <h2 className="text-2xl font-medium">Onde será</h2>
              </div>
              <span className="mb-5">
                Club Kids <br/> Rua 12 Chácara 140/1 <br/> Setor Habitacional Vicente Pires
              </span>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1919.6242074884801!2d-48.028271599683684!3d-15.790850112220108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a33e7216aa88b%3A0xca1f974d667ad502!2sClub%20Kids%20-%20Vicente%20Pires!5e0!3m2!1spt-BR!2sbr!4v1702867089340!5m2!1spt-BR!2sbr" loading="lazy"
                width={width < 768 ? 300 : 400}
              />
            </div>
          </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirme sua presença</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {salvou !== null && salvou ? (
            <p>Obrigado por confirmar, estarei esperando ansiosamente para te receber nesse  dia especial.</p>
          ) : (
            <>
            <p>Vai ser incrível ter você na minha festa. Por favor, confirme seus dados.</p>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" placeholder="Seu nome" onChange={e => setName(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="phone" placeholder="Seu telefone" onChange={e => setPhone(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Seu melhor e-mail" onChange={e => setEmail(e.target.value)} required />
                {/* <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text> */}
              </Form.Group>
              <Button variant="primary" type="submit">
                Confirmar
              </Button>
            </Form>
            </>
          )}
          
        </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
      </Modal>
    </main>
  );
}

export async function getServerSideProps() {
  const guests = await fetch(process.env.API_URL + 'guests')
    .then(response => response.json());

  return {
    props: { guests }
  }
}

