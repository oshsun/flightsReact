import React from "react";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import "./Modal.css";
import useInput from "../../hooks/useInput";
import styled from "styled-components";

const isNotEmpty = (value) => value.trim() !== "";

const Login = (props) => {
  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    valueChangeHandler: usernameChangeHandler,
    inputBlurHandler: usernameBlurHandler,
    reset: resetusername,
  } = useInput(isNotEmpty);
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (usernameIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    } else {
      props.toggleShowLogin();
    }

    console.log("Submitted!");
    axios
      .post("http://127.0.0.1:8000/token/", {
        username: usernameValue,
        password: passwordValue,
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.detail)
        if (err.response.data.detail === "No active account found with the given credentials") {
          alert("No active account found with the given credentials");
          return;
        }
      })
      .then((res) => {
        if (res) {
          localStorage.setItem("access_token", res.data.access);
          localStorage.setItem("refresh_token", res.data.refresh);

          localStorage.setItem(
            "username",
            jwt_decode(res.data.access).username
          );

          props.setIsSuperUser(jwt_decode(res.data.access).is_super_user);
          props.setIsStaff(jwt_decode(res.data.access).is_staff_member);

          localStorage.setItem(
            "is_super_user",
            jwt_decode(res.data.access).is_super_user
          );

          localStorage.setItem(
            "is_staff_member",
            jwt_decode(res.data.access).is_staff_member
          );
          props.handleLogin();
        }
      });
    resetusername();
    resetPassword();
  };

  const usernameClasses = usernameHasError
    ? "form-control invalid"
    : "form-control";
  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <div className={props.show ? "modal" : "modal hide_modal"}>
      <div className='modal'>
        <div className='overlay'></div>
        <div className='modal-content'>
          <Form onSubmit={submitHandler}>
            <div className='control-group'>
              <div className={usernameClasses}>
                <label htmlFor='name'>Username</label>
                <input
                  type='text'
                  id='name'
                  value={usernameValue}
                  onChange={usernameChangeHandler}
                  onBlur={usernameBlurHandler}
                />
                {usernameHasError && (
                  <p className='error-text'>Please enter username.</p>
                )}
              </div>
            </div>

            <div className={passwordClasses}>
              <label htmlFor='name'>Password</label>
              <input
                type='password'
                id='name'
                value={passwordValue}
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
              />
              {passwordHasError && (
                <p className='error-text'>
                  Password must contain at least 6 characters.
                </p>
              )}
            </div>
            <div className='form-actions'>
              <button disabled={!formIsValid} onClick={props.handleLogin}>
                Submit
              </button>
            </div>
          </Form>

          <button className='close-modal' onClick={props.toggleShowLogin}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

const Form = styled.form`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap");

  * {
    box-sizing: border-box;
  }

  html {
    font-family: "Noto Sans JP", sans-serif;
  }

  body {
    margin: 0;
    background-color: #3f3f3f;
  }

  .app {
    width: 90%;
    max-width: 43rem;
    padding: 1rem;
    border-radius: 12px;
    background-color: white;
    margin: 3rem auto;
  }

  .form-control {
    margin-bottom: 1rem;
  }

  .form-control input,
  .form-control label {
    display: block;
  }

  .form-control label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .form-control input,
  .form-control select {
    font: inherit;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 20rem;
    max-width: 100%;
  }

  .form-control input:focus {
    outline: none;
    border-color: #240370;
    background-color: #e0d4fd;
  }

  .control-group {
    display: flex;
    column-gap: 1rem;
    flex-wrap: wrap;
  }

  .control-group .form-control {
    min-width: 15rem;
    flex: 1;
  }

  button {
    font: inherit;
    background-color: #240370;
    color: white;
    border: 1px solid #240370;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover,
  button:active {
    background-color: #33059e;
    border-color: #33059e;
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active {
    background-color: #ccc;
    color: #292929;
    border-color: #ccc;
    cursor: not-allowed;
  }

  .form-actions {
    text-align: right;
  }

  .form-actions button {
    margin-left: 1rem;
  }

  .invalid input {
    border: 1px solid #b40e0e;
    background-color: #fddddd;
  }

  .invalid input:focus {
    border-color: #ff8800;
    background-color: #fbe8d2;
  }

  .error-text {
    color: #b40e0e;
  }
`;

export default Login;
