import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { StatusBar, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(9)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  padding-top: ${statusBarHeight}px;
`;

export const UserWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 90%;
`;

export const AppName = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin-left: ${RFPercentage(-4)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFPercentage(3.7)}px;
  color: ${({ theme }) => theme.colors.secondary_light};
`;

export const TitleC = styled.Text`
  font-family: ${({ theme }) => theme.fonts.cursive};
  font-size: ${RFPercentage(3.7)}px;
  color: ${({ theme }) => theme.colors.title_light};
`;

export const MenuButton = styled.TouchableOpacity``;

export const MenuIcon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.colors.secondary_light};
  font-size: ${RFPercentage(5)}px;
`;

export const CalendarContainer = styled.View`
  justify-content: center;
  height: ${RFPercentage(40)}px;
  margin: ${RFPercentage(2)}px;
  border-radius: ${RFPercentage(2)}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.calendar_background};
`;

export const ScheduleContainer = styled.View`
  margin: ${RFPercentage(2)}px;
  padding: ${RFPercentage(2)}px;
  background-color: ${({ theme }) => theme.colors.calendar_background};
  border-radius: ${RFPercentage(2)}px;
  flex: 1;
`;

export const ScheduleTitle = styled.Text`
  font-size: ${RFPercentage(2.5)}px;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.fonts.bold};
  text-align: center;
  margin-bottom: ${RFPercentage(2)}px;
`;

export const ScheduleGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const ScheduleButton = styled.TouchableOpacity<{ noAvailability?: boolean }>`
  min-width: ${({ noAvailability }: { noAvailability?: boolean }) => (noAvailability ? RFPercentage(25) : RFPercentage(11.5))}px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.menu_button_dark_blue};
  padding: ${RFPercentage(2)}px ${RFPercentage(3)}px;
  margin: ${RFPercentage(1)}px;
  border-radius: ${RFPercentage(1)}px;
`;

export const ScheduleButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${RFPercentage(2)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const TitleScreen = styled.Text`
  margin-top: ${RFPercentage(1)}px;
  font-size: ${RFPercentage(3)}px;
  color: ${({ theme }) => theme.colors.secondary_light};
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: center;
`;

export const calendarTheme = (theme) => ({
  backgroundColor: theme.colors.calendar_secondary,
  calendarBackground: theme.colors.calendar_secondary,
  textSectionTitleColor: theme.colors.secondary,
  selectedDayBackgroundColor: theme.colors.menu_button_dark_blue,
  selectedDayTextColor: theme.colors.primary,
  todayTextColor: theme.colors.title_light,
  dayTextColor: theme.colors.secondary,
  textDisabledColor: '#d9e1e8',
  dotColor: theme.colors.menu_button_dark_blue,
  selectedDotColor: theme.colors.primary,
  arrowColor: theme.colors.secondary_light,
  monthTextColor: theme.colors.secondary,
  textDayFontFamily: theme.fonts.regular,
  textMonthFontFamily: theme.fonts.bold,
  textDayHeaderFontFamily: theme.fonts.bold,
  textDayHeaderFontSize: RFPercentage(1.5),
  textMonthFontSize: RFPercentage(2),
  'stylesheet.calendar.header': {
    week: {
      fontSize: 20,
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.primary,
    },
  },
});