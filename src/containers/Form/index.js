import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";


const mockContactApi = () => new Promise((resolve) => { 
  setTimeout(resolve, 500); 
});

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);
      setMessageSent(false);
      try {
        await mockContactApi();
        setSending(false);
        setMessageSent(true);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personnel", "Entreprise"]}
            onChange={() => null}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours..." : "Envoyer"}
          </Button>

          {}
          {messageSent && (
            <p style={{ color: "green", marginTop: "10px" }}>
              ✅ Le message a bien été envoyé !
            </p>
          )}
        </div>
        <div className="col">
          <Field
            placeholder="Votre message..."
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
