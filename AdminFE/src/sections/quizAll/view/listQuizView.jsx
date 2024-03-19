import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Stack, Button, Container, Breadcrumbs } from '@mui/material';

import Link from 'src/components/link';
import Iconify from 'src/components/iconify';

const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function ListQuizView() {
  const navigate = useNavigate();
  const handleOpenAdd = () => {
    navigate('/addQuiz');
  };
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="large" />} aria-label="breadcrumb">
          <Link href="/">
            <Stack direction="row" alignItems="center">
              <HomeRoundedIcon sx={{ mr: 0.5 }} fontSize="medium" />
              <Typography variant="h5">HomePage</Typography>
            </Stack>
          </Link>

          <Typography variant="h5" color="text.primary">
            Quiz
          </Typography>
        </Breadcrumbs>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAdd}
        >
          New Quiz
        </Button>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ mb: 5 }}>
          <Demo sx={{ p: 3 }}>
            <Link href="/quiz/trueFalse">
              <Stack direction="row" alignItems="center">
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <Typography variant="h5">True-False</Typography>
              </Stack>
            </Link>
          </Demo>
        </Grid>
        <Grid item xs={12} md={6}>
          <Demo sx={{ p: 3 }}>
            <Link href="/quiz/multipleChoice">
              <Stack direction="row" alignItems="center">
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <Typography variant="h5">Multiple Choice</Typography>
              </Stack>
            </Link>
          </Demo>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Demo sx={{ p: 3 }}>
            <Link href="/quiz/matching">
              <Stack direction="row" alignItems="center">
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <Typography variant="h5">Matching</Typography>
              </Stack>
            </Link>
          </Demo>
        </Grid>
        <Grid item xs={12} md={6}>
          <Demo sx={{ p: 3 }}>
            <Link href="/quiz/fillBlank">
              <Stack direction="row" alignItems="center">
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <Typography variant="h5">FillBlank</Typography>
              </Stack>
            </Link>
          </Demo>
        </Grid>
      </Grid>
    </Container>
  );
}
