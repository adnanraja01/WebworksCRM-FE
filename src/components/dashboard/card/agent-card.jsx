import React from "react";

import "./Card.scss";

import { numToKnum } from "../../../UI/NumConvert/NumConvert";

export const AgentCards = (attributes) => {
  return (
    <div class="card_wrapper_agent">
      <div class="col-md-3 col-sm-6">
        <div class="counter blue">
          <div class="counter-content">
            <div class="counter-icon">
              <i class="fa fa-globe"></i>
            </div>
            <span class="counter-value">{numToKnum(1833)}</span>
          </div>
          <h3>My Sales</h3>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="counter purple">
          <div class="counter-content">
            <div class="counter-icon">
              <i class="fa fa-rocket"></i>
            </div>
            <span class="counter-value">{numToKnum(1904)}</span>
          </div>
          <h3>My Clients</h3>
        </div>
      </div>
    </div>
  );
};
