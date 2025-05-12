import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import styles from "./TripDetails.module.css";
import ItineraryCard from "../PlacesInfo/Itineries/ItineraryCard";
// import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import CardSkeleton from "../skeleton/common/CardSkeleton";
import { useTranslation } from "react-i18next";
import { Download } from "../common/Images";

const StopList = ({ tripDetails, handleViewMoreDetails, setFormState }) => {


  const [items, setItems] = useState(tripDetails?.stops || []);
  const { loading: tripDetailsLoading } = useSelector((state) => state.myTrips);

  const { t } = useTranslation('MyTrips');



  const location = useLocation();
  const isTripEditPage = location.pathname === '/my-trips/edit';

  useEffect(() => {
    if (tripDetails?.stops) {
      try {
        setItems(tripDetails.stops);
        setFormState(prev => ({
          ...prev,
          sites: tripDetails.stops.map(stop => stop.id)
        }));

      } catch (error) {

        // Handle error appropriately
      }
    }
  }, [tripDetails, setFormState]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over?.id);
      const newItems = arrayMove(items, oldIndex, newIndex);

      setItems(newItems);

      const newOrderIds = newItems.map(item => item.id);
      setFormState(prev => ({ ...prev, sites: newOrderIds }));
    }
  };
console.log(items, "items");
console.log(tripDetails, "tripDetails");

  const handleActions = (e, action, id) => {

    e.stopPropagation();
    if (isTripEditPage) {
      setItems(prevItems => prevItems.filter(item => item.id !== id));
      setFormState(prev => ({
        ...prev,
        sites: prev.sites.filter(siteId => siteId !== id),
        // stops: prev.stops.filter(stop => stop.id !== id)
      }));
    }

  }
  return (
    <>
      <div className={styles.tripType}>
        <div className={styles.tripTypeTag}>{tripDetails?.type}</div>
        <div className={styles.icon}>
         <img src={Download}/>
        </div>
      </div>

      <h2 className={styles.tripSummary}>
        {items.length > 0 ?  t('tripDetails.stopsCount', { count: items.length }) 
          : t('tripDetails.noStops')}
      </h2>

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      // modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={items.map((stop) => stop.id)} strategy={verticalListSortingStrategy}>
          <div className={styles.stopList}>
            {tripDetailsLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            ) : (
              items.map((stop, index) => (
                <ItineraryCard
                  key={stop.id}
                  id={stop.id}
                  place={stop}
                  index={index + 1}
                  handleViewMoreDetails={handleViewMoreDetails}
                  handleActions={handleActions}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default StopList;
