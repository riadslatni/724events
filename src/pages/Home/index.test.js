import { render, screen, fireEvent } from "@testing-library/react";
import Page from "."; 

describe("When Form is rendered", () => {
  test("renders form fields", async () => {
    render(<Page />);

    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personnel / Entreprise");
    await screen.findByText("Email");
    await screen.findByText("Message");
  });

  test("shows success message after submit", async () => {
    render(<Page />);

    const submitButton = screen.getByRole("button", { name: /Envoyer/i });
    fireEvent.click(submitButton);

   
    await screen.findByText((text) => text.includes("En cours"));
    await screen.findByText(/Message envoyé !/i);
  });
});
