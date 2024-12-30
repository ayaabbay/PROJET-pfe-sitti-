import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MessageIcon from '@mui/icons-material/Message';
 const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      variants: [
          {
              props: ({ open }) => open,
              style: {
                  ...openedMixin(theme),
                  '& .MuiDrawer-paper': openedMixin(theme),
              },
          },
          {
              props: ({ open }) => !open,
              style: {
                  ...closedMixin(theme),
                  '& .MuiDrawer-paper': closedMixin(theme),
              },
          },
      ],
  }),
);
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const Array1 = [
  { "text": "Home", "icon": <AttachFileIcon />, "path": "/" }
];
const Array2 = [
  { "text": "contact", "icon": <MessageIcon />, "path": "/teacherdashbord" }
];
const Array3 = [
  { "text": "calender", "icon": < PersonIcon />, "path": "/uploadreport" }
];

const SideBar = ({ open, handleDrawerClose }) => {
 const navigate =useNavigate();
 const theme = useTheme();
  return (
      <Drawer variant="permanent" open={open}>
          <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
              {Array1.map((item) => (
                  <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                      onClick={ () => {
                        navigate(item.path)
                      }}
                          sx={[
                              {
                                  minHeight: 48,
                                  px: 2.5,
                              },
                              open
                                  ? {
                                      justifyContent: 'initial',
                                  }
                                  : {
                                      justifyContent: 'center',
                                  },
                          ]}
                      >
                          <ListItemIcon
                              sx={[
                                  {
                                      minWidth: 0,
                                      justifyContent: 'center',
                                  },
                                  open
                                      ? {
                                          mr: 3,
                                      }
                                      : {
                                          mr: 'auto',
                                      },
                              ]}
                          >
                              {item.icon}
                              </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                        },
                                ]}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {Array2.map((item) => (
                    <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                         onClick={ () => {
                            navigate(item.path)
                        }}
                            sx={[
                                {
                                    minHeight: 48,
                                    px: 2.5,
                                },
                                open
                                    ? {
                                      justifyContent: 'initial',
                                    }
                                    : {
                                        justifyContent: 'center',
                                    },
                            ]}
                        >
                            <ListItemIcon
                                sx={[
                                    {
                                        minWidth: 0,
                                        justifyContent: 'center',
                                    },
                                    open
                                        ? {
                                            mr: 3,
                                        }
                                        : {
                                            mr: 'auto',
                                        },
                                ]}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                sx={[
                                    open
                                        ? {
                                            opacity: 1,
                                        }
                                        : {
                                            opacity: 0,
                                          },
                                        ]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {Array3.map((item) => (
                            <ListItem key={item.path} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                 onClick={ () => {
                                    navigate(item.path)
                                }}
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 2.5,
                                        },
                                        open
                                            ? {
                                                justifyContent: 'initial',
                                            }
                                            : {
                                                justifyContent: 'center',
                                            },
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: 'center',
                                              },
                                              open
                                                  ? {
                                                      mr: 3,
                                                  }
                                                  : {
                                                      mr: 'auto',
                                                  },
                                          ]}
                                      >
                                          {item.icon}
                                      </ListItemIcon>
                                      <ListItemText
                                          primary={item.text}
                                          sx={[
                                              open
                                                  ? {
                                                      opacity: 1,
                                                  }
                                                  : {
                                                      opacity: 0,
                                                  },
                                          ]}
                                      />
                                  </ListItemButton>
                              </ListItem>
                          ))}
                      </List>
                  </Drawer>
              );
          }
          export default SideBar;



