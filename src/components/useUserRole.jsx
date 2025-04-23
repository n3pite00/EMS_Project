import { useState, useEffect } from 'react';

function useUserRole() {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'regular');

  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem('userRole') || 'regular');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return userRole;
}

export default useUserRole;