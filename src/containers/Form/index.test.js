import { render, screen, fireEvent } from "@testing-library/react";
import Form from ".";

describe("When Form is created", () => {
  test("a list of fields is displayed", async () => {
    render(<Form />);

    // Vérification des labels
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText(/Personnel \/ Entreprise/i); 
    await screen.findByText("Email");
    await screen.findByText("Message");
    await screen.findByTestId("button-test-id");
  });

  describe("and a click is triggered on the submit button", () => {
    test("the success action is called", async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();

      render(<Form onSuccess={onSuccess} onError={onError} />);

      const button = screen.getByTestId("button-test-id");

      fireEvent.click(button);

  
      await screen.findByText(/En cours\.\.\./i);

    
      await screen.findByText("Envoyer");

      expect(onSuccess).toHaveBeenCalled();
    });

    test("the success message is displayed", async () => {
      render(<Form />);

      const button = screen.getByTestId("button-test-id");
      fireEvent.click(button);

   
      await screen.findByText(/✅ Le message a bien été envoyé/i);
    });
  });
});
