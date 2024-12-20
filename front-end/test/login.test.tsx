import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../components/auth/Login";

test("login text", async () => {
    render(<Login />);

    expect(screen.getByText("Login"));
});