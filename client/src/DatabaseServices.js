import axios from 'axios';

const sessionUrl = 'https://math-race-game.herokuapp.com/api/sessions/';
const userUrl = 'https://math-race-game.herokuapp.com/api/users/';

class DatabaseServices {

    /* SESSION SERVICES */

    // Get All Sessions
    static async getAllSessions() {
      try {
        const res = await axios.get(sessionUrl);
        return res.data;
      } catch (error) {
        console.warn(error);
      }
    }

    // Find Session With Corrosponding Room ID
    static async findSessionByRoomID(roomid) {
      try {
        const res = await axios.get(`${sessionUrl}${roomid}`);
        return res.data;
      } catch (error) {
        console.warn(`${sessionUrl}${roomid}`, error);
      }
    }  

    // Post A Session to Sessions Database
    static createNewSession(session) {
      return axios.post(sessionUrl, session);
    }

    // Close Session
    static deleteSessionByRoomID(roomid) {
      return axios.delete(`${sessionUrl}${roomid}`);
    }


  /* USER SERVICES */

  // Get All Users
  static async getAllUsers() {
    try {
      const res = await axios.get(userUrl);
      return res.data;
    } catch (error) {
      console.warn(error);
    }
  }

  // Find a User By Their Username
  static async findUser(username) {
    try {
      const res = await axios.get(`${userUrl}${username}`);
      return res.data;
    } catch (error) {
      console.warn(`${userUrl}${username}`, error);
    }
  }

  // Update When User Last Logged
  static updateLastLogin(username, lastLogin) {
    return axios.put(`${userUrl}${username}/updateLastLogin`, { lastLogin: lastLogin })
  }

  // Log User Data
  static updateUserData(username, gameData) {
    return axios.put(`${userUrl}${username}`, { gameData: gameData })
  }

  // Post New Account
  static createNewUser(user) {
    return axios.post(userUrl, user);
  }

  // Delete Account
  static deleteAccount(username) {
    return axios.delete(`${userUrl}${username}`);
  }
}

export default DatabaseServices;