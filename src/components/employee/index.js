import React from "react";
import "./employee.css";

function Employee(props) {
  return (
    <div className="employee">
       <span>{props.item.id}</span>
       <span>{props.item.employee_name}</span>
       <span>{props.item.employee_age}</span>
    </div>
  )
}

export default Employee;