import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'
import { TextControl, PanelBody, PanelRow, FormToggle } from '@wordpress/components'

export default function CompanyCookies({ btmCookieConsent, btmCustomCookie, onChangeHandler }) {
  const [cookieConsent, setCookieConsent] = useState(false)
  const [customCookie, setCustomCookie] = useState(null)
  let timeout

  useEffect(() => {
    setCustomCookie(btmCustomCookie)
    setCookieConsent(btmCookieConsent === 'true')
  }, [])

  const customCookieHandler = (val) => {
    setCustomCookie(val)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      onChangeHandler({ btmCustomCookie: val })
    }, 500)
  }

  return (
    <PanelBody title={__('Dritter Schritt (optional): Cookie Behandlung', 'bottimmo-widget')} initialOpen={false}>
      <PanelRow>
        <label for="btmCookieConsent">
          <FormToggle
            id="btmCookieConsent"
            checked={cookieConsent}
            onChange={({ target }) => {
              setCookieConsent(target.checked)
              onChangeHandler({ btmCookieConsent: target.checked })
            }}
          />
          <span className="copy" style={{ marginLeft: '16px' }}>
            {__('Ich verwende "Cookiebot" auf meiner Website', 'bottimmo-widget')}
          </span>
        </label>
      </PanelRow>
      <PanelRow>
        <TextControl
          label={__('Ich verwenden ein eigenes Cookie namens:', 'bottimmo-widget')}
          value={customCookie}
          onChange={customCookieHandler}
        />
      </PanelRow>
    </PanelBody>
  )
}
