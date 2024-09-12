import React, { useState } from "react";
import { Modal, Button, TextField, Box } from "@mui/material";
import { createInfo } from "../services/api";

const InfoModal = ({ open, handleClose, refreshInfos }) => {
  const [info, setInfo] = useState({
    title: "",
    image: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createInfo(info);
      refreshInfos();
      handleClose();
    } catch (error) {
      console.error("Error creating info:", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          padding: 2,
          margin: "auto",
          marginTop: "20vh",
          backgroundColor: "white",
        }}
      >
        <TextField
          label="title"
          name="title"
          value={info.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="image"
          name="image"
          value={info.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="text"
          name="text"
          value={info.text}
          onChange={handleChange}
          fullWidth
          multiline
          margin="normal"
          InputProps={{
            style: {
              height: "auto",
            },
          }}
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Share Info
        </Button>
      </Box>
    </Modal>
  );
};

export default InfoModal;
