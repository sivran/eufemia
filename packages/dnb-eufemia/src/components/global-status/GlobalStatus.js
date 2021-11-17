/**
 * Web GlobalStatus Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import Context from '../../shared/Context'
import {
  warn,
  isTrue,
  makeUniqueId,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  processChildren,
  extendPropsWithContext,
} from '../../shared/component-helper'
import AnimateHeight from '../../shared/AnimateHeight'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import Hr from '../../elements/Hr'
import GlobalStatusController, {
  GlobalStatusInterceptor,
} from './GlobalStatusController'
import GlobalStatusProvider from './GlobalStatusProvider'
import Icon from '../icon/Icon'
/* import {
  information_bubble as InfoIcon,
  exclamation_triangle as ErrorIcon,
} from '../../icons' */
/**
 * Because of the new icons, which do not fit into the current GlobalStatus UI,
 * we have to have them inlined here in this component. Down below.
 */
// import { InfoIcon, ErrorIcon } from '../form-status/FormStatus'
import { CloseButton } from '../modal/Modal'
import Section from '../section/Section'
import { IS_IE11 } from '../../shared/helpers'

export default class GlobalStatus extends React.PureComponent {
  static tagName = 'dnb-global-status'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    status_id: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    default_title: PropTypes.string,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    items: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.array,
    ]),
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    icon_size: PropTypes.string,
    state: PropTypes.oneOf(['error', 'info']),
    show: PropTypes.oneOf(['auto', true, false, 'true', 'false']),
    autoscroll: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoclose: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    close_text: PropTypes.node,
    hide_close_button: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    omit_set_focus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    omit_set_focus_on_update: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    status_anchor_text: PropTypes.node,
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),

    on_adjust: PropTypes.func,
    on_open: PropTypes.func,
    on_show: PropTypes.func,
    on_close: PropTypes.func,
    on_hide: PropTypes.func,
  }

  static defaultProps = {
    id: 'main',
    status_id: 'status-main',
    title: null,
    default_title: null,
    text: null,
    items: [],
    icon: 'error',
    icon_size: 'medium',
    state: 'error',
    show: 'auto',
    autoscroll: true,
    autoclose: true,
    no_animation: false,
    close_text: 'Lukk',
    hide_close_button: false,
    omit_set_focus: false,
    omit_set_focus_on_update: true,
    delay: 0,
    status_anchor_text: null,
    skeleton: null,
    class: null,

    className: null,
    children: null,

    on_adjust: null,
    on_open: null,
    on_show: null,
    on_close: null,
    on_hide: null,
  }

  static enableWebComponent() {
    registerElement(
      GlobalStatus?.tagName,
      GlobalStatus,
      GlobalStatus.defaultProps
    )
  }

  static getContent(props) {
    if (props.text) return props.text
    return processChildren(props)
  }

  static getIcon({ state, icon, icon_size }) {
    if (typeof icon === 'string') {
      let IconToLoad = icon

      switch (state) {
        case 'info':
        case 'information':
          IconToLoad = InfoIcon
          break
        case 'error':
        default:
          IconToLoad = ErrorIcon
      }

      icon = (
        <Icon
          icon={<IconToLoad />}
          size={icon_size}
          inherit_color={false}
        />
      )
    }

    return icon
  }

  static getDerivedStateFromProps(props, state) {
    if (state._items !== props.items) {
      state.globalStatus = GlobalStatusProvider.combineMessages([
        state.globalStatus,
        props,
      ])
    }

    state._items = props.items

    return state
  }

  state = {
    globalStatus: null,
    isActive: false,
    isAnimating: false,
    keepContentVisible: false,
  }

  constructor(props) {
    super(props)

    this._wrapperRef = React.createRef()
    this._shellRef = React.createRef()

    this.anim = new AnimateHeight({
      animate: !isTrue(props.no_animation),
    })

    this.anim.onStart((state) => {
      this.setState({
        isAnimating: true,
      })
      if (state === 'opening') {
        this.scrollToStatus()
      }
    })

    this.anim.onEnd((state) => {
      this.setState({
        isAnimating: false,
      })

      if (this.state.isActive) {
        this.setState({
          keepContentVisible: true,
        })

        dispatchCustomElementEvent(
          this._globalStatus,
          'on_show',
          this._globalStatus
        )

        if (state === 'opened') {
          this.setFocus()

          dispatchCustomElementEvent(
            this._globalStatus,
            'on_open',
            this._globalStatus
          )
        }

        if (state === 'adjusted') {
          if (!isTrue(this.props.omit_set_focus_on_update)) {
            this.setFocus()
          }

          dispatchCustomElementEvent(
            this._globalStatus,
            'on_adjust',
            this._globalStatus
          )
        }
      } else {
        this.setState({
          keepContentVisible: false,
        })
        dispatchCustomElementEvent(
          this._globalStatus,
          'on_close',
          this._globalStatus
        )
      }
    })

    this.provider = GlobalStatusProvider.create(props.id)

    // add the props as the first stack
    this.state.globalStatus = this._globalStatus =
      this.provider.init(props)

    // and make it visible from start, if needed
    if (isTrue(props.show)) {
      if (isTrue(props.no_animation)) {
        this.state.isActive = true
      }
    }

    this.provider.onUpdate((globalStatus) => {
      // we need the on_close later during the close process
      // so we set this here, because it gets removed from the stack
      if (globalStatus.on_close) {
        this._globalStatus = globalStatus
      }

      let height
      if (this.state.keepContentVisible) {
        height = this.anim.adjustFrom()
      }

      // force re-render
      this.setState({
        globalStatus,
      })

      const isActive = isTrue(globalStatus.show)
      if (isActive) {
        this.adjustHeight = this.anim.adjustFrom()

        if (!this.isPassive()) {
          this.setState({ isActive })
        }
      }

      // make sure to show the new status, inc. scroll
      if (
        (isTrue(this.props.autoclose) &&
          this._hadContent &&
          !this.hasContent(globalStatus) &&
          !isTrue(this.props.show)) ||
        (typeof globalStatus.show !== 'undefined' &&
          !isTrue(globalStatus.show))
      ) {
        this.setHidden({ delay: 0 })
      } else if (
        isTrue(this.props.show) ||
        (typeof globalStatus.show !== 'undefined' &&
          isTrue(globalStatus.show))
      ) {
        this._hadContent = this.hasContent(globalStatus)

        if (this.state.keepContentVisible) {
          this.anim.adjustTo(height)
        } else {
          this.setVisible({ delay: 0 })
        }
      }
    })

    this.initialActiveElement = null
  }

  componentDidMount() {
    this.anim.setElement(this._shellRef.current)

    if (isTrue(this.props.show)) {
      this.setVisible()
    }
  }

  componentWillUnmount() {
    this.anim.remove()
    clearTimeout(this._scrollToStatusTimeout)
    clearTimeout(this._visibleTimeout)
    clearTimeout(this._hiddenTimeout)

    // NB: Never unbind the provider,
    // as a new provider else will be set BEFORE thi unmount is called
    // on the other hand; setting up the provider
    // at the stage of componentDidMount is too late
    // this.provider.unbind()

    // so we inly empty the events
    this.provider.empty()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const globalStatus = extendPropsWithContext(
        this.props,
        GlobalStatus.defaultProps,
        this.state.globalStatus
      )
      this.setState({
        globalStatus,
      })
    }

    if (prevProps.show !== this.props.show) {
      if (isTrue(this.props.show)) {
        this.setVisible()
      } else {
        this.setHidden()
      }
    }
  }

  hasContent(globalStatus) {
    return Boolean(globalStatus.items?.length > 0 || globalStatus.text)
  }

  correctStatus(state) {
    switch (state) {
      case 'information':
        state = 'info'
        break
    }
    return state
  }

  isPassive = () => {
    return this.props.show !== 'auto' && isTrue(this.props.show) === false
  }

  setVisible = ({ delay = parseFloat(this.props.delay) } = {}) => {
    if (this.isPassive()) {
      return // stop here
    }

    const run = () => {
      this.setState(
        {
          isActive: true,
        },
        () => {
          this.anim.open()
        }
      )
    }

    if (delay > 0) {
      clearTimeout(this._visibleTimeout)
      this._visibleTimeout = setTimeout(() => {
        run()
      }, delay)
    } else {
      run()
    }
  }

  setHidden = ({ delay = parseFloat(this.props.delay) } = {}) => {
    const { isActive } = this.state

    if (isActive === false) {
      return // stop here
    }

    this.setState({
      isClosing: true,
    })

    const run = () => {
      this.setState(
        {
          isClosing: false,
          isActive: false,
        },
        () => this.anim.close()
      )
    }

    if (delay > 0) {
      clearTimeout(this._hiddenTimeout)
      this._hiddenTimeout = setTimeout(() => {
        run()
      }, delay)
    } else {
      run()
    }
  }

  onKeyDownHandler = (e) => {
    switch (keycode(e)) {
      case 'esc':
        e.preventDefault()
        this.closeHandler()
        break
    }
  }

  setFocus() {
    if (
      typeof document !== 'undefined' &&
      document.activeElement !== this._wrapperRef.current
    ) {
      this.initialActiveElement = document.activeElement
    }
    if (this._wrapperRef.current && !isTrue(this.props.omit_set_focus)) {
      this._wrapperRef.current.focus({ preventScroll: true })
    }
  }

  closeHandler = () => {
    this.provider.add({
      status_id: 'internal-close',
      show: false,
    })

    if (this.initialActiveElement) {
      try {
        this.initialActiveElement.focus()
        this.initialActiveElement = null
      } catch (e) {
        warn(e)
      }
    }

    dispatchCustomElementEvent(
      this._globalStatus,
      'on_hide',
      this._globalStatus
    )
  }

  scrollToStatus(isDone = null) {
    if (
      typeof window === 'undefined' ||
      isTrue(this.state.globalStatus.autoscroll) === false
    ) {
      return // stop here
    }
    try {
      const element = this._wrapperRef.current
      this._scrollToStatusTimeout = isElementVisible(element, isDone)
      if (
        element &&
        !IS_IE11 &&
        typeof element.scrollIntoView === 'function'
      ) {
        element.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
      } else {
        const top = element.offsetTop
        if (window.scrollTo) {
          window.scrollTo({
            top,
            behavior: 'smooth',
          })
        } else {
          window.scrollTop = top
        }
      }
    } catch (e) {
      warn('GlobalStatus: Could not scroll into view!', e)
    }
  }

  gotoItem = (event, item) => {
    event.persist()
    const keyCode = keycode(event)
    if (
      (item.item_id &&
        typeof document !== 'undefined' &&
        typeof window !== 'undefined' &&
        keyCode === 'space') ||
      keyCode === 'enter' ||
      typeof keyCode === 'undefined'
    ) {
      event.preventDefault()
      try {
        // find the element
        const element = document.getElementById(item.item_id)

        if (!element) {
          return
        }

        isElementVisible(element, (elem) => {
          try {
            // remove the blink animation again
            elem.addEventListener('blur', (e) => {
              if (e.target.classList) {
                e.target.removeAttribute('tabindex')
              }
            })

            // we don't want a visual focus style, we have our own
            elem.classList.add('dnb-no-focus')

            // in order to use the blur event
            elem.setAttribute('tabindex', '-1')

            // now show the animation
            // we use "attention-focus" in #form-status theme
            elem.focus({ preventScroll: true })
          } catch (e) {
            warn(e)
          }
        })

        // block: 'center' is not supported on IE - now we se the element above
        if (IS_IE11) {
          window.scrollTop = element.offsetTop
        } else if (typeof element.scrollIntoView === 'function') {
          // then go there
          element.scrollIntoView({
            block: 'center', // center of page
            behavior: 'smooth',
          })
        }
      } catch (e) {
        warn(e)
      }
    }
  }

  itemsRenderHandler =
    ({ status_anchor_text, lang }) =>
    (item, i) => {
      const text = item?.text
        ? item.text
        : typeof item === 'string'
        ? item
        : null

      if (!text) {
        return null // skip this item if no content is given
      }

      const id =
        item.id || item.item_id ? `${item.item_id}-${i}` : makeUniqueId()

      let anchorText = status_anchor_text

      if (React.isValidElement(item.status_anchor_label)) {
        anchorText = (
          <>
            {typeof status_anchor_text === 'string'
              ? status_anchor_text.replace('%s', '').trim()
              : status_anchor_text}{' '}
            {item.status_anchor_label}
          </>
        )
      } else {
        anchorText = String(item.status_anchor_text || status_anchor_text)
          .replace('%s', item.status_anchor_label || '')
          .replace(/[: ]$/g, '')
      }

      const useAutolink = item.item_id && isTrue(item.status_anchor_url)

      return (
        <li key={i}>
          <p id={id} className="dnb-p">
            {text}
          </p>

          {item && (useAutolink || item.status_anchor_url) && (
            <a
              className="dnb-anchor"
              aria-describedby={id}
              lang={lang}
              href={
                useAutolink ? `#${item.item_id}` : item.status_anchor_url
              }
              onClick={(e) => this.gotoItem(e, item)}
              onKeyDown={(e) => this.gotoItem(e, item)}
            >
              {anchorText}
            </a>
          )}
        </li>
      )
    }

  render() {
    const { isActive, isAnimating, keepContentVisible } = this.state

    const fallbackProps = extendPropsWithContext(
      this.props,
      GlobalStatus.defaultProps,
      this.context.getTranslation(this.props).GlobalStatus
    )

    const props = extendPropsWithContext(
      GlobalStatusProvider.combineMessages([
        this.context.globalStatus,
        this.state.globalStatus,
      ]),
      GlobalStatus.defaultProps,
      fallbackProps
    )

    const lang = this.context.locale

    const {
      title,
      default_title, // eslint-disable-line
      state: rawState,
      className,
      no_animation,
      hide_close_button,
      close_text,
      class: _className,
      status_anchor_text,
      skeleton,

      id,
      item, // eslint-disable-line
      items, // eslint-disable-line
      autoclose, // eslint-disable-line
      show, // eslint-disable-line
      delay, // eslint-disable-line
      autoscroll, // eslint-disable-line
      text, // eslint-disable-line
      icon,
      icon_size,
      children, // eslint-disable-line

      ...attributes
    } = props

    const wrapperParams = {
      id,
      key: 'global-status',
      className: classnames(
        'dnb-global-status__wrapper',
        'dnb-no-focus',
        createSkeletonClass('font', skeleton, this.context),
        createSpacingClasses(props),
        className,
        _className
      ),
      'aria-live': isActive ? 'assertive' : 'off',
      onKeyDown: this.onKeyDownHandler,
      tabIndex: '-1',
    }

    const state = this.correctStatus(rawState)
    const iconToRender = GlobalStatus.getIcon({
      state,
      icon: icon || fallbackProps.icon,
      icon_size: icon_size || fallbackProps.icon_size,
    })
    const titleToRender =
      title || fallbackProps.title || fallbackProps.default_title
    const noAnimation = isTrue(no_animation)
    const itemsToRender = props.items || []
    const contentToRender = GlobalStatus.getContent(props)
    const style = state === 'info' ? 'pistachio' : 'fire-red-8'

    /**
     * Show aria-live="assertive" when:
     * 1. once "show" is true and before content is applied
     * so "isActive" has to have been false on first render
     */

    /**
     * Show aria-live="off" when:
     * 1. start hiding
     * 2. "show" is true from beginning+
     * + and "isActive" is also true from beginning
     * NB: This is to avoid SR reading the content once it's appearing
     */

    const params = {
      className: classnames(
        'dnb-global-status',
        `dnb-global-status--${state}`,
        !isActive && 'dnb-global-status--hidden',
        isActive && keepContentVisible && 'dnb-global-status--visible',
        isAnimating && 'dnb-global-status--is-animating',
        noAnimation && 'dnb-global-status--no-animation'
      ),
      ...attributes,
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const renderedItems = itemsToRender.length > 0 && (
      <ul className="dnb-ul">
        {itemsToRender.map(
          this.itemsRenderHandler({ status_anchor_text, lang })
        )}
      </ul>
    )

    const hasContent = renderedItems || contentToRender

    const renderedContent = (
      <div className="dnb-global-status__content">
        {title !== false && (
          <Section element="div" style_type={style}>
            <p className="dnb-p dnb-global-status__title" lang={lang}>
              <span className="dnb-global-status__icon">
                {iconToRender}
              </span>
              {titleToRender}
              {!isTrue(hide_close_button) && (
                <CloseButton
                  className="dnb-global-status__close-button"
                  on_click={this.closeHandler}
                  text={close_text}
                  title={close_text}
                  size="medium"
                />
              )}
            </p>
            {hasContent && (
              <Section
                element="div"
                style_type={style}
                className="dnb-global-status__message"
              >
                <div className="dnb-global-status__message__content">
                  {typeof contentToRender === 'string' ? (
                    <p className="dnb-p">{contentToRender}</p>
                  ) : (
                    contentToRender
                  )}
                  {renderedItems}
                </div>
              </Section>
            )}
            <Hr fullscreen />
          </Section>
        )}
      </div>
    )

    return (
      <div {...wrapperParams} ref={this._wrapperRef}>
        <section {...params}>
          <div className="dnb-global-status__shell" ref={this._shellRef}>
            {(isAnimating || keepContentVisible || isActive) &&
              renderedContent}
          </div>
        </section>
      </div>
    )
  }
}

