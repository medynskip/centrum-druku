import * as t from "../types";

export const updateOrder = (order) => ({
  type: t.UPDATE_CLIENT_ORDER,
  payload: order,
});
