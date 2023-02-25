import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import styles from "./ClientForm.module.scss";

import { postRequest } from "../../../lib/api";
import useHttp from "../../../hooks/use-http";
import { clientAddUrl } from "../../../url";

import SendIcon from "../../../assets/svg/send.svg";
import edit from "../../../assets/svg/edit.svg";

import { Button } from "../../../UI/Button/Button";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { InputTag } from "../../../UI/InputTag/InputTag";

export const ClientForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { sendRequest, status, error } = useHttp(postRequest, true);

  const formSchema = Yup.object({
    name: Yup.string()
      .max(20, "Must be 20 Alphabets or Less")
      .required("* Name is required *"),
    email: Yup.string().required("* Email is required*"),
    confirmEmail: Yup.string().oneOf([Yup.ref("email"), null], "Email must match")
    .required("* Confirm Email is Required *"),
    phone_number: Yup.string().required("* Phone number is required *"),
    confirmPhone: Yup.string() .oneOf([Yup.ref("phone_number"), null], "Phone Number must match")
    .required("* Confirm Phone Number must match *"),
    call_related: Yup.string().required("* Call related to is required*"),
  });
  const onSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    const sendData = {
      url: `${clientAddUrl}`,
      formData: values,
    };
    sendRequest(sendData);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      confirmEmail: "",
      phone_number: "",
      confirmPhone: "",
      call_related: "",
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
      swal("Success!", "Client Added Successfully!", "success");
      navigate("/description", { replace: "true" });
    }
  }, [status, sendRequest, error, navigate]);
  return (
    <div className={styles.form}>
      <div className={` ${styles.form_container_heading}`}>
        <img
          className={` ${styles.form_container_heading_img}`}
          src={edit}
          alt="icon"
        />
        <p className={styles.form_container_heading_text}>Fill Details</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className={` grid grid-cols-2 ${styles.form_container} `}>
          <div className={`col-span-full ${styles.form_container_tags}`}>
          <InputTag   className={styles.form__input}
              id="name"
              required
              type="text"
              name="name"
              label="Client Name"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
              />
            
            {/* <label htmlFor="name" className={styles.form__label}>
              Customer name
            </label> */}
          </div>

          <div className={` ${styles.form_container_tags}`}>
        
            <InputTag
            className={styles.form__input}
              id="phone_number"
              required
              type="number"
              name="phone_number"
              label="Phone No."
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              />
            
          </div>

          <div className={` ${styles.form_container_tags}`}>
            <InputTag
              className={styles.form__input}
              id="confirmPhone"
              required
              type="number"
              name="confirmPhone"
              label=" Confirm Phone No."
              onChange={formik.handleChange}
              value={formik.values.confirmPhone}
              onBlur={formik.handleBlur}
            />
           {formik.touched.confirmPhone && formik.errors.confirmPhone ? (
            <p className={styles.form_container_error}>{formik.errors.confirmPhone}</p>
          ) : null}
          </div>

          <div className={` ${styles.form_container_tags}`}>
            <InputTag
              className={styles.form__input}
              id="email"
              required
              type="email"
              name="email"
              label="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            
          </div>

          <div className={` ${styles.form_container_tags}`}>
            <InputTag
              className={styles.form__input}
              id="confirmEmail"
              required
              type="email"
              name="confirmEmail"
              label="Confirm Email"
              onChange={formik.handleChange}
              value={formik.values.confirmEmail}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmEmail && formik.errors.confirmEmail ? (
            <p className={styles.form_container_error}>{formik.errors.confirmEmail}</p>
          ) : null}
        
          </div>

          <div className={`col-span-full ${styles.form_container_tags}`}>
            <select
              className={styles.form__input}
              id="call_related"
              required
              name="call_related"
              placeholder="Call related "
              onChange={formik.handleChange}
              value={formik.values.call_related}
              onBlur={formik.handleBlur}
            >
              <option value="">Call related to</option>
              <option>Norton</option>
              <option>Dragon</option>
            </select>
            <label
              htmlFor="call_related"
              className={styles.form__label}
            ></label>
          </div>
          <div className={`col-span-full ${styles.form_container_terms}`}>
            <div className={` ${styles.form_container_terms_button}`}>
              <Button type="submit" loading={loading}>
                <span>Add</span>
                <img src={SendIcon} alt="send icon" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
