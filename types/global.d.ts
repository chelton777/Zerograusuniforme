// Tipos globais para o projeto

// Tipos para módulos JSX
import { HTMLAttributes, SVGProps } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Elementos HTML comuns
      div: HTMLAttributes<HTMLDivElement>;
      span: HTMLAttributes<HTMLSpanElement>;
      button: HTMLAttributes<HTMLButtonElement>;
      input: HTMLAttributes<HTMLInputElement> & {
        type?: string;
      };
      form: HTMLAttributes<HTMLFormElement>;
      a: HTMLAttributes<HTMLAnchorElement> & {
        href?: string;
        target?: string;
      };
      img: HTMLAttributes<HTMLImageElement> & {
        src: string;
        alt: string;
        width?: number | string;
        height?: number | string;
        loading?: 'eager' | 'lazy';
      };
      ul: HTMLAttributes<HTMLUListElement>;
      li: HTMLAttributes<HTMLLIElement>;
      h1: HTMLAttributes<HTMLHeadingElement>;
      h2: HTMLAttributes<HTMLHeadingElement>;
      h3: HTMLAttributes<HTMLHeadingElement>;
      h4: HTMLAttributes<HTMLHeadingElement>;
      h5: HTMLAttributes<HTMLHeadingElement>;
      h6: HTMLAttributes<HTMLHeadingElement>;
      p: HTMLAttributes<HTMLParagraphElement>;
      nav: HTMLAttributes<HTMLElement>;
      // Adicione mais elementos conforme necessário
    }
  }
}

// Declaração de módulos para evitar erros de importação
declare module 'react' {
  export = React;
  export as namespace React;
}

declare module 'next/link' {
  import { ComponentType } from 'react';
  import { LinkProps as NextLinkProps } from 'next/dist/client/link';
  
  const Link: ComponentType<NextLinkProps>;
  export default Link;
}

declare module 'next/image' {
  import { ImageProps as NextImageProps } from 'next/dist/shared/lib/image-external';
  
  const Image: React.FC<NextImageProps>;
  export default Image;
}

declare module 'framer-motion' {
  export * from 'framer-motion';
  
  // Adicione tipos específicos se necessário
  export const motion: {
    [key: string]: any;
  };
  
  export const AnimatePresence: React.FC<{
    children: React.ReactNode;
    initial?: boolean;
    custom?: any;
    onExitComplete?: () => void;
    exitBeforeEnter?: boolean;
    presenceAffectsLayout?: boolean;
  }>;
}

declare module 'lucide-react' {
  import { LucideProps } from 'lucide-react';
  
  export const Search: React.FC<LucideProps>;
  export const X: React.FC<LucideProps>;
  export const Menu: React.FC<LucideProps>;
  export const ShoppingBag: React.FC<LucideProps>;
  // Adicione outros ícones conforme necessário
}

// Tipos para o contexto do carrinho
declare module '@/contexts/cart-context' {
  export const useCart: () => {
    totalItems: number;
    // Adicione outras propriedades e métodos do carrinho conforme necessário
  };
}

// Tipos para utilitários
declare module '@/lib/utils' {
  export const cn: (...classes: (string | undefined)[]) => string;
}
