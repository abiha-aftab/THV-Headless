import React, { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Link } from 'gatsby'
import { motion, AnimatePresence } from 'framer-motion'
import {
  modalVariants,
  iframeVariant,
} from '../../assets/animations/animations'
import { backdropVariants } from '../../assets/animations/animations'
import { FaChevronRight } from 'react-icons/fa'
import { BsDownload } from 'react-icons/bs'
import { RiShoppingBasketLine } from 'react-icons/ri'
import { prepareTranslations } from '../../utils/prepareTranslations'

const useDisableBodyScroll = (open) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])
}

let useClickOutside = (handler) => {
  let domNode = useRef()
  useEffect(() => {
    let mouseDownHandler = (event) => {
      if (!domNode?.current?.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener('mousedown', mouseDownHandler)
    return () => {
      document.removeEventListener('mousedown', mouseDownHandler)
    }
  })
  return domNode
}

const PDFViewer = ({
  modalData,
  showModal,
  setShowModal,
  languageCode = 'en',
}) => {
  const { title, description, url, image, price } = modalData
  const { state, actions } = useTheme()
  const [orders, setOrders] = useState([])
  const [showBanner, setShowBanner] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const id = 123
  const codename = '123'
  //disable the scroll when modal is open
  useDisableBodyScroll(showModal)
  //modal should close when clicked outside
  let domNode = useClickOutside(() => {
    handleClose()
  })
  //modal should close when escape is pressed
  useEffect(() => {
    if (state.orders) {
      setOrders(state.orders)
    }
    const close = (e) => {
      if (e.keyCode === 27) {
        handleClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  })

  const handleQuantityDecrease = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
  }

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1)
  }

  const handleAddToCart = () => {
    let count = quantity
    while (count) {
      const order = {
        title,
        description,
        id,
        image,
        locale: languageCode,
      }
      const tmp = orders
      tmp.push(order)
      actions.changeOrders(tmp)
      setOrders(tmp)
      count--
    }
    handleClose()
    setShowBanner(true)
    setTimeout(() => {
      setShowBanner(false)
    }, 5000)
  }

  const handleClose = () => {
    setShowModal(false)
    setQuantity(1)
  }

  let translatedItemCheckout = ''
  if (state.translations.length) {
    let key = 'Checkout'
    translatedItemCheckout = prepareTranslations(state.translations, key)
  }

  return (
    <div>
      {showBanner && (
        <div className=" order-banner">
          <span>
            "{title}"
            {translatedItemCheckout?.AddedToCart
              ? translatedItemCheckout?.AddedToCart
              : ' has been added to your cart'}
          </span>
          <Link
            to={
              languageCode === 'en' ? '/basket' : `/${languageCode}/warenkorb`
            }
            className="btn"
          >
            {translatedItemCheckout?.ViewBasket
              ? translatedItemCheckout?.ViewBasket
              : 'View Basket'}
            <FaChevronRight />
          </Link>
        </div>
      )}
      <AnimatePresence exitBeforeEnter>
        {showModal && (
          <motion.div
            className="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="modal"
              variants={modalVariants}
              aria-modal="true"
              role="dialog"
            >
              <div className="modal__content" ref={domNode}>
                <div className="modal__header">
                  <div>
                    <h3
                      className="modal__title"
                      data-kontent-element-codename={codename}
                    >
                      {title}
                    </h3>
                    <button
                      className="modal__close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={handleClose}
                    >
                      Close <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div>
                    <p>{description}</p>
                  </div>
                </div>
                <div
                  className="modal__body"
                  data-kontent-element-codename={codename}
                >
                  <iframe
                    loading="lazy"
                    name={title}
                    title={`PDF of ${title}`}
                    src={url}
                    style={iframeVariant}
                  ></iframe>
                </div>
                <div className="modal__footer">
                  <div className="modal__footer-download">
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Download the ${title} PDF`}
                      className="pdfv-download-button-link"
                      onClick={handleClose}
                    >
                      <BsDownload /> Download
                    </a>
                  </div>
                  {price.length !== 0 && (
                    <div className="modal__footer-order">
                      <div className="pdfv-d-inline-block pdfv-float-right">
                        <div className="pdfv-d-flex flex-wrap">
                          <div className="pdfv-free-order">Free Order</div>
                          <div className="pdfv-quantity pdfv-mr-3">
                            Quantity
                          </div>
                          <div className="pdfv-mr-3 pdfv-d-inline-block">
                            <div className="pdfv-input-group">
                              <div className="pdfv-input-group-prepend">
                                <button
                                  onClick={handleQuantityDecrease}
                                  className="button-minus-quantity"
                                >
                                  -
                                </button>
                              </div>
                              <input
                                readOnly
                                type="text"
                                name="pdfv-quantity"
                                value={quantity}
                                aria-label="Amount of products to place in order"
                                className="pdfv-quantity-number"
                              />
                              <div className="pdfv-input-group-append">
                                <button
                                  onClick={handleQuantityIncrease}
                                  className="button-plus-quantity"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <a
                              onClick={handleAddToCart}
                              role="button"
                              className="pdfv-order-button-link align-middle order-modal-link"
                            >
                              <RiShoppingBasketLine />
                              Add to order
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PDFViewer
