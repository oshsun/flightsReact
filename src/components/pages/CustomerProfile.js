import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";

function CustomerProfile(props) {
  const history = useNavigate();

  const [customer, setCustomer] = useState();

  const [formData, updateFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address_line_1: "",
    credit_card_no: "",
  });

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(formData.phone.length);

    if (formData.phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }
    if (!Number.isInteger(+formData.phone)) {
      alert("Phone number must be only digits");
      return;
    }
    if (!Number.isInteger(+formData.credit_card_no)) {
      alert("Credit card must be only digits");
      return;
    }
    console.log(customer);
    if (customer === false) {
      console.log("no customer entered post");
      axiosInstance
        .post(`place-customer`, {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_no: formData.phone,
          address: formData.address_line_1,
          credit_card_no: formData.credit_card_no,
        })
        .then((res) => {
          console.log(res.data.response.status);
          console.log("successfully added customer");
        })
        .catch((err) => {
          if (
            err.response.request.responseText ===
            '{"phone_no":["customer with this phone no already exists."]}'
          ) {
            alert(
              `User with that phone number already exist ${formData.phone}`
            );
            return;
          }
        });
    } else if (customer === true) {
      console.log("there is customer entered put");

      axiosInstance
        .put(`place-customer`, {
          first_name: formData.first_name,
          last_name: formData.last_name,
          phone_no: formData.phone,
          address: formData.address_line_1,
          credit_card_no: formData.credit_card_no,
        })
        .then((res) => {
          history("/customer-profile");
        })
        .catch((err) => {
          alert(err.response.request.responseText);
          if (
            err.response.request.responseText ===
            '{"phone_no":["customer with this phone no already exists."]}'
          ) {
            alert(
              `User with that phone number already exist ${formData.phone}`
            );
            return;
          }

          if (
            err.response.request.responseText ===
            '{"credit_card_no":["customer with this credit card no already exists."]}'
          ) {
            alert(
              `User with that credit card number already exist ${formData.credit_card_no}`
            );
            return;
          }
        });
    }
  };

  useEffect(() => {
    axiosInstance
      .get(`get-customer-profile`)
      .then((res) => {
        updateFormData({
          ...formData,
          first_name: res.data.first_name.trim(),
          last_name: res.data.last_name.trim(),
          phone: res.data.phone_no.trim(),
          address_line_1: res.data.address.trim(),
          credit_card_no: res.data.credit_card_no.trim(),
        });
        setCustomer(true);
      })
      .catch((err) => {
        setCustomer(false);
      });
  }, []);

  return (
    <>
      <section
        className='section-content padding-y bg mt-5'
        row='true'
        justify-content-center='true'
        style={{ display: "flex" }}>
        <div className='container'>
          <div className='row'>
            <aside
              className='col-lg-12
            '>
              <div className='card' style={{ textAlign: "center" }}>
                <div className='card-body'>
                  <h4 className='card-title mb-4'>Billing Address</h4>

                  <form>
                    <div className='form-row'>
                      <div className='col form-group'>
                        <label htmlFor=''>First Name</label>
                        <input
                          style={{ textAlign: "center" }}
                          type='text'
                          name='first_name'
                          className='form-control'
                          required={true}
                          onChange={handleChange}
                          defaultValue={formData.first_name}
                        />
                      </div>
                      <div className='col form-group'>
                        <label htmlFor=''>Last Name</label>
                        <input
                          style={{ textAlign: "center" }}
                          type='text'
                          name='last_name'
                          className='form-control'
                          required={true}
                          onChange={handleChange}
                          defaultValue={formData.last_name}
                        />
                      </div>
                    </div>
                    <div className='form-row'>
                      <div className='col form-group'>
                        <label htmlFor=''>Phone Number</label>
                        <input
                          style={{ textAlign: "center" }}
                          type='text'
                          name='phone'
                          className='form-control'
                          required={true}
                          onChange={handleChange}
                          defaultValue={formData.phone}
                        />
                      </div>
                    </div>
                    <div className='form-row'>
                      <div className='col form-group'>
                        <label htmlFor=''>Address Line</label>
                        <input
                          style={{ textAlign: "center" }}
                          type='text'
                          name='address_line_1'
                          className='form-control'
                          required={true}
                          onChange={handleChange}
                          defaultValue={formData.address_line_1}
                        />
                      </div>
                      <div className='col form-group'>
                        <label htmlFor=''>Credit Card Number</label>
                        <input
                          style={{ textAlign: "center" }}
                          type='text'
                          name='credit_card_no'
                          className='form-control'
                          onChange={handleChange}
                          defaultValue={formData.credit_card_no}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </aside>
            <aside className='col-lg-12'>
              <div className='card' style={{ textAlign: "center" }}>
                <div className='card-body'>
                  <table className='table table-borderless table-shopping-cart'>
                    <thead className='text-muted'>
                      <tr className='small text-uppercase'>
                        <th
                          scope='col'
                          width={120}
                          style={{ textAlign: "center" }}></th>
                      </tr>
                    </thead>
                  </table>
                  <Link
                    to='/checkout'
                    className='btn btn-primary btn-block'
                    onClick={handleSubmit}>
                    Create & Update & Confirm details
                  </Link>
                  <Link to='/my-tickets' className='btn btn-light btn-block'>
                    Continue Flight Search
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

export default CustomerProfile;
