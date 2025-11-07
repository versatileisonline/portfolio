import './App.css'
import { Container, Stack, Avatar, Box, Typography } from "@mui/material";
import profilePic from "./assets/IMG_9088.jpg"

function App() {
  return (
    <Container maxWidth="sm">
      <Stack alignItems="center" spacing={2} sx={{py: 8}}>

        <Box
        sx={{
          p: 1, borderRadius: "50%", background: "linear-gradient(135deg, rgba(119, 74, 25, 0.4), rgba(205, 114, 35, 1))",
        }}>

          <Avatar
          alt="bryan"
          src={profilePic}
          sx={{ width: 300, height: 300}}
          />

        </Box>

        <Typography fontWeight={800}>
          placing
        </Typography>

        <Box
        sx={{backgroundColor: "white"}}>
          <Typography>
            example text.
          </Typography>
        </Box>

      </Stack>
    </Container>
  )
}

export default App
