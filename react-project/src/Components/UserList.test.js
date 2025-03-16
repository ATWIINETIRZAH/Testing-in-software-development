// src/components/UserList.test.js
import { render, screen } from "@testing-library/react";
import UserList from "./UserList";

test("renders a list of users", () => {
  render(<UserList users={[{ name: "Alice" }, { name: "Bob" }]} />);
  
  // Check if the names appear in the document
  expect(screen.getByText("Alice")).toBeInTheDocument();
  expect(screen.getByText("Bob")).toBeInTheDocument();
});
