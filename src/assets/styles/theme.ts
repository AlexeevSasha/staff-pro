import { DefaultTheme } from 'styled-components'
export const theme: DefaultTheme = {
    colors: {
        blue: '#1890ff'
    },
    media: {
        _480: "(max-width: 480px)",
        _768: "(max-width: 768px)",
        _980: "(max-width: 980px)",
    }
};

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            blue: '#1890ff'
        }
        media: {
            _480: "(max-width: 480px)",
            _768: "(max-width: 768px)",
            _980: "(max-width: 980px)"
        }
    }
}