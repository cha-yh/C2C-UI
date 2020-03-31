import React, { useRef, useEffect, SyntheticEvent } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Button from '../Button/Button';
import { animated, useTransition } from 'react-spring';
import { flex, rem } from '../utils';
import { useOnClickOutside } from '../hooks';

export type ModalProps = {
  visible: boolean;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  hideButtons?: boolean;
  cancellable?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  width?: string;
};



const Modal = ({
  visible,
  title,
  description,
  hideButtons,
  cancellable,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  children,
  onCancel,
  onConfirm,
  width
}: ModalProps) => {

  const fadeTransition = useTransition(visible, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 100 }
  });

  const slideUpTransition = useTransition(visible, null, {
    from: {
      transform: `translateY(20px) scale(0.9)`,
      opacity: 0
    },
    enter: {
      transform: `translateY(0px) scale(1)`,
      opacity: 1
    },
    leave: {
      transform: `translateY(20px) scale(0.9)`,
      opacity: 0
    },
    config: {
      tension: 200,
      friction: 15,
      duration: 100
    }
  });
  const onClickDimmer = () => {
    if (onCancel) {
      onCancel();
    }
  }
  const ref = useRef(null);
  useOnClickOutside(ref, () => onClickDimmer());
  const closeModal= (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onCancel && onCancel();
}

  const escFunction = (event: any) => {
    if(event.keyCode === 27) {
        closeModal(event);
    }
  }

  useEffect(() => {
    if(visible) {
      document.addEventListener("keydown", escFunction, false);
      document.body.style.paddingRight = '1.06rem';
      document.body.style.overflow = 'hidden';
      return () => {
          document.removeEventListener("keydown", escFunction, false);
          document.body.style.overflow = 'auto';
          document.body.style.paddingRight = '0';
      };
    }
  }, [visible]);

  return (
    <React.Fragment>
      {fadeTransition.map(({ item, key, props }) =>
        item ? (
          <DimmerBlock
            key={key}
            style={props}
          ></DimmerBlock>
        ) : null
      )}

      {slideUpTransition.map(({ item, key, props }) =>
        item ? (
          <BoxWrapperBlock key={key} style={props}>
            <WhiteBox ref={ref} width={width}>
              {title && <h3 className="title">{title}</h3>}
              {description && <p className="description">{description}</p>}
              {children}
              {!hideButtons && (
                <ButtonGroup
                  style={{ marginTop: '3rem' }}
                  rightAlign>
                  {cancellable && (
                    <Button theme="tertiary" onClick={onCancel}>
                      {cancelText}
                    </Button>
                  )}
                  <Button onClick={onConfirm}>{confirmText}</Button>
                </ButtonGroup>
              )}
            </WhiteBox>
          </BoxWrapperBlock>
        ) : null
      )}
    </React.Fragment>
  );
};

const fullscreen = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const darkLayer = css`
  
`;

const DimmerBlock = styled(animated.div)`
  ${fullscreen};
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
`;

const BoxWrapperBlock = styled(animated.div)`
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
  ${fullscreen};
`;

const WhiteBox = styled.div<{width: string|undefined}>`
  box-sizing: border-box;
  border-radius: 4px;
  width: ${props => props.width ? props.width :'25rem'};
  background: white;
  box-shadow: 0px 4px 8px 8px rgba(0, 0, 0, 0.05);
  padding: ${rem(20)};
  max-height: 90vh;
  overflow-y: auto;

  >.title {
    font-size: 1.5rem;
    color: #343a40;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  >.description {
    font-size: 1.125rem;
    margin: 0;
    color: #868e96;
  }
`;


export default Modal;