import { useState } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
  Collapse,
  Avatar
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import WorkspacesIcon from "@mui/icons-material/Business";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import taskifyLogo from "../assets/taskify-logo.png"; // Logo de fondo degradado
import taskifyName from "../assets/taskify-name.png"; // Logo con 
import { Menu, MenuItem, Dialog, DialogTitle, DialogContent } from "@mui/material";


const drawerWidth = 260;

const Sidebar = () => {
  const [openWorkspaces, setOpenWorkspaces] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  const [accountAnchor, setAccountAnchor] = useState<null | HTMLElement>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const handleClickWorkspaces = () => {
    setOpenWorkspaces(!openWorkspaces);
  };

  const handleClickSettings = () => {
    setOpenSettings(!openSettings);
  };

  return (
    <>
      {/* Barra Superior */}
      <AppBar position="fixed" sx={{ backgroundColor: "#6A1B9A", zIndex: 1400 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Buscador */}
          <Box sx={{ display: "flex", alignItems: "center", backgroundColor: "white", borderRadius: 2, paddingX: 1 }}>
            <SearchIcon sx={{ color: "gray" }} />
            <InputBase placeholder="Buscar..." sx={{ marginLeft: 1 }} />
          </Box>
          {/* Íconos de Interacción */}
            <Box>
              {/* Menú de Notificaciones */}
                <Menu
                  anchorEl={notificationsAnchor}
                  open={Boolean(notificationsAnchor)}
                  onClose={() => setNotificationsAnchor(null)}
                >
                  <MenuItem onClick={() => setNotificationsAnchor(null)}>🔔 Notificación 1</MenuItem>
                  <MenuItem onClick={() => setNotificationsAnchor(null)}>🔔 Notificación 2</MenuItem>
                  <MenuItem onClick={() => setNotificationsAnchor(null)}>🔔 Notificación 3</MenuItem>
                </Menu>

                {/* Diálogo de Información */}
                <Dialog open={infoOpen} onClose={() => setInfoOpen(false)}>
                  <DialogTitle>ℹ️ Acerca de TASKIFY</DialogTitle>
                  <DialogContent>
                    <Typography variant="body1">
                      TASKIFY es una plataforma de gestión de tareas inspirada en Trello, diseñada con Material UI y React.
                    </Typography>
                  </DialogContent>
                </Dialog>

                {/* Menú de Cuenta de Usuario */}
                <Menu
                  anchorEl={accountAnchor}
                  open={Boolean(accountAnchor)}
                  onClose={() => setAccountAnchor(null)}
                >
                  <MenuItem onClick={() => setAccountAnchor(null)}>👤 Perfil</MenuItem>
                  <MenuItem onClick={() => setAccountAnchor(null)}>⚙️ Gestión de cuenta</MenuItem>
                  <MenuItem onClick={() => setAccountAnchor(null)}>🚪 Cerrar sesión</MenuItem>
                </Menu>

              {/* Notificaciones */}
              <IconButton color="inherit" onClick={(event) => setNotificationsAnchor(event.currentTarget)}>
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* Información */}
              <IconButton color="inherit" onClick={() => setInfoOpen(true)}>
                <InfoIcon />
              </IconButton>

              {/* Cuenta de usuario */}
              <IconButton color="inherit" onClick={(event) => setAccountAnchor(event.currentTarget)}>
                <Avatar sx={{ bgcolor: "white", color: "#6A1B9A" }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Box>
        </Toolbar>
      </AppBar>

      {/* Fondo Global con el Logo de Taskify */}
      <Box
        sx={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          opacity: 0.04,
          backgroundImage: `url(${taskifyLogo})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: -1, // Se mantiene en el fondo
        }}
      />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#6A1B9A", // Color morado
            color: "white",
            position: "relative",
            marginTop: "64px", // 🔹 Hace que el Sidebar baje y no choque con la barra superior
          },
        }}
      >
        {/* Logo con Nombre */}
        <Toolbar sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <img src={taskifyName} alt="Taskify" style={{ height: "50px" }} />
        </Toolbar>
        <Divider sx={{ backgroundColor: "white" }} />


        <List>
          {/* Tableros */}
          <ListItem component="div" onClick={() => console.log("Tablero clickeado")}>
            <ListItemIcon sx={{ color: "white" }}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Tableros" />
          </ListItem>
          {/* Espacios de trabajo (con submenú) */}
          <ListItem component="div" onClick={handleClickWorkspaces}>
            <ListItemIcon sx={{ color: "white" }}>
              <WorkspacesIcon />
            </ListItemIcon>
            <ListItemText primary="Espacios de trabajo" />
            {openWorkspaces ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openWorkspaces} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component="div" onClick={() => console.log("Perfil clickeado")} sx={{ pl: 4 }}>
                <ListItemText primary="Mis Tableros" />
              </ListItem>
            </List>
          </Collapse>

          {/* Miembros */}
          <ListItem component="div" onClick={() => console.log("Miembros clickeado")}>
            <ListItemIcon sx={{ color: "white" }}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Miembros" />
          </ListItem>

          {/* Configuración (con submenú) */}
          <ListItem component="div" onClick={handleClickSettings}>
            <ListItemIcon sx={{ color: "white" }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Configuración" />
            {openSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem component="div" onClick={() => console.log("Perfil clickeado")} sx={{ pl: 4 }}>
                <ListItemText primary="Perfil" />
              </ListItem>
                <ListItem component="div" onClick={() => console.log("Perfil clickeado")} sx={{ pl: 4 }}>
                <ListItemText primary="Notificaciones" />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
