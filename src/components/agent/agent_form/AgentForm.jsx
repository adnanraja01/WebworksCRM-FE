import React, { useEffect, useState } from "react";
import SendIcon from "../../../assets/svg/send.svg";
import styles from "./AgentForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import edit from "../../../assets/svg/edit.svg";

import { postRequest } from "../../../lib/api";
import useHttp from "../../../hooks/use-http";
import { agentAddUrl } from "../../../url";

import { Button } from "../../../UI/Button/Button";
import { InputTag } from "../../../UI/InputTag/InputTag";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const AgentForm = (props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { sendRequest, status, error } = useHttp(postRequest, true);

  const formSchema = Yup.object({
    first_name: Yup.string()
      .max(20, "Must be 20 Alphabets or Less")
      .required("* First Name is required *"),
    last_name: Yup.string()
      .max(20, "Must be 20 Alphabets or Less")
      .required("* Last Name is required *"),
    username: Yup.string().required("* User Name is required*"),
    email: Yup.string().required("* Email is required*"),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref("email"), null], "Email must match")
      .required("* Confirm Email is Required *"),

    password: Yup.string().required("* Password is required *"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("* Confirm password is Required *"),
  });
  const onSubmit = (values) => {
    console.log(values);
    setLoading(true);
    const sendData = {
      url: `${agentAddUrl}`,
      formData: values,
    };
    sendRequest(sendData);
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formSchema,
    onSubmit,
  });
  useEffect(() => {
    if (error) {
      setLoading(false);
      swal("Error", `${error}`, "error");
    }
    if (status === "completed" && !error) {
      setLoading(false);
      swal("Success!", "Agent Added Successfully!", "success");
      navigate("/agents", { replace: "true" });
    }
  }, [status, sendRequest, error, navigate]);

  return (
    <div className={styles.form}>
      <form onSubmit={formik.handleSubmit}>
        <div className={` ${styles.form_container_heading}`}>
          <img
            className={` ${styles.form_container_heading_img}`}
            src={edit}
            alt="icon"
          />

          <p className={styles.form_container_heading_text}>Fill Details</p>
        </div>

        <div className={` grid grid-cols-2 ${styles.form_container} `}>
          <div >
         
            <InputTag
              type="text"
              className={styles.form__input}
              placeholder="First name"
              name="first_name"
              id="first_name"
              onChange={formik.handleChange}
              value={formik.values.first_name}
              onBlur={formik.handleBlur}
              label="First Name"
            />
          </div>
          {/* {formik.touched.first_name && formik.errors.first_name ? (
            <div >{formik.errors.first_name}</div>
          ) : null} */}
          <div>
            <div>
            <InputTag
              type="text"
              className={styles.form__input}
              placeholder="Last name"
              name="last_name"
              id="last_name"
              onChange={formik.handleChange}
              value={formik.values.last_name}
              onBlur={formik.handleBlur}
              label="Last Name"
            />
              {/* {formik.touched.last_name && formik.errors.last_name ? (
            <div className={`col-span-full`}>{formik.errors.last_name}</div>
          ) : null} */}
            </div>
          </div>
          <div className={` col-span-full  `}>
          <InputTag
              type="text"
              className={styles.form__input}
              placeholder="User name"
              name="username"
              id="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              label="User Name"
            />
          </div>
          {/* {formik.touched.username && formik.errors.username ? (
            <div >{formik.errors.username}</div>
          ) : null} */}
          <div>
            <div >
            <InputTag
              type="email"
              className={styles.form__input}
              placeholder="Email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              label="Email"
            />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p>{formik.errors.email}</p>
            ) : null}
          </div>
          <div>
            <div >
            <InputTag
              type="email"
              className={styles.form__input}
              placeholder="First name"
              name="confirmEmail"
              id="confirmEmail"
              onChange={formik.handleChange}
              value={formik.values.confirmEmail}
              onBlur={formik.handleBlur}
              label="Confirm Email"
            />
            </div>
            {formik.touched.confirmEmail && formik.errors.confirmEmail ? (
              <p className={styles.form_container_error}>{formik.errors.confirmEmail}</p>
            ) : null}
          </div>
          <div>
            <div >
            <InputTag
              type="password"
              className={styles.form__input}
              placeholder="Password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              label="Password"
            />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p>{formik.errors.password}</p>
            ) : null}
          </div>
          <div>
            <div >
            <InputTag
              type="password"
              className={styles.form__input}
              placeholder="Password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              onBlur={formik.handleBlur}
              label="Confirm Password"
            />
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className={styles.form_container_error}>{formik.errors.confirmPassword}</p>
            ) : null}
          </div>

          <div className={`col-span-full ${styles.form_container_terms}`}>
            <div className={` ${styles.form_container_terms_button}`}>
              <Button>
                <span> Add</span>
                <img src={SendIcon} alt="send icon" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
