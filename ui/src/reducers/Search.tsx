import React, { useCallback, useEffect, useReducer, useState } from "react";

type State = {
  showError: boolean;
  errorMessage: string;
};

type Action =
  | { type: "empty address"; error: string }
  | { type: "no results"; error: string }
  | { type: "success" };

export const errorReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "empty address":
      return { showError: true, errorMessage: action.error };
    case "no results": {
      return {
        showError: true,
        errorMessage: "type something else",
      };
    }
    case "success": {
      return {
        showError: false,
        errorMessage: "",
      };
    }
  }
};
