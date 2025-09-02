import {AppBar, Toolbar, Typography, Button, Box} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useEffect} from "react";
import {fetchPosts} from "../../store/reducers/posts.ts";
import {fetchUsers} from "../../store/reducers/users.ts";

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUserId = useSelector((s: RootState) => s.auth.currentUserId);
    const admins = useSelector((s: RootState) => s.auth.admins);
    const isAdmin = currentUserId ? admins.includes(currentUserId) : false;

    useEffect(() => {
        localStorage.setItem("currentUserId", String(currentUserId));
        dispatch(fetchPosts());
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <AppBar position="static">
            <Toolbar sx={{
                display: "flex",
                justifyContent: {xs: "space-between"},
            }}>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    style={{flexGrow: 1, textDecoration: "none", color: "inherit"}}
                >
                    Forum
                </Typography>

                <Box sx={{
                    display: "flex",
                    flexDirection: {xs: "column"},
                    justifyContent: {xs: "space-between"},
                    alignItems: {xs: 'flex-end'}
                }}>
                    <Button color="inherit" component={Link} to="/profile">
                        Профиль
                    </Button>

                    {
                        isAdmin && <Button sx={{textAlign: {xs: 'end'}}} color="inherit" component={Link} to="/admin">
                            Страница Администратора
                        </Button>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
