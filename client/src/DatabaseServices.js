import axios from 'axios';

const sessionUrl = 'https://race.up.railway.app/api/sessions/';
const userUrl = 'https://race.up.railway.app/api/users/';

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

    // Find Session With Corresponding Room ID
    static async findSessionByRoomID(roomid) {
      try {
        const res = await axios.get(`${sessionUrl}${roomid}`);
        return res.data;
      } catch (error) {
        console.warn(`${sessionUrl}${roomid}`, error);
      }
    }

    // Update Sent From Host When Game Begins
    static sessionStarted(roomid) {
      return axios.put(`${sessionUrl}${roomid}/start`, { hasBegun: true });
    }

    // Post A Session to Sessions Database
    static createNewSession(session) {
      return axios.post(sessionUrl, session);
    }

    // Close Session
    static deleteSessionByRoomID(roomid) {
      return axios.delete(`${sessionUrl}${roomid}`);
    }

    // Update Final Positions
    static async updateFinalPositions(roomid, finalPositions) {
      return axios.put(`${sessionUrl}${roomid}`, { finalPositions: finalPositions });
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