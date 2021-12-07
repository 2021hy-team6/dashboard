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
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Collapse,
  Dropdown,
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
  Nav,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import axios from 'axios';
import { fetchChart } from "charts/ChartUtils.js"

// Charts
import DayCntChart from "charts/DayCntChart.js"
import WeekUsageChart from "charts/WeekUsageChart.js"
import DayRecChart from "charts/DayRecChart.js"
import DayTimeChart from "charts/DayTimeChart.js"




function Dashboard() {

  const [date, setDate] = useState('2021-05-10')

  const handleChange = (e) => {
    setDate(e.target.value);
  }

  // Charts
  const [dayCnt, setDayCnt] = useState(new DayCntChart());
  const [weekUsage, setWeekUsage] = useState(new WeekUsageChart());
  const [dayRec, setDayRec] = useState(new DayRecChart());
  const [dayTime, setDayTime] = useState(new DayTimeChart());
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Tables
  const [monComp, setMonComp] = useState([]);
  const [annCnt, setAnnCnt] = useState([]);
  
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("white");
    }
    setIsOpen(!isOpen);
  };

  const fetchTable = async (url, setter) => {
    axios.get(url)
      .then((response) => {
        setter(response.data);
      }).catch((e) => {
        setter([]);
        console.error(e);
      });
  };

  useEffect(() => {
    const basepath = "http://127.0.0.1:5000/stats";
    const statDate = date;
    // Get Charts
    fetchChart(`${basepath}/${statDate}/day/cnt`, setDayCnt, DayCntChart);
    fetchChart(`${basepath}/${statDate}/week/usage`, setWeekUsage, WeekUsageChart);
    fetchChart(`${basepath}/${statDate}/day/rec`, setDayRec, DayRecChart);
    fetchChart(`${basepath}/${statDate}/day/time`, setDayTime, DayTimeChart);
    
    // Get Tables
    fetchTable(`${basepath}/${statDate}/mon/comp`, setMonComp);
    fetchTable(`${basepath}/${statDate}/ann/cnt`, setAnnCnt);
  }, []);

  return (
    <>
      <PanelHeader
        size="lg"
        content={
          <Line
            data={dayCnt.data}
            options={dayCnt.options}
          />
        }
      />
      <div className="content">
        <Row>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">This Week {date}</h5>
                <CardTitle tag="h4">Usages</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={weekUsage.data}
                    options={weekUsage.options}
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
                <h5 className="card-category">Today
                  <Input type="date" defaultValue={date} onChange={handleChange} />
                </h5>
                <CardTitle tag="h4">Recyclable Rates</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dayRec.data}
                    options={dayRec.options}
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
                    data={dayTime.data}
                    options={dayTime.options}
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
                      <th>Category</th>
                      <th className="text-right">Last Month</th>
                      <th className="text-right">This Month</th>
                      <th className="text-right">+-</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monComp.map(row => (
	                    <tr>
                        <td>{row.sup_name}</td>
                        <td className="text-right">{row.prev_cnt}</td>
                        <td className="text-right">{row.cnt}</td>
                        <td className="text-right">{row.diff}</td>
                      </tr>
	                  ))}
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
                    {annCnt.map((row, index) => (
	                    <tr>
                        <td>{index+1}</td>
                        <td>{row.obj_name}</td>
                        <td>{row.sup_name}</td>
                        <td className="text-right">{row.ratio}%</td>
                      </tr>
	                  ))}
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
