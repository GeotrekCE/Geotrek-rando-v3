declare module 'react-simple-dropdown' {
  import { Component, RefObject } from 'react';
  interface DropdownProps {
    children: React.ReactNode;
    className?: string;
    ref?: RefObject<DropdownContainer>;
  }
  interface GenericComponentProps {
    children: React.ReactNode;
    className?: string;
    ref?: RefObject<HTMLElement>;
  }

  export class DropdownTrigger extends Component<Props> {}
  export class DropdownContent extends Component<Props> {}
  export default class DropdownContainer extends Component<DropdownProps> {
    hide: () => void;
  }
}
