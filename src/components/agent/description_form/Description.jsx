import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import styles from "./Description.module.scss";

import { postRequest } from "../../../lib/api";
import useHttp from "../../../hooks/use-http";
import { descriptionAddUrl } from "../../../url";

import SendIcon from "../../../assets/svg/send.svg";
import SkipIcon from "../../../assets/svg/right-arrow.svg";
import edit from "../../../assets/svg/edit.svg";

import { Button } from "../../../UI/Button/Button";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { InputTag } from "../../../UI/InputTag/InputTag";

export const Description = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { sendRequest, status, error } = useHttp(postRequest, true);

  const formSchema = Yup.object({
    // client: Yup.string()
    //   .max(20, "Must be 20 Alphabets or Less")
    //   .required("* Name is required *"),
    // description: Yup.string().required("* Description is required*"),
    // callIn: Yup.string().required("* call is required*"),
  });
  const skiphandler =()=>{
    navigate( "/orders/add")
  }
  const onSubmit = async (values) => {
    console.log("hi");
    console.log(values);
    // transaction_type": No_Sale;
    setLoading(true);
    const sendData = {
      url: `${descriptionAddUrl}`,
      formData: values,
    };
    sendRequest(sendData);
  };
  const formik = useFormik({
    initialValues: {
      transaction_type: "No_Sale",
      time: "00:00:00",
      updated_by: "12",
      amount: 0,
      client: "",
      description: "",
      call_time_in_hr: "",
      date: "",
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
      swal("Success!", "Description Added Successfully!", "success");
      navigate("/clients", { replace: "true" });
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
          <div className={` ${styles.form_container_tags}`}>
            <InputTag
              className={styles.form__input}
              id="client"
              required
              type="text"
              name="client"
              label="Client Name"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
          </div>

          <div>
            <select
              className={styles.form__input}
              id="call_time_in_hr"
              required
              name="call_time_in_hr"
              placeholder="Call In"
              onChange={formik.handleChange}
              value={formik.values.call_related}
              onBlur={formik.handleBlur}
            >
              <option value="">Call In</option>
              <option value="1 ">1 hr</option>
              <option value="2 ">2 hr</option>
              <option value="3 ">3 hr</option>
              <option value="4 ">4 hr</option>
              <option value="5 ">5 hr</option>
              <option value=">6 ">More than 6 hrs</option>
            </select>
          </div>

          <div className={` ${styles.form_container_tags}`}>
            <InputTag
              className={styles.form__input}
              id="description"
              required
              type="text"
              name="description"
              label="Description"
              onChange={formik.handleChange}
              value={formik.values.description}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className={` ${styles.form_container_tags}`}>
            <InputTag
              className={styles.form__input}
              id="date"
              required
              type="date"
              name="date"
              // label="Date "
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
          </div>

          {/* <div className={` ${styles.form_container_terms}`}> */}
          <div className={` ${styles.form_container_terms_button}`}>
            <Button type="submit" loading={loading}>
              <span>Add</span>
              <img src={SendIcon} alt="send icon" />
            </Button>
          </div>
          <div className={` ${styles.form_container_terms_button_skip}`} onClick={skiphandler}>
            {/* <Button type="submit" loading={loading}> */}
            <span
              className={` ${styles.form_container_terms_button_skip_name}`}
            >
              Skip
            </span>
            <img
              className={` ${styles.form_container_terms_button_skip_svg}`}
              src={SkipIcon}
              alt="skip icon"
            />
            {/* </Button> */}
          </div>
        </div>
        {/* </div> */}
      </form>
    </div>
  );
};