// Extend our component with controllers
GlobalStatus.create = (...args) => new GlobalStatusInterceptor(...args)
GlobalStatus.Set = GlobalStatus.create // Deprecated
GlobalStatus.AddStatus = GlobalStatus.create // Deprecated
GlobalStatus.Update = GlobalStatus.create
GlobalStatus.Add = GlobalStatusController
GlobalStatus.Remove = GlobalStatusController.Remove

const isElementVisible = (elem, callback, delayFallback = 1e3) => {
  if (typeof IntersectionObserver !== 'undefined') {
    const intersectionObserver = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        intersectionObserver.unobserve(elem)
        if (typeof callback === 'function') {
          callback(elem)
        }
      }
    })
    // start observing
    intersectionObserver.observe(elem)
  } else {
    if (typeof callback === 'function') {
      return setTimeout(() => callback(elem), delayFallback)
    }
  }
  return null
}

const ErrorIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {props && props.title && <title>{props.title}</title>}
    <path
      d="M23.6248 17.8641C23.8956 18.4051 24.0235 19.0064 23.9964 19.6108C23.9694 20.2152 23.7882 20.8026 23.4702 21.3172C23.1522 21.8319 22.7078 22.2566 22.1794 22.5512C21.651 22.8457 21.056 23.0002 20.451 23H3.54821C2.94321 23.0004 2.34816 22.846 1.81968 22.5515C1.29121 22.257 0.846878 21.8321 0.528971 21.3173C0.211065 20.8026 0.0301558 20.215 0.0034553 19.6106C-0.0232452 19.0061 0.10515 18.4049 0.376429 17.8641L8.82584 2.96239C9.12038 2.37276 9.57333 1.87683 10.1339 1.53022C10.6945 1.1836 11.3405 1 11.9996 1C12.6587 1 13.3047 1.1836 13.8653 1.53022C14.4259 1.87683 14.8789 2.37276 15.1734 2.96239L23.6248 17.8641Z"
      fill="#DC2A2A"
    />
    <path
      d="M12.0001 16.2858C11.7458 16.2858 11.4972 16.3612 11.2858 16.5024C11.0743 16.6437 10.9095 16.8445 10.8122 17.0795C10.7149 17.3144 10.6895 17.5729 10.7391 17.8223C10.7887 18.0717 10.9111 18.3008 11.0909 18.4806C11.2707 18.6604 11.4998 18.7829 11.7492 18.8325C11.9986 18.8821 12.2572 18.8566 12.4921 18.7593C12.727 18.662 12.9278 18.4972 13.0691 18.2858C13.2104 18.0743 13.2858 17.8258 13.2858 17.5715C13.2858 17.2305 13.1503 16.9035 12.9092 16.6623C12.6681 16.4212 12.3411 16.2858 12.0001 16.2858Z"
      fill="white"
    />
    <path
      d="M11.9995 13.8179V8.81836"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

