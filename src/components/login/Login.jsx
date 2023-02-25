import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

import { postRequest } from "../../lib/api";
import { loginUrl } from "../../url";

import styles from "./Login.module.scss";

import AsideImg from "../../assets/images/login-aside.jpg";
import LogoImg from "../../assets/images/WebworksLogo.jpg";
import LoginIcon from "../../assets/svg-new/login.svg";

import { Button } from "../../UI/Button/Button";

export const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { sendRequest, status, data, error } = useHttp(postRequest, true);

  const formSchema = Yup.object({
    username: Yup.string().required("* Email or username is required *"),
    password: Yup.string().required("* Password is Required *"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const sendData = {
      url: `${loginUrl}`,
      formData: values,
    };

    sendRequest(sendData);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit,
  });

  
  useEffect(() => {
    if(error){
      setLoading(false);
      swal("Error!", `${error}`, "error");
    }
    if (status === "completed" && !error) {
      setLoading(false)
      const tokenTime = +data.token_lifetime;
      const expirationTime = new Date(
        new Date().getTime() + `${tokenTime}` * 1000
      );
      authCtx.login(data.access, expirationTime.toISOString());
      
      navigate("/home", { replace: "true" });
    }
  }, [status, data, authCtx, error, navigate]);

  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_form_container}>
        <div className={styles.login_form_img}>
          <img src={AsideImg} alt="login page aside" />
        </div>
        <div className={styles.login_form_aside}>
          <div className={styles.login_form_aside_logo}>
            <img src={LogoImg} alt="Webworks logo" />
          </div>
          <h1 className={styles.login_form_aside_heading}>
            Welcome to WebWorksCRM
          </h1>
          <form onSubmit={formik.handleSubmit}>
            <div className={styles.input_wrapper}>
              <input
                id="user"
                required
                type="text"
                name="username"
                placeholder="Username"
                className={styles.input_field}
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="email" className={styles.input_wrapper_label}>
                Username
              </label>
            </div>
            <div className={styles.input_wrapper}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className={styles.input_field}
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
              />
              <label htmlFor="password" className={styles.input_wrapper_label}>
                Password
              </label>
            </div>
            <div className={styles.forgot_btn_wrapper}>
              <div className={styles.show_btn_wrapper}>
                <input type="checkbox" id="showPass" />
                <label htmlFor="showPass">Show Password</label>
              </div>
              <button className={styles.forgot_btn}>Forgot Password?</button>
            </div>
            <Button
              type="submit"
              className={styles.login_btn}
              loading={loading}
            >
              Login <img src={LoginIcon} alt="login" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
