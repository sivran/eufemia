import * as React from 'react';
export interface PrimaryComponentSpacing {
  top?: string | number | boolean;
  right?: string | number | boolean;
  bottom?: string | number | boolean;
  left?: string | number | boolean;
}
export type PrimaryComponentFoo = string | number | boolean;
export type PrimaryComponentTop = string | number | boolean;
export type PrimaryComponentRight = string | number | boolean;
export type PrimaryComponentBottom = string | number | boolean;
export type PrimaryComponentLeft = string | number | boolean;
export type PrimaryComponentSecondary = string | number | boolean;
export type PrimaryComponentSecondaryFoo = string | number | boolean;
export interface PrimaryComponentSecondarySpacing {
  secondary?: string | number | boolean;
}
export interface PrimaryComponentProps {
  boolean?: boolean;
  number?: number;
  spacing?: PrimaryComponentSpacing;
  foo?: PrimaryComponentFoo;
  top?: PrimaryComponentTop;
  right?: PrimaryComponentRight;
  bottom?: PrimaryComponentBottom;
  left?: PrimaryComponentLeft;
  secondary?: PrimaryComponentSecondary;
  secondary_foo?: PrimaryComponentSecondaryFoo;
  secondary_spacing?: PrimaryComponentSecondarySpacing;
  children?: React.ReactNode;
}
export default class PrimaryComponent extends React.Component<PrimaryComponentProps, any> {
  render(): JSX.Element;
}