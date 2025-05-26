// hooks/useSubNavDataCleanup.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PURGE } from 'redux-persist';

const useSubNavDataCleanup = () => {
  const location = useLocation();
  const dispatch = useDispatch();

    // Clear persisted data when the user navigates away from the sub-navigation routes
    useEffect(() => {
    const subNavRoutes = [
        "/places/destination",
        "/places/events",
        "/places/destination-places",
        "/places/itineraries",
        "/places/itineraries-details",
        "/places/tags",
    ];

    const isSubNavRouteActive = subNavRoutes.some((route) =>
        location.pathname.startsWith(route)
    );
    if (!isSubNavRouteActive) {
        // Clear persisted data if the user navigates away from the sub-navigation routes
        dispatch({
        type: PURGE,
        key: "destination", // Key used in persistConfig
        result: () => null
        });
        localStorage.removeItem('tagDetails');
    }
      }, [location.pathname, dispatch]);

};

export default useSubNavDataCleanup;