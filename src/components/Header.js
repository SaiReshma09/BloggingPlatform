import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

function Header(props) {
  const { sections, title } = props;
  const navigate = useNavigate(); // Hook for navigation

  // Custom onClick handler to prevent default and use passed onClick
  const handleSectionClick = (event, onClick) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  // Add this function for Home button navigation
  const navigateHome = () => {
    navigate('/');
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small" onClick={navigateHome}>Home</Button> {/* Home button added here */}
        <Button size="small">Subscribe</Button>
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
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
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
};

export default Header;
