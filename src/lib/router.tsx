import React from 'react';

export type Route = {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
};

const getBase = () => {
  // те саме, що ти прописав у vite.config.ts → '/VolunteerAdaptive/'
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base.slice(0, -1) : base; // '/VolunteerAdaptive'
};

// знімаємо базовий префікс із повного шляху
const stripBase = (fullPath: string) => {
  const base = getBase();

  if (base === '/') return fullPath || '/';

  // /VolunteerAdaptive  або  /VolunteerAdaptive/
  if (fullPath === base || fullPath === base + '/') return '/';

  if (fullPath.startsWith(base + '/')) {
    // /VolunteerAdaptive/about  ->  /about
    return fullPath.slice(base.length);
  }

  return fullPath || '/';
};

// додаємо базовий префікс до "логічного" шляху (/about -> /VolunteerAdaptive/about)
const withBase = (path: string) => {
  const base = getBase(); // '/VolunteerAdaptive'
  if (base === '/') return path || '/';

  if (path === '/' || path === '') return base + '/';
  return `${base}${path}`;
};

export const useRouter = () => {
  const getPath = () => {
    if (typeof window === 'undefined') return '/';
    return stripBase(window.location.pathname);
  };

  const [currentPath, setCurrentPath] = React.useState(getPath);

  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = React.useCallback(
    (path: string) => {
      if (typeof window === 'undefined') return;

      const logicalPath = path || '/';
      if (currentPath === logicalPath) return;

      const fullPath = withBase(logicalPath);

      window.history.pushState({}, '', fullPath);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo(0, 0);
    },
    [currentPath]
  );

  return { currentPath, navigate };
};

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string;
};

export const Link: React.FC<LinkProps> = ({
  to,
  onClick,
  children,
  ...rest
}) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };

  // для SEO/правильного ховера показуємо вже повний шлях
  const href = withBase(to);

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

export const Router: React.FC<{
  routes: Route[];
  fallback?: React.ComponentType;
}> = ({ routes, fallback: Fallback }) => {
  const { currentPath } = useRouter();

  const matchedRoute = React.useMemo(() => {
    return routes.find((route) => {
      if (route.exact) {
        return route.path === currentPath;
      }
      return currentPath.startsWith(route.path);
    });
  }, [routes, currentPath]);

  if (matchedRoute) {
    const Component = matchedRoute.component;
    return <Component key={currentPath} />;
  }

  if (Fallback) {
    const F = Fallback;
    return <F />;
  }

  return null;
};
