import React from "react";

import AddAgentIcon from "../../../assets/svg-new/breadcrumbs/add-agent.svg";

import { Breadcrumb } from "../../breadcrumb/Breadcrumb";
import {OrderForm} from "../../agent/order_form/OrderForm"

export const CreateOrder = () => {
  return (
    <div className="flex flex-col">
      <Breadcrumb
        icon={AddAgentIcon}
        title="Create Order"
        link="Home / Client / Add"
      />
      <OrderForm />
    </div>
  );
};
