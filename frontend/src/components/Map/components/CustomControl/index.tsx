// Get from https://github.com/PaulLeCam/react-leaflet/issues/876#issuecomment-980222405

import { forwardRef, ReactNode, Ref, useEffect, useImperativeHandle, useState } from 'react';
import { createPortal } from 'react-dom';
import { Control, ControlOptions, DomEvent, DomUtil, Map } from 'leaflet';
import {
  createControlHook,
  createElementHook,
  ElementHook,
  LeafletContextInterface,
  LeafletElement,
  LeafletProvider,
} from '@react-leaflet/core';

interface PropsWithChildren {
  children?: ReactNode;
}
interface ControlOptionsWithChildren extends ControlOptions {
  children?: ReactNode;
}

const DumbControl = Control.extend({
  options: {
    className: '',
    onOff: '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleOff: function noop() {},
  },

  onAdd() {
    // eslint-disable-next-line no-underscore-dangle
    const _controlDiv = DomUtil.create('div', this.options.className);

    DomEvent.on(_controlDiv, 'click', event => {
      DomEvent.stopPropagation(event);
    });
    DomEvent.disableScrollPropagation(_controlDiv);
    DomEvent.disableClickPropagation(_controlDiv);

    return _controlDiv;
  },

  onRemove(map: Map) {
    if (this.options.onOff) {
      map.off(this.options.onOff, this.options.handleOff, this);
    }

    return this;
  },
});

const useForceUpdate = () => {
  const [, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
};

export function createContainerComponent<E, P extends PropsWithChildren>(
  useElement: ElementHook<E, P>,
) {
  function ContainerComponent(props: P, ref: Ref<E>) {
    const forceUpdate = useForceUpdate();
    // @ts-ignore next-line
    const { instance, context } = useElement(props, null).current;
    const children = props.children;
    const contentNode = (instance as any).getContainer();

    useImperativeHandle(ref, () => instance);
    useEffect(() => {
      forceUpdate();
    }, [contentNode]);

    if (!children || !contentNode) return null;

    return createPortal(<LeafletProvider value={context}>{children}</LeafletProvider>, contentNode);
  }

  return forwardRef(ContainerComponent);
}

export function createControlComponent<E extends Control, P extends ControlOptionsWithChildren>(
  createInstance: (props: P) => E,
) {
  function createElement(props: P, context: LeafletContextInterface): LeafletElement<E> {
    return { instance: createInstance(props), context };
  }
  const useElement = createElementHook(createElement);
  const useControl = createControlHook(useElement);
  return createContainerComponent(useControl);
}

const CustomControl = createControlComponent<Control, ControlOptionsWithChildren>(
  function createControlWithChildren(props) {
    return new DumbControl(props);
  },
);

export default CustomControl;
