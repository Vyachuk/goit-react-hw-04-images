export const photoReducer = (state, action) => {
  switch (action.type) {
    case 'setQ':
      return {
        ...state,
        q: action.payload,
      };
    case 'setPage':
      return {
        ...state,
        page: state.page + action.payload,
      };
    case 'setPhotos':
      return {
        ...state,
        photos:
          action.payload.length === 0
            ? action.payload
            : [...state.photos, ...action.payload],
      };
    case 'setIsModalOpen':
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case 'setLargePhoto':
      return {
        ...state,
        largePhoto: action.payload,
      };
    case 'setIsLoading':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'setTotalPhoto':
      return {
        ...state,
        totalPhoto: action.payload,
      };
    default:
      return state;
  }
};
