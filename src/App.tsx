import './App.css'
import { Container, Stack, Avatar, Box, Typography } from "@mui/material";
import profilePic from "./assets/IMG_9088.jpg"

function App() {
  return (
    <Container maxWidth="sm">
      <Stack alignItems="center" spacing={2} sx={{py: 8}}>

        <Box
        sx={{
          p: 1, borderRadius: "50%", background: "linear-gradient(135deg, rgba(99,102,241,.4), rgba(56,189,248,.4))",
        }}>

          <Avatar
          alt="bryan"
          src={profilePic}
          sx={{ width: 160, height: 160}}
          />

        </Box>

        <Typography fontWeight={800}>
          Hi! Welcome to my portfolio
        </Typography>

      </Stack>
    </Container>
  )
}

export default App
