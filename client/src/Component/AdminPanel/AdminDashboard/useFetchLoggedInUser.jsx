import React, { useState, useEffect } from 'react';

const useFetchLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        // Retrieve token and authorization from local storage (adjust based on your setup)
        const token = localStorage.getItem('token');
        const authorization = localStorage.getItem('authorization');

        // Check if token and authorization are present (adjust error message if needed)
        if (!token || !authorization) {
          setError('Please log in to access user data.');
          setIsLoading(false);
          return;
        }

        // Get logged-in user information
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!storedUser) {
          setError('Please log in to access user data.');
          setIsLoading(false);
          return;
        }

        setLoggedInUser(storedUser);
      } catch (error) {
        console.error('Error fetching logged-in user data:', error);
        setError('Error fetching user data.'); // Consider a more specific error message
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoggedInUser();
  }, []);

  return { loggedInUser, isLoading, error };
};

export default useFetchLoggedInUser;