ErrorIcon.propTypes = {
  title: PropTypes.string,
}

ErrorIcon.defaultProps = {
  title: 'error',
}

const InfoIcon = (props) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {props && props.title && <title>{props.title}</title>}
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.2682 5.43045e-05C9.52665 -0.002761 7.80824 0.398782 6.24829 1.17307C4.68798 1.94753 3.32883 3.07374 2.27792 4.46297C1.22702 5.8522 0.513074 7.46649 0.192341 9.17864C-0.128391 10.8908 -0.0471499 12.654 0.429665 14.3295C0.906481 16.0049 1.76584 17.5467 2.94004 18.8334C4.11424 20.1201 5.57119 21.1166 7.19611 21.7443C8.82102 22.372 10.5695 22.6137 12.3038 22.4506C13.9002 22.3004 15.4444 21.8108 16.8336 21.0166L22.9456 23.9272C23.2323 24.0637 23.5739 24.0049 23.7984 23.7804C24.0229 23.5559 24.0817 23.2143 23.9452 22.9276L21.0347 16.8148C21.9595 15.1986 22.4692 13.3757 22.5148 11.5098C22.5639 9.50531 22.0756 7.52426 21.1007 5.77219C20.1257 4.02012 18.6997 2.56088 16.9705 1.54589C15.2417 0.531107 13.2728 -0.00262451 11.2682 5.43045e-05Z"
      fill="#007272"
    />
    <circle cx="11" cy="6.5" r="0.5" fill="white" stroke="white" />
    <path
      d="M13.75 16H13C12.1716 16 11.5 15.3284 11.5 14.5V10.75C11.5 10.3358 11.1642 10 10.75 10H10"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

InfoIcon.propTypes = {
  title: PropTypes.string,
}

InfoIcon.defaultProps = {
  title: 'info',
}
