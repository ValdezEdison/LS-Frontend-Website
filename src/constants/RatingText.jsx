
export const getRatingText = (rating, translate) => {
    if (rating === 5) return translate("placeCard.perfect");
    if (rating >= 4.5) return translate("placeCard.excellent");
    if (rating >= 4.0) return translate("placeCard.very_good");
    if (rating >= 3.0) return translate("placeCard.good");
    if (rating >= 2.0) return translate("placeCard.average");
    if (rating >= 1.0) return translate("placeCard.bad");
    return translate("placeCard.terrible");
  };
