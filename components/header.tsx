'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {UserRole} from "@/types/userRole";
import {useRouter} from "next/navigation";
import {toCamelCase} from "@/components/util";

interface HeaderProps {
    role?: UserRole;
    username?: string;
    accessLevel?: string;
    airlineCode?: string;
    onLogout?: () => void;
}

const Header = ({username, role, onLogout, accessLevel}: HeaderProps) => {
    const router = useRouter();

    const handleLogout = async () => {
        if (onLogout) {
            onLogout();
            router.push('/');
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
                            {role?.toUpperCase()} | {accessLevel && (accessLevel.toWellFormed() + ' | ')} {username.toWellFormed()}
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


