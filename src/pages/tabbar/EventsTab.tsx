import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from '../../commonConstants/constants';
import eventsService from '../../services/events.service';

const EventsTab = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await eventsService.getListOfEvents();
      setEvents(response.data.data.events);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error fetching data: {error.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello Renzo!</Text>
        <Text style={styles.subHeaderText}>Are You Ready To Dance?</Text>
      </View>
      <FlatList
        data={events}
        keyExtractor={item => item.event_id.toString()} // Ensure `event_id` is unique
        renderItem={({item}) => (
          <View style={styles.eventContainer}>
            <TouchableOpacity style={styles.arrowButton}>
              <Feather name="arrow-right" size={moderateScale(15)} />
            </TouchableOpacity>
            <View style={styles.eventDetails}>
              <Image
                source={{uri: item.event_profile_img}}
                style={styles.eventImage}
                resizeMode="contain"
              />
              <View style={styles.textContainer}>
                <Text style={styles.eventName}>{item.event_name}</Text>
                <Text style={styles.eventDate}>
                  {item.readable_from_date} - {item.readable_to_date}
                </Text>
                <Text style={styles.eventPrice}>
                  €{item.event_price_from} - €{item.event_price_to}
                </Text>
                <Text style={styles.danceStyles}>
                  {item.danceStyles.map(style => style.ds_name).join(', ')}
                </Text>
              </View>
              <View style={styles.actionsContainer}>
                <Text style={styles.eventName}>{item.event_name}</Text>
                <View style={styles.iconContainer}>
                  <AntDesign name="upload" size={moderateScale(30)} />
                  <AntDesign
                    name={item.isFavorite ? 'heart' : 'hearto'}
                    size={moderateScale(30)}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: moderateScale(100),
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 15,
    color: 'gray',
  },
  eventContainer: {
    borderWidth: 1,
    borderRadius: moderateScale(8),
    margin: 10,
    backgroundColor: 'white',
    elevation: 2,
  },
  arrowButton: {
    alignSelf: 'flex-end',
    margin: 10,
  },
  eventDetails: {
    flexDirection: 'row',
    margin: 5,
  },
  eventImage: {
    height: moderateScale(80),
    width: moderateScale(80),
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  eventName: {
    fontSize: 15,
    color: 'black',
  },
  eventDate: {
    fontSize: 15,
    color: 'green',
  },
  eventPrice: {
    fontSize: 15,
    color: 'gray',
  },
  danceStyles: {
    padding: 5,
    color: 'darkgray',
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});

export default EventsTab;
