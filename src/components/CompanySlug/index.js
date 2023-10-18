import { useState, useEffect } from 'react'
import { sprintf, __ } from '@wordpress/i18n'
import apiFetch from '@wordpress/api-fetch'
import { PanelBody, Button } from '@wordpress/components'

const LP_DOMAIN = process.env.LP_DOMAIN

export default function CompanySlug({ onFetchHandler }) {
  const [companySlug, setCompanySlug] = useState(null)
  const [isSlugValid, setIsSlugValid] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const textDomain = 'bottimmo-widget'
  const adminPath = btmJsVars.adminUrl

  useEffect(() => {
    apiFetch({ path: '/bottimmo-widget/v1/company-slug' })
      .then((slug) => {
        if (!slug) {
          setErrorMessage(
            sprintf(__(
              'Bitte setzen Sie im Admin-Bereich unter <a href="%s">"Einstellungen / BOTTIMMO Widgets"</a> das Firmen-Kürzel',
              textDomain
            ), adminPath)
          )
          return
        }
        setCompanySlug(slug)
        fetchCompanyData(slug)
          .then((landingpages) => {
            checkAndSaveSlug(landingpages, slug)
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }, [])

  const fetchCompanyData = async (companySlug) => {
    try {
      setErrorMessage(null)
      if (!validSlug(companySlug)) {
        setErrorMessage(
          __(
            'Bitte setzen Sie im Admin-Bereich unter "Einstellungen / BOTTIMMO Widgets" das Firmen-Kürzel',
            textDomain
          )
        )
        return
      }
      const result = await fetch(`https://${companySlug}.${LP_DOMAIN}/landingpages.json`)
      return result.json()
    } catch (error) {
      setIsSlugValid(false)
      setErrorMessage(
        sprintf(
          __(
            'Keine Widgets gefunden! Bitte prüfen Sie im Admin-Bereich unter <a href="%s">"Einstellungen / BOTTIMMO Widgets"</a> das Firmen-Kürzel',
            textDomain
          ),
          adminPath
        )
      )
      throw Error(error)
    }
  }

  const validSlug = (slug) => /^\S+$/.test(slug)

  const checkAndSaveSlug = (landingpages, slug) => {
    if (landingpages) {
      setIsSlugValid(true)
      onFetchHandler({ companySlug: slug, landingpages })
    } else {
      setErrorMessage(
        sprintf(
          __(
            'Keine Widgets gefunden! Bitte prüfen Sie im Admin-Bereich unter <a href="%s">"Einstellungen / BOTTIMMO Widgets"</a> das Firmen-Kürzel',
            textDomain
          ),
          adminPath
        )
      )
      onFetchHandler({ companySlug: slug, landingpages: null })
      setIsSlugValid(false)
    }
  }

  return (
    <PanelBody
      title={`${isSlugValid === false ? '🚫 ' : '✅ '}${__('Ihr Firmenkürzel (Slug)', textDomain)}`}
      initialOpen={!isSlugValid}
    >
      {isSlugValid && (
        <p>
          <strong>{companySlug}</strong>
          <Button
            variant='promary'
            href={adminPath}
            icon='edit'
            label={__('Ändern', textDomain)}
          />
        </p>
      )}
      {errorMessage && <p style={{ color: '#ff0000' }} dangerouslySetInnerHTML={{__html: errorMessage}}/>}
    </PanelBody>
  )
}
