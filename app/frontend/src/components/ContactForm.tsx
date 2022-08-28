import '../styles/contactForm.scss';

export default function ContactForm() {
  return (
    <div className="create-contact-container">
      <form className="contact-form">
        <label htmlFor="name">
          Nome:&nbsp;
          <input
            id="name"
            name="name"
            type="text"
            className="input"
          />
        </label>
        <label htmlFor="phone">
          Telefone:&nbsp;
          <input
            id="phone"
            name="phone"
            type="text"
            className="input"
          />
        </label>
        <label htmlFor="whatsapp">
          Whatsapp:&nbsp;
          <select className="input" name="whatsapp" id="whatsapp">
            <option value="true">sim</option>
            <option value="false">não</option>
          </select>
        </label>
        <label htmlFor="email">
          email:&nbsp;
          <input
            id="email"
            type="text"
            name="email"
            className="input"
          />
        </label>
        <button
          className="create-contact"
          type="button"
        >
          Adicionar contato
        </button>
      </form>
    </div>
  );
};
