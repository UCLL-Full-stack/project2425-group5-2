import test from "node:test";
import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "@components/auth/Login";

window.React = React;

test("Test Login screen", async () => {
    render(<Login />);

    expect(screen.getByText("Login to your account"));
});