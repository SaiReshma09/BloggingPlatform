import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

function Header(props) {
  const { sections, title, login } = props;

  const handleSectionClick = (event, onClick) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Button component={Link} to="/" size="small">Home</Button> {/* Home button */}
          <Button size="small">Subscribe</Button>
        </div>
        <div>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
          >
            {title}
          </Typography>
        </div>
        <div>
          <IconButton>
            <SearchIcon />
          </IconButton>
          {login ? (
            <Button component={Link} to="/" variant="outlined" size="small" onClick={() => {localStorage.setItem('login', false);
            window.location.reload();}}>
              Logout
            </Button>
          ) : (
            <Button component={Link} to="/Login" variant="outlined" size="small">
              Login
            </Button>
          )}
        </div>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Button
            key={section.title}
            onClick={(event) => handleSectionClick(event, section.onClick)}
            sx={{ p: 1, flexShrink: 0, color: 'inherit', display: 'block' }}
          >
            {section.title}
          </Button>
        ))}
      </Toolbar>
      <Toolbar
        sx={{ justifyContent: 'flex-end', paddingRight: '24px' }}
      >
        {login ? (
            <Button component={Link} to="/create-post/:sectionId" variant="outlined" size="small">
              Create
            </Button>
          ) : null}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
  login: PropTypes.bool.isRequired,
};

export default Header;
