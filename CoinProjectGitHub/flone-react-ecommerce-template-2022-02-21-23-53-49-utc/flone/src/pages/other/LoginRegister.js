import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import Cookies from 'js-cookie';

const LoginRegister = ({ location }) => {
  axios.defaults.withCredentials = true;
  const { pathname } = location;

  //Register------------------------------------------------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [usaMail, setUsaMail] = useState("");
  const [phone, setPhone] = useState("");
  const [secQuestion, setSecQuestion] = useState("");
  const [secAnswer, setSecAnswer] = useState("");

  //Login-------------------------------------------------
  const [login_email, setLoginEmail] = useState("");
  const [login_pwd, setLoginPwd] = useState("");
  const [loginSecAnswer, setLoginSecAnswer] = useState("");

  const RegisterSubmit = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_AMBASSADORS_SERVER_BACKEND}/register`, {
      first_name: firstName,
      last_name: lastName,
      email: email,
      usa_mail: usaMail,
      phone_number: phone,
      security_question: secQuestion,
      security_answer: secAnswer,
      password: password,
      password_confirm: passwordConfirm
    }).then((res) => {

      Cookies.set("jwt", res.data.cookie_value, { expires: 99999 })
      window.location.href = "http://localhost:3000/my-account";
    })
      .catch((err) => {
        if (err) {
          console.log(err)
        }
      })

  }

  const LoginSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_AMBASSADORS_SERVER_BACKEND}/login`, {
      email: login_email,
      password: login_pwd,
      security_answer: loginSecAnswer
    }).then((res) => {
      console.log(res.data.cookie)

      Cookies.set("jwt", res.data.cookie_value, { expires: 99999 })
      window.location.href = "http://localhost:3000/my-account";
    }).catch((err) => {
      if (err) {
        console.log(err)
      }
    })

  }

  return (
    <Fragment>
      <MetaTags>
        <title>Fine Bullions | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={e => LoginSubmit(e)}>
                              <input
                                type="text"
                                name="user-name"
                                placeholder="E-mail"
                                onChange={e => setLoginEmail(e.target.value)}
                                value={login_email}
                              />
                              <input
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                onChange={e => setLoginPwd(e.target.value)}
                                value={login_pwd}
                              />
                              <input
                                name="answer"
                                placeholder="Answer to security question"
                                type="text"
                                onChange={e => setLoginSecAnswer(e.target.value)}
                                value={loginSecAnswer}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={e => RegisterSubmit(e)}>
                              <input
                                type="text"
                                name="last-name"
                                placeholder="First Name"
                                onChange={e => setFirstName(e.target.value)}
                                value={firstName}
                              />
                              <input
                                type="text"
                                name="first-name"
                                placeholder="Last Name"
                                onChange={e => setLastName(e.target.value)}
                                value={lastName}
                              />
                              <input
                                type="password"
                                name="user-password"
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                placeholder="Password"
                              />
                              <input
                                type="password"
                                name="user-password"
                                onChange={e => setPasswordConfirm(e.target.value)}
                                value={passwordConfirm}
                                placeholder="Password"
                              />
                              <input
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                              />
                              <input
                                name="USA mailing address"
                                placeholder="USA mailing address"
                                type="text"
                                onChange={e => setUsaMail(e.target.value)}
                                value={usaMail}
                              />
                              <input
                                name="phone"
                                placeholder="Phone Number"
                                type="tel"
                                onChange={e => setPhone(e.target.value)}
                                value={phone}
                              />
                              <input
                                name="security-question"
                                placeholder="Security Question"
                                type="text"
                                onChange={e => setSecQuestion(e.target.value)}
                                value={secQuestion}
                              />
                              <input
                                name="answer"
                                placeholder="Answer"
                                type="text"
                                onChange={e => setSecAnswer(e.target.value)}
                                value={secAnswer}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object
};

export default LoginRegister;
