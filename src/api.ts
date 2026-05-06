import { UserProfile } from './types';

const CACHE_PREFIX = 'swifttrack_cache_';
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

function setCache(key: string, data: any) {
  try {
    const cacheEntry = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(cacheEntry));
  } catch (e) {
    console.error('Failed to set cache:', e);
  }
}

function getCache(key: string) {
  try {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (!item) return null;
    
    const { data, timestamp } = JSON.parse(item);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch (e) {
    return null;
  }
}

export const api = {
  auth: {
    async me() {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (res.status === 401) {
          localStorage.removeItem(CACHE_PREFIX + 'me');
          return null;
        }
        if (!res.ok) {
          return getCache('me');
        }
        const data = await res.json();
        setCache('me', data);
        return data;
      } catch (e) {
        return getCache('me');
      }
    },
    async signup(data: any) {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      
      const contentType = res.headers.get('content-type');
      if (!res.ok) {
        if (contentType && contentType.includes('application/json')) {
          const err = await res.json();
          throw new Error(err.error || 'Signup failed');
        } else {
          const text = await res.text();
          console.error('Non-JSON error response during signup:', text);
          throw new Error(`Server error (${res.status}): ${res.statusText}`);
        }
      }
      return res.json();
    },
    async login(data: any) {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      
      const contentType = res.headers.get('content-type');
      if (!res.ok) {
        if (contentType && contentType.includes('application/json')) {
          const err = await res.json();
          throw new Error(err.error || 'Login failed');
        } else {
          const text = await res.text();
          console.error('Non-JSON error response during login:', text);
          throw new Error(`Server error (${res.status}): ${res.statusText}`);
        }
      }
      return res.json();
    },
    async logout() {
      await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      });
      // Clear all related cache
      try {
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith(CACHE_PREFIX)) {
            localStorage.removeItem(key);
          }
        });
      } catch (e) {
        console.error('Failed to clear cache on logout:', e);
      }
    },
    async getGoogleAuthUrl() {
      const res = await fetch('/api/auth/google/url', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to get Google Auth URL');
      return res.json();
    }
  },
  users: {
    async list() {
      try {
        const res = await fetch('/api/users', { credentials: 'include' });
        if (!res.ok) {
          const cached = getCache('users_list');
          return cached || [];
        }
        const data = await res.json();
        setCache('users_list', data);
        return data;
      } catch (e) {
        const cached = getCache('users_list');
        return cached || [];
      }
    },
    async get(id: string) {
      const res = await fetch(`/api/users/${id}`, { credentials: 'include' });
      if (!res.ok) return null;
      return res.json();
    },
    async update(id: string, data: any) {
      const res = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to update user');
      localStorage.removeItem(CACHE_PREFIX + 'users_list');
    }
  },
  shipments: {
    async list() {
      try {
        const res = await fetch('/api/shipments', { credentials: 'include' });
        if (!res.ok) {
          const cached = getCache('shipments');
          return cached || [];
        }
        const data = await res.json();
        setCache('shipments', data);
        return data;
      } catch (e) {
        const cached = getCache('shipments');
        return cached || [];
      }
    },
    async create(data: any) {
      const res = await fetch('/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to create shipment');
      localStorage.removeItem(CACHE_PREFIX + 'shipments');
      return res.json();
    },
    async update(id: string, data: any) {
      const res = await fetch(`/api/shipments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to update shipment');
      localStorage.removeItem(CACHE_PREFIX + 'shipments');
      return res.json();
    },
    async get(id: string) {
      const res = await fetch(`/api/shipments/${id}`, { credentials: 'include' });
      if (!res.ok) return null;
      const data = await res.json();
      // Also update list cache if we have more info now
      return data;
    },
    async delete(id: string) {
      const res = await fetch(`/api/shipments/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete shipment');
      localStorage.removeItem(CACHE_PREFIX + 'shipments');
    },
    async claim(id: string) {
      const res = await fetch(`/api/shipments/${id}/claim`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to claim shipment');
      }
      localStorage.removeItem(CACHE_PREFIX + 'shipments');
      return res.json();
    },
    async getUpdates(id: string) {
      const res = await fetch(`/api/shipments/${id}/updates`, { credentials: 'include' });
      if (!res.ok) return [];
      return res.json();
    },
    async addUpdate(id: string, data: any) {
      const res = await fetch(`/api/shipments/${id}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to add update');
      localStorage.removeItem(CACHE_PREFIX + 'shipments');
      return res.json();
    }
  },
  flights: {
    async list() {
      try {
        const res = await fetch('/api/flights', { credentials: 'include' });
        if (!res.ok) {
          const cached = getCache('flights');
          return cached || [];
        }
        const data = await res.json();
        setCache('flights', data);
        return data;
      } catch (e) {
        const cached = getCache('flights');
        return cached || [];
      }
    },
    async create(data: any) {
      const res = await fetch('/api/flights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to create flight');
      localStorage.removeItem(CACHE_PREFIX + 'flights');
      return res.json();
    },
    async update(id: string, data: any) {
      const res = await fetch(`/api/flights/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to update flight');
      localStorage.removeItem(CACHE_PREFIX + 'flights');
      return res.json();
    },
    async get(id: string) {
      const res = await fetch(`/api/flights/${id}`, { credentials: 'include' });
      if (!res.ok) return null;
      return res.json();
    },
    async delete(id: string) {
      const res = await fetch(`/api/flights/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete flight');
      localStorage.removeItem(CACHE_PREFIX + 'flights');
    },
    async claim(id: string) {
      const res = await fetch(`/api/flights/${id}/claim`, {
        method: 'POST',
        credentials: 'include'
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to claim flight');
      }
      localStorage.removeItem(CACHE_PREFIX + 'flights');
      return res.json();
    },
    async getUpdates(id: string) {
      const res = await fetch(`/api/flights/${id}/updates`, { credentials: 'include' });
      if (!res.ok) return [];
      return res.json();
    },
    async addUpdate(id: string, data: any) {
      const res = await fetch(`/api/flights/${id}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to add update');
      localStorage.removeItem(CACHE_PREFIX + 'flights');
      return res.json();
    }
  },
  supportTickets: {
    async list() {
      const res = await fetch('/api/supportTickets', { credentials: 'include' });
      if (!res.ok) return [];
      return res.json();
    },
    async create(data: any) {
      const res = await fetch('/api/supportTickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to create support ticket');
      return res.json();
    },
    async update(id: string, data: any) {
      const res = await fetch(`/api/supportTickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to update support ticket');
      return res.json();
    },
    async delete(id: string) {
      const res = await fetch(`/api/supportTickets/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to delete support ticket');
    }
  },
  reviews: {
    async list() {
      const res = await fetch('/api/reviews', { credentials: 'include' });
      if (!res.ok) return [];
      return res.json();
    },
    async create(data: any) {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to create review');
      return res.json();
    }
  }
};
