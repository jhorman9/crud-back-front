import { Box} from "@mui/material";
import "./app.css";
import CreateForm from "./modules/create-user/CreateForm";

function App() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 'calc(100vh - 16px)'
      }}
    >
      <CreateForm />
    </Box>
  );
}

export default App;
