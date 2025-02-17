/**
 * Web HelpButton Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { registerElement } from '../../shared/component-helper'
import Context from '../../shared/Context'
import Modal from '../modal/Modal'
import HelpButtonInstance from './HelpButtonInstance'
import Button from '../button/Button'

export default class HelpButton extends React.PureComponent {
  static contextType = Context
  static tagName = 'dnb-help-button'

  static propTypes = {
    ...Button.propTypes,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.func,
    ]),
    icon_position: PropTypes.oneOf(['left', 'right']),
    modal_content: PropTypes.node,
    modal_props: PropTypes.object,
  }

  static defaultProps = {
    variant: 'secondary',
    icon: null,
    icon_position: 'left',
    modal_content: null,
    modal_props: null,
  }

  static enableWebComponent() {
    registerElement(
      HelpButton?.tagName,
      HelpButton,
      HelpButton.defaultProps
    )
  }

  static getContent(props) {
    if (props.modal_content) {
      return props.modal_content
    }
    return typeof props.children === 'function'
      ? props.children(props)
      : props.children
  }

  render() {
    const {
      modal_content, // eslint-disable-line
      children, // eslint-disable-line
      modal_props,
      ...params
    } = this.props

    const content = HelpButton.getContent(this.props)

    if (params.icon === null) {
      params.icon = 'question'
    }

    if (content) {
      if (!params.title) {
        params.title = this.context.getTranslation(
          this.props
        ).HelpButton.title
      }

      return (
        <Modal trigger_attributes={params} {...modal_props}>
          {content}
        </Modal>
      )
    }

    return <HelpButtonInstance {...params} />
  }
}
