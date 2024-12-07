/** @jsxImportSource @emotion/react */
import useSWR from "swr";
import { Workout } from "@/types/privateApi/workout";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PaginatedResponse } from "@/types/response";
import { useAuthFetcher } from "@/lib/fetcher";
import { css } from "@emotion/react";

export const EditRoutineModal = ({
  open,
  workoutId,
  onClose,
}: {
  open: boolean;
  workoutId: number | null;
  onClose: () => void;
}) => {
  const authFetcher = useAuthFetcher();
  const { data: workouts, mutate: mutateResults } = useSWR<
    PaginatedResponse<Workout>
  >("/workout", authFetcher);
  const { data: workout, mutate } = useSWR<Workout>(
    Number.isInteger(workoutId) ? `/workout/${workoutId}` : null,
    authFetcher,
  );
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(workout?.name ?? "");
    setDescription(workout?.description ?? "");
  }, [workout]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const data = await authFetcher(
            workoutId ? `/workout/${workoutId}` : "/workout/",
            {
              method: workoutId ? "PUT" : "POST",
              body: JSON.stringify({
                name,
                description,
              }),
            },
          );
          onClose();
          if (!workouts) {
            return;
          }

          if (!workoutId) {
            mutateResults({
              ...workouts,
              count: workouts.count + 1,
              results: [data, ...workouts.results],
            });
          } else {
            mutate(data);
          }
        },
      }}
    >
      <DialogTitle>{workoutId ? "Edit Routine" : "New Routine"}</DialogTitle>
      <DialogContent
        css={css`
          display: flex;
          flex-direction: column;
          gap: 1rem;
        `}
      >
        <TextField
          autoFocus
          id="routine-name"
          variant="filled"
          label="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          variant="filled"
          multiline
          rows={4}
          label="Description"
          value={description}
          placeholder="Routine description"
          onChange={(event) => setDescription(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
};
