import React, { useEffect, useState } from 'react'
import { DEFAULT_LANGUAGE } from '../../../../utils/constants'

const useDisableBodyScroll = (open) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [open])
}

const ConfirmModal = ({ languageCode = DEFAULT_LANGUAGE }) => {
  const [showModal, setShowModal] = useState(false)

  //disable the scroll when modal is open
  useDisableBodyScroll(showModal)

  useEffect(() => {
    const isConfirm = !!localStorage.getItem(`isConfirm_${languageCode}`);
    if(!isConfirm)
      setShowModal(true)
  })

  const handleConfirm = () => {
    localStorage.setItem(`isConfirm_${languageCode}`, "true")
    setShowModal(false);
  }

  return (
    showModal && (
      <div className="backdrop">
        <div className="confirmModal" aria-modal="true" role="dialog">
          <div className="confirmModal__content">
            <div className="confirmModal__body">
              {languageCode === "en"
                ? (
                  "Content relating to TMTT is intended for healthcare professionals. Click OK to confirm you are a healthcare professional and proceed."
                ) : (
                  "Die Inhalte auf TTMT sind für Angehörige medizinischer Fachkreise gemacht. Klicken Sie auf OK um zu bestätigen, dass Sie ein Angehöriger medizinischer Fachkreise sind um fortzufahren."
                )
              }
            </div>
            <div className="confirmModal__footer">
              <button onClick={handleConfirm} className="confirmModal__btn btn btn-crimson">OK</button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default ConfirmModal
