import * as React from 'react';
import { useState, useCallback } from 'react';

interface ApiKey {
  key: string;
  lastUsed: string;
  lastUsedFrom: string;
}

export function useApiKeys() {
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [keys] = useState<Record<string, ApiKey>>({
    production: {
      key: process.env.NEXT_PUBLIC_API_KEY_PROD || '••••••••••••••••',
      lastUsed: '2 hours ago',
      lastUsedFrom: '192.168.1.1',
    },
    test: {
      key: process.env.NEXT_PUBLIC_API_KEY_TEST || '••••••••••••••••',
      lastUsed: '1 day ago',
      lastUsedFrom: '192.168.1.2',
    },
  });

  const toggleKeyVisibility = useCallback((keyType: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyType]: !prev[keyType],
    }));
  }, []);

  const getDisplayKey = useCallback((keyType: string) => {
    const key = keys[keyType];
    if (!key) return '••••••••••••••••';
    return showKeys[keyType] ? key.key : '••••••••••••••••';
  }, [keys, showKeys]);

  return {
    keys,
    showKeys,
    toggleKeyVisibility,
    getDisplayKey,
  };
}
