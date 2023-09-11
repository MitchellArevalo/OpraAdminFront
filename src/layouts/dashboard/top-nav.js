import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { useAuth } from "src/hooks/use-auth";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";
import { NotificationsPopover } from "src/components/notifications-popover";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const accountPopover = usePopover();
  const notificationPopover = usePopover();
  const auth = useAuth();
  const [notificationQuantity, setNotificationQuantity] = useState(0);


  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 5,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip 
            title="Notificaciones"
            onClick={notificationPopover.handleOpen}
            ref={notificationPopover.anchorRef}
            sx={{
              cursor: "pointer",
              height: 45,
              width: 45,
            }}
            src={auth.user == null ? "" : auth.user.avatar}>
              <IconButton>
                <Badge badgeContent={notificationQuantity} 
                color="primary" >
                  <SvgIcon fontSize="medium">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: "pointer",
                height: 45,
                width: 45,
              }}
              src={auth.user == null ? "" : auth.user.avatar}
            />
          </Stack>
        </Stack>
      </Box>
      <NotificationsPopover
        anchorEl={notificationPopover.anchorRef.current}
        open={notificationPopover.open}
        onClose={notificationPopover.handleClose}
        setNotificationQuantity = {setNotificationQuantity}
      />
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
