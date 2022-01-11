import React, { useEffect, useState } from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import { RiShoppingBasketLine } from 'react-icons/ri'
import Nav from './Nav'
import { Link } from 'gatsby'
import logo from '../../../../assets/images/edwards-logo.svg'
import NavTop from './NavTop'
import { useTheme } from '../../../../hooks/useTheme'
import Basket from './Basket'

const NavbarDefault = ({ navLinks, languageCode = 'en', languages = [] }) => {
  const { state, actions } = useTheme()
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobile, setMobile] = useState(false)
  const [headerClass, setHeaderClass] = useState('')
  const [count, setCount] = useState(0)
  const [basketMobile, setBasketMobile] = useState(false)

  const toggleMobile = () => {
    setMobile(!mobile)
  }

  const toggleBasketMobile = () => {
    setBasketMobile(!basketMobile)
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

  useEffect(() => {
    const tmpOrders = state.orders.filter((order) => {
      return order.locale === languageCode
    })
    setCount(
      tmpOrders.reduce((acc, val) => {
        return acc + val.count
      }, 0)
    )
  }, [state.orders])
  return (
    <nav className={`navbarDefault${!mobile ? headerClass : ''}`} role="navigation">
      <div className="navbarDefault__container">
        <div className="navbarDefault__top">
          {mobile
            ? <div></div>
            :
            <>
              <NavTop languageCode={languageCode} languages={languages} />
              <Link to={languageCode === "en" ? `/` : `/${languageCode}/`}>
                <img
                  src={logo}
                  className="navbarDefault__logo"
                  alt={'Treat HF valve'}
                />
              </Link>
            </>
          }
          <div className="navbarDefault__toggle-contain">
          {!mobile && <button onClick={toggleBasketMobile} className="navbarDefault__cart-mobile"><RiShoppingBasketLine/><span className="quantity">{count}</span></button>}
          <button
            className="navbarDefault__toggle"
            onClick={toggleMobile}
            aria-expanded={mobile ? 'true' : 'false'}
          >
            {mobile
              ? <FiX />
              : <FiMenu />
            }
          </button>
          </div>
        </div>
        <Nav
          navLinks={navLinks}
          mobile={mobile}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          languageCode={languageCode}
          languages={languages}
        />
        {basketMobile && <Basket languageCode={languageCode} setBasketMobile={setBasketMobile} />}
      </div>
    </nav>
  )
}

export default NavbarDefault
