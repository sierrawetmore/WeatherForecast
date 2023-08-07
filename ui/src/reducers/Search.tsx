type State = {
  showError: boolean;
  errorMessage: string;
};

type Action = { type: "error"; error: string } | { type: "success" };

export const errorReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "error":
      return { showError: true, errorMessage: action.error };
    case "success": {
      return {
        showError: false,
        errorMessage: "",
      };
    }
  }
};
