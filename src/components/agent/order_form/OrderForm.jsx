import React from "react";
import SendIcon from "../../../assets/svg/send.svg";
import styles from "./OrderForm.module.scss";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../../../UI/Button/Button";

import edit from "../../../assets/svg/edit.svg";
import { InputTag } from "../../../UI/InputTag/InputTag";

export const OrderForm = (props) => {
  const formSchema = Yup.object({
    id: Yup.number().required("* Customer ID is required *"),
    name: Yup.string()
      .max(20, "Must be 20 Alphabets or Less")
      .required("* Name is required *"),
    email: Yup.string().required("* Email is required*"),
    phone: Yup.number().required("* Phone number is required *"),
    billing: Yup.string().required("* Billing Address is required*"),
    description: Yup.string().required("* Description is required*"),
    alternate_number: Yup.number().required("* Alternate Number is Required *"),
    subscription: Yup.string().required("* Subscription is required*"),
    mode: Yup.string().required("* Mode of Payment is required*"),
    amount: Yup.number().required("* Amount is required *"),
    payment_date: Yup.date().required("* Payment Date is required *"),
  });
  const onSubmit = (values) => {
    console.log(values);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
  description:"",
      billing: "",
      subscription: "",
      mode: "",
      amount: "",
      payment_date: "",
      id: "",
      
    },
    validationSchema: formSchema,
    onSubmit,
  });

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
          <div>
            <div className={` ${styles.form_container_tags}`}>
              <InputTag
                className={styles.form__input}
                type="number"
                label="Customer ID"
                name="id"
                id="id"
                required
                onChange={formik.handleChange}
                value={formik.values.id}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* {formik.touched.id && formik.errors.id ? (
              <p>{formik.errors.id}</p>
            ) : null} */}
          </div>
          <div>
            <div className={` ${styles.form_container_tags}`}>
              <select
                className={styles.form__input}
                name="subscription"
                id="subscription"
                onChange={formik.handleChange}
                value={formik.values.subscription}
                onBlur={formik.handleBlur}
              >
                <option value="">Subscription</option>
                <option>Dragon Professional Individual</option>
                <option>Dragon Legal Individual</option>
              </select>
            </div>
            <div>
              {/* {formik.touched.subscription && formik.errors.subscription ? (
                <p>{formik.errors.subscription}</p>
              ) : null} */}
            </div>
          </div>

          <div className={`col-span-full ${styles.form_container_tags}`}>
            <div>
              <InputTag
                className={styles.form__input}
                type="text"
                label="Billing Address"
                name="billing"
                id="billing"
                onChange={formik.handleChange}
                value={formik.values.billing}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          {/* {formik.touched.billing && formik.errors.billing ? (
            <div className={`col-span-full`}>{formik.errors.billing}</div>
          ) : null} */}

          <div>
            <div className={` ${styles.form_container_tags}`}>
              <select
                className={styles.form__input}
                name="mode"
                id="mode"
                onChange={formik.handleChange}
                value={formik.values.mode}
                onBlur={formik.handleBlur}
              >
                <option value="">Mode Of Payment</option>
                <option>PayPal</option>
                <option>Stripe</option>
              </select>
            </div>
            <div>
              {/* {formik.touched.mode && formik.errors.mode ? (
                <p>{formik.errors.mode}</p>
              ) : null} */}
            </div>
          </div>
          <div>
            <div className={` ${styles.form_container_tags}`}>
              <InputTag
                className={styles.form__input}
                // className={`--tw-border-opacity: 0.25; placeholder: text-[1.5rem]  pl-[1.5rem] pt-[2rem] pb-[2rem] --placeholder-opacity: 0.25; ${styles.form_container_tags_input}`}
                type="number"
                label="Amount"
                name="amount"
                id="amount"
                onChange={formik.handleChange}
                value={formik.values.amount}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* {formik.touched.amount && formik.errors.amount ? (
              <p>{formik.errors.amount}</p>
            ) : null} */}
          </div>
          <div>
            <div className={` ${styles.form_container_tags}`}>
              <InputTag
                className={styles.form__input}
                type="date"
                placeholder="Payment Date"
                name="payment_date"
                id="payment_date"
                onChange={formik.handleChange}
                value={formik.values.payment_date}
                onBlur={formik.handleBlur}
              />
            </div>

            {/* {formik.touched.payment_date && formik.errors.payment_date ? (
              <p>{formik.errors.payment_date}</p>
            ) : null} */}
          </div>
          <div>
            <div className={` ${styles.form_container_tags}`}>
              <InputTag
                className={styles.form__input}
                type="time"
                // label="Email"
                name="time"
                id="time"
                onChange={formik.handleChange}
                value={formik.values.time}
                onBlur={formik.handleBlur}
              />
            </div>
            {/* {formik.touched.time && formik.errors.time ? (
              <p>{formik.errors.time}</p>
            ) : null} */}
          </div>
          <div className={`col-span-full ${styles.form_container_tags}`}>
            <div>
              <InputTag
                className={styles.form__input}
                type="text"
                label="Description"
                name="description"
                id="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          {/* {formik.touched.description && formik.errors.description ? (
            <div className={`col-span-full`}>{formik.errors.description}</div>
          ) : null} */}

          <div className={`col-span-full ${styles.form_container_terms}`}>
            <div className={` ${styles.form_container_terms_button}`}>
              <Button>
                <span> Create Order</span>
                <img src={SendIcon} alt="send icon" />
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
