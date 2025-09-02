import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setPriority } from "../store/reducers/posts";
import { updateUser } from "../store/reducers/users";
import {
    Box,
    Typography,
    Paper,
    TextField,
    Grid,
    Divider,
} from "@mui/material";

export default function Admin() {
    const { list: posts } = useSelector((s: RootState) => s.posts);
    const { list: users } = useSelector((s: RootState) => s.users);
    const dispatch = useDispatch<AppDispatch>();

    const handleUserChange = (
        id: number,
        key: "name" | "email" | "username",
        value: string
    ) => {
        const user = users.find((u) => u.id === id);
        if (user) {
            dispatch(updateUser({ ...user, [key]: value }));
        }
    };

    const handlePriorityChange = (id: number, value: string) => {
        dispatch(setPriority({ id, priority: Number(value) }));
    };

    return (
        <Box maxWidth="lg" mx="auto" px={3} py={2}>
            <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
                Админка
            </Typography>
            <Typography variant="h6" mb={2} textAlign="center">
                Управление пользователями
            </Typography>
            <Grid container spacing={2} mb={4}>
                {users.map((u) => (
                    <Grid size={12} key={u.id}>
                        <Paper sx={{ p: 2 }} variant="outlined">
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Пользователь #{u.id}
                            </Typography>
                            <TextField
                                label="Имя"
                                fullWidth
                                size="small"
                                value={u.name}
                                onChange={(e) => handleUserChange(u.id, "name", e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Email"
                                fullWidth
                                size="small"
                                value={u.email}
                                onChange={(e) => handleUserChange(u.id, "email", e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                label="Username"
                                fullWidth
                                size="small"
                                value={u.username}
                                onChange={(e) => handleUserChange(u.id, "username", e.target.value)}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" mb={2} textAlign="center">
                Приоритет постов
            </Typography>
            {posts.map((p) => (
                <Paper key={p.id} sx={{ p: 2, mb: 2 }} variant="outlined">
                    <Typography variant="subtitle1" component="span" fontWeight="bold">
                        {p.title}
                    </Typography>{" "}
                    — приоритет:
                    <TextField
                        type="number"
                        size="small"
                        value={p.priority}
                        onChange={(e) =>
                            handlePriorityChange(p.id, e.target.value)
                        }
                        sx={{ ml: 2, width: 80 }}
                    />
                </Paper>
            ))}
        </Box>
    );
}
