import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import { Spinner,Row,Col, CardBody, Card } from 'reactstrap';
import agent from '../../agent';
import _ from 'lodash';


const PieChart = props => {
  let transactions = props.transactions;
  if(!transactions) {
    return (
      <Card>
          <CardBody>
            <Row style={{textAlign:"center"}}>
              <Col sm="12" md={{ size: 6, offset: 3 }}>
                <Spinner color="primary" style={{width:"100px",height:"100px"}}/>
              </Col>
            </Row>
          </CardBody>
      </Card>
    )
  }
  let groupByFamily = _.groupBy(transactions,"header.family_name");
  let labels = [];
  let data = [];
  for ( var k in groupByFamily ) {
    labels.push(k);
    data.push(groupByFamily[k].length)
  } 

  let pieData = {
    labels:labels,
    datasets:[
      {
        data:data,
        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#AC64AD"],
        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", "#DA92DB"]
      }
    ]
  }
  return (
    <div className="animated fadeIn">
      <Card>
        <CardBody>
          <div className="chart-wrapper"  >
            <Pie height={100} data={pieData} />
          </div>
        </CardBody>
      </Card>
    </div>

  );
};
export default PieChart;
