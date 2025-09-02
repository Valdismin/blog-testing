import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { updateUser } from "../store/reducers/users";
import { setCurrentUser } from "../store/reducers/auth";
import { useState, useCallback } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
} from "@mui/material";

export default function Profile() {
    const currentUserId = useSelector((s: RootState) => s.auth.currentUserId);
    const user = useSelector((s: RootState) =>
        s.users.list.find((u) => u.id === currentUserId)
    );
    const users = useSelector((s: RootState) => s.users.list);
    const dispatch = useDispatch<AppDispatch>();

    const [form, setForm] = useState(
        user ?? { id: 0, name: "", email: "", username: "" }
    );

    if (!user) {
        return <Typography>Нет пользователя</Typography>;
    }

    const handleSave = useCallback(() => {
        const existingUser = users.find(
            (u) => u.name.toLowerCase() === form.name.toLowerCase()
        );

        if (existingUser && existingUser.id !== currentUserId) {
            dispatch(setCurrentUser(existingUser.id));
            dispatch(updateUser({ ...form, id: existingUser.id }));
            localStorage.setItem("currentUserId", String(existingUser.id));
        } else {
            dispatch(updateUser(form));
        }
    }, [form, users, currentUserId, dispatch]);

    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <Paper
                elevation={3}
                sx={{ p: 3, borderRadius: 2, maxWidth: 400, width: "100%" }}
            >
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Профиль
                </Typography>

                <TextField
                    label="Имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    fullWidth
                    margin="normal"
                />

                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Сохранить
                </Button>
            </Paper>
        </Box>
    );
}
