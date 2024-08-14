import { LazyLoadImage } from "react-lazy-load-image-component";
import { Box } from "@mui/material";
import React from "react";

interface ImageProps
  extends React.ComponentPropsWithoutRef<typeof LazyLoadImage> {
  sx?: any;
}

const Image: React.FC<ImageProps> = ({ sx, ...other }) => {
  return (
    <Box
      component="span"
      sx={{
        lineHeight: 0,
        display: "block",
        overflow: "hidden",
        "& .wrapper": {
          width: 1,
          height: 1,
          backgroundSize: "cover !important",
        },
        ...sx,
      }}
    >
      <Box
        component={LazyLoadImage}
        wrapperClassName="wrapper"
        placeholderSrc="https://placehold.co/600x400"
        sx={{ width: 1, height: 1, objectFit: "cover" }}
        {...other}
      />
    </Box>
  );
};

export default Image;
