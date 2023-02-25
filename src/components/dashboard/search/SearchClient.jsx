import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

import useHttp from "../../../hooks/use-http";

import { getRequest } from "../../../lib/api";
import { clientDetailUrl } from "../../../url";

import styles from "./SearchClient.module.scss";

import { Button } from "../../../UI/Button/Button";
import SendIcon from "../../../assets/svg/send.svg";

export const SearchClient = () => {
  const navigate = useNavigate();
  const { sendRequest, status, data, error } = useHttp(getRequest, true);
  const [loading, setLoading] = useState(false);
  const formSchema = Yup.object({
    clientId: Yup.string().required("* Client id is required *"),
  });
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const url = `${clientDetailUrl}${values?.clientId}/`;
    sendRequest(url);
  };

  const formik = useFormik({
    initialValues: {
      clientId: "",
    },
    validationSchema: formSchema,
    onSubmit,
  });
  useEffect(() => {
    if (error) {
      setLoading(false);
      if (error === "404") {
        swal("404", "No client for given detail !", "info");
      } else {
        swal("Error!", `${error}`, "error");
      }
    }
    if (status === "completed" && !error) {
      const clientId = data?.data?.client_details?.id;
      setLoading(false);
      navigate(`/clients/${clientId}`, { replace: "true" });
      console.log(data?.data?.client_details?.id);
    }
  }, [status, data, error, navigate]);
  return (
    <div className={styles.search_client_wrapper}>
      <h2>Search Client</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.input_wrapper}>
          <input
            type="text"
            name="clientId"
            placeholder="Enter Client Id ..."
            onChange={formik.handleChange}
            value={formik.values.clientId}
            onBlur={formik.handleBlur}
            required
          />
          <label htmlFor="clientId" className={styles.input_wrapper_label}>
            Client Id
          </label>
        </div>
        <Button type="submit" className={styles.login_btn} loading={loading}>
          Search
          <img src={SendIcon} alt="send" />
        </Button>
      </form>
    </div>
  );
};
