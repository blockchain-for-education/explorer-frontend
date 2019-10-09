import React, { Component } from "react";
import Websocket from 'react-websocket';
import agent from '../../agent'
import { Link } from "react-router-dom";

import {
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Progress,
  Row,
  Table
} from "reactstrap";

import config from '../../config/config'
import NodesList from "../Networks/NodesList";
import Transactions from "../Transactions/Transactions";
import Blocks from "../Blocks/Blocks";
import Batches from "../Batches/Batches";

import TransactionFamily from "../Transactions/TransactionFamily";
import NodesMap from "../Networks/NodesMap";
import TPS24h from "../Transactions/TPS24h";
import nodes from './nodeMock'

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2,
      blocks:null,
      transactions:null,
      transactions_all:null,
      batches:null
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }
  onMessage = (data)=>{
    console.log(data);
    this.getBlocks(10);
    this.getTransactions(10);
    this.getAllTransactions();
    this.getBatches(10);
  }
  handleOpen = () => {
    this.sendMessage('{"action":"subscribe"}')
  }
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );
  sendMessage = (message)=>{
    this.refWebSocket.sendMessage(message);
  }
  componentDidMount(){
    this.getBlocks(10)
  }
  async getBlocks(limit){
    let blocks = await agent.Sawtooth.getBlocks(limit);
    if(blocks){
      this.setState({
        blocks:(blocks.data)
      })
    }
    
  }
  async getTransactions(limit){
    let transactions = await agent.Sawtooth.getTransactions(limit);
    this.setState({
      transactions:(transactions.data)
    })
  }
  async getAllTransactions(){
    let transactions = await agent.Sawtooth.getAllTransactions();
    this.setState({
      transactions_all:(transactions.data)
    })
  }
  async getBatches(limit){
    let batches = await agent.Sawtooth.getBatches(limit);
    this.setState({
      batches:(batches.data)
    })
  }
  render() {
    return (
      <div className="animated fadeIn">
         <Websocket url={config.websocket_url}
               onOpen={this.handleOpen} 
              onMessage={this.onMessage}
              ref={Websocket => {
                this.refWebSocket = Websocket;
              }}/>
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right"></ButtonGroup>
                <div>
                  TPS Live/All time high:
                  <span className="text-value">12/1024</span>
                </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{ height: "60px", paddingTop: "10px" }}
              >
                <Progress value={(12 / 1024) * 100} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right"></ButtonGroup>
                <div>
                  Active account/Total account:
                  <span className="text-value">100/123</span>
                </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{ height: "60px", paddingTop: "10px" }}
              >
                <Progress color="warning" value={(100 / 123) * 100} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right"></ButtonGroup>
                <div>
                  Head block: {" "}
                  {this.state.blocks?                  
                    <span className="text-value">{this.state.blocks[0].header.block_num}</span>:
                    <span className="text-value">Loading</span>
                  }
                </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{ height: "60px", paddingTop: "10px" }}
              >
                <Progress value={(12 / 1024) * 100} />
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right"></ButtonGroup>
                <div>
                  Total transactions: {"  "}
                  {this.state.transactions_all?                  
                    <span className="text-value">{this.state.transactions_all.length}</span>:
                    <span className="text-value">Loading</span>
                  }
                </div>
              </CardBody>
              <div
                className="chart-wrapper mx-3"
                style={{ height: "60px", paddingTop: "10px" }}
              >
                <Progress value={(12 / 1024) * 100} />
              </div>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col xs="12" sm="6" lg="6">
                    <CardTitle className="mb-0">
                      Transactions per second (24H){" "}
                    </CardTitle>
                    <div className="small text-muted">October 2 2019</div>
                  </Col>
                  <Col xs="12" sm="6" lg="6">
                    <CardTitle className="mb-0">
                      Transactions family (24H){" "}
                    </CardTitle>
                    <div className="small text-muted">October 2 2019</div>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12" sm="6" lg="6">
                    <TPS24h></TPS24h>
                  </Col>
                  <Col xs="12" sm="6" lg="6">
                    <TransactionFamily transactions={this.state.transactions_all}/>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        
        <Row style={{"fontSize":"11px"}}>
          <Col>
            <Card>
              <CardHeader>Transactions {" & "} Blocks</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6" xl="6">
                    <div className="callout callout-info">
                      {/* <small className="text-muted"> */}

                        <Link to="/transactions/"> Realtime transactions</Link>
                      {/* </small> */}
                      <br />
                      {/* {this.state.transactions?(<strong className="h4">{this.state.transactions[0].header.block_num}</strong>):<strong className="h4">loading</strong>} */}
                    </div>
                  </Col>
                </Row>
                <div className="progress-group mb-4"></div>
                <ul>
                  <Transactions transactions={this.state.transactions} />
                </ul>
                <Row>
                  <Col xs="12" md="6" xl="6">
                    <div className="callout callout-info">
                      {/* <small className="text-muted"> */}
                        Realtime batches
                      {/* </small> */}
                      <br />
                    </div>
                  </Col>
                </Row>
                <div className="progress-group mb-4"></div>
                <ul>
                  <Batches batches={this.state.batches} />
                </ul>
                <Row>
                  <Col xs="12" md="6" xl="6">
                    <div className="callout callout-warning">
                      Realtime block
                                       <br />
                      Head blocks:{" "}{this.state.blocks?(<strong className="h4">{this.state.blocks[0].header.block_num}</strong>):<strong className="h4">loading</strong>}
                    </div>
                  </Col>
                  
                </Row>
                <ul>
                    <Blocks blocks={this.state.blocks} />
                  </ul>
                <br />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>Networks</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="6" lg="6">
                    <Table
                      hover
                      responsive
                      className="table-outline mb-0 d-none d-sm-table"
                    >
                      <tbody>
                        <NodesList nodes={nodes}></NodesList>
                      </tbody>
                    </Table>
                  </Col>
                  <Col xs="12" md="6" lg="6">
                    <NodesMap></NodesMap>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      
      </div>
    );
  }
}

export default Dashboard;