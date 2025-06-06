export const reducer = (
  state: Record<string, number>,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "INCREASE":
      return {
        ...state,
        [action.payload]: (state[action.payload] ?? 0) + 1,
      };
    case "DECREASE":
      return {
        ...state,
        [action.payload]: Math.max((state[action.payload] ?? 1) - 1, 0),
      };
    default:
      return state;
  }
};
