import {Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField} from '@mui/material';

export default function InscriptionDialog({open, onClose}) {      
    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle>Inscription</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"            
                label="Choisir un pseudo"
                type="text"
                color="secondary"
                fullWidth
                />
                <TextField
                autoFocus
                margin="dense"            
                label="Email"
                type="email"
                color="secondary"
                fullWidth
                />
                <TextField
                autoFocus
                margin="dense"            
                label="Mot de passe"
                type="password"
                color="secondary"
                fullWidth
                />
                <TextField
                autoFocus
                margin="dense"            
                label="Confirmer le mot de passe"
                type="password"
                color="secondary"
                fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                Annuler
                </Button>
                <Button onClick={onClose} color="secondary">
                S'inscrire
                </Button>
            </DialogActions>
        </Dialog>
)}