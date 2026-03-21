import { useState } from "react";
import { submitContact } from "../../services/contactService";

const initialFormState = {
  name: "",
  email: "",
  message: ""
};

function ContactForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await submitContact(formData);
      setStatus({
        type: "success",
        message: "Message saved successfully. Thanks for reaching out."
      });
      setFormData(initialFormState);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Unable to send your message right now. Please try again later.";

      setStatus({
        type: "error",
        message
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          name="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email
        <input
          name="email"
          type="email"
          placeholder="yourmail.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Message
        <textarea
          name="message"
          placeholder="Tell me about your idea or opportunity."
          rows="6"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </label>

      {status.message && (
        <div className={`form-status form-status-${status.type}`}>{status.message}</div>
      )}

      <button className="button button-primary" disabled={submitting} type="submit">
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

export default ContactForm;
