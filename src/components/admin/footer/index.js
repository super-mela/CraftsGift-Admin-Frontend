import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="py-4 bg-footer mt-auto">
        <div className="container-fluid">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted-1">
              © 2023 <b>Crafts Gift</b>. by{" "}
              <a href="https://themeforest.net/user/gambolthemes">Z-angels</a>
            </div>
            <div className="footer-links">
              <a href="http://gambolthemes.net/html-items/gambo_supermarket_demo/privacy_policy.html">
                Privacy Policy
              </a>
              <a href="http://gambolthemes.net/html-items/gambo_supermarket_demo/term_and_conditions.html">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
