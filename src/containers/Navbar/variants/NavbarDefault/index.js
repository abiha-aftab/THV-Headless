import React, { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { RiShoppingBasketLine } from 'react-icons/ri'
import Nav from './Nav'
import { Link } from 'gatsby'
import logo from '../../../../assets/images/edwards-logo.svg'
import NavTop from './NavTop'
import { useTheme } from '../../../../hooks/useTheme'

const NavbarDefault = ({ navLinks, languageCode = 'en', languages = [] }) => {
  const { actions } = useTheme()
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobile, setMobile] = useState(false)
  const [headerClass, setHeaderClass] = useState('')

  const toggleMobile = () => {
    setMobile(!mobile)
  }

  const isBrowser = () => typeof window !== "undefined"

  useEffect(() => {
    // initialize orders from localStorage
    const orders = localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders") ?? []) : [];
    actions.changeOrders(orders)

    // make header sticky after scrolling for 100 pixels
    const toggleVisibility = () => {
      if (isBrowser() && window.pageYOffset > 100) {
        setHeaderClass(' navBarSticky');
      } else {
        setHeaderClass('')
      }
    }

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <nav className={`navbarDefault${!mobile ? headerClass : ''}`} role="navigation">
      <div className="navbarDefault__container">
        <div className="navbarDefault__top">
          {mobile
            ? <div></div>
            :
            <>
              <NavTop languageCode={languageCode} languages={languages} />
              <Link to="/">
                <img
                  src={logo}
                  className="navbarDefault__logo"
                  alt={'YourHeartvalve logo'}
                />
              </Link>
            </>
          }
          <button
            className="navbarDefault__toggle"
            onClick={toggleMobile}
            aria-expanded={mobile ? 'true' : 'false'}
          >
            {mobile
              ? <FiX />
              : <><RiShoppingBasketLine /><FiMenu /></>
            }
          </button>
        </div>
        <Nav
          navLinks={navLinks}
          mobile={mobile}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
        />
      </div>
    </nav>
  )
}

export default NavbarDefault
