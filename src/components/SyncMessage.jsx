import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useAppStore } from "../store/useAppStore";

export default function SyncMessage() {
  const { syncMessage, setSyncMessage } = useAppStore();
  return (
    <Snackbar
      open={!!syncMessage}
      autoHideDuration={3000}
      onClose={() => setSyncMessage(null)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Alert severity="success" sx={{ width: "100%" }}>
        {syncMessage}
      </Alert>
    </Snackbar>
  );
}
