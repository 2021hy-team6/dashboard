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
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
} from "variables/charts.js";

// Custom Codes
import { PannelChart } from "charts/PannelChart.js"
import { dailyChartSample } from "variables/sampleData.js"

function Dashboard() {
  // TODO callback from response
  const pannelChart = new PannelChart(dailyChartSample);

  return (
    <>
      <PanelHeader
        size="lg"
        content={
          <Line
            data={pannelChart.data}
            options={pannelChart.options}
          />
        }
      />
      <div className="content">
        <Row>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">This Week</h5>
                <CardTitle tag="h4">Usages</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm" /> Last 7 days
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Today</h5>
                <CardTitle tag="h4">Recyclable Rates</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardAllProductsChart.data}
                    options={dashboardAllProductsChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Just
                  Updated
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">An Hour</h5>
                <CardTitle tag="h4">Detection Time</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardShippedProductsChart.data}
                    options={dashboardShippedProductsChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Just
                  Updated
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col xs={12} md={6}>
            <Card>
              <CardHeader>
                <h5 className="card-category">This Month</h5>
                <CardTitle tag="h4">Monthly Comparison</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Categories</th>
                      <th className="text-right">Last Month</th>
                      <th className="text-right">This Month</th>
                      <th className="text-right">+-</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Plastic</td>
                      <td className="text-right">11200</td>
                      <td className="text-right">13232</td>
                      <td className="text-right">+1232</td>
                    </tr>
                    <tr>
                      <td>Glass</td>
                      <td className="text-right">1232</td>
                      <td className="text-right">12313</td>
                      <td className="text-right">-12312</td>
                    </tr>
                    <tr>
                      <td>Paper</td>
                      <td className="text-right">123232</td>
                      <td className="text-right">12122</td>
                      <td className="text-right">+12323</td>
                    </tr>
                    <tr>
                      <td>Can</td>
                      <td className="text-right">12322</td>
                      <td className="text-right">15323</td>
                      <td className="text-right">-12323</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <CardHeader>
                <h5 className="card-category">Annual</h5>
                <CardTitle tag="h4">Most Detected Objects</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th className="text-right">Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Cigarette</td>
                      <td>Litter</td>
                      <td className="text-right">32.73%</td>                    
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
