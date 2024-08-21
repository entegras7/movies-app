import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';

export default function HamMenu(props) {
    const { menuItems } = props
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleNavigation = () => {
        navigate('/favourites') // since only favourites menu item so static for now
    }

    const DrawerList = (
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
            <div style={{ padding: '15px' }}>Menu Items</div>
            <Divider />
            <List>
                {menuItems.map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={handleNavigation}>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div >
            <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
            <div style={{ backgroundColor: '#010227' }}>
                <Drawer sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#1b1d50',
                        color: '#ffffff'
                    },
                    '& .MuiDivider-root': {
                        backgroundColor: '#ffffff'
                    }
                }}
                    open={open}
                    onClose={toggleDrawer(false)} >
                    {DrawerList}
                </Drawer>
            </div>
        </div >
    );
}
