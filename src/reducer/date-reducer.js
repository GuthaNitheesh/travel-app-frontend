export const dateReducer = (state, { type, payload }) => {
  switch (type) {
    case "OPEN_SEARCH_MODAL":
      return {
        ...state,
        isSearchModalOpen: !state.isSearchModalOpen,
      };
    case "CHECK_IN":
      return {
        ...state,
        checkInDate: payload,
      };
    case "CHECK_OUT":
      return {
        ...state,
        checkOutDate: payload,
      };
    case "DESTINATION":
      return {
        ...state,
        destination: payload,
        isSearchResultOpen: true, // ✅ show search result when typing
      };
    case "GUESTS":
      return {
        ...state,
        guests: payload,
      };
    case "DATE_FOCUS":
      return {
        ...state,
        isSearchResultOpen: false, // ✅ hide search result when focusing date
      };

    case "CLOSE_SEARCH_MODAL":
      return{
        ...state,
         isSearchModalOpen: !state.isSearchModalOpen,
      }
    default:
      return state;
  }
};
