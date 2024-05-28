import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import { Upload, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import {jwtDecode} from 'jwt-decode';

// core components
import UserHeader from "components/Headers/UserHeader.js";

const Profile = () => {
  const [fileList, setFileList] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [formData, setFormData] = useState({
    user_id: null,
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    phone_number: "",
    aboutme: "",
    bankname: "",
    banknumber: ""
  });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Token not found");

        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        const user_id = decodedToken.id;
        if (!role) throw new Error("Role not found in token");

        const response = await fetch(`http://localhost:8000/api/get-profile/${role}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        const result = await response.json();
        setFormData({
          role: role,
          user_id: result.user_id,
          username: result.username,
          email: result.email,
          firstname: result.firstname || "",
          lastname: result.lastname || "",
          address: result.address || "",
          phone_number: result.phone_number || "",
          aboutme: result.aboutme || "",
          bankname: result.bankname || "",
          banknumber: result.banknumber || ""
        });

        // Set initial avatar URL
        setAvatarUrl(`http://localhost:8000/CV/avatar_${role}_${result.username}.jpg?timestamp=${new Date().getTime()}`);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      const formData = new FormData();
      formData.append('file', file);

      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("Token not found");

        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;
        const username = decodedToken.username;

        formData.append('role', role);
        formData.append('username', username);

        // Log FormData content
        for (const pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }

        const response = await fetch('http://localhost:8000/upload-avatar', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData,
        });

        const result = await response.json();
        if (response.ok) {
          // Update the avatar URL to include a new timestamp to avoid caching
          setAvatarUrl(result.avatar_url);
          message.success('Image uploaded successfully!');
        } else {
          message.error('Image upload failed!');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        message.error('Image upload failed!');
      }
    }
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Token not found");

      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      if (!role) throw new Error("Role not found in token");

      const formDataWithRole = { ...formData, role };

      const response = await fetch('http://localhost:8000/api/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formDataWithRole),
      });

      const result = await response.json();
      console.log(result);

      setSuccessMessage("Update thành công");
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <UserHeader />

      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="10">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="2">
                    <ImgCrop rotationSlider>
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                      >
                        {fileList.length < 1 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4">User information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="username">Username</label>
                          <Input
                            className="form-control-alternative"
                            value={formData.username}
                            id="username"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="email">Email</label>
                          <Input
                            className="form-control-alternative"
                            value={formData.email}
                            id="email"
                            type="email"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="firstname">First name</label>
                          <Input
                            className="form-control-alternative"
                            value={formData.firstname}
                            id="firstname"
                            placeholder="First name"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="lastname">Last name</label>
                          <Input
                            className="form-control-alternative"
                            value={formData.lastname}
                            id="lastname"
                            placeholder="Last name"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Contact information</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="address">Address</label>
                          <Input
                            className="form-control-alternative"
                            value={formData.address}
                            id="address"
                            placeholder="Home Address"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="phone_number">Phone</label>
                          <Input
                            className="form-control-alternative"
                            value={formData.phone_number}
                            id="phone_number"
                            placeholder="Phone"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="banknumber">Số tài khoản</label>
                          <Input
                            className="form-control-alternative"
                            value={formData.banknumber}
                            id="banknumber"
                            placeholder="Số tài khoản"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="bankname">Tên ngân hàng</label>
                          <Input
                            className="form-control-alternative"
                            value={formData.bankname}
                            id="bankname"
                            placeholder="Tên ngân hàng"
                            type="text"
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="A few words about you ..."
                        rows="4"
                        value={formData.aboutme}
                        type="textarea"
                        id="aboutme"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </div>
                  <Button type="submit">Submit</Button>
                </Form>
                {successMessage && (
                  <div className="alert alert-success" role="alert">
                    {successMessage}
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
