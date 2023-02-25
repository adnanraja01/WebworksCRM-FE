import React from "react";

import "./Card.scss";

import { numToKnum } from "../../../UI/NumConvert/NumConvert";
export const Card = (attributes) => {
  return (
    <div class="card_wrapper">
      <div class="col-md-3 col-sm-6">
        <div class="counter">
          <div class="counter-content">
            <div class="counter-icon">
              <i class="fa fa-globe"></i>
            </div>
            <span class="counter-value">1948</span>
            <h3>Agents</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="counter purple">
          <div class="counter-content">
            <div class="counter-icon">
              <i class="fa fa-rocket"></i>
            </div>
            <span class="counter-value">1840</span>
          <h3>Clients</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="counter skyblue">
          <div class="counter-content">
            <div class="counter-icon">
              <i class="fa fa-rocket"></i>
            </div>
            <span class="counter-value">1840</span>
          <h3>Sales</h3>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="counter blue">
          <div class="counter-content">
            <div class="counter-icon">
              <i class="fa fa-rocket"></i>
            </div>
            <span class="counter-value">{numToKnum(180433)}</span>
          <h3>Orders</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
