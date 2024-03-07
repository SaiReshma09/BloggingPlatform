import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function Header(props) {
  const { sections, title, showDeleteButton, onDelete } = props;

  const handleSectionClick = (event, onClick) => {
    event.preventDefault();
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Button component={Link} to="/" size="small">Home</Button>
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
          <Button variant="outlined" size="small">
            Sign up
          </Button>
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
        sx={{ justifyContent: 'flex-end', paddingRight: '24px', display: 'flex', gap: '8px', alignItems: 'center' }}
      >
        <Button component={Link} to="/create-post/" variant="outlined" size="small">Create</Button>
        {showDeleteButton && (
          <Button onClick={onDelete} variant="outlined" size="small">Delete</Button>
        )}
      </Toolbar>
      <Divider sx={{ width: 'calc(100% - 48px)', marginLeft: '24px' }} />
      <br/>
      <br/>
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
  showDeleteButton: PropTypes.bool,
  onDelete: PropTypes.func,
};

export default Header;
