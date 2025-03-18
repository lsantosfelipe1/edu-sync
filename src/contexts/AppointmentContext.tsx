import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { fetchAppointments } from '../services/api';

type Appointment = {
  uri: string;
  name: string;
  start_time: string;
};

type AppointmentContextData = {
  completedAppointments: Appointment[];
  scheduledAppointments: Appointment[];
  loading: boolean;
  loadAppointments: () => Promise<void>;
};

type AppointmentProviderProps = {
  children: ReactNode;
};

export const AppointmentContext = createContext<AppointmentContextData>({} as AppointmentContextData);

export function AppointmentProvider({ children }: AppointmentProviderProps) {
  const [completedAppointments, setCompletedAppointments] = useState<Appointment[]>([]);
  const [scheduledAppointments, setScheduledAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const { completed, scheduled } = await fetchAppointments();
      console.log('Agendamentos concluídos:', completed);
      console.log('Agendamentos agendados:', scheduled);
      setCompletedAppointments(completed);
      setScheduledAppointments(scheduled);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  return (
    <AppointmentContext.Provider value={{ completedAppointments, scheduledAppointments, loading, loadAppointments }}>
      {children}
    </AppointmentContext.Provider>
  );
}