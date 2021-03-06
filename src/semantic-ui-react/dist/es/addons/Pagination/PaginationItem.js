import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import _invoke from 'lodash/invoke';

import PropTypes from 'prop-types';
import { Component } from 'react';

import { createShorthandFactory, keyboardKey, META } from '../../lib';
import MenuItem from '../../collections/Menu/MenuItem';

/**
 * An item of a pagination.
 */

var PaginationItem = function (_Component) {
  _inherits(PaginationItem, _Component);

  function PaginationItem() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PaginationItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PaginationItem.__proto__ || Object.getPrototypeOf(PaginationItem)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (e) {
      var type = _this.props.type;


      if (type !== 'ellipsisItem') _invoke(_this.props, 'onClick', e, _this.props);
    }, _this.handleKeyDown = function (e) {
      _invoke(_this.props, 'onKeyDown', e, _this.props);
      if (keyboardKey.getCode(e) === keyboardKey.Enter) _invoke(_this.props, 'onClick', e, _this.props);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PaginationItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          active = _props.active,
          ariaLabel = _props.ariaLabel,
          type = _props.type,
          rest = _objectWithoutProperties(_props, ['active', 'ariaLabel', 'type']);

      var disabled = type === 'ellipsisItem';

      return MenuItem.create(_extends({}, rest, {
        active: active,
        'aria-current': active,
        'aria-label': ariaLabel,
        disabled: disabled,
        onClick: this.handleClick,
        onKeyDown: this.handleKeyDown,
        tabIndex: disabled ? -1 : 0
      }));
    }
  }]);

  return PaginationItem;
}(Component);

PaginationItem._meta = {
  name: 'PaginationItem',
  parent: 'Pagination',
  type: META.TYPES.ADDON
};
PaginationItem.handledProps = ['active', 'ariaLabel', 'onClick', 'onKeyDown', 'type'];
PaginationItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** A pagination item can be active. */
  active: PropTypes.bool,

  /** A pagination item can have an aria label. */
  ariaLabel: PropTypes.string,

  /**
   * Called on click.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClick: PropTypes.func,

  /**
   * Called on key down.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onKeyDown: PropTypes.func,

  /** A pagination should have a type. */
  type: PropTypes.oneOf(['ellipsisItem', 'firstItem', 'prevItem', 'pageItem', 'nextItem', 'lastItem'])
} : {};


PaginationItem.create = createShorthandFactory(PaginationItem, function (content) {
  return { content: content };
});

export default PaginationItem;