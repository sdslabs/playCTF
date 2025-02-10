const CACHE_NAME = 'api-cache';
const CACHE_DURATION = 5 * 60; // 5 minutes in seconds

const isCacheValid = (response) => {
    if (!response) return false;
    
    const cachedAt = response.headers.get('x-cached-at');
    if (!cachedAt) return false;

    const ageInSeconds = (Date.now() - new Date(cachedAt).getTime()) / 1000;
    return ageInSeconds < CACHE_DURATION;
};

const addCacheHeaders = (response) => {
    const headers = new Headers(response.headers);
    headers.append('x-cached-at', new Date().toISOString());
    
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
    });
};

// Get auth token from LoginUser
const getAuthToken = () => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.token) {
            return `Bearer ${userInfo.token}`;
        }
        return null;
    } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
    }
};

export const cacheRequest = async (request) => {
    try {
        const cache = await caches.open(CACHE_NAME);
        
        const cachedResponse = await cache.match(request);
        if (cachedResponse && isCacheValid(cachedResponse)) {
            console.log('Returning cached response');
            return cachedResponse;
        }

        // Add auth header to the request
        const headers = new Headers(request.headers);
        const authToken = getAuthToken();
        if (authToken) {
            headers.set('Authorization', authToken);
        }

        const authenticatedRequest = new Request(request, {
            headers
        });

        const response = await fetch(authenticatedRequest);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseWithCacheHeaders = addCacheHeaders(response.clone());
        
        await cache.put(request, responseWithCacheHeaders);
        
        return response;
    } catch (error) {
        console.error('Cache operation failed:', error);
        throw error; // Let the API caller handle the error
    }
};

export const clearCache = async () => {
    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.delete();
    } catch (error) {
        console.error('Failed to clear cache:', error);
    }
};
