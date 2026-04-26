"use client";

import React, { useEffect, useState, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./filterSlider.css";

const FilterSlider = ({ activeTab, setActiveTab }) => {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const tabsBox = document.querySelector(".tabs-box");
    const arrowIcons = document.querySelectorAll(".icon i");

    const handleIcons = (scrollVal) => {
      let maxScrollableWidth =
        (tabsBox.scrollWidth ?? 0) - (tabsBox.clientWidth ?? 0);

      if (arrowIcons[0] && arrowIcons[0].parentElement) {
        arrowIcons[0].parentElement.style.display =
          scrollVal <= 0 ? "none" : "flex";
      }

      if (arrowIcons[1] && arrowIcons[1].parentElement) {
        arrowIcons[1].parentElement.style.display =
          maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
      }
    };

    arrowIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        let scrollWidth = (tabsBox.scrollLeft +=
          icon.id === "left" ? -340 : 340);
        handleIcons(scrollWidth);
      });
    });

    const dragging = (e) => {
      if (!isDragging) return;
      const tabsBox = document.querySelector(".tabs-box");
      tabsBox.classList.add("dragging");
      tabsBox.scrollLeft -= e.movementX;
      handleIcons(tabsBox.scrollLeft);
    };

    const dragStop = () => {
      setIsDragging(false);
      tabsBox.classList.remove("dragging");
    };

    tabsBox.addEventListener("mousedown", () => setIsDragging(true));
    tabsBox.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    return () => {
      // Cleanup event listeners when the component is unmounted
      arrowIcons.forEach((icon) => {
        icon.removeEventListener("click", () => {});
      });

      tabsBox.removeEventListener("mousedown", () => setIsDragging(true));
      tabsBox.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
    };
  }, [isDragging]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="wrapper">
      <div className="icon">
        <i id="left">
          <FontAwesomeIcon icon={faAngleLeft} />
        </i>
      </div>
      <ul className="tabs-box">
      <li
          className={`tab ${activeTab === "All" ? "active" : ""}`}
          onClick={() => handleTabClick("All")}
        >
          All
        </li>
        <li
          className={`tab ${activeTab === "Food & Dining" ? "active" : ""}`}
          onClick={() => handleTabClick("Food & Dining")}
        >
          Food & Dining
        </li>
        <li
          className={`tab ${activeTab === "Housing" ? "active" : ""}`}
          onClick={() => handleTabClick("Housing")}
        >
          Housing
        </li>
        <li
          className={`tab ${activeTab === "Transportation" ? "active" : ""}`}
          onClick={() => handleTabClick("Transportation")}
        >
          Transportation
        </li>
        <li
          className={`tab ${activeTab === "Healthcare" ? "active" : ""}`}
          onClick={() => handleTabClick("Healthcare")}
        >
          Healthcare
        </li>
        <li
          className={`tab ${activeTab === "Entertainment" ? "active" : ""}`}
          onClick={() => handleTabClick("Entertainment")}
        >
          Entertainment
        </li>
        <li
          className={`tab ${activeTab === "Utilities" ? "active" : ""}`}
          onClick={() => handleTabClick("Utilities")}
        >
          Utilities
        </li>
        <li
          className={`tab ${activeTab === "Personal Care" ? "active" : ""}`}
          onClick={() => handleTabClick("Personal Care")}
        >
          Personal Care
        </li>
        <li
          className={`tab ${activeTab === "Others" ? "active" : ""}`}
          onClick={() => handleTabClick("Others")}
        >
          Others
        </li>
      </ul>
      <div className="icon">
        <i>
          <FontAwesomeIcon icon={faAngleRight} id="right" />
        </i>
      </div>
    </div>
  );
};

export default FilterSlider;
