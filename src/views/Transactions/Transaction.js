import React, { Component } from "react";
import {
  Spinner,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
} from "reactstrap";
import agent from "../../agent";

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: null,
    };
  }
  componentDidMount() {
    this.getTransaction();
  }
  async getTransaction() {
    let transaction = await agent.Sawtooth.getTransaction(
      this.props.match.params.id
    );
    this.setState({
      transaction: transaction.data,
    });
  }
  render() {
    let transaction = this.state.transaction;
    if (!this.state.transaction) {
      return (
        <Row style={{ textAlign: "center" }}>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Spinner
              color="primary"
              style={{ width: "50px", height: "50px" }}
            />
          </Col>
        </Row>
      );
    }

    return (
      <div className="animated fadeIn" style={{ fontSize: "14px" }}>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <i className="icon-info pr-1"></i>
                <strong>Transaction ID:</strong>{" "}
                <>{this.props.match.params.id}</>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <tbody>
                    <tr key={transaction.header_signature}>
                      <td>Transaction ID</td>
                      <td>
                        <>{transaction.header_signature}</>
                      </td>
                    </tr>
                    <tr key={transaction.header.family_name}>
                      <td>Transaction Family</td>
                      <td>
                        <>{transaction.header.family_name}</>
                      </td>
                    </tr>
                    <tr key={transaction.header.family_version}>
                      <td>Transaction Family Version</td>
                      <td>
                        <>{transaction.header.family_version}</>
                      </td>
                    </tr>
                    <tr key={transaction.header.signer_public_key}>
                      <td>Signer Public Key</td>
                      <td>
                        <>{transaction.header.signer_public_key}</>
                      </td>
                    </tr>
                    <tr key={transaction.header.nonce}>
                      <td>Nonce</td>
                      <td>
                        <>{transaction.header.nonce}</>
                      </td>
                    </tr>
                    <tr key={transaction.header.payload_sha512}>
                      <td>Payload</td>
                      <td>
                        <>{transaction.header.payload_sha512}</>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="fa fa-sign-in"></i>
                  {"  "}Input:{" "}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <tbody>
                    {transaction.header.inputs.map((input) => {
                      return (
                        <tr key={Math.random()}>
                          <td>
                            <>{input}</>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="fa fa-sign-out"></i>
                  {"  "}Output:{" "}
                </strong>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <tbody>
                    {transaction.header.outputs.map((output) => {
                      return (
                        <tr key={output}>
                          <td>
                            <>{output}</>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="fa fa-newspaper-o"></i>
                  {"  "}Payload:{" "}
                </strong>
              </CardHeader>
              <CardBody>{transaction.payload}</CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="fa fa-newspaper-o"></i>
                  {"  "}Payload decoded:{" "}
                </strong>
              </CardHeader>
              <CardBody>
                 { transaction.decode_payload}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Transaction;
