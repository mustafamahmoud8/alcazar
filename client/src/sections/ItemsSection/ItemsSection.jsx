"use client";
import React, { useContext, useEffect, useCallback } from "react";
import styles from "./ItemsSection.module.scss";
import ItemBox from "@/components/ItemBox/ItemBox";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "@/store/itemsSlice";
import { getCategories } from "@/store/categoriesSlice";
import { getDimensions } from "@/store/dimensionsSlice";
import LoadingItemsSection from "./LoadingItemsSection";
import { FilterAndSearchAndSortForItemsContext } from "@/context/FilterAndSearchAndSortForItemsContext";
import FilterAndSearchAndSortForItems from "@/components/FilterAndSearchAndSortForItems/FilterAndSearchAndSortForItems";
import { InventoryRounded } from "@mui/icons-material";

const ItemsSection = ({ editable, children }) => {
  const { isLoading, items, total } = useSelector((state) => state.items);
  const { search, sort, dimension, category } = useContext(FilterAndSearchAndSortForItemsContext);
  const dispatch = useDispatch();

  const fetchItems = useCallback(() => {
    dispatch(getItems({ search, dimension, category, sort }));
  }, [dispatch, search, dimension, category, sort]);

  useEffect(() => {
    fetchItems();
    dispatch(getCategories());
    dispatch(getDimensions());
  }, [dispatch]);

  return (
    <Box className={`grid jcs aic g30`} sx={{ width: "100%" }}>
      {children}
      <FilterAndSearchAndSortForItems />

      {/* Results Count */}
      {!isLoading && (
        <Typography
          variant="subtitle1"
          sx={{ color: "#777", fontWeight: 500 }}
        >
          {total !== undefined ? `${total} item${total !== 1 ? "s" : ""} found` : `${items.length} item${items.length !== 1 ? "s" : ""} found`}
        </Typography>
      )}

      <Box className={`grid jcs aic g20 ${styles.items_contain}`}>
        {isLoading ? (
          <LoadingItemsSection editable={editable} />
        ) : items && items.length > 0 ? (
          items.map((data, i) => (
            <ItemBox editable={editable} key={data._id || i} data={data} />
          ))
        ) : (
          <Box
            className="flex grid jcc aic g20"
            sx={{
              gridColumn: "1 / -1",
              py: 10,
              textAlign: "center",
            }}
          >
            <InventoryRounded sx={{ fontSize: 80, color: "#ddd" }} />
            <Typography variant="h4" sx={{ color: "#ccc", fontWeight: 600 }}>
              No Items Found
            </Typography>
            <Typography variant="h6" sx={{ color: "#ddd" }}>
              Try adjusting your search or filter
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ItemsSection;
