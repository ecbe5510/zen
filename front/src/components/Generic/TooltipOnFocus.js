import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Close from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import { helpColor } from '../../constants'
import info from '../../images/info.svg'

const TooltipTitle = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 1.6rem;
    padding-bottom: 1.5rem;
  }
`

const TooltipText = styled(Typography)`
  && {
    line-height: 2rem;
  }
`

const InfoImg = styled.img`
  width: 2.5rem;
  float: left;
  margin-right: 1rem;
`

const styles = () => ({
  tooltip: {
    background: 'white',
    color: 'black',
    border: `solid 2px ${helpColor}`,
    borderRadius: 0,
    padding: '2rem 1.5rem',
    boxShadow: '5px 5px 20px grey',
  },
  arrowPopper: {
    opacity: 1,

    '&[x-placement*="bottom"] $arrowArrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${helpColor} transparent`,
      },
    },
    '&[x-placement*="top"] $arrowArrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${helpColor} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrowArrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${helpColor} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrowArrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${helpColor}`,
      },
    },
  },
  arrowArrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      position: 'relative',
      bottom: '1px',
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
})

class TooltipOnFocus extends Component {
  static propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object,
    content: PropTypes.string,
    tooltipId: PropTypes.string,
    useHover: PropTypes.bool,
  }

  static defaultProps = {
    useHover: false,
  }

  state = {
    arrowRef: null,
  }

  handleArrowRef = (arrowRef) =>
    this.setState({
      arrowRef,
    })

  render() {
    const {
      children,
      classes,
      content,
      tooltipId,
      useHover,
      ...props
    } = this.props

    const eventProps = {
      disableHoverListener: !useHover,
      disableTouchListener: true,
      disableFocusListener: useHover,
    }

    return (
      <Tooltip
        id={tooltipId}
        {...eventProps}
        placement="bottom"
        ref={this.handleArrowRef}
        aria-hidden="false"
        title={
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <TooltipTitle>
                <InfoImg src={info} alt="" />
                Information
              </TooltipTitle>
              <Close />
            </div>
            <TooltipText>{content}</TooltipText>
            <span className={classes.arrowArrow} ref={this.handleArrowRef} />
          </div>
        }
        classes={{ popper: classes.arrowPopper, tooltip: classes.tooltip }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef,
              },
            },
          },
        }}
        {...props}
      >
        {children}
      </Tooltip>
    )
  }
}

export default withStyles(styles)(TooltipOnFocus)
