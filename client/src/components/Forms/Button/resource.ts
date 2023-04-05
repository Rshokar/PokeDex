import React from "react";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    style?: React.CSSProperties;
};

const container: React.CSSProperties = {
    width: "40%",
    height: "50px",
    backgroundColor: "#2A75BB",
    border: "0px",
    color: "#E8EEF2",
    fontSize: "20px",
    margin: "5px",
    marginBottom: "0px",
    borderRadius: "5px",
}

const styles = {
    container
}

export default styles