import App from "../../src/App";
import { ApolloProvider } from "@apollo/client";
import client from "../../src/apolloClient";

const withProviders = (component: JSX.Element) => {
  return <ApolloProvider client={client}>{component}</ApolloProvider>;
};

describe("Todo Flow", () => {
  it("should create a todo item", () => {
    const initialTodoText = "Test Todo";
    const updatedTodoText = "Updated Test Todo";

    cy.mount(withProviders(<App />));
    // CREATE TODO
    cy.get("[name=add-todo-input]")
      .type(initialTodoText)
      .should("have.value", initialTodoText);

    cy.get("[data-cy=add-todo-submit]").click();
    cy.contains(initialTodoText).should("exist");

    // TOGGLE TODO
    cy.get(`[data-cy=todo-toggle-${updatedTodoText}]`).click();

    cy.get(`[data-cy=todo-${updatedTodoText}]`).should(
      "have.class",
      "completed",
    );

    // DELETE TODO
    cy.get(`[data-cy=todo-delete-${updatedTodoText}]`).click();

    cy.contains(updatedTodoText).should("not.exist");
  });
});
