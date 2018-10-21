import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import {
  AppBar,
  Drawer,
  MenuItem,
  Toolbar,
  IconButton,
  Typography,
  CssBaseline
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { GreetingIcon, UsersIcon, NotificationIcon } from "./Icons";

class SidebarDrawer extends React.Component {
  componentDidMount() {
    let frameCount = 0;
    const open = () =>
      frameCount++ > 0 ? this.props.onMounted() : requestAnimationFrame(open);
    requestAnimationFrame(open);
  }

  render() {
    return (
      <Drawer
        docked={false}
        width={200}
        open={this.props.open}
        onRequestChange={this.props.onRequestChange}
      >
        <MenuItem
          primaryText={"Greeting"}
          leftIcon={<GreetingIcon />}
          containerElement={<Link to={"/"} />}
          onClick={this.props.onClick}
        />
        <MenuItem
          primaryText={"Users"}
          leftIcon={<UsersIcon />}
          containerElement={<Link to={"/users"} />}
          onClick={this.props.onClick}
        />
        <MenuItem
          primaryText={"Notification"}
          leftIcon={<NotificationIcon />}
          containerElement={<Link to={"/notification"} />}
          onClick={this.props.onClick}
        />
      </Drawer>
    );
  }
}

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  content: {
    flexGrow: 1
  }
});

class AppShell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      drawer: false
    };
  }

  handleDrawerToggle = e => {
    if (!this.state.drawer) {
      this.setState({ drawer: true });
      e.preventDefault();
    } else {
      this.setState({ open: !this.state.open });
    }
  };

  render() {
    const { classes } = this.props;
    // using lazy loading for drawer due to reduce first meaningful time
    // all of events are managed by app shell
    const LazySidebarDrawer = this.state.drawer && (
      <SidebarDrawer
        open={this.state.open}
        onMounted={() => this.setState({ open: true })}
        onClick={() => this.setState({ open: false })}
        onRequestChange={open => this.setState({ open: open })}
      />
    );

    // AppBar hack. See https://github.com/mui-org/material-ui/issues/10076#issuecomment-361232810
    const AppBarHack = <Toolbar />;

    return (
      <MuiThemeProvider theme={theme}>
        <React.Fragment>
          <CssBaseline />
          <AppBar>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>

              <Typography variant="h6" color="inherit" noWrap>
                {this.props.title}
              </Typography>
            </Toolbar>
          </AppBar>
          {AppBarHack}
          {LazySidebarDrawer}
          {React.cloneElement(this.props.children)}
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(AppShell);
