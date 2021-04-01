import Button from "../ui/button";
import classes from "./events-search.module.css";
import { useRef } from "react";

export default function EventsSearch({ onSearch }) {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;
    onSearch(selectedYear, selectedMonth);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select name="" id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month"></label>
          <select name="" id="month" ref={monthInputRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}
