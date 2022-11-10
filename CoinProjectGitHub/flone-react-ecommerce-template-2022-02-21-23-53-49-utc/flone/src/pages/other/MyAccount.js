import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import emailjs from "emailjs-com"
import { Link } from "react-router-dom";

const MyAccount = ({ location }) => {
  const { pathname } = location;
  axios.defaults.withCredentials = true;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [usaMail, setUsaMail] = useState("");
  const [phone, setPhone] = useState("");
  const [secQuestion, setSecQuestion] = useState("");
  const [secAnswer, setSecAnswer] = useState("");
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  const [isAdmin, setIsadmin] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_AMBASSADORS_SERVER_BACKEND}/user`).then((res) => {
      setFirstName(res.data.first_name)
      setLastName(res.data.last_name)
      setEmail(res.data.email)
      setUsaMail(res.data.usa_mail)
      setPhone(res.data.phone_number)
      setSecQuestion(res.data.security_question)
      setSecAnswer(res.data.security_answer)
      setEmailConfirmed(res.data.email_comfirmed)
    }).catch((err) => {
      if (err) {
        console.log(err)
      }
    })


    const tokenData = jwt.decode(Cookies.get("jwt"))
    if (tokenData == null || tokenData == undefined) {
      return window.location.href = `${process.env.REACT_APP_LOCAL_URL}/login-register`;
    }
    const scope = tokenData.Scope;
    console.log(scope)

    if (scope == "super_admin") {
      setIsadmin(true)
    }

  }, []);

  const ResetPassword = (e) => {
    e.preventDefault();

    const Secret = process.env.REACT_APP_SECRET_TOKEN + email

    const tokenData = jwt.decode(Cookies.get("jwt"))
    const payload = { AccountEmail: email, Scope: tokenData.Scope };
    const token = jwt.sign(payload, Secret, { expiresIn: '15min' });
    const link = `${process.env.REACT_APP_LOCAL_URL}/reser-password/?email=${email}&token=${token}`;

    emailjs.send(`${process.env.REACT_APP_service_id}`, `${process.env.REACT_APP_tamplate_id}`, { UserEmail: email, Link: link }, `${process.env.REACT_APP_user_id}`)
      .then(function (response) {
        window.alert("reset Password link send");
      }, function (error) {
        window.alert('FAILED...', error);
      });
  }

  const infoSubmit = (e) => {
    e.preventDefault();

    axios.put('http://localhost:8000/api/ambassador/users/info', {
      first_name: firstName,
      last_name: lastName,
      email: email,
      usa_mail: usaMail,
      phone: phone,
      security_question: secQuestion,
      security_answer: secAnswer,
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  const ConfirmEmail = (e) => {
    e.preventDefault();
    const Secret = process.env.REACT_APP_SECRET_TOKEN + email

    const payload = { AccountEmail: email };
    const token = jwt.sign(payload, Secret, { expiresIn: '15min' });
    const link = `${process.env.REACT_APP_LOCAL_URL}/confirm-email/?email=${email}&token=${token}`;

    emailjs.send(`${process.env.REACT_APP_service_id}`, `${process.env.REACT_APP_tamplate_id}`, { UserEmail: email, Link: link }, `${process.env.REACT_APP_user_id}`)
      .then(function (response) {
        window.alert("reset Password link send");
      }, function (error) {
        window.alert('FAILED...', error);
      });
  }

  return (
    <Fragment>
      <MetaTags>
        <title>Fine Bullions | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>First Name</label>
                                  <input type="text"
                                    onChange={e => setFirstName(e.target.value)}
                                    value={firstName}
                                  />

                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Last Name</label>
                                  <input type="text"
                                    onChange={e => setLastName(e.target.value)}
                                    value={lastName}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email Address</label>
                                  <input type="email"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                  />

                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>USA mailing address</label>
                                  <input type="text"
                                    onChange={e => setUsaMail(e.target.value)}
                                    value={usaMail}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Phone Number</label>
                                  <input type="tel"
                                    onChange={e => setPhone(e.target.value)}
                                    value={phone}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Security question</label>
                                  <input type="text"
                                    onChange={e => setSecQuestion(e.target.value)}
                                    value={secQuestion}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Answer to the security question</label>
                                  <input type="text"
                                    onChange={e => setSecAnswer(e.target.value)}
                                    value={secAnswer}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" onClick={e => infoSubmit(e)}>Continue</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Confirm Email
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Email Confirmed: {emailConfirmed.toString()}</h4>
                            </div>
                            <div className="row">
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" onClick={e => ConfirmEmail(e)}>Send Link</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Reset your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Reset Password</h4>
                            </div>
                            <div className="row">
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit" onClick={e => ResetPassword(e)}>Send Link</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>

                    {isAdmin ? (
                      <div>
                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="3">
                              <h3 className="panel-title">
                                <span>4 .</span> Admin panel
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="3">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <div className="account-info-wrapper">
                                  <h4>Admin panel</h4>
                                </div>
                                <div className="row">
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    <Link to='admin'>
                                      <button className="nav-link" >
                                        Go to admin panel
                                      </button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>

                        <Card className="single-my-account mb-20">
                          <Card.Header className="panel-heading">
                            <Accordion.Toggle variant="link" eventKey="4">
                              <h3 className="panel-title">
                                <span>5 .</span> Sign Out
                              </h3>
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="4">
                            <Card.Body>
                              <div className="myaccount-info-wrapper">
                                <div className="account-info-wrapper">
                                  <h4>Sign Out</h4>
                                </div>
                                <div className="row">
                                </div>
                                <div className="billing-back-btn">
                                  <div className="billing-btn">
                                    <Link to='/login-register' onClick={async () => await axios.post(`${process.env.REACT_APP_AMBASSADORS_SERVER_BACKEND}/logout`)}>
                                      <button className="nav-link" >
                                        Sign out
                                      </button>
                                    </Link>
                                  </div>
                                </div>

                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>

                      </div>
                    ) : (
                      <Card className="single-my-account mb-20">
                        <Card.Header className="panel-heading">
                          <Accordion.Toggle variant="link" eventKey="3">
                            <h3 className="panel-title">
                              <span>4 .</span> Sign Out
                            </h3>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                          <Card.Body>
                            <div className="myaccount-info-wrapper">
                              <div className="account-info-wrapper">
                                <h4>Sign Out</h4>
                              </div>
                              <div className="row">
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <Link to='/login-register' onClick={async () => await axios.post(`${process.env.REACT_APP_AMBASSADORS_SERVER_BACKEND}/logout`)}>
                                    <button className="nav-link" >
                                      Sign out
                                    </button>
                                  </Link>
                                </div>
                              </div>

                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>

                    )}

                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object
};

export default MyAccount;
