import { useEffect, useState } from 'react'
import { SelectControl, PanelBody, PanelRow, FormToggle } from '@wordpress/components'
import { __ } from '@wordpress/i18n'

export default function CompanyWidget({ availableLP, selectedWidget, selectedVariant, onChangeHandler }) {
  const [widget, setWidget] = useState(null)
  const [variant, setVariant] = useState('')
  const [checked, setChecked] = useState(false)
  const [availableTools, setAvailableTools] = useState([])
  const [availableGuides, setAvailableGuides] = useState([])
  const [availableChecklists, setAvailableChecklists] = useState([])

  useEffect(() => {
    if (selectedWidget) {
      setWidget(selectedWidget)
    }
    if (selectedVariant) {
      setVariant(selectedVariant)
      if (['wizzard', 'extended'].includes(selectedVariant)) {
        setChecked(true)
      }
    }

    const allTools = availableLP.filter(({ type }) => !['GUIDE', 'CHECKLIST'].includes(type))
    setAvailableTools(allTools)

    const allGuides = availableLP.filter(({ type }) => type === 'GUIDE')
    setAvailableGuides(allGuides)

    const allChecklists = availableLP.filter(({ type }) => type === 'CHECKLIST')
    setAvailableChecklists(allChecklists)
  }, [])

  const isWidgetWithVariant = () =>
    widget === 'telefonische-beratung' ||
    [...availableGuides, ...availableChecklists].find(({ slug }) => slug === widget)

  const onWidgetChange = (value) => {
    if (widget === value) {
      return
    }
    setWidget(value)
    setChecked(false)

    onChangeHandler({ widget: value, variant: '' })
  }

  const onChangeVariant = ({ target }) => {
    setChecked(target.checked)
    let newVariant = ''
    if (target.checked) {
      if (widget === 'telefonische-beratung') {
        newVariant = 'wizzard'
      } else if ([...availableGuides, ...availableChecklists].find(({ slug }) => slug === widget)) {
        newVariant = 'extended'
      }
    }
    onChangeHandler({ widget, variant: newVariant })
  }

  return (
    <PanelBody title={`${widget ? `✅ ` : ''}${__('Die Widgetauswahl', 'bottimmo-widget')}`}>
      <PanelRow>
        <SelectControl value={widget} onChange={onWidgetChange}>
          <option value="">{__('Bitte auswählen...', 'bottimmo-widget')}</option>
          {availableTools && (
            <optgroup label={__('Tools', 'bottimmo-widget')}>
              {availableTools.map(({ name, slug, isActive }) => (
                <option key={slug} value={slug} disabled={!isActive}>
                  {name}
                </option>
              ))}
            </optgroup>
          )}
          {availableGuides && (
            <optgroup label={__('Ratgeber', 'bottimmo-widget')}>
              {availableGuides.map(({ name, slug, isActive }) => (
                <option key={slug} value={slug} disabled={!isActive}>
                  {name}
                </option>
              ))}
            </optgroup>
          )}
          {availableChecklists && (
            <optgroup label={__('Checklisten', 'bottimmo-widget')}>
              {availableChecklists.map(({ name, slug, isActive }) => (
                <option key={slug} value={slug} disabled={!isActive}>
                  {name}
                </option>
              ))}
            </optgroup>
          )}
        </SelectControl>
      </PanelRow>
      {isWidgetWithVariant() && (
        <PanelRow>
          <label for="btmVariant">
            <FormToggle id="btmVariant" checked={checked} onChange={onChangeVariant} />
            <span className="copy" style={{ marginLeft: '16px' }}>
              {__('umfangreiche Einbindung', 'bottimmo-widget')}
            </span>
          </label>
        </PanelRow>
      )}
    </PanelBody>
  )
}
