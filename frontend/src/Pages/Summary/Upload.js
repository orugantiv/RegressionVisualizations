import { useState } from "react";
import { Button, Input, Dialog, DialogTitle, DialogContent, DialogActions, Switch, FormControlLabel } from "@mui/material";

function App(props) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [ev, setEvent] = useState([]);

  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);

  const handleFileDrop = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit");
      } else if (file.type !== "text/csv") {
        alert("Invalid file type. Please select a CSV file.");
      } else {
        setFile(file);
        setEvent(event)
      }
    }
  };

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleDoneClick = () => {
    setOpen(false);
    props.handleFileDrop(ev)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle1 = () => {
    setToggle1(!toggle1);
  };

  const handleToggle2 = () => {
    setToggle2(!toggle2);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleButtonClick}>
        Upload CSV File
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload CSV File</DialogTitle>
        <DialogContent>
          <div>
            <Input type="file" accept=".csv" onChange={handleFileDrop} />
          </div>
          <div>
            <FormControlLabel
              control={<Switch checked={toggle1} onChange={handleToggle1} />}
              label="Toggle 1"
            />
            <FormControlLabel
              control={<Switch checked={toggle2} onChange={handleToggle2} />}
              label="Toggle 2"
            />
          </div>
        </DialogContent>
        <DialogActions>
          {file ? (
            <Button onClick={handleDoneClick}>Done</Button>
          ) : (
            <Button onClick={handleClose}>Cancel</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;