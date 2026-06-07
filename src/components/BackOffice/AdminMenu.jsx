import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {ManageAccounts} from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from "@mui/material";


// export default function AdminButton() {
//     return(
//         <ManageAccounts  sx={{ color: "primary.main", fontSize: 40 }}/>
//     )
// }



export default function AdminMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddFilm = () => {
        handleClose();
        navigate("/admin/addFilms");
    };

    const handleEditFilms = () => {
        handleClose();
        navigate("/admin/editFilms");
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                color="primary"
                size="large"
                sx={{ ml: 1 }}
            >
                <ManageAccounts sx={{ fontSize: 40 }} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleAddFilm}>
                    Ajouter un film
                </MenuItem>
                <MenuItem onClick={handleEditFilms}>
                    Éditer les films
                </MenuItem>
            </Menu>
        </>
    );
}