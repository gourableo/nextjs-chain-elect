"use client";

import * as React from "react";
import { format, setMonth } from "date-fns";
import { useDayPicker, useNavigation } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";

type DropdownProps = {
  name?: string;
  value?: string | number;
};

export function CalendarDropdown({ name, value }: DropdownProps) {
  const { fromDate, fromMonth, fromYear, toDate, toMonth, toYear } = useDayPicker();
  const { goToMonth, currentMonth } = useNavigation();

  if (name === "months") {
    const monthList = Array.from({ length: 12 }, (_, i) => ({
      value: i.toString(),
      label: format(setMonth(new Date(), i), "MMM"),
    }));

    return (
      <Select
        onValueChange={(newValue) => {
          const newDate = new Date(currentMonth);
          newDate.setMonth(parseInt(newValue));
          goToMonth(newDate);
        }}
        value={value?.toString()}
      >
        <SelectTrigger>{format(currentMonth, "MMM")}</SelectTrigger>
        <SelectContent>
          {monthList.map((month) => (
            <SelectItem value={month.value} key={month.value}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  } else if (name === "years") {
    const earliestYear = fromYear || fromMonth?.getFullYear() || fromDate?.getFullYear() || 1970;
    const latestYear = toYear || toMonth?.getFullYear() || toDate?.getFullYear();

    let yearList: { label: string; value: string }[] = [];

    if (earliestYear && latestYear) {
      const yearsLength = latestYear - earliestYear + 1;
      yearList = Array.from({ length: yearsLength }, (_, i) => ({
        label: (earliestYear + i).toString(),
        value: (earliestYear + i).toString(),
      }));
    }

    return (
      <Select
        onValueChange={(newValue) => {
          const newDate = new Date(currentMonth);
          newDate.setFullYear(parseInt(newValue));
          goToMonth(newDate);
        }}
        value={value?.toString()}
      >
        <SelectTrigger>{currentMonth.getFullYear()}</SelectTrigger>
        <SelectContent>
          {
            yearList
              .map((year) => (
                <SelectItem value={year.value} key={year.value}>
                  {year.label}
                </SelectItem>
              ))
              .reverse() // Most recent years first
          }
        </SelectContent>
      </Select>
    );
  }

  return null;
}
