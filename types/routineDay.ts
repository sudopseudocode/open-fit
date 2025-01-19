import type { Prisma } from "@prisma/client";
import type { SetGroupInclude } from "./workoutSet";

export type RoutineDayWithSets = Prisma.RoutineDayGetPayload<{
  include: {
    setGroups: SetGroupInclude;
  };
}>;
