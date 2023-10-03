import { useState, useEffect } from 'react'
import { __ } from '@wordpress/i18n'
import { Panel } from '@wordpress/components'
import { useBlockProps } from '@wordpress/block-editor'
import logo from '../assets/img/logo.png'
import CompanySlug from './components/CompanySlug'
import CompanyWidget from './components/CompanyWidget'
import CompanyCookies from './components/CompanyCookies'

export default function Edit({ attributes, setAttributes }) {
  const [availableLP, setAvailableLP] = useState(null)
  const [btmCompany, setBtmCompany] = useState(null)
  const [btmSlug, setBtmSlug] = useState(attributes.btmSlug)
  const [btmVariant, setBtmVariant] = useState(attributes.btmVariant)
  const [btmCookieConsent, setBtmCookieConsent] = useState(attributes.btmCookieConsent)
  const [btmCustomCookie, setBtmCustomCookie] = useState(attributes.btmCustomCookie)
  const [reloadElementId] = useState(Math.random())

  useEffect(() => {
    const $previewWrapper = document.getElementById(reloadElementId)
    $previewWrapper.innerHTML = ''

    if (btmCompany && btmSlug) {
      const $widget = document.createElement('div')
      $widget.setAttribute('data-company', btmCompany)
      $widget.setAttribute('data-slug', btmSlug)
      $widget.setAttribute('data-variant', btmVariant)
      $widget.setAttribute('data-cookieconsen', btmCookieConsent)
      $widget.setAttribute('data-consent-cookie', btmCustomCookie)
      $widget.setAttribute('data-bottimmo', true)
      $previewWrapper.append($widget)
      window.dispatchEvent(new Event('bottimmo:element-added'))
    }
  }, [btmCompany, btmSlug, btmVariant, btmCookieConsent, btmCustomCookie])

  const companySlugFetchHandler = ({ companySlug, landingpages }) => {
    setAvailableLP(landingpages)
    setAttributes({ btmCompany: companySlug })
    setBtmCompany(companySlug)
  }

  const companyWidgetChangeHandler = ({ widget, variant }) => {
    setAttributes({ btmSlug: widget, btmVariant: variant })
    setBtmSlug(widget)
    setBtmVariant(variant)
  }

  const companyCookiesHandler = ({ btmCookieConsent, btmCustomCookie }) => {
    setAttributes({ btmCookieConsent, btmCustomCookie })
    setBtmCookieConsent(btmCookieConsent)
    setBtmCustomCookie(btmCustomCookie)
  }

  return (
    <div {...useBlockProps()}>
      <Panel header={<img src={logo} alt="BOTTIMMO Logo" />} className="mb-l">
        <CompanySlug onFetchHandler={companySlugFetchHandler} />
        {availableLP && (
          <>
            <CompanyWidget
              selectedWidget={btmSlug}
              selectedVariant={btmVariant}
              availableLP={availableLP}
              onChangeHandler={companyWidgetChangeHandler}
            />
            <CompanyCookies
              btmCookieConsent={btmCookieConsent}
              btmCustomCookie={btmCustomCookie}
              onChangeHandler={companyCookiesHandler}
            />
          </>
        )}
      </Panel>
      <div id={reloadElementId} />
    </div>
  )
}
