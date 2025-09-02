import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { updateUser } from "../store/reducers/users";
import {
    Box,
    Typography,
    Paper,
    TextField,
} from "@mui/material";
import { useCallback } from "react";

type EditableUserField = "name" | "email" | "username";

export default function Users() {
    const { list } = useSelector((s: RootState) => s.users);
    const dispatch = useDispatch<AppDispatch>();

    const handleChange = useCallback(
        (id: number, key: EditableUserField, value: string) => {
            const user = list.find((u) => u.id === id);
            if (user) {
                dispatch(updateUser({ ...user, [key]: value }));
            }
        },
        [list, dispatch]
    );

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
                Все пользователи
            </Typography>

            {list.map((u) => (
                <Paper
                    key={u.id}
                    elevation={2}
                    sx={{ p: 2, mb: 2, borderRadius: 2 }}
                >
                    <Box display="flex" gap={2} flexWrap="wrap">
                        <TextField
                            label="Имя"
                            value={u.name}
                            onChange={(e) => handleChange(u.id, "name", e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="Email"
                            value={u.email}
                            onChange={(e) => handleChange(u.id, "email", e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="Username"
                            value={u.username}
                            onChange={(e) => handleChange(u.id, "username", e.target.value)}
                            size="small"
                        />
                    </Box>
                </Paper>
            ))}
        </Box>
    );
}
