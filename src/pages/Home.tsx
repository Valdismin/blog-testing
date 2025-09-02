import {useMemo, useState} from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import {
    Box,
    Typography,
    Select,
    MenuItem,
    CircularProgress,
    Paper,
    Grid,
    Button,
} from "@mui/material";

export default function Home() {
    const { list: posts, loading } = useSelector((s: RootState) => s.posts);
    const { list: users } = useSelector((s: RootState) => s.users);

    const [selectedUser, setSelectedUser] = useState<number | "all">("all");
    const [visibleCount, setVisibleCount] = useState(10);

    const handleUserChange = (value: string | number) => {
        setSelectedUser(value === "all" ? "all" : Number(value));
    };

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 10);
    };

    const sorted = useMemo(() => {
        const filtered =
            selectedUser === "all"
                ? posts
                : posts.filter((p) => p.userId === selectedUser);

        return [...filtered].sort((a, b) => b.priority - a.priority);
    }, [posts, selectedUser]);

    const visiblePosts = useMemo(
        () => sorted.slice(0, visibleCount),
        [sorted, visibleCount]
    );



    return (
        <Box p={3}>
            <Grid container spacing={3}>
                <Grid size={12}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        <PostForm />

                        <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
                                Фильтрация по пользователю
                            </Typography>
                            <Select
                                value={selectedUser}
                                onChange={(e) => handleUserChange(e.target.value)}
                                displayEmpty
                                size="small"
                                fullWidth
                                variant='outlined'
                            >
                                <MenuItem value="all">Все пользователи</MenuItem>
                                {users.map((u) => (
                                    <MenuItem key={u.id} value={u.id}>
                                        {u.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Paper>
                    </Box>
                </Grid>

                <Grid size={12}>
                    {loading ? (
                        <Box display="flex" justifyContent="center" mt={3}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box display="flex" flexDirection="column" gap={2}>
                            {visiblePosts.map((p) => (
                                <PostCard key={p.id} post={p} />
                            ))}

                            {visibleCount < sorted.length && (
                                <Box display="flex" justifyContent="center" mt={2}>
                                    <Button
                                        variant="outlined"
                                        onClick={handleShowMore}
                                    >
                                        Показать ещё
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
}
