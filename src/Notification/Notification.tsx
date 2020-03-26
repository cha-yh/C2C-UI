import React, { useState, useEffect, useRef, ReactNode } from 'react';
import styled, {css} from 'styled-components';
import { rem, utils, flex, palette } from '../utils';
import { MdClose } from 'react-icons/md';
import Loader from '../Loader/Loader';
import { animated, useTransition } from 'react-spring';

type NotificationProp =  {
    visible: boolean;
    /** Must contain code that makes 'visible' be 'true' */
    onOpen: ()=>void;
    /** Must contain code that makes 'visible' be 'false' */
    onClose: ()=>void;
    duration?: number;
    title?: string;
    contents: ReactNode;
    success?: boolean;
    failure?: boolean;
}
const Notification = ({
    visible,
    onOpen,
    onClose,
    duration=5000,
    title="Notification", contents,
    success, failure
}:NotificationProp) => {
    
    const slideUpTransition = useTransition(visible, null, {
        from: {
          transform: `translateY(20px) scale(0.9)`,
          opacity: 0,
          bottom: rem(-20),
          right: rem(20)
        },
        enter: {
          transform: `translateY(0px) scale(1)`,
          opacity: 1,
          bottom: rem(20),
          right: rem(20)
        },
        leave: {
          transform: `translateY(20px) scale(0.9)`,
          opacity: 0,
          bottom: rem(-20),
          right: rem(20)
        },
        config: {
          tension: 200,
          friction: 15,
          duration: 100
        }
    });

    const timerToClearSomewhere = useRef(0);
    const [status, setStatus] = useState('leave')

    const delayClose = (duration: number) => {
        const autoCloseTimer = setTimeout(() => {
            onClose();
        }, duration)

        return autoCloseTimer;
    }

    useEffect(() => {
        if(visible) {
            if(status === 'hover') {
                clearTimeout(timerToClearSomewhere.current);
                timerToClearSomewhere.current = delayClose(99999000);
            } else {
                clearTimeout(timerToClearSomewhere.current);
                timerToClearSomewhere.current = delayClose(duration);
            }
        } else {
            clearTimeout(timerToClearSomewhere.current);
        }
    }, [visible, status]);



    const onHover = () => {
        console.log('hover');
        setStatus('hover');
    }

    const onLeave = () => {
        console.log('leave');
        setStatus('leave');
    }

    const getTheme = () => {
        if(success) {
            return 'success';
        } else if(failure) {
            return 'failure';
        } else {
            return 'normal';
        }
    }
    return (
        <React.Fragment>
            {slideUpTransition.map(({ item, key, props }) =>
                item && (
                    <NotificationBlock
                        theme={getTheme()}
                        key={key}
                        style={props}
                        onMouseEnter={onHover}
                        onMouseLeave={onLeave}
                    >
                        <div className="head">
                            <h5>{title}</h5>
                            <p className="close" onClick={onClose}><MdClose /></p>
                        </div>
                        <div className="body">
                            {contents}
                        </div>
                    </NotificationBlock>
                )
            )}
        </React.Fragment>
    )
}

const colorTheme = {
    normal: css`
        >.head {
            background: ${palette.gray800};
        }
        >.body {
            background: ${palette.gray900};
        }

        &:hover {
            >.head {
            background: ${palette.gray900};
            }
            >.body {
                background: black;
            }
        }
    `,

    success: css`
        >.head {
            background: ${palette.blue500};
        }
        >.body {
            background: ${palette.blue600};
        }

        &:hover {
            >.head {
                background: ${palette.blue600};
            }
            >.body {
                background: ${palette.blue700};;
            }
        }
    `,

    failure: css`
        >.head {
            background: ${palette.red500};
        }
        >.body {
            background: ${palette.red600};
        }

        &:hover {
            >.head {
                background: ${palette.red600};
            }
            >.body {
                background: ${palette.red700};
            }
        }
    `

};


const NotificationBlock = styled(animated.div)<{theme: 'normal'|'success'|'failure'}>`
    ${utils.initiateCss};
    z-index: 9;
    position: fixed;
    bottom: ${rem(20)};
    right: ${rem(20)};
    ${(props: {theme: 'normal'|'success'|'failure'}) => props.theme ? colorTheme[props.theme] : colorTheme.normal};
    >.head {
        ${flex.row};
        ${flex.ai.center};
        ${flex.jc.spaceB};
        padding: ${rem(10)};
        
        >h5 {
            color: white;
        }
        
        >.close {
            color: white;
            cursor: pointer;
            &:hover {
                color: ${palette.gray300};
            }
        }

    }
    >.body {
        min-width: ${rem(300)};
        min-height: ${rem(100)};
        padding: ${rem(20)};
        ${flex.row};
        ${flex.ai.center};
        ${flex.jc.center};
    }
`;

export default Notification;