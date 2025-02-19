import React, { FormEvent, ChangeEvent, useEffect } from "react";
import styles from "../styles/Register.module.css";
import { useAuthStore } from "../store/authStore";
import axios from "axios";


interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  // Pull state and actions from Zustand 
  const {
    isLoginView,
    email,
    password,
    firstName,
    lastName,
    loading,
    errorMessage,
    setEmail,
    setPassword,
    setFirstName,
    setLastName,
    setLoading,
    setErrorMessage,
    toggleView,
    login,
    reset,
    register,
  } = useAuthStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    else if (name === "firstName") setFirstName(value);
    else if (name === "lastName") setLastName(value);
  };

  useEffect(() => {
    console.log(firstName, lastName, email, password);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      if (isLoginView) {
        // Login endpoint using authenticate
        login(email, password);
      } else {
        register(firstName, lastName, email, password);
      }
      onClose();
      reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message || "An error occurred. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">
          {isLoginView ? "Login" : "Register"}
        </h2>

        <form className={styles.authForm} onSubmit={handleSubmit}>
          {!isLoginView && (
            <div className={styles.nameContainer}>
              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Submitting..." : isLoginView ? "Sign In" : "Create Account"}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isLoginView ? "Don't have an account? " : "Already have an account? "}
          <button type="button" className={styles.toggleButton} onClick={toggleView}>
            {isLoginView ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
