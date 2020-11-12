import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./InfoBox.css"

function InfoBox({ title, cases, isRed, active, total, ...props }) {
  return (
    // what happen in the class name means that when the card is active add this class infoBox--selected
    <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
      <CardContent>
        <Typography color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2>
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
