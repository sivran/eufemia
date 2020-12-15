/**
 * HTML Element
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import E from './Element'
import Ul from './Ul'
import Ol from './Ol'
import classnames from 'classnames'

const Li = ({ className, ...p } = {}) => {
  /**
   * Check if we have a nested list,
   * then we set the class "is-nested" and give it a max-height,
   * if it is a skeleton
   */

  if (Array.isArray(p.children)) {
    p.children.forEach((Comp) => {
      if (Comp && (Comp.type === Ul || Comp.type === Ol)) {
        className = classnames(className, 'is-nested')
      }
    })
  }

  return <E is="li" {...p} className={className} />
}
Li.tagName = 'dnb-li'
Li.propTypes = {
  className: PropTypes.string
}
Li.defaultProps = {
  className: null
}

export default Li
