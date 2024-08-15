import APIClient from '../plugins/api.plugin';

class EventService {
  getListOfEvents() {
    return APIClient.apiClient.post('events-listing');
  }
}

export default new EventService();
