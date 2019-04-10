import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Nav.module.scss";

const Nav = ({
  onHomeClick,
  onSettingsClick,
  mainBtnIcon,
  onMainBtnClick,
  className
}) => {
  const navClassName = `${
    styles.container
  } secondary-contrast-coloring shadow-fg-tertiary-1-top-25 flex flex--space-evenly flex--center-y ${className ||
    ""}`;

  return (
    <nav className={navClassName}>
      <FontAwesomeIcon icon="home" onClick={onHomeClick} />
      {mainBtnIcon && (
        <FontAwesomeIcon
          icon={mainBtnIcon}
          onClick={onMainBtnClick}
          className="text--xl"
        />
      )}
      <FontAwesomeIcon icon="cog" onClick={onSettingsClick} />
    </nav>
  );
};

Nav.propTypes = {
  onHomeClick: PropTypes.func,
  onSettingsClick: PropTypes.func,
  mainBtnIcon: PropTypes.string,
  onMainBtnClick: PropTypes.func,
  className: PropTypes.string
};

const emptyFn = () => {};
Nav.defaultProps = {
  onHomeClick: emptyFn,
  onSettingsClick: emptyFn,
  onMainBtnClick: emptyFn
};

export default Nav;
