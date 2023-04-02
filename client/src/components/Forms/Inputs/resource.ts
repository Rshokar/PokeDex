import React, { InputHTMLAttributes, CSSProperties } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';





export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    register: UseFormRegisterReturn<any>;
    error: string | undefined;
    placeholder: string;
};

const container: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
}

const inputs: React.CSSProperties = {
    fontSize: "15px",
    width: "100%",
    height: "40px",
    paddingLeft: "20px",
    border: "0px",
    color: "#2A75BB",
    backgroundColor: "#E8EEF2",
    margin: "10px",
}

const wrapper: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    maxWidth: "400px",
    border: "0px",
    textAlign: "left",
}

const button: React.CSSProperties = {
    width: "40%",
    height: "50px",
    backgroundColor: "#2A75BB",
    border: "0px",
    color: "#E8EEF2",
    fontSize: "20px",
    margin: "5px",
    marginBottom: "20px",
}

const input_error: React.CSSProperties = {
    color: "red",
    fontSize: "12px",
    margin: "0px",
    padding: "0px",
}

const styles = {
    container,
    inputs,
    button,
    input_error,
    wrapper
}

export default styles
