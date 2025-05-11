import React from 'react';

const LoginPageStyle = () => {
  return (
    <style jsx>{`
      .login-container {
        background: linear-gradient(135deg, #d1b3ff, #ffffff); /* Gradasi ungu muda ke putih */
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .form-container {
        background-color: white;
        border-radius: 10px;
        padding: 30px;
        width: 350px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .form-title {
        font-size: 24px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 10px;
      }

      .form-subtitle {
        font-size: 14px;
        color: gray;
        text-align: center;
        margin-bottom: 20px;
      }

      .input-field {
        width: 100%;
        padding: 12px;
        margin: 12px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
      }

      .forgot-password {
        color: #8a2be2;
        font-size: 12px;
        display: block;
        text-align: right;
        margin-bottom: 20px;
      }

      .submit-btn {
        width: 48%;
        padding: 12px;
        background-color: #8a2be2;
        color: white;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
      }

      .submit-btn:hover {
        background-color: #6a1fa2;
      }

      .register-btn {
        width: 48%;
        padding: 12px;
        border: 1px solid #ddd;
        color: gray;
        font-weight: bold;
        background-color: white;
        cursor: pointer;
      }

      .register-btn:hover {
        background-color: #f0f0f0;
      }

      /* Modal Style */
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .modal-container {
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        width: 400px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      }

      .close-modal {
        width: 100%;
        padding: 12px;
        background-color: #8a2be2;
        color: white;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
      }

      /* Mobile Responsive */
      @media (max-width: 768px) {
        .form-container {
          width: 80%;
        }
        .submit-btn, .register-btn {
          width: 100%; /* Tombol akan memenuhi lebar layar pada mobile */
        }
      }
    `}</style>
  );
};

export default LoginPageStyle;
