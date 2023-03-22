import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import styles from "../../public/style.js";

const Footer = () => {
  return (
    <div className={`flex justify-center items-center sm:py-16 py-6 flex-col`}>
      <div
        className={`flex justify-center items-start md:flex-row flex-col mb-8 w-full`}
      >
        <div className="flex-[1] flex flex-col justify-start mr-10">
          <img
            src="../../images/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <p
            className={`font-normal text-[18px] leading-[30.8px] mt-4 max-w-[312px]`}
          >
            Quality Dinner on the Go.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p className="font-normal text-center text-[18px] leading-[27px]">
          Copyright Ⓒ 2023 Catherine Onia. All Rights Reserved.
        </p>

        <div className="flex flex-row md:mt-0 mt-6">
          <SocialIcon
            url="https://linkedin.com/in/catherineonia"
            fgColor="grey"
            bgColor="transparent"
          />
          <SocialIcon
            url="https://github.com/catherinejonia/dingo"
            fgColor="grey"
            bgColor="transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
