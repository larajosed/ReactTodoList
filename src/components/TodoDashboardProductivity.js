import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import moment from "moment";

function TodoDashboardProductivity({ tasks, isDarkMode }) {
  const [startDate, setStartDate] = useState(
    moment().subtract(7, "days").toDate()
  );
  const [data, setData] = useState([]);

  const getProductivityData = (tasks, start) => {
    if (!Array.isArray(tasks)) {
      return [];
    }
    const dailyCounts = {};
    const today = moment(start);
    const endDate = moment(start).add(6, "days");
    let currentDate = moment(today);
    while (currentDate.isSameOrBefore(endDate)) {
      const dateString = currentDate.format("YYYY-MM-DD");
      dailyCounts[dateString] = 0;
      currentDate.add(1, "day");
    }
    tasks.forEach((task) => {
      if (task.isCompleted() && task.completionDate) {
        const completedDate = moment(task.completionDate).startOf("day");
        const dateString = completedDate.format("YYYY-MM-DD");
        if (dailyCounts.hasOwnProperty(dateString)) {
          dailyCounts[dateString] += 1;
        }
      }
    });
    return Object.keys(dailyCounts).map((date) => ({
      name: moment(date).format("D/MMM"),
      Tareas: dailyCounts[date],
    }));
  };

  useEffect(() => {
    setData(getProductivityData(tasks, startDate));
  }, [tasks, startDate]);

  const handlePrevious = () => {
    setStartDate(moment(startDate).subtract(7, "days").toDate());
  };

  const handleNext = () => {
    setStartDate(moment(startDate).add(7, "days").toDate());
  };

  const currentStartDate = moment(startDate).format("D/MM/YYYY");
  const currentEndDate = moment(startDate).add(7, "days").format("D/MM/YYYY");

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const containerStyle = {
        backgroundColor: isDarkMode ? "#333" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        border: `1px solid ${isDarkMode ? "#555" : "#ccc"}`,
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        fontSize: "14px",
      };
      return (
        <div className="custom-tooltip" style={containerStyle}>
          <p className="label">{`Fecha: ${label}`}</p>
          <p className="intro" style={{ color: payload[0].fill }}>
            {`Tareas: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={isDarkMode ? "dark-mode" : ""}
      style={{ width: "100%", height: 300 }}
    >
      <h3 className="tittle">Productividad por 7 Días</h3>
      <div className="navigation-header">
        <BsArrowLeftCircle
          size={20}
          onClick={handlePrevious}
          className="nav-icon"
        />
        <span className="date-range-text">
          {currentStartDate} - {currentEndDate}
        </span>
        <BsArrowRightCircle
          size={20}
          onClick={handleNext}
          className="nav-icon"
        />
      </div>
      <ResponsiveContainer style={{ marginTop: "35px" }}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
          <Bar dataKey="Tareas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TodoDashboardProductivity;
