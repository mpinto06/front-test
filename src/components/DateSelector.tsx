import React from "react";
import { DateSelectorOption } from "../types"; 
import styles from "./DateSelector.module.css";


interface DateSelectorProps {
  selected: DateSelectorOption;
  onChange?: (option: DateSelectorOption) => void;
}

const options: { value: DateSelectorOption; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "yesterday", label: "Yesterday" },
  { value: "thisWeek", label: "This Week" },
  { value: "previous", label: "Previous" },
];

const DateSelector: React.FC<DateSelectorProps> = ({ selected, onChange }) => {
  return (
    <div className={styles.buttonContainer}>
      {options.map((opt) => (
        <div
          className={`${styles.button} ${selected === opt.value ? styles.buttonActive : ""}`}
          key={opt.value}
          onClick={() => onChange?.(opt.value)}
        >
          {opt.label}
        </div>
      ))}
    </div>
  );
};  

export default DateSelector;
