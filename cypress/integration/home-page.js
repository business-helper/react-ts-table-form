const baseUrl = Cypress.env("base_url");
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/;

Cypress.on("uncaught:exception", (err) => {
  /* returning false here prevents Cypress from failing the test */
  if (resizeObserverLoopErrRe.test(err.message)) {
    return false;
  }
});

describe("Home Page", () => {
  it("should have header", () => {
    // Arrange
    cy.visit(baseUrl);
    const header = cy.get("header");
    const logoLink = cy.get("header a");

    // Assert
    header.should("exist");
    header.should("have.text", "React");
    logoLink.should("exist");
    logoLink.invoke("attr", "href").should("eq", "/");
  });

  it("should render at least 1 row in table", () => {
    // Arrange
    cy.visit(baseUrl);

    // Assert
    cy.get("table tbody tr").its("length").should("be.gte", 1);
  });

  it("should render form properly", () => {
    // Arrange
    cy.visit(baseUrl);

    // Assert
    cy.get("[data-testid=form-updateKnowledgeItemBasicDetails]").should(
      "not.exist"
    );

    // Act
    cy.get("table tbody tr").first().click();

    // Assert
    cy.get("[data-testid=form-updateKnowledgeItemBasicDetails]").should(
      "exist"
    );
    cy.get("button[type=submit]").should("exist").should("have.text", "Submit");
    cy.get("button[type=button]").should("exist").should("have.text", "Cancel");

    // Arrange
    cy.fixture("form.json").then((data) => {
      const form = data.forms.find(
        (f) => f.name === "updateKnowledgeItemBasicDetails"
      );
      // Assert

      cy.get(`[data-testid=form-${form.name}]`).should("exist"); // form
      cy.get(`[data-testid=form-title-${form.name}]`).should("exist"); // form title
      // Validate form groups
      form.fieldsets.map((fieldset) => {
        fieldset.fields.map((field) => {
          cy.get(`[data-testid=form-group-label-${field.name}]`).should(
            "exist"
          );
          cy.get(`[data-testid=${field.type}-${field.name}]`).should("exist");
        });
      });
    });
  });
});
