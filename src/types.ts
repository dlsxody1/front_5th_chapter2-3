import { forwardRef } from "react"
import type { ElementType, ComponentPropsWithoutRef, Ref, ForwardRefExoticComponent, JSX } from "react"

/**
 * HTML 태그 이름(string) 또는 React 컴포넌트 타입(T)에 따라
 * 알맞은 ref 타입(HTMLElement 또는 React Component 인스턴스)을 매칭하는 타입
 */
type ElementTypeToElement<T extends ElementType> = T extends keyof HTMLElementTagNameMap
  ? HTMLElementTagNameMap[T]
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends React.JSXElementConstructor<any>
    ? unknown
    : Element

/**
 * forwardRef를 쓸 때 타입을 더 명확하고 안전하게 만들어주는 헬퍼
 */
export function forwardRefWithType<T extends ElementType>(
  render: (props: ComponentPropsWithoutRef<T>, ref: Ref<ElementTypeToElement<T>>) => JSX.Element,
) {
  return forwardRef(render) as unknown as ForwardRefExoticComponent<
    ComponentPropsWithoutRef<T> & { ref?: Ref<ElementTypeToElement<T>> }
  > & { displayName?: string }
}
