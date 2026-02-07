'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {RoleEnum, UserRole} from "@/types/userRole";
import {manualAirlines, toSentenceCase} from "@/components/util";

interface HeaderProps {
    role?: UserRole;
    username?: string;
    accessLevel?: string;
    airlineCode?: string;
    onLogout?: (redirectPath?: string) => void;
}

const Header = ({username, role, airlineCode, onLogout, accessLevel}: HeaderProps) => {
    let tagName: string;
    if ((role as RoleEnum) == RoleEnum.PASSENGER && airlineCode){
        tagName = manualAirlines.find(a=>a.startsWith(airlineCode)) ?? airlineCode;
    }else{
        tagName = role ?? '';
    }
    const handleLogout = async () => {
        if (onLogout) {
            onLogout('/');
        }
    }
    return (
        <AppBar position="fixed" color="primary" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h6" component="div" sx={{ml: 5}}>
                    ✈️ Airport Luggage Handling System
                </Typography>
                {username && (
                    <Box>
                        <Typography component="span" sx={{mr: 2}}>
                            {tagName?.toUpperCase()} | {accessLevel && (toSentenceCase(accessLevel) + ' | ')} {toSentenceCase(username)}
                        </Typography>
                        <Button color="inherit" variant="outlined" size="small" sx={{textTransform: 'none'}}
                                onClick={handleLogout}>
                            Logout
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header;


