import { Box, Typography } from "@mui/material";

export default function SectionHeading(props: { title: string }) {
  return (
    <Box className="section-heading">
      <Typography variant="h2" className="section-title">
        {props.title}
      </Typography>
    </Box>
  );
}
