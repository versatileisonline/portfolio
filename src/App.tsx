import './App.css'
import { Container, Stack, Avatar, Typography, Box } from "@mui/material";

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
          src="/IMG_9088.jpg"
          sx={{ width: 160, height: 160}}
          />

        </Box>

      </Stack>
    </Container>
  )
}

export default App
