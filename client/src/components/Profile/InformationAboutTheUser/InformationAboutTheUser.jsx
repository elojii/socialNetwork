import { memo } from "react";
import { Typography } from "@mui/material";
export const InformationAboutTheUser = memo(({ userName, userAge, userDesctiption }) => {

  return (
    <>
          <Typography variant="h5" style={{ fontSize: "30px", color: "black" }}>
            {userName ? userName : "Ім'я не вказано"}
          </Typography>
          <Typography
            variant="h5"
            style={{
              fontSize: userAge ? "30px" : "20px",
              color: userAge ? "black" : "red",
            }}
          > 
            {userAge ? userAge : "Вік не вказано"}
          </Typography>
          <Typography
            variant="h5"
            style={{
              fontSize: userDesctiption ? "30px" : "20px",
              color: userDesctiption ? "black" : "red",
            }}
          >
            {userDesctiption ? userDesctiption : "Опис не додано"}
          </Typography>
        </>
  );
});
