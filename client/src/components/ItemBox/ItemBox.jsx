import { Box, Chip, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
import styles from "./ItemBox.module.scss";
import { SecondaryButton } from "@/MUIComponents/SecondaryButton";
import { DeleteRounded, ShoppingCartRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import defaultImg from "../../images/chair1.webp";
import { DeleteIconButton } from "@/MUIComponents/DeleteIconButton";
import { PrimaryIconButton } from "@/MUIComponents/PrimaryIconButton";
import { DashboardContext } from "@/context/DashboardContext";
import { PrimaryButton } from "@/MUIComponents/PrimaryButton";
import { CartContext } from "@/context/CartContext";
import { ItemContext } from "@/context/ItemContext";

const ItemBox = ({ data, num, editable }) => {
  const router = useRouter();
  const { handleOpenDeleteItemModal, handleOpenEditItemModal } = useContext(DashboardContext);
  const { handleOpenViewChooseDimensionModal, setDimensions } = useContext(ItemContext);
  const { addItemToCart, handleToggleCart, setChosenData } = useContext(CartContext);

  const handleViewMore = () => router.push(`shop/${data._id}`);
  const handleEditItem = () => handleOpenEditItemModal(data);

  const handleShopping = () => {
    if (data.dimensions.length > 1) {
      setChosenData({ data, number: 1 });
      setDimensions(data.dimensions);
      handleOpenViewChooseDimensionModal();
    } else {
      addItemToCart({ data, number: 1, dimension: 0 });
      handleToggleCart();
    }
  };

  const isOutOfStock = data?.quantity === 0;

  return (
    <Paper className={`grid jcs aic ${styles.item}`} elevation={2}>
      {/* Image Container */}
      <Box
        className={styles.item_image_wrapper}
        onClick={handleViewMore}
        sx={{ cursor: "pointer" }}
      >
        <Box
          className={styles.item_image}
          sx={{
            backgroundImage: `url(${data ? data.images[0] : defaultImg.src})`,
          }}
        />
        {/* Hover Overlay */}
        <Box className={styles.item_image_overlay}>
          <Typography variant="h6" sx={{ color: "#fff", fontWeight: 600 }}>
            View Details
          </Typography>
        </Box>
        {/* Out of stock badge */}
        {isOutOfStock && (
          <Chip
            label="Out of Stock"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.7rem",
            }}
          />
        )}
        {/* Category badge */}
        {data?.category && (
          <Chip
            label={data.category}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: (theme) => theme.palette.primary.main,
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.65rem",
            }}
          />
        )}
      </Box>

      {/* Content */}
      <Box className={`grid jcs aic g10 pad20`} sx={{ alignContent: "start" }}>
        <Typography
          variant="h5"
          className="tas"
          sx={{
            fontWeight: 700,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {data ? data.title : `Title ${num + 1}`}
        </Typography>

        {data?.description && (
          <Typography
            variant="body2"
            sx={{
              color: "#777",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.5,
              minHeight: "3em",
            }}
          >
            {data.description}
          </Typography>
        )}

        <Box className={`flex flex_wrap jcsb aic`} sx={{ mt: 0.5 }}>
          <Typography
            variant="h6"
            className={styles.item_price}
            sx={{ fontWeight: 700 }}
          >
            {data ? data.price.toLocaleString() : `price ${num + 1}`}{" "}
            <span style={{ fontSize: "0.8em", fontWeight: 500 }}>L.E.</span>
          </Typography>

          {editable ? (
            <DeleteIconButton onClick={() => handleOpenDeleteItemModal(data._id)}>
              <DeleteRounded />
            </DeleteIconButton>
          ) : (
            <PrimaryIconButton
              onClick={handleShopping}
              disabled={isOutOfStock}
              title={isOutOfStock ? "Out of stock" : "Add to cart"}
            >
              <ShoppingCartRounded />
            </PrimaryIconButton>
          )}
        </Box>

        <Box className={`flex flex_wrap jcsb aic g10`} sx={{ mt: 0.5 }}>
          {editable && (
            <PrimaryButton onClick={handleEditItem}>Edit</PrimaryButton>
          )}
          <SecondaryButton
            onClick={handleViewMore}
            sx={{ flex: editable ? "0 0 auto" : "1" }}
          >
            View More
          </SecondaryButton>
        </Box>
      </Box>
    </Paper>
  );
};

export default ItemBox;
