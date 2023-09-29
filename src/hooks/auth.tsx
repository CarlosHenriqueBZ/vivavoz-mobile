import React, {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from 'react';
import jwt_decode from 'jwt-decode';
import {database} from '../data/database';
import OneSignal from 'react-native-onesignal';

import api from '../services/api';

interface Worker {
  id: string;
  cpf: string;
  first_name: string;
  last_name: string;
  rg: string;
  birth_date: Date;
  activity_profile: 'rural' | 'industrial' | 'market' | 'public-service';
  is_peasant: boolean;
  is_outsourced: boolean;
  worker_function: string;
  genre: 'male' | 'female' | 'other';
  phone: string;
  situation: 'temporary' | 'permanent';
  email: string;
  address: string;
  city: {
    id: number;
    nome: string;
  };
  city_id: number;
  state: string;
  postal_code: string;
  is_temporary_address: boolean;
  origin_address: string;
  origin_city: {
    id: number;
    nome: string;
  };
  origin_city_id: number;
  origin_state: string;
  origin_postal_code: string;
  salary_range: number;
  is_unionized: boolean;
  syndicate: {
    id: string;
    nome_fantasia: string;
    avatar: string;
  };
  syndicate_id: string;
  request_unionization_at: Date;
  is_syndicate_approved: boolean;
  syndicate_approved_at: Date;
  is_discount_agreed: boolean;
  is_lgpd_agreed: boolean;
  is_privacy_terms_agreed: boolean;
  device_id: string;
  created_at: Date;
  updated_at: Date;
}

interface AuthState {
  token: string;
  worker: Worker;
}

interface AuthContextData {
  worker: Worker;
  loading: boolean;
  signIn(credentials: any): Promise<any>;
  signOut(): any;
  updateWorker(worker: Worker): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser(): Promise<void> {
      const worker = await database.adapter.getLocal('@VivaVoz:worker');
      const token = await database.adapter.getLocal('@VivaVoz:token');

      if (token) {
        const {exp}: {exp: number} = jwt_decode(token);
        const expirationTime = exp * 1000 - 60000;
        if (Date.now() >= expirationTime) {
          signOut();
          setData({} as AuthState);
        }
      }

      if (token && worker) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setData({token: token, worker: JSON.parse(worker)});
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  const getDeviceId = useCallback(async () => {
    const {userId} = await OneSignal.getDeviceState();
    return userId;
  }, []);

  const signIn = useCallback(async ({cpf, password}) => {
    const response = await api.post('/workers/session', {
      cpf: cpf,
      password: password,
    });
    const {token, worker} = response.data;

    await database.adapter.setLocal('@VivaVoz:worker', JSON.stringify(worker));
    await database.adapter.setLocal('@VivaVoz:token', token);

    const deviceId = await getDeviceId();

    await api.patch(`/workers/update-device/${worker.id}`, {deviceId});

    api.defaults.headers.Authorization = `Bearer ${token}`;

    setData({token, worker});
  }, []);

  const signOut = useCallback(async () => {
    await database.adapter.removeLocal('@VivaVoz:worker');
    await database.adapter.removeLocal('@VivaVoz:token');

    setData({} as AuthState);
  }, []);

  const updateWorker = useCallback(
    async (worker: Worker) => {
      await database.adapter.setLocal(
        '@VivaVoz:worker',
        JSON.stringify(worker),
      );
      setData({
        token: data.token,
        worker,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{worker: data.worker, loading, signIn, signOut, updateWorker}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used with an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
