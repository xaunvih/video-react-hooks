import styled, { ThemeProps } from 'styled-components'
import is from 'typescript-styled-is'

interface IOrder extends ThemeProps<any> {
    order?: number
}

interface IBasis extends ThemeProps<any> {
    basis?: number
}

interface IGrow extends ThemeProps<any> {
    grow?: number
}

interface IShrink extends ThemeProps<any> {
    shrink?: number
}

interface IFlexItemProps extends IOrder, IBasis, IGrow, IShrink {
    inlineBlock?: boolean
    inlineFlex?: boolean
    flex?: boolean
    noShrink?: boolean
}

const FlexItem = styled.div<IFlexItemProps>`
    order: 0;
    flex-basis: auto;
    flex-grow: 0;
    flex-shrink: 1;
    display: block;

    ${is('inlineBlock')`
      display: inline-block;
    `};

    ${is('inlineFlex')`
      display: inline-flex;
    `};

    ${is('flex')`
      display: flex;
    `};

    ${is('order')`
      order: ${(props: IOrder) => props.order};
    `};

    ${is('basis')`
      flex-basis: ${(props: IBasis) => props.basis};
    `};

    ${is('grow')`
      flex-grow: ${(props: IGrow) => props.grow};
    `};

    ${is('shrink')`
      flex-shrink: ${(props: IShrink) => props.shrink};
    `};

    ${is('noShrink')`
      flex-shrink: 0;
    `};
`

export { FlexItem as default }
