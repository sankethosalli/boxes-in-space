import React, { useState } from "react";
// import Login from "./Login";
import Topnav from "./topnav/Topnav";
import Body from "./body/Body";

function Home(props) {
  const [toggle, setToggle] = useState(() => {
    return {
      url: false,
      category: false,
    };
  });

  const redirectFromHome = () => {
    if (window.location.pathname === "/") {
      window.location.pathname = "/dashboard/";
    }
  };
  redirectFromHome();

  return (
    <div>
      {/*<Login />*/}

      {/* <div>{urlAdd.value === true ? <div>TRUE</div> : <div>FALSE</div>}</div> */}

      <Topnav setToggle={setToggle} toggle={toggle} />
      <Body setToggle={setToggle} toggle={toggle} />
    </div>
  );
}

export default Home;
