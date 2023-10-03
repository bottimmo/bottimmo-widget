export default function EmbededCode({ btmCompany, btmSlug, btmVariant, btmCookieConsent, btmCustomCookie }) {
  return (
    <div
      data-company={btmCompany}
      data-slug={btmSlug}
      data-variant={btmVariant}
      data-cookieconsent={btmCookieConsent}
      data-consent-cookie={btmCustomCookie}
      data-bottimmo
    />
  )
}
