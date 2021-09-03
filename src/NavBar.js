import React from "react";
import SideNavigation from "@awsui/components-react/side-navigation";

const NavBar = () => {
    return (
        <SideNavigation 
          header={
            {
              text:"Unicorn Team 2 demo1",
              href:"/"
            }
          }
          items={
            [ 
              {
                type:'link',
                text:"home",
                href:"/"
              },
              {
                type:'section',
                text:"main",
                items:[
                  {
                    type:'link',
                    text:"Create",
                    href:"/register"
                  },
                  
                ]

              }
            ]
          }
        />
    )
}

export default NavBar;