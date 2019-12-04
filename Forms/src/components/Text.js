import React from 'react';

export const Text = ({ state }) =>
    <pre>
        {Object.keys(state).map((name, i) => {
            if (name === 'isTextVisible' && state[name]) {
                return (
                    state['text']
                )
            } else {
                return '';
            }
        })}
    </pre>