import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import { useStyles } from "../../hooks/useStyles";

export const InfoCard = (prop) => {

    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({});
    const [open, setOpen] = useState(false);
    const [idUser, setIdUser] = useState(0);
    const handleClose = () => setOpen(false);
    const { isCreate } = prop;
    const styles = useStyles();

    useEffect(() => {
        axios.get('http://localhost:8000/users')
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            Swal.fire({
                title: "Oops algo salió mal",
                text: `${error.message || error.response?.data || error.response?.data?.message || error.response?.message}`,
                icon: "error"
            })
        });
    },[isCreate]);
    
    const handleDeleteUser = (user) => {
        axios.delete(`http://localhost:8000/users/${user}`)
       .then(() => {
            Swal.fire({
                title: "Eliminado",
                text: "Ha sido eliminado exitosamente",
                icon: "success"
            });
            setData(data.filter(item => item.id !== user));
        })
       .catch((error) => {
            Swal.fire({
                title: "Oops algo salió mal",
                text: `${error.message || error.response?.data || error.response?.data?.message || error.response?.message}`,
                icon: "error"
            })
        });
    }

    const getUserById = (user) => {
        setOpen(true);
        setIdUser(user.id);
        axios.get(`http://localhost:8000/users/${user.id}`)
       .then((response) => {
            setEditData(response.data);
        })
       .catch((error) => {
            Swal.fire({
                title: "Oops algo salió mal",
                text: `${error.message || error.response?.data || error.response?.data?.message || error.response?.message}`,
                icon: "error"
            })
        });
    }

    const handleEditUser = (field, value) => {
        setEditData(prev => ({
            ...prev,
            [field]: value,
        }));
    }

    const handleSubmitEdit = () => {
        axios.put(`http://localhost:8000/users/${idUser}`, editData)
        .then(() => {
            Swal.fire({
                title: "Usuario actualizado",
                text: "Ha sido actualizado exitosamente",
                icon: "success"
            });
            setData(data.map(item => item.id === idUser ? editData : item));
            handleClose();
        }).catch((error) => {
            Swal.fire({
                title: "Oops algo salió mal",
                text: `${error.message || error.response?.data || error.response?.data?.message || error.response?.message}`,
                icon: "error"
            })
        });
    }

    function generate() {
        return data.map((user) => (
            <ListItem
                key={user.id}
                secondaryAction={
                    <>
                    <IconButton edge="end" aria-label="edit" onClick={() => getUserById(user)}>
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
                    <Avatar src="/broken-image.jpg" />
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
        <>
        <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                Lista de usuarios
            </Typography>
            <List dense={true} style={styles.list}>
                {generate()}
            </List>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <strong>Datos del usuario</strong>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <strong>Nombre:</strong>
                        <input 
                            type="text" 
                            value={editData.username || ''} 
                            style={{padding: '3px'}} 
                            onChange={(e) => handleEditUser('username', e.target.value)} 
                        />                    
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <strong>Correo:</strong>
                        <input 
                            type="text" 
                            value={editData.email || ''} 
                            style={{padding: '3px'}} 
                            onChange={(e) => handleEditUser('email', e.target.value)} 
                        />
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <strong>Contraseña:</strong>
                        <input 
                            type="text" 
                            value={editData.password || ''} 
                            style={{padding: '3px'}} 
                            onChange={(e) => handleEditUser('password', e.target.value)} 
                        />
                    </Typography>
                    <Button 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleSubmitEdit} 
                        style={{marginTop: '20px', marginRight: '7px'}}
                    >
                        Editar
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleClose} 
                        style={{marginTop: '20px'}}
                    >
                        Cerrar
                    </Button>
                </Box>
            </Modal>
        </Grid>
        </>
    );
}
