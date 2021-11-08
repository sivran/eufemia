import React, { useEffect, useState } from 'react'
import BreadcrumbItem, { BreadcrumbItemProps } from './BreadcrumbItem'
export * from './Breadcrumb'
import Context from '../../shared/Context'
import { ISpacingProps } from '../../shared/interfaces'
import classnames from 'classnames'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import Section from '../section/Section'
import { createSpacingClasses } from '../space/SpacingHelper'
import { useMediaQuery, SkeletonTypes } from '../../shared'
import { extendPropsWithContext } from '../../shared/component-helper'
import { Button } from '..'

export interface BreadcrumbProps {
  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string

  /**
   * Skeleton should be applied when loading content
   * Default: null
   */
  skeleton?: SkeletonTypes

  /**
   * Pass in a list of your pages as objects of breadcrumbitem to render them as breadcrumbitems.
   * Default: null
   */
  data?: BreadcrumbItemProps[]

  /**
   * The content of the component. Can be used instead of prop "data".
   * Default: null
   */
  children?: React.ReactNode // ReactNode allows multiple elements, strings, numbers, fragments, portals...

  /**
   * The variant of the component.
   * Default: When children and data is not defined, it defaults to "single". If they are defined, the variant depends on the viewport.
   */
  variant?: 'single' | 'multiple' | 'collapse'

  /**
   * Handle the click event on 'single'/'collapse'
   * Default: null
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>

  /**
   * For variant 'single', use href (or onClick) to set href when clicking "Back"
   * Default: null
   */
  href?: string

  /**
   * Add custom 'Back' text for variant 'single'
   * Default: 'Back' or defined by Context translation
   */
  goBackText?: React.ReactNode

  /**
   * Add custom 'Home' text
   * Default: 'Home' or defined by Context translation
   */
  homeText?: React.ReactNode

  /**
   * Add custom 'Back to...' text, for variant collapse
   * Default 'Back to...' or defined by Context translation
   */
  backToText?: React.ReactNode

  /**
   * If variant='collapse', you can override isCollapsed for the collapsed content by updating this value.
   * Default: null
   */
  isCollapsed?: boolean | string

  /**
   * Use one of the Section component style types (style_type)
   * Default: transparent
   */
  styleType?: string

  /**
   * Use one of the Section component style types (style_type)
   * Default: pistachio
   */
  collapsedStyleType?: string
}

export const defaultProps = {
  className: null,
  skeleton: false,
  children: null,
  variant: null,
  onClick: null,
  href: null,
  goBackText: 'Back',
  homeText: 'Home',
  backToText: 'Back to...',
  isCollapsed: true,
  styleType: 'transparent',
  collapsedStyleType: 'pistachio',
  data: null,
}

export default function Breadcrumb(
  localProps: BreadcrumbProps & ISpacingProps
) {
  // Every component should have a context
  const context = React.useContext(Context)
  // Extract additional props from global context
  const {
    className,
    skeleton,
    children: childrenItems,
    variant,
    onClick,
    goBackText, // has a translation in context
    homeText, // has a translation in context
    backToText, // has a translation in context
    styleType,
    collapsedStyleType,
    isCollapsed: overrideIsCollapsed,
    data,
    href,
    ...props
  } = extendPropsWithContext(
    { ...defaultProps, ...localProps },
    defaultProps,
    context?.translation?.Breadcrumb,
    context?.Breadcrumb
  )
  const skeletonClasses = createSkeletonClass('font', skeleton, context)
  const spacingClasses = createSpacingClasses(props)

  const [isCollapsed, setCollapse] = useState(true)
  const isSmallScreen = useMediaQuery({
    matchOnSSR: true,
    when: { max: 'medium' },
  })

  let currentVariant = variant
  if (variant === null) {
    if (childrenItems || data) {
      currentVariant = isSmallScreen ? 'collapse' : 'multiple'
    } else {
      currentVariant = 'single'
    }
  }

  useEffect(() => {
    setCollapse(overrideIsCollapsed)
  }, [overrideIsCollapsed])

  const MultipleCrumbs = () => (
    <ol className="dnb-breadcrumb__list">
      {data?.map((breadcrumbItem, i) => (
        <BreadcrumbItem
          key={`${breadcrumbItem.text}`}
          variant={
            (i == 0 && 'home') ||
            (i == data.length - 1 && 'current') ||
            null
          }
          {...breadcrumbItem}
        />
      ))}

      {childrenItems}
    </ol>
  )

  return (
    <nav
      data-testid="breadcrumb-nav"
      className={classnames(
        'dnb-breadcrumb',
        skeletonClasses,
        spacingClasses,
        className
      )}
      {...props}
    >
      <Section style_type={styleType} className="dnb-breadcrumb__bar">
        {currentVariant === 'collapse' && (
          <Button
            text={backToText}
            variant="tertiary"
            icon="chevron_left"
            icon_position="left"
            onClick={
              onClick ||
              (() => {
                setCollapse(!isCollapsed)
              })
            }
          />
        )}

        {currentVariant === 'single' && (
          <Button
            text={goBackText}
            variant="tertiary"
            icon="chevron_left"
            icon_position="left"
            onClick={onClick}
            href={href}
          />
        )}

        {currentVariant === 'multiple' && <MultipleCrumbs />}
      </Section>

      {currentVariant === 'collapse' && !isCollapsed && (
        <Section
          style_type={collapsedStyleType}
          className="dnb-breadcrumb__collapse"
          data-testid="breadcrumb-collapse"
        >
          <MultipleCrumbs />
        </Section>
      )}
    </nav>
  )
}

Breadcrumb.Item = BreadcrumbItem

export { BreadcrumbItem, BreadcrumbItemProps }
