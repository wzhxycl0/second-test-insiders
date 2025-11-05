'use client';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ButtonAppBar() {
  const pathname = usePathname();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Event Manager
          </Typography>

          <Button
            component={Link}
            href="/"
            color={pathname === '/' ? 'secondary' : 'inherit'}
            sx={{
              textTransform: 'none',
              fontWeight: pathname === '/' ? 'bold' : 'normal',
            }}
          >
            Calendar
          </Button>

          <Button
            component={Link}
            href="/eventlist"
            color={pathname === '/eventlist' ? 'secondary' : 'inherit'}
            sx={{
              textTransform: 'none',
              fontWeight: pathname === '/eventlist' ? 'bold' : 'normal',
            }}
          >
            List
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
