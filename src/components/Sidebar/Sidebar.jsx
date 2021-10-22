import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import db from "../../firebase-config";
import { auth } from "../../firebase-config";
import { logoutUser } from "../../redux/actions";

import loaderFile from "../../assets/loader.gif";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [messageRoom, setMessageRoom] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const { user, loading } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = db.collection("message-room").onSnapshot((snapshot) =>
      setMessageRoom(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSearch = (value) => {
    setSearchMessage(value);
    const filterMSG = messageRoom.filter((item) =>
      item.data.name.includes(value)
    );
    if (Array.isArray(filterMSG) && filterMSG.length > 0) {
      setFiltered(filterMSG);
    }
  };
  if (loading) {
    return (
      <div style={{ textAlign: "center", margin: "100px " }}>
        <img src={loaderFile} alt="Loading...." />
      </div>
    );
  }

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon
              onClick={(e) => {
                setOpen(true);
                setAnchorEl(e.currentTarget);
              }}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={() => setOpen(false)}
            >
              <MenuItem
                onClick={() => {
                  auth.signOut();
                  dispatch(logoutUser());
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__SearchContainer">
          <SearchOutlined />
          <input
            placeholder="Search or Start new chat"
            type="text"
            value={searchMessage}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {searchMessage.length === 0
          ? messageRoom.map((room) => {
              return (
                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
              );
            })
          : filtered.map((room) => {
              return (
                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
              );
            })}
      </div>
    </div>
  );
};

export default Sidebar;
