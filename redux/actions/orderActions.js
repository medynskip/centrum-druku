import * as t from "../types";

export const updateOrder = (order) => ({
  type: t.UPDATE_ORDER,
  payload: order,
});
