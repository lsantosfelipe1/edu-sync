import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = process.env.EXPO_PUBLIC_API_URL as string;
const clientId = process.env.EXPO_CALENDLY_CLIENT_ID as string;
const clientSecret = process.env.EXPO_CALENDLY_CLIENT_SECRET as string;
const redirectUri = process.env.EXPO_REDIRECT_URI as string;
const calendlyLink = process.env.EXPO_CALENDLY_LINK as string;
const calendlyToken = process.env.EXPO_PROFESSOR_TOKEN as string;

const api = axios.create({
  baseURL: apiUrl,
});

let accessToken: string | null = null;
let refreshToken: string | null = null;

interface UserData {
  resource: {
    uri: string;
    name: string;
    email: string;
    avatar_url: string;
  };
}

interface Event {
  id: string;
  uri: string;
  name: string;
  status: string;
  start_time: string;
  end_time: string;
}

interface AppointmentDetails {
  name: string;
  start_time: string;
  meeting_notes_plain: string | null;
  event_memberships: {
    user_name: string;
    user_email: string;
  }[];
}

export const getUserData = async (accessToken: string): Promise<UserData> => {
  try {
    const response: AxiosResponse<UserData> = await axios.get('https://api.calendly.com/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar dados do usuário:', error.response ? error.response.data : error.message);
    throw error;
  }
};

const storeTokens = async (accessToken: string, refreshToken: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.error('Erro ao armazenar tokens:', error);
  }
};

const getStoredAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    console.error('Erro ao recuperar token de acesso:', error);
    return null;
  }
};

const getStoredRefreshToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('refreshToken');
    return token;
  } catch (error) {
    console.error('Erro ao recuperar refresh token:', error);
    return null;
  }
};

export const getAccessToken = async (code: string): Promise<string> => {
  try {
    const response: AxiosResponse<{ access_token: string; refresh_token: string }> = await axios.post('https://auth.calendly.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;

    await storeTokens(accessToken, refreshToken);

    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);

    return accessToken;
  } catch (error: any) {
    console.error('Erro ao obter token de acesso:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const refreshAccessToken = async (): Promise<string> => {
  try {
    refreshToken = await getStoredRefreshToken();

    const response: AxiosResponse<{ access_token: string; refresh_token: string }> = await axios.post('https://auth.calendly.com/oauth/token', null, {
      params: {
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken!,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;

    await storeTokens(accessToken, refreshToken);

    console.log('Novo Access Token:', accessToken);
    return accessToken;
  } catch (error: any) {
    console.error('Erro ao atualizar token de acesso:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const fetchAppointments = async (): Promise<{ completed: Event[]; scheduled: Event[] }> => {
  let userUri: string | null = null;

  try {
    accessToken = await getStoredAccessToken();

    if (!accessToken) {
      console.error('Token de acesso não disponível.');
      throw new Error('Token de acesso não disponível.');
    }

    const userData: AxiosResponse<UserData> = await axios.get('https://api.calendly.com/users/me', {
      headers: {
        Authorization: `Bearer ${calendlyToken}`,
      },
    });

    userUri = userData.data.resource.uri;

    const response: AxiosResponse<{ collection: Event[] }> = await api.get('/scheduled_events', {
      headers: {
        Authorization: `Bearer ${calendlyToken}`,
      },
      params: {
        user: userUri,
      },
    });

    const events = response.data.collection.filter((event) => event.status !== 'canceled');
    const completed = events.filter((event) => new Date(event.end_time) < new Date());
    const scheduled = events.filter((event) => new Date(event.end_time) >= new Date());

    return { completed, scheduled };
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.log('Token expirado. Atualizando token...');
      accessToken = await refreshAccessToken();

      const retryResponse: AxiosResponse<{ collection: Event[] }> = await api.get('/scheduled_events', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          user: userUri,
        },
      });

      const retryEvents = retryResponse.data.collection.filter((event) => event.status !== 'canceled');
      const completed = retryEvents.filter((event) => new Date(event.end_time) < new Date());
      const scheduled = retryEvents.filter((event) => new Date(event.end_time) >= new Date());

      return { completed, scheduled };
    } else {
      console.error('Erro ao buscar agendamentos:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
};

export const fetchAppointmentDetails = async (appointmentId: string): Promise<AppointmentDetails> => {
  try {

    const response: AxiosResponse<{ resource: AppointmentDetails }> = await api.get(`/scheduled_events/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${calendlyToken}`,
      },
    });

    return response.data.resource;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      const retryResponse: AxiosResponse<{ resource: AppointmentDetails }> = await api.get(`/scheduled_events/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return retryResponse.data.resource;
    } else {
      console.error('Erro ao buscar detalhes do agendamento:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
};

const eventTypes = async () => {
  try {
    if (!calendlyLink) {
      throw new Error('Link do Calendly não fornecido.');
    }
  
    const eventSlug = calendlyLink.split('/').pop();
    if (!eventSlug) {
      throw new Error('Não foi possível extrair o slug do evento do link fornecido.');
    }
  
    const userResponse = await axios.get('https://api.calendly.com/users/me', {
      headers: {
        Authorization: `Bearer ${calendlyToken}`,
      },
    });
    const userUri = userResponse.data.resource.uri;
    const eventTypesResponse = await axios.get('https://api.calendly.com/event_types', {
      headers: {
        Authorization: `Bearer ${calendlyToken}`,
      },
      params: {
        user: userUri, 
      },
    });
  
    if (!eventTypesResponse.data.collection || eventTypesResponse.data.collection.length === 0) {
      throw new Error('Nenhum evento encontrado para o usuário.');
    }
  
    const event = eventTypesResponse.data.collection.find((event: any) => event.slug === eventSlug);
    if (!event) {
      throw new Error('Evento não encontrado.');
    }
    return  event.uri;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao buscar os tipos de evento:', err.response ? err.response.data : err.message);
    throw error;
  }
};

export const fetchCalendly = async () => {
  try {
    const eventUri = await eventTypes();
    const startTime = new Date(Date.now() + 60000).toISOString();
    const endTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); 
  
    const availabilityResponse = await axios.get('https://api.calendly.com/event_type_available_times', {
      headers: {
        Authorization: `Bearer ${calendlyToken}`,
      },
      params: {
        event_type: eventUri,
        start_time: startTime, 
        end_time: endTime, 
      },
    });
  
    return availabilityResponse.data.collection;
  } catch (error) {
    const err = error as any;
    console.error('Erro ao buscar os horários disponíveis na agenda:', err.response ? err.response.data : err.message);
    throw error;
  }
};

export const createAppointment = async (email: String) => {
  try {
    const event = await eventTypes();
    const response = await axios.post(
      'https://api.calendly.com/scheduling_links',
      {
        max_event_count: 1,
        owner: event,
        owner_type: 'EventType',
        invitee_email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${calendlyToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.resource.booking_url;
  } catch (error: any) {
    console.error('Erro ao gerar o link de agendamento:', error.response?.data || error.message);
    throw error;
  }
};

export const cancelAppointment = async (appointmentId: string): Promise<void> => {
  try {
    const response = await axios.post(
      `https://api.calendly.com/scheduled_events/${appointmentId}/cancellation`,
      {
        reason: 'Cancelado pelo usuário',
      },
      {
        headers: {
          Authorization: `Bearer ${calendlyToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Evento cancelado com sucesso:', response.data);
  } catch (error: any) {
    console.error('Erro ao cancelar o evento:', error.response ? error.response.data : error.message);
    throw error;
  }
};