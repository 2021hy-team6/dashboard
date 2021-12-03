/*!

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, CardImg, CardText, CardHeader, CardBody, Row, Col } from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

const detectionSample = [
  {
    src: "https://user-images.githubusercontent.com/59322692/144555947-77a52c16-18e0-4ffe-9447-d7a261e502f9.png",
    categories: "Glass, Can, Plastic"
  },
  {
    src: "https://user-images.githubusercontent.com/59322692/144555947-77a52c16-18e0-4ffe-9447-d7a261e502f9.png",
    categories: "Glass, Can, Plastic"
  },
  {
    src: "https://user-images.githubusercontent.com/59322692/144555947-77a52c16-18e0-4ffe-9447-d7a261e502f9.png",
    categories: "Glass, Can, Plastic"
  },
  {
    src: "https://user-images.githubusercontent.com/59322692/144555947-77a52c16-18e0-4ffe-9447-d7a261e502f9.png",
    categories: "Glass, Can, Plastic"
  },
]

function Detection() {
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <h5 className="title">Detected Images</h5>
                <p className="category">
                  Display up to 10 recently detected images
                </p>
              </CardHeader>
              <CardBody>
                <Row>
                  {detectionSample.map((data) => {
                    return (
                      <Col  lg={3}
                            md={3}
                            sm={4}
                            xs={6}>
                        <Card>
                          <CardImg top src={data['src']}
                                      alt="detections image" />
                          <CardBody>
                            <CardText>Glass, Bottle, Plastic</CardText>
                          </CardBody>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Detection;
