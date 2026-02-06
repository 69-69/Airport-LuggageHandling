'use client';

import React, {useState} from 'react';
import {Box, Button, TextField, Typography, Paper, Divider, Link} from '@mui/material';
import {useRouter, useSearchParams} from 'next/navigation';
import ChangePasswordDialog from "@/components/login/changePasswordDialog";
import WorkPreferenceDialog from "@/components/login/workPreferenceDialog";
import GatePreferenceDialog from "@/components/login/gatePreferenceDialog";
import {useAuth} from "@/actions/authContext";
import {dashboardRedirectPath, RoleEnum} from "@/types/userRole";
import {clearErrorAndSet, passwordRegex} from "@/components/util";

const StaffLoginForm = () => {
    const {login} = useAuth();

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const searchParams = useSearchParams();
    const [showGatePref, setGatePref] = useState(false);
    const [showWorkPref, setWorkPref] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();// redirect after login

        if(username.length < 4) {
            setError("Please enter valid username");
            return;
        }
        if (!passwordRegex.test(password)) {
            setError(
                'Password must be at least 6 characters with uppercase, lowercase, and number'
            );
            return;
        }
        setShowChangePassword(true); // show modal after login
    };

    const handleChangePassword = (newPassword: string) => {

        console.log('User Auth:', {username, password, newPassword});

        // TODO: call backend API here
        // Fake backend response for now
        const userFromApi = {
            username,
            role: RoleEnum.GROUND, // or 'ADMIN', 'GROUND', 'PASSENGER'.
            airlineCode: 'UA',
        };

        login(userFromApi, true);

        setShowChangePassword(false);

        /// Role-based flows
        if (userFromApi.role === RoleEnum.GATE) {
            setGatePref(true);
            return;
        }
        if (userFromApi.role === RoleEnum.GROUND) {
            setWorkPref(true);
            return;
        }
        const redirectPath = searchParams.get('redirect') || dashboardRedirectPath({role: userFromApi.role});
        router.push(redirectPath);
    }

    return (
        <Box
            sx={{
                minWidth: {xs: '90%', sm: 400},
            }}
        >
            <Paper sx={{
                p: 4, width: '100%',
                border: '1px dashed grey',
            }} elevation={3}>
                <Typography variant="h5" sx={{mb: 3, textAlign: 'center'}}>
                    Staff Login
                </Typography>
                <form onSubmit={handleSubmit}
                      style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                      }}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        size="small"
                        fullWidth
                        required
                        sx={{mb: 2}}
                        value={username}
                        slotProps={{
                            input: {id: 'username', autoFocus: true},
                        }}
                        onChange={clearErrorAndSet(setUsername, setError)}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type="password"
                        size="small"
                        fullWidth
                        required
                        sx={{mb: 3}}
                        value={password}
                        onChange={clearErrorAndSet(setPassword, setError)}
                    />
                    {error && (
                        <Typography color="error" variant="body2" sx={{mb:1}}>
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained"
                            color="primary" sx={{textTransform: 'none'}}
                            disabled={!username || !password}
                            fullWidth
                    >
                        Login
                    </Button>
                    <Divider sx={{width: 200, my: 1}}>
                        +
                    </Divider>
                    <Link href="/">Back</Link>
                </form>
            </Paper>


            {showChangePassword && (<ChangePasswordDialog
                open={showChangePassword}
                oldPassword={password}
                onClose={() => setShowChangePassword(false)}
                onChangePassword={handleChangePassword}
            />)}


            {/*WorkArea: Gate Preference Dialog*/}
            {showGatePref && (<GatePreferenceDialog
                open={showGatePref}
                onClose={() => setGatePref(false)}
            />)}


            {/*WorkArea: Gate Preference Dialog*/}
            {showWorkPref && (<WorkPreferenceDialog
                open={showWorkPref}
                onClose={() => setWorkPref(false)}
                // If onGateSelected is TRUE, Show GatePreferenceDialog
                onGateSelected={(v) => {
                    setWorkPref(false);
                    setGatePref(v);
                }}
            />)}
        </Box>
    );
};

export default StaffLoginForm;
