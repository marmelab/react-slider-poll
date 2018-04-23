import glamorous from 'glamorous';

import { transition } from '../util';

export default glamorous.div(
    {
        transform: 'translateZ(0)',
        transition: transition(0.5),
        overflow: 'hidden',
    },
    ({ isDismissed }) => ({
        maxHeight: isDismissed ? 0 : 500,
    })
);
