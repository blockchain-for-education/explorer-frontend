import React from "react";
import { Progress,Spinner,Row,Col } from "reactstrap";
const NodesList = props => {
  if(!props.nodes){
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
  return props.nodes.map((node, idx) => {
    let flagClass = "flag-icon flag-icon-" + node.countryFlag + " h4 mb-0";
    return (
      <tr>
        <td className="text-center">
          <div className="avatar" style={{width:"142px"}}>
            {node.endpoint}
          </div>
        </td>
        <td className="text-center">
          <div className="avatar" style={{width:"70px"}}>
            {node.location}
          </div>
        </td>
        <td>
          <div>{node.name}</div>
          <div className="small text-muted">
            <span></span>
            {node.regiterTime}
          </div>
        </td>
        <td className="text-center">
          <i className={flagClass} title={node.country} id={node.country}></i>
        </td>
        <td>
          <div className="clearfix">
            <div className="float-left">
              <strong>{node.usage} %</strong>
            </div>
            <div className="float-right">
              <small className="text-muted">{node.lastActive}</small>
            </div>
          </div>
          <Progress className="progress-xs" color="success" value={node.usage} />
        </td>
        <td>
          <div className="small text-muted">Last login</div>
          <strong>{node.lastActive}</strong>
        </td>
      </tr>
    );
  });
};
export default NodesList;
