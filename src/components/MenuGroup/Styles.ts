import styled from 'styled-components';
import colors from 'styles/colors';
import fonts from 'styles/fonts/base';

import {Icon} from '@thenewboston/ui';

export interface ContainerProps {
  expanded: boolean;
}

export interface ToggleArrowProps {
  expanded: boolean;
}

export interface SubmenuProps {
  expanded: boolean;
}

export const Container = styled.div<ContainerProps>`
  &:last-of-type {
    ${(props) => (props.expanded ? 'padding-bottom: 10px;' : '')}
  }
`;

export const Toggle = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  padding: 10px 16px 0;
  transition-duration: 0.2s;

  &:focus {
    outline: none;
  }
`;

export const ToggleArrow = styled(Icon)<ToggleArrowProps>`
  margin-right: 16px;
  transition-duration: 0.2s;
  ${(props) => (props.expanded ? `transform: rotate(90deg);` : 'transform: rotate(0deg);')}
`;

export const Title = styled.button`
  font-weight: ${fonts.weight.semiBold};
`;

export const Submenu = styled.div<SubmenuProps>`
  flex-direction: column;
  padding-left: 62px;
  ${(props) => (props.expanded ? 'display: flex;' : 'display: none;')}

  a {
    border-radius: 8px;
    color: ${colors.palette.gray['400']};
    margin-right: 16px;
    padding: 6px 0 6px 0;
    transition: color 0.1s ease;
    width: fit-content;

    &:first-of-type {
      padding-top: 8px;
    }

    &:hover {
      color: var(--color-primary);
    }

    &:last-of-type {
      padding-bottom: 10px;
    }

    &.active {
      color: ${colors.primary};
    }
  }
`;
