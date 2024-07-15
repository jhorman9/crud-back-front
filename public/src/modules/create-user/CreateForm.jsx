import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import CustomCard from "../components/CustomCard";
import Input from "../components/Input";
import axios from "axios";
import Swal from "sweetalert2";
import { InfoCard } from "../components/InfoCard";

function CreateForm() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isCreate, setIsCreate] = useState(false);

  const handleValue = (field, value) => {
    const copyState = { ...formValues };
    copyState[field] = value;
    setFormValues(copyState);
  };

  console.log(JSON.stringify(formValues));

  const handleSubmit = () => {
    axios.post('http://127.0.0.1:8000/users', formValues)
    .then(response => {
      Swal.fire({
        title: "Usuario creado",
        text: `${response.data.message}`,
        icon: "success",
        background: 'gray',
        color: "white",
        confirmButtonText: "Continuar",
        confirmButtonColor: '#333',
      });
      setFormValues({
        username: "",
        email: "",
        password: "",
      });
      setIsCreate(!isCreate);
    })
    .catch(error => {
      console.log('error:', error.response.data.error)
      Swal.fire({
        title: "Oops error",
        text: `${error.response.data.error}`,
        icon: "error"
      });
    });
  };

  return (
    <CustomCard>
      <Box
        sx={{
          padding: "35px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Typography variant="h4" color="secondary">
          Crear Usuario
        </Typography>
        <Input
          variant="outlined"
          size="medium"
          label="username"
          color="secondary"
          focused
          fullWidth
          value={formValues.username}

          onChange={(e) => handleValue("username", e.target.value)}
        />
        <Input
          variant="outlined"
          size="medium"
          label="email"
          color="secondary"
          focused
          fullWidth
          value={formValues.email}
          onChange={(e) => handleValue("email", e.target.value)}
        />
        <Input
          type="password"
          variant="outlined"
          size="medium"
          label="password"
          color="secondary"
          focused
          fullWidth
          value={formValues.password}
          onChange={(e) => handleValue("password", e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleSubmit}
        >
          Crear
        </Button>
      </Box>
      <Box
        sx={{
          padding: '0 20px',
          color: 'white',
        }} 
        >
      <InfoCard isCreate={isCreate}/>
      </Box>
    </CustomCard>
  );
}

export default CreateForm;
