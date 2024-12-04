import { useAuthFetcher } from "@/lib/fetcher";
import { Day } from "@/types/privateApi/day";
import useSWR from "swr";
import type { PaginatedResponse } from "@/types/response";
import type { WorkoutSetType } from "@/types/privateApi/set";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
} from "@mui/material";
import { WorkoutSet as WorkoutSet } from "./WorkoutSet";
import { ExpandMore } from "@mui/icons-material";
import styles from "@/styles/workoutDay.module.css";
import { Weekday } from "./Weekday";

export const WorkoutDay = ({
  day,
  namespace,
}: {
  day: Day;
  namespace: string;
}) => {
  const { data: workoutSet } = useSWR<PaginatedResponse<WorkoutSetType>>(
    `/set?exerciseday=${day.id}`,
    useAuthFetcher(),
  );

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`${namespace}-content`}
        id={`${namespace}-header`}
      >
        <div>
          <h4>{day.description}</h4>
          <span className={styles.weekdays}>
            {day.day.map((weekday, index) => (
              <Weekday
                key={`${namespace}-weekday-${weekday}`}
                weekday={weekday}
                isLast={index + 1 >= day.day.length}
              />
            ))}
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails>details</AccordionDetails>
      <List>
        {workoutSet?.results.map((set) => {
          const setNamespace = `${namespace}-set-${set.id}`;
          return (
            <WorkoutSet key={setNamespace} namespace={setNamespace} set={set} />
          );
        })}
      </List>
    </Accordion>
  );
};
