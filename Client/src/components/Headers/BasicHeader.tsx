// BasicHeader.jsx
import React from "react";
import { Link } from "react-router-dom";
import AuthSection from "./AuthSection";

function BasicHeader() {
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Courses",
      path: "/courses",
    },
    {
      id: 3,
      name: "Works",
      path: "/skills",
    },
    {
      id: 4,
      name: "Teach on SkillUp",
      path: "/addcourse",
    },
  ];



  return (
    <div className="flex items-center justify-between ">
      <ul className="md:flex gap-8">
        {Menu.map((value, index) => (
          <li key={index}>
            <Link
              to={value.path}
              className="hover:cursor-pointer hover:scale-105 transition-all ease-in-out"
            >
              {value.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-center">
        <img src="/logo.svg" alt="logo" />
      </div>
      <AuthSection/>
    </div>
  );
}

export default BasicHeader;
