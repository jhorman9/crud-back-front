import { Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";

export const InfoCard = () => {

    const [data, setData] = useState();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/users')
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    },[]);
    
    const handleDeleteUser = (user) => {
        axios.delete(`http://localhost:8000/users/${user}`)
       .then(() => {
            Swal.fire({
                title: "Eliminado",
                text: "Ha sido eliminado exitosamente",
                icon: "sucess"
            });
        })
       .catch((error) => {
            console.error(error);
        });
    }

    function generate() {
        return data?.map((user) => (
            <ListItem
                key={user.id}
                secondaryAction={
                    <>
                    <IconButton edge="end" aria-label="edit">
                        <EditIcon 
                            sx={{
                                color: 'blue',
                                padding: '10px',
                                '&:hover': {
                                    backgroundColor: '#3498db',
                                    borderRadius: '50%',
                                },
                            }}
                        />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUser(user.id)}>
                        <DeleteIcon 
                            sx={{
                                color: 'red',
                                padding: '10px',
                                '&:hover': {
                                    backgroundColor: '#873131',
                                    borderRadius: '50%',
                                }}
                            }
                        />
                    </IconButton>
                    </>
                }
            >
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText 
                    primary={user.username}
                    secondary={user.email}
                    sx={{
                        '& .MuiListItemText-secondary': {
                            color: '#9f9f9f',
                        },
                    }}
                />
            </ListItem>
        ));
    }

  return (
    <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Lista de tareas
            </Typography>
            <List dense={dense}>
                {generate()}
            </List>
        </Grid>
  )
}
