import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export const Container = (props: ContainerProps) => {
  const { children } = props;

  return <div className={'max-w-[1024px] m-auto! px-3'}>{children}</div>;
};
