import { useRouter } from 'next/router';
import { JSX, useEffect, useState } from 'react';
import { authenticateAdmin } from '@/app/services/api';

export function withAdminAuth(Component: React.ComponentType<any>) {
  return function WrappedComponent(props: JSX.IntrinsicAttributes) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const verifyAdmin = async () => {
        try {
          const response = await authenticateAdmin();
          if (response.msg === true) {
            setIsAdmin(true);
          } else {
            router.push('/login');
          }
        } catch (error) {
          router.push('/login');
        }
        setLoading(false);
      };

      verifyAdmin();
    }, [router]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return isAdmin ? <Component {...props} /> : null;
  };
}
